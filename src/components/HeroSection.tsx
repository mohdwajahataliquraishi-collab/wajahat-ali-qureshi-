import React, { useRef, useEffect, useState, useCallback } from 'react';
import { globalSequenceManager } from '../utils/frameSequence';
import { PortfolioConfig } from '../config/portfolioConfig';
import { Crosshair, Eye } from 'lucide-react';

interface HeroSectionProps {
  config: PortfolioConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamic tracking states
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; clientX: number; clientY: number }>({
    x: 0.5,
    y: 0.5,
    clientX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    clientY: typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  });
  const [isCursorActive, setIsCursorActive] = useState(true);
  const [trackingAngle, setTrackingAngle] = useState(0);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(1);
  const [totalFramesAvailable, setTotalFramesAvailable] = useState(30);

  // Animation refs for smooth spring/lerp physics
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const targetTiltXRef = useRef(0);
  const currentTiltXRef = useRef(0);
  const targetTiltYRef = useRef(0);
  const currentTiltYRef = useRef(0);
  const cursorClientRef = useRef({ x: 500, y: 400 });

  // High-performance canvas rendering
  const renderCanvas = useCallback((progress: number, tiltX: number, tiltY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get frame by progress across available sequence frames
    const frameInfo = globalSequenceManager.getFrameByProgress(progress);
    const img = frameInfo.image;
    setActiveFrameDisplay(frameInfo.frameIndex);
    setTotalFramesAvailable(frameInfo.total);

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep black canvas background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      // Calculate aspect-ratio cover with subtle cursor parallax tilt
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const screenRatio = width / height;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      // Add 6% extra buffer so subtle cursor tilt doesn't reveal edges
      const zoomFactor = 1.06;

      if (screenRatio > imgRatio) {
        drawW = width * zoomFactor;
        drawH = (width / imgRatio) * zoomFactor;
        drawX = (width - drawW) / 2 + tiltX * 24;
        drawY = (height - drawH) / 2 + tiltY * 18;
      } else {
        drawH = height * zoomFactor;
        drawW = (height * imgRatio) * zoomFactor;
        drawX = (width - drawW) / 2 + tiltX * 24;
        drawY = (height - drawH) / 2 + tiltY * 18;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    } else {
      // Elegant procedural studio portrait when frames are synchronizing
      const cx = width / 2 + tiltX * 20;
      const cy = height * 0.44 + tiltY * 15;

      const grad = ctx.createRadialGradient(cx, cy, 40, cx, cy, Math.max(width, height) * 0.55);
      grad.addColorStop(0, '#1c1c20');
      grad.addColorStop(0.6, '#0c0c0e');
      grad.addColorStop(1, '#050505');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Procedural gaze tracking vector pointed at cursor
      const cursorTargetX = cursorClientRef.current.x;
      const cursorTargetY = cursorClientRef.current.y;
      const dx = cursorTargetX - cx;
      const dy = cursorTargetY - cy;
      const gazeRad = Math.atan2(dy, dx);

      // Head silhouette
      ctx.fillStyle = '#17171c';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 64, 84, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#272730';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Eyes tracking cursor
      const eyeY = cy - 14;
      ctx.fillStyle = config.brand.accentColor;
      ctx.beginPath();
      ctx.arc(cx - 20, eyeY, 3, 0, Math.PI * 2);
      ctx.arc(cx + 20, eyeY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Subtle gaze line extending towards cursor
      ctx.strokeStyle = `${config.brand.accentColor}55`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(cx, eyeY);
      ctx.lineTo(cx + Math.cos(gazeRad) * 120, eyeY + Math.sin(gazeRad) * 120);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Atmospheric dark vignette scrim ensuring high-contrast legible editorial typography
    const vignette = ctx.createLinearGradient(0, 0, 0, height);
    vignette.addColorStop(0, 'rgba(5, 5, 5, 0.75)');
    vignette.addColorStop(0.2, 'rgba(5, 5, 5, 0.25)');
    vignette.addColorStop(0.8, 'rgba(5, 5, 5, 0.35)');
    vignette.addColorStop(1, 'rgba(5, 5, 5, 0.88)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }, [config.brand.accentColor]);

  // Main continuous animation loop with lerp easing
  useEffect(() => {
    let animId: number;

    const animate = () => {
      // Smoothly interpolate progress towards target
      const lerpFactor = 0.12;
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * lerpFactor;
      currentTiltXRef.current += (targetTiltXRef.current - currentTiltXRef.current) * lerpFactor;
      currentTiltYRef.current += (targetTiltYRef.current - currentTiltYRef.current) * lerpFactor;

      const p = Math.max(0, Math.min(1, currentProgressRef.current));
      setTrackingAngle(Math.round(p * 90));

      renderCanvas(p, currentTiltXRef.current, currentTiltYRef.current);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [renderCanvas]);

  // Cursor tracking listener across entire viewport while hero is in view
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'clientX' in e ? e.clientX : e.touches[0]?.clientX || window.innerWidth / 2;
      const clientY = 'clientY' in e ? e.clientY : e.touches[0]?.clientY || window.innerHeight / 2;

      cursorClientRef.current = { x: clientX, y: clientY };

      const normX = clientX / window.innerWidth;
      const normY = clientY / window.innerHeight;

      setCursorPos({
        x: normX,
        y: normY,
        clientX,
        clientY
      });

      // Cursor elevation mapping:
      // Moving cursor towards top of screen elevates gaze towards 90° (progress = 1.0)
      // Moving cursor towards lower-middle keeps gaze forward at 0° (progress = 0.0)
      const cursorElevation = Math.max(0, Math.min(1, (0.85 - normY) / 0.7));

      // Horizontal tilt parallax (-1 to 1)
      const tiltX = (normX - 0.5) * 2;
      const tiltY = (normY - 0.5) * 2;

      targetTiltXRef.current = tiltX;
      targetTiltYRef.current = tiltY;

      // Blend cursor elevation with scroll progress
      if (isCursorActive) {
        targetProgressRef.current = Math.max(cursorElevation, scrollProgress);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [isCursorActive, scrollProgress]);

  // Scroll position listener for sticky sequence track
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
      setScrollProgress(progress);

      // If user is actively scrolling, update target progress
      if (scrolled > 50) {
        targetProgressRef.current = Math.max(targetProgressRef.current, progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Listen to frame sequence preloader updates
  useEffect(() => {
    const unsub = globalSequenceManager.subscribe(() => {
      renderCanvas(currentProgressRef.current, currentTiltXRef.current, currentTiltYRef.current);
    });
    return unsub;
  }, [renderCanvas]);

  // Social icon SVGs
  const renderSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'instagram':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
          </svg>
        );
      case 'x':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        );
      case 'github':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220vh] bg-[#050505] cursor-crosshair"
      id="hero-track"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Sequence Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Subtle Grain Overlay */}
        <div className="absolute inset-0 cinematic-grain pointer-events-none opacity-40" />

        {/* Subtle dynamic cursor tracker reticle in Hero */}
        <div
          className="pointer-events-none fixed z-20 transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{
            left: `${cursorPos.clientX}px`,
            top: `${cursorPos.clientY}px`
          }}
        >
          <div className="relative flex items-center justify-center">
            <div
              className="w-7 h-7 rounded-full border border-dashed opacity-40 animate-spin"
              style={{ borderColor: config.brand.accentColor, animationDuration: '10s' }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: config.brand.accentColor }}
            />
          </div>
        </div>

        {/* TOP GRADIENT SCATTER SHIELD */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent pointer-events-none" />

        {/* HERO MAIN ASYMMETRIC EDITORIAL CONTENT */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 pt-28 md:pt-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pointer-events-none">
          {/* LEFT SIDE EDITORIAL COMPOSITION */}
          <div className="lg:col-span-7 flex flex-col items-start pointer-events-auto">
            {/* Small Eyebrow with Active Cursor Tracker Status */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.brand.accentColor }} />
              <span className="text-xs font-mono tracking-[0.25em] text-[#A0A0A0] uppercase">
                {config.hero.eyebrow}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-black/60 border border-white/10 text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>CURSOR TRACKING ACTIVE</span>
              </span>
            </div>

            {/* Large Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-display leading-[0.92] mb-6">
              {config.hero.title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Under Title: Positioning */}
            <div className="text-sm md:text-base font-mono tracking-[0.3em] text-[#D4D4D4] uppercase mb-8 flex items-center gap-2">
              <span>AI</span>
              <span style={{ color: config.brand.accentColor }}>×</span>
              <span>WEB</span>
              <span style={{ color: config.brand.accentColor }}>×</span>
              <span>MOTION</span>
            </div>

            {/* 4 Small Editorial Capability Indicators */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 max-w-md w-full pt-4 border-t border-white/[0.08]">
              {config.hero.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#999999] hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE VALUE PROPOSITION & CURSOR HUD */}
          <div className="lg:col-span-5 flex flex-col lg:items-end text-left lg:text-right pointer-events-auto">
            {/* Small Label */}
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#737373] uppercase mb-3">
              {config.hero.rightLabel}
            </div>

            {/* Main Statement */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white uppercase font-display leading-tight mb-4 max-w-md">
              {config.hero.rightStatement}
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed max-w-sm font-sans mb-6">
              {config.hero.rightParagraph}
            </p>

            {/* Real-time Cursor Telemetry Panel */}
            <div className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-sm flex flex-col gap-1.5 text-[10px] font-mono text-[#888888] max-w-xs w-full text-left">
              <div className="flex items-center justify-between text-[#AAAAAA] pb-1 border-b border-white/10">
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-white">
                  <Crosshair className="w-3 h-3 text-[#FF5500]" style={{ color: config.brand.accentColor }} />
                  <span>GAZE VECTOR TRACKING</span>
                </span>
                <span className="text-emerald-400 font-semibold">{trackingAngle}° / 90°</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span>CURSOR POSITION</span>
                <span className="tabular-nums text-white font-mono">
                  X: {Math.round(cursorPos.clientX)} · Y: {Math.round(cursorPos.clientY)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>ACTIVE SEQUENCE FRAME</span>
                <span className="tabular-nums text-white font-mono">
                  {String(activeFrameDisplay).padStart(3, '0')} / {totalFramesAvailable}
                </span>
              </div>

              <div className="text-[9px] text-[#666666] pt-1">
                Move cursor up / down across screen to steer the gaze directly.
              </div>
            </div>
          </div>
        </div>

        {/* HERO BOTTOM ZONE */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/[0.08] pt-6 pointer-events-auto">
          {/* Bottom-Left: SCROLL OR MOVE CURSOR TO EXPLORE */}
          <div className="flex items-center gap-4 text-[11px] font-mono tracking-widest text-[#888888] uppercase">
            <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
              <div
                className="w-full h-1/2 bg-[#FF5500] animate-pulse"
                style={{ backgroundColor: config.brand.accentColor }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-medium">MOVE CURSOR OR SCROLL TO EXPLORE</span>
              <span className="text-[9px] text-[#555555]">VIDEO RESPONDS IN REAL-TIME TO CURSOR MOTION</span>
            </div>
          </div>

          {/* Bottom-Center: Category indicators */}
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-mono tracking-widest text-[#777777] uppercase">
            <span>IMAGE-TO-VIDEO</span>
            <span>·</span>
            <span>CINEMATIC KINETICS</span>
            <span>·</span>
            <span>FRONTEND CRAFT</span>
          </div>

          {/* Bottom-Right: Location & Minimal Social Links */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <span className="text-[10px] font-mono tracking-widest text-[#737373] uppercase">
              {config.brand.location}
            </span>

            {/* Minimal monochrome social icons */}
            <div className="flex items-center gap-3 border-l border-white/10 pl-4">
              {config.socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  className="text-[#888888] hover:text-[#FF5500] transition-colors p-1"
                  style={{ '--hover-color': config.brand.accentColor } as React.CSSProperties}
                >
                  {renderSocialIcon(soc.name)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom progress hairline */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.05]">
          <div
            className="h-full transition-all duration-75"
            style={{
              width: `${(trackingAngle / 90) * 100}%`,
              backgroundColor: config.brand.accentColor
            }}
          />
        </div>
      </div>
    </div>
  );
};
