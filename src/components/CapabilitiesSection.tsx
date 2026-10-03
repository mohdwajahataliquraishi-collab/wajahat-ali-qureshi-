import React from 'react';
import { CapabilityItem } from '../config/portfolioConfig';

interface CapabilitiesSectionProps {
  capabilities: CapabilityItem[];
  accentColor: string;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  capabilities,
  accentColor
}) => {
  return (
    <section id="capabilities" className="relative w-full py-24 md:py-36 bg-[#050505] text-[#EAEAEA] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] uppercase mb-3">
              <span>02</span>
              <span>/</span>
              <span style={{ color: accentColor }}>CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight text-white leading-none">
              WHAT I DO
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm font-mono text-[#888888] uppercase tracking-wider">
              A bespoke convergence of machine intelligence, kinetic art, and high-performance web engineering.
            </p>
          </div>
        </div>

        {/* EDITORIAL GRID (NOT ORDINARY SERVICE CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08]">
          {capabilities.map((item) => (
            <div
              key={item.number}
              className="group relative bg-[#050505] p-8 sm:p-10 flex flex-col justify-between min-h-[300px] hover:bg-[#09090b] transition-colors duration-300"
            >
              {/* Top Row: Index number & Accent dot */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-mono text-[#666666] group-hover:text-white transition-colors">
                  {item.number}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: accentColor }}
                />
              </div>

              {/* Title & Core Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase font-display text-white tracking-tight mb-4 group-hover:translate-x-1 transition-transform">
                  {item.title}
                </h3>
                <p className="text-sm text-[#999999] leading-relaxed font-sans mb-6">
                  {item.description}
                </p>
              </div>

              {/* Focus detail footnote */}
              <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#666666] group-hover:text-[#A0A0A0] transition-colors">
                {item.focus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
