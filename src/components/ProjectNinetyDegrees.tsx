import React, { useRef, useEffect, useState, useCallback } from 'react';
import { globalSequenceManager } from '../utils/frameSequence';
import { ProjectItem } from '../config/portfolioConfig';
import { ShieldCheck, Eye, Compass, Sliders } from 'lucide-react';

interface ProjectNinetyDegreesProps {
  project: ProjectItem;
  accentColor: string;
}

export const ProjectNinetyDegrees: React.FC<ProjectNinetyDegreesProps> = ({
  project,
  accentColor
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  // Map 0 - 239 frames to 0 - 90 degrees
  const angleDegrees = Math.round((frameIndex / 239) * 90);

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameInfo = globalSequenceManager.getFrameByProgress(idx / 239);
    const img = frameInfo.image;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Dark backdrop
    ctx.fillStyle = '#08080A';
    ctx.fillRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const screenRatio = width / height;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (screenRatio > imgRatio) {
        drawW = width;
        drawH = width / imgRatio;
        drawX = 0;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = height * imgRatio;
        drawX = (width - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    } else {
      // High-fidelity procedural visualization of the locked torso and head elevation
      const cx = width / 2;
      const cy = height * 0.45;

      // Dark studio gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 40, cx, cy, width * 0.6);
      bgGrad.addColorStop(0, '#151518');
      bgGrad.addColorStop(1, '#050505');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Torso & Suit Silhouette (Frozen & Immovable)
      ctx.fillStyle = '#0c0c0e';
      ctx.beginPath();
      ctx.moveTo(cx - 140, height);
      ctx.lineTo(cx - 100, cy + 90);
      ctx.lineTo(cx - 50, cy + 85);
      ctx.lineTo(cx, cy + 110);
      ctx.lineTo(cx + 50, cy + 85);
      ctx.lineTo(cx + 100, cy + 90);
      ctx.lineTo(cx + 140, height);
      ctx.closePath();
      ctx.fill();

      // Lapels and tie line
      ctx.strokeStyle = '#222226';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 85);
      ctx.lineTo(cx, cy + 140);
      ctx.lineTo(cx + 50, cy + 85);
      ctx.stroke();

      // Pocket watch chain (LOCKED STILL)
      ctx.strokeStyle = '#665522';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx + 45, cy + 130, 20, 0, Math.PI * 0.8);
      ctx.stroke();

      // Head silhouette pivoting 0° to 90° upward
      const currentAngleRad = (angleDegrees * Math.PI) / 180;
      const headOffsetY = -Math.sin(currentAngleRad) * 16;
      const headTiltScaleY = Math.cos(currentAngleRad * 0.7);

      ctx.save();
      ctx.translate(cx, cy + headOffsetY);

      // Head oval
      ctx.fillStyle = '#1e1e24';
      ctx.beginPath();
      ctx.ellipse(0, 0, 48, 62 * Math.max(0.65, headTiltScaleY), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#33333d';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Eyes vector looking up
      const eyeY = -12 * headTiltScaleY;
      const gazeVectorLength = 35;
      const gazeAngle = -Math.PI / 2 + (1 - angleDegrees / 90) * (Math.PI / 2);

      // Eyes
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(-16, eyeY, 3, 0, Math.PI * 2);
      ctx.arc(16, eyeY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Upward gaze beam
      ctx.strokeStyle = `${accentColor}88`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(-16, eyeY);
      ctx.lineTo(-16 + Math.cos(gazeAngle) * gazeVectorLength, eyeY + Math.sin(gazeAngle) * gazeVectorLength);
      ctx.moveTo(16, eyeY);
      ctx.lineTo(16 + Math.cos(gazeAngle) * gazeVectorLength, eyeY + Math.sin(gazeAngle) * gazeVectorLength);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
    }

    // Kinematic boundary line (Locked Clavicle Baseline)
    const baselineY = height * 0.65;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(30, baselineY);
    ctx.lineTo(width - 30, baselineY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Technical HUD overlay text on canvas
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('CLAVICLE ISOLATION BOUNDARY [TORSO FROZEN]', 40, baselineY - 8);
    ctx.fillText(`GAZE VECTOR: ${angleDegrees.toFixed(1)}° ELEVATION`, 40, 40);

    ctx.restore();
  }, [angleDegrees, accentColor]);

  // Scroll driven animation listener
  useEffect(() => {
    let animId: number;

    const onScroll = () => {
      if (isManualControl) return; // User is scrubbing manually
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // When section enters the viewport to when it leaves
      const start = windowH * 0.8;
      const end = -rect.height * 0.6;
      const current = rect.top;

      if (current < start && current > end) {
        const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
        const targetFrame = Math.min(239, Math.floor(progress * 239));
        setFrameIndex(targetFrame);

        // Update angle button highlight
        if (targetFrame < 50) setActiveAngleIndex(0);
        else if (targetFrame < 130) setActiveAngleIndex(1);
        else if (targetFrame < 200) setActiveAngleIndex(2);
        else setActiveAngleIndex(3);

        animId = requestAnimationFrame(() => drawFrame(targetFrame));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isManualControl, drawFrame]);

  // Redraw when frames update
  useEffect(() => {
    drawFrame(frameIndex);
  }, [frameIndex, drawFrame]);

  const setAngleStage = (stageIndex: number) => {
    setIsManualControl(true);
    setActiveAngleIndex(stageIndex);
    // 0 -> frame 0, 1 -> frame 80 (30°), 2 -> frame 160 (60°), 3 -> frame 239 (90°)
    const targetFrames = [0, 80, 160, 239];
    const frame = targetFrames[stageIndex];
    setFrameIndex(frame);
    drawFrame(frame);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualControl(true);
    const val = parseInt(e.target.value, 10);
    setFrameIndex(val);

    if (val < 50) setActiveAngleIndex(0);
    else if (val < 130) setActiveAngleIndex(1);
    else if (val < 200) setActiveAngleIndex(2);
    else setActiveAngleIndex(3);

    drawFrame(val);
  };

  return (
    <section
      ref={sectionRef}
      id="project-90-upward"
      className="relative w-full py-24 md:py-36 bg-[#050505] text-[#EAEAEA] border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] uppercase mb-3">
              <span>PROJECT 01</span>
              <span>/</span>
              <span style={{ color: accentColor }}>AI MOTION</span>
              <span>/</span>
              <span>IMAGE → VIDEO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase font-display tracking-tight text-white leading-none">
              {project.title}
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right">
            <p className="text-sm md:text-base text-[#999999] leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* MAIN CINEMATIC VIEWER & INTERACTION STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Center: Cinematic Canvas Viewer */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-[#0a0a0c] border border-white/10 rounded-sm overflow-hidden group shadow-2xl">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
              />

              {/* Angle HUD Watermark Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-xs">
                <Compass className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span className="font-semibold">{angleDegrees}°</span>
                <span className="text-[#888888] text-[10px]">UPWARD GAZE</span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#A0A0A0]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>TORSO VISUALLY FROZEN</span>
              </div>

              {/* Interactive Scrub Bar Overlay */}
              <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-sm flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#AAAAAA]">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3 h-3 text-[#FF5500]" style={{ color: accentColor }} />
                    <span>TIMELINE SCRUBBER</span>
                    {isManualControl && (
                      <button
                        onClick={() => setIsManualControl(false)}
                        className="text-[9px] underline text-[#FF5500] ml-2"
                      >
                        Reset to Scroll Sync
                      </button>
                    )}
                  </span>
                  <span className="tabular-nums font-mono text-white">
                    FRAME {String(frameIndex + 1).padStart(3, '0')} / 240
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="239"
                  value={frameIndex}
                  onChange={handleSliderChange}
                  aria-label="Timeline scrubber frame index"
                  className="w-full h-1.5 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#FF5500]"
                  style={{ accentColor }}
                />

                {/* 4 Angle Marker Stages */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[
                    { angle: '0°', label: 'FORWARD' },
                    { angle: '30°', label: 'INITIAL' },
                    { angle: '60°', label: 'TRANSITION' },
                    { angle: '90°', label: 'FINAL GAZE' }
                  ].map((stage, idx) => (
                    <button
                      key={stage.angle}
                      onClick={() => setAngleStage(idx)}
                      className={`text-left text-[10px] font-mono py-1 px-2 border transition-all ${
                        activeAngleIndex === idx
                          ? 'border-white bg-white/10 text-white font-medium'
                          : 'border-white/5 text-[#777777] hover:border-white/20 hover:text-[#CCCCCC]'
                      }`}
                    >
                      <div className="font-semibold" style={{ color: activeAngleIndex === idx ? accentColor : undefined }}>
                        {stage.angle}
                      </div>
                      <div className="text-[9px] truncate">{stage.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage Timeline Description */}
            {project.timeline && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {project.timeline.map((step, idx) => {
                  const isActive = activeAngleIndex === idx;
                  return (
                    <div
                      key={step.angle}
                      onClick={() => setAngleStage(idx)}
                      className={`p-4 border transition-all cursor-pointer ${
                        isActive
                          ? 'border-white/40 bg-white/[0.04]'
                          : 'border-white/[0.07] bg-transparent hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="font-bold text-white" style={{ color: isActive ? accentColor : undefined }}>
                          {step.angle}
                        </span>
                        <span className="text-[10px] text-[#666666]">STAGE 0{idx + 1}</span>
                      </div>
                      <h4 className="text-xs font-mono font-medium text-white uppercase tracking-wider mb-1.5">
                        {step.label}
                      </h4>
                      <p className="text-[11px] text-[#888888] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Controlled Human Motion Specs & Verification */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Technical Note Callout Box */}
            <div className="p-6 bg-[#0a0a0c] border border-white/10 rounded-sm">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#FF5500] uppercase mb-3">
                <ShieldCheck className="w-4 h-4" style={{ color: accentColor }} />
                <span>{project.technicalNote?.badge || "CONTROLLED HUMAN MOTION"}</span>
              </div>

              <h3 className="text-lg font-bold text-white uppercase font-display mb-3">
                {project.technicalNote?.title || "Kinetic Isolation Principle"}
              </h3>

              <p className="text-sm font-semibold text-white/90 leading-snug mb-3">
                "{project.technicalNote?.text || "One subject. One controlled movement. Zero unnecessary body gestures."}"
              </p>

              <p className="text-xs text-[#888888] leading-relaxed mb-6">
                In uncontrolled diffusion video synthesis, moving the head naturally drags the shoulder, torso, and coat lapels. Here, dense optical flow constraints freeze every anatomical structure below the jawline.
              </p>

              {/* Special Rule Checkpoints */}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="text-[10px] uppercase tracking-wider text-[#666666] mb-1">
                  SPECIAL RULE VERIFICATION:
                </div>
                {[
                  "BODY = STILL (0.00 mm displacement)",
                  "HEAD = 90° UPWARD ROTATION",
                  "EYES = LOOKING DIRECTLY UPWARD",
                  "NO shoulder, arm, or hand movement",
                  "NO coat, tie, or pocket-watch chain sway",
                  "NO independent camera translation"
                ].map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-[#B0B0B0]">
                    <span className="text-[#FF5500] font-bold" style={{ color: accentColor }}>✓</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantitative Kinetic Stats */}
            {project.stats && (
              <div className="p-6 bg-[#0a0a0c] border border-white/10 rounded-sm">
                <div className="text-[10px] font-mono tracking-widest text-[#737373] uppercase mb-4">
                  KINETIC METRICS
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#666666] uppercase">
                        {stat.label}
                      </span>
                      <span className="text-sm font-mono font-semibold text-white mt-1 tabular-nums">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Anatomical Gaze Indicator Callout */}
            <div className="p-4 border border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#888888]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#FF5500]" style={{ color: accentColor }} />
                <span>DYNAMIC CRANIAL YAW</span>
              </div>
              <span className="font-semibold text-white">{angleDegrees}° / 90°</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
