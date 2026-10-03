import React, { useState } from 'react';
import { ProjectItem } from '../config/portfolioConfig';
import { ArrowUpRight, Eye, Layers, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
  accentColor: string;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, accentColor }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Filter remaining projects 02, 03, 04
  const secondaryProjects = projects.filter((p) => p.id !== '90-upward');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 20;
    setParallaxOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  return (
    <section id="work" className="relative w-full py-24 md:py-36 bg-[#050505] text-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] uppercase mb-4">
            <span style={{ color: accentColor }}>SELECTED WORK</span>
            <span>/</span>
            <span>01 — PROJECTS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase font-display tracking-tight text-white leading-[0.95] mb-6">
            BUILDING EXPERIENCES,
            <br />
            <span className="text-[#888888]">NOT JUST WEBSITES.</span>
          </h2>

          <p className="text-sm md:text-base text-[#A0A0A0] max-w-xl font-sans leading-relaxed">
            Each project is approached not as static layout, but as an interactive visual story where AI generation, kinetic physics, and editorial typography coalesce.
          </p>
        </div>

        {/* PROJECTS GRID */}
        <div className="flex flex-col gap-24">
          {secondaryProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center pt-12 border-t border-white/[0.08]"
              >
                {/* Visual Preview Container */}
                <div
                  className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  onMouseMove={project.mediaType === 'parallax' ? handleMouseMove : undefined}
                  onMouseLeave={project.mediaType === 'parallax' ? handleMouseLeave : undefined}
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative aspect-[16/10] w-full bg-[#0a0a0c] border border-white/10 rounded-sm overflow-hidden group cursor-pointer shadow-2xl transition-all duration-300 hover:border-white/25"
                  >
                    {/* Visual Mockups by project type */}
                    {project.id === 'ai-website-experiences' && (
                      <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-[#0d0d11] to-[#050505]">
                        {/* Top faux browser chrome */}
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          </div>
                          <span className="text-[10px] font-mono text-[#666666]">
                            GEN-EXPERIENCE.STUDIO
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400">60 FPS</span>
                        </div>

                        {/* Interactive UI Simulation inside card */}
                        <div className="my-auto py-6 flex flex-col items-center text-center">
                          <span className="text-[10px] font-mono tracking-widest text-[#FF5500] uppercase mb-2" style={{ color: accentColor }}>
                            AI × WEB INTERACTION
                          </span>
                          <h4 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white group-hover:scale-105 transition-transform duration-500">
                            ADAPTIVE GENERATIVE UI
                          </h4>
                          <p className="text-xs text-[#888888] mt-2 max-w-sm">
                            Real-time canvas shaders responding directly to visitor dwell & cursor velocity.
                          </p>

                          {/* Interactive wave line */}
                          <div className="w-48 h-10 mt-6 relative flex items-center justify-center">
                            <div className="w-full h-[1px] bg-white/20" />
                            <div
                              className="absolute w-8 h-8 rounded-full border border-white/40 group-hover:scale-150 transition-all duration-300 flex items-center justify-center"
                              style={{ borderColor: accentColor }}
                            >
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                            </div>
                          </div>
                        </div>

                        {/* Bottom preview footer */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#777777] border-t border-white/[0.08] pt-4">
                          <span>INTERACTIVE VIEWPORT</span>
                          <span className="text-white flex items-center gap-1 group-hover:text-[#FF5500] transition-colors" style={{ color: accentColor }}>
                            CLICK TO EXPAND <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    )}

                    {project.id === 'cinematic-web' && (
                      <div className="relative w-full h-full overflow-hidden bg-[#070709] p-8 flex flex-col justify-between">
                        {/* Parallax layers simulation */}
                        <div
                          className="absolute inset-0 bg-gradient-to-tr from-[#14141a] via-[#09090c] to-[#040405] transition-transform duration-200"
                          style={{
                            transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`
                          }}
                        />

                        {/* Geometric depth planes */}
                        <div
                          className="absolute inset-x-8 top-12 bottom-12 border border-white/[0.06] transition-transform duration-300 pointer-events-none"
                          style={{
                            transform: `translate(${parallaxOffset.x * -0.8}px, ${parallaxOffset.y * -0.8}px)`
                          }}
                        />

                        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#888888]">
                          <span className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-[#FF5500]" style={{ color: accentColor }} />
                            <span>Z-PLANE DEPTH MATRIX</span>
                          </span>
                          <span>ANAMORPHIC 2.39:1</span>
                        </div>

                        <div
                          className="relative z-10 my-auto text-center transition-transform duration-300"
                          style={{
                            transform: `translate(${parallaxOffset.x * 1.2}px, ${parallaxOffset.y * 1.2}px)`
                          }}
                        >
                          <h4 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tighter">
                            CINEMATIC DEPTH
                          </h4>
                          <div className="mt-2 text-xs font-mono tracking-widest text-[#999999] uppercase">
                            ZERO-JANK COMPOSITOR PARALLAX
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#666666]">
                          <span>MOUSE TILT RESPONSIVE</span>
                          <span className="text-white flex items-center gap-1 group-hover:text-[#FF5500] transition-colors" style={{ color: accentColor }}>
                            INSPECT ARCHITECTURE <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    )}

                    {project.id === 'ai-creative-experiments' && (
                      <div className="relative w-full h-full p-8 flex flex-col justify-between bg-gradient-to-b from-[#111116] via-[#09090b] to-[#040405]">
                        <div className="flex items-center justify-between text-xs font-mono text-[#888888]">
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" style={{ color: accentColor }} />
                            <span>LATENT TRAJECTORIES</span>
                          </span>
                          <span>FLUX + LORAS</span>
                        </div>

                        {/* Visual gallery mini montage */}
                        <div className="grid grid-cols-3 gap-3 my-auto py-4">
                          {[
                            { title: 'Chiaroscuro Silhouette', note: 'Prompt 01' },
                            { title: 'Neural Cloth Physics', note: 'Prompt 02' },
                            { title: 'Kinetic Light Vector', note: 'Prompt 03' }
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="aspect-[4/5] bg-black/40 border border-white/10 p-3 flex flex-col justify-between group-hover:border-white/30 transition-all"
                            >
                              <span className="text-[9px] font-mono text-[#777777] uppercase">{item.note}</span>
                              <span className="text-[11px] font-display font-bold uppercase text-white leading-tight">
                                {item.title}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-[#666666]">
                          <span>GALLERY REEL</span>
                          <span className="text-white flex items-center gap-1 group-hover:text-[#FF5500] transition-colors" style={{ color: accentColor }}>
                            OPEN LIGHTBOX <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Hover Vignette Scrim */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Editorial Details Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col`}>
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] uppercase mb-2">
                    <span>PROJECT {project.number}</span>
                    <span>/</span>
                    <span style={{ color: accentColor }}>{project.category}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold uppercase font-display tracking-tight text-white mb-4">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>

                  {/* Accent Highlight */}
                  {project.accentNote && (
                    <div className="p-3 bg-white/[0.03] border-l-2 mb-6" style={{ borderColor: accentColor }}>
                      <span className="text-xs font-mono tracking-wider text-white">
                        {project.accentNote}
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8 text-xs font-mono text-[#888888]">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="py-0.5">
                        {tag} {i < project.tags.length - 1 ? '·' : ''}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-white hover:text-[#FF5500] transition-colors pb-1 border-b border-white/20 hover:border-white"
                      style={{ '--hover-color': accentColor } as React.CSSProperties}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW PROJECT ARCHITECTURE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Project Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0c] border border-white/15 p-6 sm:p-10 rounded-sm shadow-2xl text-[#EAEAEA]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="absolute top-6 right-6 p-2 text-[#888888] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Content */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#777777] uppercase mb-2">
                <span>CASE BREAKDOWN</span>
                <span>·</span>
                <span style={{ color: accentColor }}>{selectedProject.category}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black uppercase font-display text-white mb-4">
                {selectedProject.title}
              </h2>

              <p className="text-base text-[#B0B0B0] leading-relaxed mb-8 max-w-2xl font-sans">
                {selectedProject.description}
              </p>

              {/* Stats Grid */}
              {selectedProject.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-white/[0.03] border border-white/10 mb-8">
                  {selectedProject.stats.map((s, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#666666] uppercase">{s.label}</span>
                      <span className="text-sm font-mono font-semibold text-white mt-1">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Visual Showcase Reel */}
              <div className="aspect-[16/9] w-full bg-black border border-white/10 rounded-sm overflow-hidden flex flex-col items-center justify-center p-8 text-center mb-8 relative">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4" style={{ borderColor: accentColor }}>
                  <Sparkles className="w-5 h-5 text-white" style={{ color: accentColor }} />
                </div>
                <h4 className="text-xl font-display font-bold text-white uppercase mb-2">
                  FULL INTERACTIVE DEMO ACTIVE
                </h4>
                <p className="text-xs text-[#888888] max-w-md">
                  All shaders, motion timelines, and AI generation assets are calibrated for high-retention cinematic web display.
                </p>
              </div>

              {/* Technologies & Close */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#777777]">
                  {selectedProject.tags.map((t, idx) => (
                    <span key={idx}>#{t}</span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 text-xs font-mono uppercase bg-white text-black font-semibold hover:bg-[#EAEAEA] transition-colors"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
