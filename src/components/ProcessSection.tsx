import React, { useState, useEffect, useRef } from 'react';
import { ProcessStage } from '../config/portfolioConfig';

interface ProcessSectionProps {
  process: ProcessStage[];
  accentColor: string;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ process, accentColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate scroll progress within this section
      const progress = Math.max(0, Math.min(1, (windowH * 0.7 - rect.top) / (rect.height * 0.8)));
      const step = Math.min(process.length - 1, Math.floor(progress * process.length));
      setActiveStepIndex(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [process.length]);

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full py-24 md:py-36 bg-[#050505] text-[#EAEAEA] border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] uppercase mb-4">
              <span>03</span>
              <span>/</span>
              <span style={{ color: accentColor }}>METHODOLOGY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase font-display tracking-tight text-white leading-[0.92]">
              FROM IDEA
              <br />
              <span className="text-[#888888]">TO EXPERIENCE.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-[#999999] leading-relaxed">
              Every production follows a rigorous six-stage pipeline engineered to eliminate AI drift and guarantee fluid, responsive cinematic results.
            </p>
          </div>
        </div>

        {/* SCROLL-REACTIVE CINEMATIC TIMELINE */}
        <div className="relative border-l border-white/[0.1] pl-6 md:pl-12 ml-4 md:ml-8 flex flex-col gap-16 md:gap-20">
          {/* Active timeline vertical tracer */}
          <div
            className="absolute -left-[1px] top-0 w-[2px] transition-all duration-300"
            style={{
              height: `${((activeStepIndex + 1) / process.length) * 100}%`,
              backgroundColor: accentColor
            }}
          />

          {process.map((stage, idx) => {
            const isActive = activeStepIndex === idx;
            const isPast = activeStepIndex > idx;

            return (
              <div
                key={stage.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isActive ? 'opacity-100' : isPast ? 'opacity-60' : 'opacity-30'
                }`}
              >
                {/* Node marker on vertical line */}
                <div
                  className={`absolute -left-[31px] md:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'border-white bg-[#050505] scale-125'
                      : isPast
                      ? 'border-white/40 bg-white/20'
                      : 'border-white/20 bg-[#050505]'
                  }`}
                >
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  )}
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#888888] mb-1">
                      <span className="font-semibold text-white" style={{ color: isActive ? accentColor : undefined }}>
                        {stage.step}
                      </span>
                      <span>—</span>
                      <span className="uppercase tracking-widest">{stage.title}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white tracking-tight">
                      {stage.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-8 flex flex-col gap-2">
                    <p className="text-base sm:text-lg text-white font-medium">
                      {stage.description}
                    </p>
                    <p className="text-xs sm:text-sm text-[#888888] leading-relaxed font-sans max-w-xl">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
