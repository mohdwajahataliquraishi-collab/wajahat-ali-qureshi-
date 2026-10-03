import React, { useState } from 'react';
import { CaseStudyStep } from '../config/portfolioConfig';
import { CheckCircle2, ChevronRight, FileText } from 'lucide-react';

interface CaseStudySectionProps {
  caseStudy: {
    projectTitle: string;
    projectCategory: string;
    overview: string;
    steps: CaseStudyStep[];
  };
  accentColor: string;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ caseStudy, accentColor }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="case-study" className="relative w-full py-24 md:py-36 bg-[#050505] text-[#EAEAEA] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] uppercase mb-3">
              <FileText className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>{caseStudy.projectCategory}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight text-white leading-none">
              CASE STUDY: {caseStudy.projectTitle}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#999999] max-w-md leading-relaxed font-sans">
            {caseStudy.overview}
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-12">
          {caseStudy.steps.map((st, i) => {
            const isCurrent = activeStep === i;
            return (
              <button
                key={st.number}
                onClick={() => setActiveStep(i)}
                className={`text-left p-3.5 border transition-all ${
                  isCurrent
                    ? 'border-white bg-white/10 text-white'
                    : 'border-white/[0.08] text-[#737373] hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-mono mb-1" style={{ color: isCurrent ? accentColor : undefined }}>
                  {st.number}
                </div>
                <div className="text-xs font-mono font-semibold uppercase tracking-wider truncate">
                  {st.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Dive */}
        {(() => {
          const current = caseStudy.steps[activeStep];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#08080a] border border-white/10 p-8 sm:p-12 rounded-sm shadow-2xl">
              {/* Left Details */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono tracking-widest text-[#888888] uppercase mb-2">
                    PHASE {current.number} / 06 · EXECUTION PIPELINE
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold uppercase text-white mb-4">
                    {current.headline}
                  </h3>

                  <p className="text-sm md:text-base text-[#AAAAAA] leading-relaxed mb-8 font-sans">
                    {current.description}
                  </p>
                </div>

                {/* Parameters Breakdown */}
                <div className="flex flex-col gap-2.5 pt-6 border-t border-white/10 text-xs font-mono">
                  <div className="text-[10px] tracking-wider text-[#666666] uppercase mb-1">
                    PIPELINE TELEMETRY & PARAMETERS:
                  </div>
                  {current.parameters.map((param, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#CCCCCC]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5500]" style={{ color: accentColor }} />
                      <span>{param}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual Representation */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full bg-black border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between p-6">
                  {/* Subtle technical crosshair overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-full h-[1px] bg-white" />
                    <div className="absolute h-full w-[1px] bg-white" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#666666]">
                    <span>STUDY MATTE // 0{activeStep + 1}</span>
                    <span className="text-emerald-400">VERIFIED DRIFT: 0.00%</span>
                  </div>

                  <div className="relative z-10 my-auto text-center py-8">
                    <span className="text-4xl sm:text-6xl font-black font-display text-white tracking-widest block opacity-90">
                      STAGE {current.number}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#FF5500] mt-2 block" style={{ color: accentColor }}>
                      {current.title} ANALYSIS
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#777777]">
                    <span>CANVAS: 240 FRAMES</span>
                    <button
                      onClick={() => setActiveStep((prev) => (prev + 1) % caseStudy.steps.length)}
                      className="text-white hover:text-[#FF5500] flex items-center gap-1 uppercase transition-colors"
                      style={{ '--hover-color': accentColor } as React.CSSProperties}
                    >
                      NEXT PHASE <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
