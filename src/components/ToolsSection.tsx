import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

interface ToolsSectionProps {
  tools: {
    category: string;
    items: string[];
  }[];
  accentColor: string;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ tools, accentColor }) => {
  const [activeCategory, setActiveCategory] = useState(tools[0]?.category || 'AI');

  return (
    <section id="tools" className="relative w-full py-20 md:py-28 bg-[#050505] text-[#EAEAEA] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] uppercase mb-3">
              <Cpu className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>STACK MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight text-white leading-none">
              TOOLS I EXPLORE
            </h2>
          </div>

          <div className="text-xs font-mono text-[#777777] uppercase tracking-wider">
            CATEGORIES: AI · WEB · MOTION · DESIGN · DEVELOPMENT
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/[0.06] pb-4">
          {tools.map((t) => {
            const isSelected = activeCategory === t.category;
            return (
              <button
                key={t.category}
                onClick={() => setActiveCategory(t.category)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  isSelected
                    ? 'border-b-2 border-[#FF5500] text-white font-semibold'
                    : 'text-[#777777] hover:text-[#CCCCCC]'
                }`}
                style={{ borderColor: isSelected ? accentColor : 'transparent' }}
              >
                {t.category}
              </button>
            );
          })}
        </div>

        {/* Selected Category Items */}
        {(() => {
          const current = tools.find((t) => t.category === activeCategory) || tools[0];
          return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {current.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#09090c] border border-white/[0.08] hover:border-white/20 transition-all rounded-sm flex flex-col justify-between min-h-[110px]"
                >
                  <span className="text-[10px] font-mono text-[#555555]">
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-display font-bold uppercase text-white tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </section>
  );
};
