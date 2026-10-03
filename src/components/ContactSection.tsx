import React, { useState } from 'react';
import { PortfolioConfig } from '../config/portfolioConfig';
import { ArrowUpRight, Check, Copy, Mail, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactSectionProps {
  config: PortfolioConfig;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  onOpenModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  config,
  isOpenModal = false,
  onCloseModal,
  onOpenModal
}) => {
  const { contact, brand } = config;
  const [copied, setCopied] = useState(false);
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'AI Motion / Video',
    details: ''
  });

  const showModal = isOpenModal || internalModalOpen;
  const closeModal = () => {
    setInternalModalOpen(false);
    onCloseModal?.();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      closeModal();
    }, 2000);
  };

  return (
    <>
      <section id="contact" className="relative w-full py-28 md:py-44 bg-[#050505] text-[#EAEAEA] border-t border-white/[0.08] overflow-hidden">
        {/* Subtle orange ambient glow in background */}
        <div
          className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{ backgroundColor: brand.accentColor }}
        />

        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 flex flex-col items-center">
          {/* Small Label */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#737373] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brand.accentColor }} />
            <span>{contact.label}</span>
          </div>

          {/* Large Dramatic Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase font-display tracking-tight text-white leading-[0.92] mb-8">
            YOUR NEXT IDEA
            <br />
            <span className="text-[#888888]">COULD BE AN EXPERIENCE.</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-[#A0A0A0] max-w-xl mx-auto leading-relaxed mb-12 font-sans">
            {contact.subtext}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              onClick={() => {
                if (onOpenModal) onOpenModal();
                else setInternalModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-mono font-bold text-xs tracking-widest uppercase hover:bg-[#EAEAEA] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>{contact.primaryCta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>EMAIL COPIED!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-[#FF5500]" style={{ color: brand.accentColor }} />
                  <span>{contact.secondaryCta}</span>
                </>
              )}
            </button>
          </div>

          {/* Availability Status */}
          <div className="mt-16 text-[10px] font-mono tracking-widest text-[#555555] uppercase">
            {contact.availability}
          </div>
        </div>
      </section>

      {/* Interactive Project Inquiry Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0c] border border-white/15 p-6 sm:p-8 rounded-sm shadow-2xl text-[#EAEAEA]"
            >
              <button
                onClick={closeModal}
                aria-label="Close project modal"
                className="absolute top-6 right-6 p-2 text-[#777777] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-[10px] font-mono text-[#777777] uppercase tracking-widest mb-2">
                PROJECT COMMISSION
              </div>

              <h3 className="text-2xl font-bold font-display uppercase text-white mb-2">
                LET'S BUILD AN EXPERIENCE
              </h3>

              <p className="text-xs text-[#888888] mb-6">
                Tell me about your concept, timeline, and visual ambitions.
              </p>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Check className="w-10 h-10 text-emerald-400 mb-3" />
                  <h4 className="text-lg font-display uppercase font-bold text-white mb-1">
                    TRANSMISSION RECEIVED
                  </h4>
                  <p className="text-xs text-[#888888]">
                    I'll respond within 24 hours to schedule an initial discovery call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-[#888888] uppercase mb-1">
                      Your Name / Studio
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#888888] uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@studio.com"
                      className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#888888] uppercase mb-1">
                      Primary Discipline
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-white"
                    >
                      <option value="AI Motion / Video">AI Motion / Image-to-Video</option>
                      <option value="Interactive Website">Interactive Website / 3D Web</option>
                      <option value="Cinematic Parallax">Cinematic Parallax Experience</option>
                      <option value="Creative Direction">Full Creative Direction & Production</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#888888] uppercase mb-1">
                      Brief Concept Overview
                    </label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Describe the aesthetic, audience, and key deliverables..."
                      className="w-full bg-[#121215] border border-white/10 px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#EAEAEA] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>SEND BRIEF</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
