import React, { useState } from 'react';
import { LabExperiment } from '../config/portfolioConfig';
import { Play, Sparkles, Terminal, Volume2 } from 'lucide-react';

interface LabSectionProps {
  lab: {
    title: string;
    subtitle: string;
    experiments: LabExperiment[];
  };
  accentColor: string;
}

export const LabSection: React.FC<LabSectionProps> = ({ lab, accentColor }) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [activeToyId, setActiveToyId] = useState<string | null>(null);

  const categories = ['ALL', 'Kinetic AI', 'Shader Tech', 'Spatial UI', 'Aspect Study', 'Generative'];

  const filteredExperiments =
    activeFilter === 'ALL'
      ? lab.experiments
      : lab.experiments.filter((exp) => exp.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="experiments" className="relative w-full py-24 md:py-36 bg-[#050505] text-[#EAEAEA] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] uppercase mb-3">
              <span>04</span>
              <span>/</span>
              <span style={{ color: accentColor }}>RESEARCH & LAB</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight text-white leading-none">
              {lab.title}
            </h2>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-mono text-[#888888] tracking-widest uppercase">
              {lab.subtitle}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-white/[0.06]">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors ${
                  isSelected
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#888888] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* MASONRY-STYLE VISUAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiments.map((exp, idx) => {
            const isToyActive = activeToyId === exp.id;
            return (
              <div
                key={exp.id}
                className="group relative bg-[#09090c] border border-white/[0.08] hover:border-white/20 p-6 flex flex-col justify-between rounded-sm transition-all duration-300 hover:shadow-xl"
              >
                {/* Top Card Row */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#666666] mb-4">
                    <span className="text-[10px] uppercase tracking-wider text-[#A0A0A0]">
                      {exp.category} · {exp.year}
                    </span>
                    <span className="tabular-nums font-mono text-[#777777]">
                      LAB // 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase font-display text-white mb-2 group-hover:text-[#FF5500] transition-colors" style={{ '--hover-color': accentColor } as React.CSSProperties}>
                    {exp.title}
                  </h3>

                  <p className="text-xs text-[#999999] leading-relaxed font-sans mb-6">
                    {exp.description}
                  </p>
                </div>

                {/* Interactive Toy Preview Box */}
                <div className="aspect-[16/9] w-full bg-black/60 border border-white/[0.06] rounded-sm relative overflow-hidden mb-6 flex items-center justify-center p-4">
                  {exp.interactiveType === 'head-vector' && (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 rounded-full border border-dashed border-white/40 flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      </div>
                      <span className="text-[10px] font-mono text-[#888888] mt-2">90° VECTOR LOCK</span>
                    </div>
                  )}

                  {exp.interactiveType === 'shader' && (
                    <div className="relative w-full h-full flex items-center justify-center cinematic-grain">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF5500]/20 to-transparent blur-md animate-pulse" />
                      <span className="text-[10px] font-mono text-white/80 z-10">GLSL LATENT NOISE</span>
                    </div>
                  )}

                  {exp.interactiveType === 'aspect-ratio' && (
                    <div className="w-full flex flex-col items-center gap-1">
                      <div className="w-3/4 h-8 border border-white/30 flex items-center justify-center text-[9px] font-mono text-[#888888]">
                        2.39:1 ANAMORPHIC
                      </div>
                      <div className="w-1/2 h-6 border border-dashed border-white/20 flex items-center justify-center text-[8px] font-mono text-[#666666]">
                        16:9
                      </div>
                    </div>
                  )}

                  {exp.interactiveType === 'audio-reactive' && (
                    <div className="flex items-center gap-1 h-8">
                      {[12, 28, 16, 32, 20, 10, 24].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-[#FF5500] rounded-sm transition-all duration-300"
                          style={{
                            height: isToyActive ? `${(h * 1.5) % 32 + 6}px` : `${h}px`,
                            backgroundColor: accentColor
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {exp.interactiveType === 'canvas-flow' && (
                    <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
                      <Sparkles className="w-4 h-4 text-[#FF5500]" style={{ color: accentColor }} />
                      <span>PARTICLE DENSITY 1.2K</span>
                    </div>
                  )}

                  {exp.interactiveType === 'parallax-depth' && (
                    <div className="relative w-24 h-12 flex items-center justify-center">
                      <div className="absolute inset-0 border border-white/20 transform -rotate-6" />
                      <div className="absolute inset-0 border border-white/40 transform rotate-3" />
                      <span className="text-[9px] font-mono text-white relative z-10">Z-STACK</span>
                    </div>
                  )}

                  {/* Play trigger button */}
                  <button
                    onClick={() => setActiveToyId(isToyActive ? null : exp.id)}
                    aria-label={`Toggle simulation for ${exp.title}`}
                    className="absolute bottom-2 right-2 p-1.5 bg-white/10 hover:bg-white text-white hover:text-black rounded-sm transition-colors text-[9px] font-mono flex items-center gap-1"
                  >
                    {isToyActive ? 'ACTIVE' : <Play className="w-2.5 h-2.5" />}
                  </button>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-[10px] font-mono text-[#777777]">
                  <span className="text-white">{exp.metrics}</span>
                  <div className="flex gap-1.5">
                    {exp.tags.slice(0, 2).map((t, i) => (
                      <span key={i}>#{t}</span>
                    ))}
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
