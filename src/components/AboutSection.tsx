import React from 'react';
import { PortfolioConfig } from '../config/portfolioConfig';

interface AboutSectionProps {
  config: PortfolioConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config }) => {
  const { about, brand } = config;

  return (
    <section id="about" className="relative w-full py-24 md:py-36 bg-[#050505] text-[#EAEAEA] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Heading and Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] uppercase mb-4">
              <span>05</span>
              <span>/</span>
              <span style={{ color: brand.accentColor }}>PHILOSOPHY</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase font-display tracking-tight text-white leading-[0.95] mb-8">
              {about.heading.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>

            {/* Large editorial paragraph */}
            <p className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed mb-6 font-display">
              "{about.leadParagraph}"
            </p>

            <p className="text-sm sm:text-base text-[#999999] leading-relaxed mb-10 font-sans max-w-xl">
              {about.secondaryParagraph}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full">
              {about.disciplines.map((d, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#666666] mb-1">
                    0{idx + 1}
                  </span>
                  <h4 className="text-sm font-display font-bold uppercase text-white mb-2">
                    {d.title}
                  </h4>
                  <p className="text-xs text-[#888888] leading-relaxed font-sans">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Cinematic Monolithic Portrait Visual */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full bg-[#0a0a0c] border border-white/10 rounded-sm overflow-hidden p-8 flex flex-col justify-between shadow-2xl group">
              {/* Subtle dark film noise */}
              <div className="absolute inset-0 cinematic-grain opacity-50 pointer-events-none" />

              {/* Minimal geometric light beam representing cinematic tech */}
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: brand.accentColor }}
              />

              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#666666]">
                <span>{brand.name}</span>
                <span style={{ color: brand.accentColor }}>STUDIO MONOGRAPH</span>
              </div>

              {/* Minimalist Graphic Monolith */}
              <div className="relative z-10 my-auto py-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
                  <div
                    className="w-12 h-12 rounded-full border border-dashed animate-spin"
                    style={{ borderColor: brand.accentColor, animationDuration: '16s' }}
                  />
                </div>
                <div className="text-2xl font-black font-display uppercase tracking-tight text-white">
                  CREATIVE TECHNOLOGIST
                </div>
                <div className="text-xs font-mono tracking-widest text-[#777777] uppercase mt-2">
                  AI × WEB × MOTION
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#555555] border-t border-white/[0.08] pt-4">
                <span>EST. 2026</span>
                <span>GLOBAL PRACTICE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
