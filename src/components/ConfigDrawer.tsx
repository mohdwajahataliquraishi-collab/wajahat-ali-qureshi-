import React from 'react';
import { PortfolioConfig, initialPortfolioConfig } from '../config/portfolioConfig';
import { RotateCcw, X, Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onUpdateConfig: (newConfig: PortfolioConfig) => void;
}

export const ConfigDrawer: React.FC<ConfigDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig
}) => {
  const accentColors = [
    { name: 'Orange (Default)', color: '#FF5500' },
    { name: 'Amber Gold', color: '#F59E0B' },
    { name: 'Crimson Red', color: '#E11D48' },
    { name: 'Electric Cobalt', color: '#2563EB' },
    { name: 'Emerald Flux', color: '#10B981' },
    { name: 'Pure White', color: '#FFFFFF' }
  ];

  const handleReset = () => {
    onUpdateConfig(initialPortfolioConfig);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0a0a0c] border-l border-white/10 h-full overflow-y-auto text-[#EAEAEA] p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#777777] uppercase">
                    LIVE CONFIGURATION OBJECT
                  </div>
                  <h3 className="text-xl font-bold font-display uppercase text-white">
                    PORTFOLIO SETTINGS
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close configuration drawer"
                  className="p-2 text-[#888888] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Controls */}
              <div className="flex flex-col gap-6 text-xs font-mono">
                {/* Accent Color Palette */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] text-[#A0A0A0] uppercase mb-2">
                    <Palette className="w-3.5 h-3.5" style={{ color: config.brand.accentColor }} />
                    <span>Accent Color</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {accentColors.map((c) => (
                      <button
                        key={c.color}
                        onClick={() =>
                          onUpdateConfig({
                            ...config,
                            brand: {
                              ...config.brand,
                              accentColor: c.color,
                              accentGlow: `rgba(${
                                c.color === '#FF5500' ? '255, 85, 0' : '255, 255, 255'
                              }, 0.25)`
                            }
                          })
                        }
                        className={`flex items-center gap-2 p-2 border text-[10px] text-left transition-colors ${
                          config.brand.accentColor === c.color
                            ? 'border-white bg-white/10 text-white font-semibold'
                            : 'border-white/10 text-[#888888] hover:border-white/30'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: c.color }}
                        />
                        <span className="truncate">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Name */}
                <div>
                  <label className="block text-[11px] text-[#A0A0A0] uppercase mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={config.brand.name}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        brand: { ...config.brand, name: e.target.value }
                      })
                    }
                    className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-white"
                  />
                </div>

                {/* Hero Title */}
                <div>
                  <label className="block text-[11px] text-[#A0A0A0] uppercase mb-1">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={config.hero.title}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        hero: { ...config.hero, title: e.target.value }
                      })
                    }
                    className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-white"
                  />
                </div>

                {/* Brand Tagline */}
                <div>
                  <label className="block text-[11px] text-[#A0A0A0] uppercase mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={config.brand.tagline}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        brand: { ...config.brand, tagline: e.target.value }
                      })
                    }
                    className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-white"
                  />
                </div>

                {/* Introduction / About Paragraph */}
                <div>
                  <label className="block text-[11px] text-[#A0A0A0] uppercase mb-1">
                    Introduction Statement
                  </label>
                  <textarea
                    rows={3}
                    value={config.about.leadParagraph}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        about: { ...config.about, leadParagraph: e.target.value }
                      })
                    }
                    className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-white resize-none"
                  />
                </div>

                {/* Featured Project 01 Title */}
                <div>
                  <label className="block text-[11px] text-[#A0A0A0] uppercase mb-1">
                    Project 01 Title
                  </label>
                  <input
                    type="text"
                    value={config.projects[0].title}
                    onChange={(e) => {
                      const updatedProjects = [...config.projects];
                      updatedProjects[0] = { ...updatedProjects[0], title: e.target.value };
                      onUpdateConfig({ ...config, projects: updatedProjects });
                    }}
                    className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-white"
                  />
                </div>

                {/* Featured Project 01 Description */}
                <div>
                  <label className="block text-[11px] text-[#A0A0A0] uppercase mb-1">
                    Project 01 Description
                  </label>
                  <textarea
                    rows={2}
                    value={config.projects[0].description}
                    onChange={(e) => {
                      const updatedProjects = [...config.projects];
                      updatedProjects[0] = { ...updatedProjects[0], description: e.target.value };
                      onUpdateConfig({ ...config, projects: updatedProjects });
                    }}
                    className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-white resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[#888888] hover:text-white border border-white/10 hover:border-white/30 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-mono font-bold text-xs uppercase hover:bg-[#EAEAEA] transition-colors"
              >
                Apply & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
