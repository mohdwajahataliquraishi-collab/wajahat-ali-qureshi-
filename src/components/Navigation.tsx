import React, { useState, useEffect } from 'react';
import { Menu, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  brandName: string;
  accentColor: string;
  activeSection: string;
  onOpenConfig?: () => void;
  onOpenContact?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  brandName,
  accentColor,
  activeSection,
  onOpenConfig,
  onOpenContact
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'EXPERIMENTS', href: '#experiments', id: 'experiments' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.06] py-3.5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            className="text-base md:text-lg font-extrabold tracking-tight text-white hover:text-white/90 transition-colors uppercase font-display whitespace-nowrap shrink-0"
          >
            {brandName}
          </a>

          {/* Zone 2: 4 nav links with small orange active indicator */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-[#999999]">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative py-1 transition-colors hover:text-white whitespace-nowrap ${
                    isActive ? 'text-white font-medium' : 'text-[#888888]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px]"
                      style={{ backgroundColor: accentColor }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Live Config Toggle */}
            {onOpenConfig && (
              <button
                onClick={onOpenConfig}
                aria-label="Edit portfolio configuration"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono tracking-wider text-[#A0A0A0] hover:text-white border border-white/10 hover:border-white/20 rounded-sm transition-all whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3 h-3 text-[#FF5500]" style={{ color: accentColor }} />
                <span>CONFIG</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono tracking-wider text-black bg-white hover:bg-[#EAEAEA] active:scale-95 transition-all whitespace-nowrap uppercase font-semibold"
            >
              START A PROJECT
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-white/80 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#050505] flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6 text-left">
              <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase">
                NAVIGATION
              </span>
              {navLinks.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold uppercase text-white hover:text-[#FF5500] transition-colors flex items-center justify-between"
                  style={{ color: activeSection === item.id ? accentColor : undefined }}
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-[#555555]">0{index + 1}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-8 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact?.();
                }}
                className="w-full py-3.5 text-center text-xs font-mono font-semibold uppercase tracking-widest bg-white text-black hover:bg-[#EAEAEA]"
              >
                START A PROJECT
              </button>

              {onOpenConfig && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConfig();
                  }}
                  className="w-full py-2.5 text-center text-xs font-mono tracking-widest text-[#888888] border border-white/10 flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF5500]" style={{ color: accentColor }} />
                  <span>EDIT PORTFOLIO CONFIG</span>
                </button>
              )}

              <div className="text-[11px] font-mono text-[#555555] tracking-widest uppercase text-center pt-2">
                BASED IN INDIA · AVAILABLE WORLDWIDE
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
