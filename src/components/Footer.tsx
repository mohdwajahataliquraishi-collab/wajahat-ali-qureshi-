import React from 'react';
import { PortfolioConfig } from '../config/portfolioConfig';

interface FooterProps {
  config: PortfolioConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const { brand, socialLinks } = config;

  return (
    <footer className="relative w-full bg-[#050505] text-[#EAEAEA] border-t border-white/[0.08] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Left: Brand Name */}
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
              {brand.name}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase mt-1">
              {brand.label}
            </span>
          </div>

          {/* Center: Positioning */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#888888] uppercase">
            <span>AI</span>
            <span style={{ color: brand.accentColor }}>×</span>
            <span>WEB</span>
            <span style={{ color: brand.accentColor }}>×</span>
            <span>MOTION</span>
          </div>

          {/* Right: Minimal Text Links for Socials */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#888888]">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Epilogue */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#555555]">
          <div>
            © 2026 {brand.name}. All visual sequences and interactive systems reserved.
          </div>

          <div className="flex items-center gap-2 text-[#777777]">
            <span style={{ color: brand.accentColor }}>●</span>
            <span className="uppercase tracking-wider">TURNING IDEAS INTO EXPERIENCES.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
