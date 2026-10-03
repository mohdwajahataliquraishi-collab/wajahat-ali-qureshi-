/**
 * Frame Sequence Preloader & Renderer for Akbar Nocode Cinematic Hero
 * Handles 240 WebP/PNG frames with smooth canvas rendering and zero DOM stutter.
 */

export interface FramePreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
  isReady: boolean;
  firstFrameReady: boolean;
}

export class SequenceManager {
  private totalFrames: number;
  private baseUrl: string;
  private images: Map<number, HTMLImageElement> = new Map();
  private loadedIndices: Set<number> = new Set();
  private listeners: Set<(progress: FramePreloadProgress) => void> = new Set();
  private isPreloading = false;
  private abortController: AbortController | null = null;

  constructor(totalFrames = 240, baseUrl = 'https://mlmvzqrlwghxcqtvfiqi.supabase.co/storage/v1/object/public/wajahat/ezgif-frame-') {
    this.totalFrames = totalFrames;
    this.baseUrl = baseUrl;
  }

  public getFrameUrl(index1Based: number): string {
    const padded = String(index1Based).padStart(3, '0');
    return `${this.baseUrl}${padded}.png`;
  }

  public subscribe(listener: (progress: FramePreloadProgress) => void): () => void {
    this.listeners.add(listener);
    this.notify();
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const loadedCount = this.loadedIndices.size;
    const progress: FramePreloadProgress = {
      loaded: loadedCount,
      total: this.totalFrames,
      percentage: Math.min(100, Math.round((loadedCount / Math.min(this.totalFrames, 30)) * 100)), // 30 frames needed for interactive readiness
      isReady: this.loadedIndices.has(1) && loadedCount >= 10,
      firstFrameReady: this.loadedIndices.has(1)
    };

    this.listeners.forEach((fn) => fn(progress));
  }

  public async startPreload(): Promise<void> {
    if (this.isPreloading) return;
    this.isPreloading = true;
    this.abortController = new AbortController();

    // Priority phase 1: First frame and key anchor frames (1, 10, 20, 30...)
    const priorityIndices: number[] = [1];
    for (let i = 5; i <= this.totalFrames; i += 5) {
      priorityIndices.push(i);
    }

    // Load key frames first
    await Promise.allSettled(
      priorityIndices.slice(0, 15).map((idx) => this.loadImage(idx))
    );

    // Phase 2: Concurrent queue for remainder
    const remainingIndices: number[] = [];
    for (let i = 1; i <= this.totalFrames; i++) {
      if (!this.loadedIndices.has(i)) {
        remainingIndices.push(i);
      }
    }

    const CONCURRENCY = 6;
    let currentIdx = 0;

    const worker = async () => {
      while (currentIdx < remainingIndices.length && !this.abortController?.signal.aborted) {
        const frameIdx = remainingIndices[currentIdx++];
        try {
          await this.loadImage(frameIdx);
        } catch {
          // Continue gracefully
        }
      }
    };

    const workers = Array.from({ length: CONCURRENCY }, () => worker());
    await Promise.race([
      Promise.allSettled(workers),
      new Promise((resolve) => setTimeout(resolve, 8000)) // Safety timeout
    ]);
  }

  private loadImage(index1Based: number): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (this.images.has(index1Based)) {
        resolve(this.images.get(index1Based)!);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      const url = this.getFrameUrl(index1Based);

      img.onload = () => {
        this.images.set(index1Based, img);
        this.loadedIndices.add(index1Based);
        this.notify();
        resolve(img);
      };

      img.onerror = () => {
        // Fallback: If later frames aren't on remote yet, clone the nearest available
        this.loadedIndices.add(index1Based);
        this.notify();
        reject(new Error(`Failed to load frame ${index1Based}`));
      };

      img.src = url;
    });
  }

  public getNearestFrame(index0Based: number): HTMLImageElement | null {
    const target1Based = Math.max(1, Math.min(this.totalFrames, Math.round(index0Based) + 1));
    if (this.images.has(target1Based)) {
      return this.images.get(target1Based)!;
    }

    // Find closest loaded frame
    let closestIndex = 1;
    let minDiff = Infinity;
    for (const loaded of this.loadedIndices) {
      if (this.images.has(loaded)) {
        const diff = Math.abs(loaded - target1Based);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = loaded;
        }
      }
    }

    return this.images.get(closestIndex) || null;
  }

  /**
   * Maps a normalized progress value [0.0, 1.0] across the actual available loaded frames
   * ensuring full 0° to 90° motion even if remote server hosts 30 frames.
   */
  public getFrameByProgress(progress: number): { image: HTMLImageElement | null; frameIndex: number; total: number } {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    // Determine the highest loaded frame index
    let maxLoaded = 1;
    for (const idx of this.loadedIndices) {
      if (this.images.has(idx) && idx > maxLoaded) {
        maxLoaded = idx;
      }
    }

    // Map progress across available frames (e.g. 1 to 30)
    const targetIndex = Math.max(1, Math.min(maxLoaded, Math.round(1 + clampedProgress * (maxLoaded - 1))));
    const img = this.images.get(targetIndex) || this.getNearestFrame(targetIndex - 1);

    return {
      image: img,
      frameIndex: targetIndex,
      total: maxLoaded
    };
  }

  public getMaxAvailableFrames(): number {
    let max = 1;
    for (const idx of this.loadedIndices) {
      if (this.images.has(idx) && idx > max) {
        max = idx;
      }
    }
    return max;
  }

  public getFrameCount(): number {
    return this.totalFrames;
  }

  public destroy() {
    this.abortController?.abort();
    this.listeners.clear();
    this.images.clear();
    this.loadedIndices.clear();
    this.isPreloading = false;
  }
}

// Global singleton instance for hero & projects
export const globalSequenceManager = new SequenceManager(
  240,
  'https://mlmvzqrlwghxcqtvfiqi.supabase.co/storage/v1/object/public/wajahat/ezgif-frame-'
);
