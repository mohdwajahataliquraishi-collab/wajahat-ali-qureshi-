/**
 * Akbar Nocode — Premium Cinematic Creative-Technologist Portfolio
 * AI × WEB × MOTION
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialPortfolioConfig, PortfolioConfig } from './config/portfolioConfig';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProjectNinetyDegrees } from './components/ProjectNinetyDegrees';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { LabSection } from './components/LabSection';
import { ToolsSection } from './components/ToolsSection';
import { CaseStudySection } from './components/CaseStudySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConfigDrawer } from './components/ConfigDrawer';

export default function App() {
  const [config, setConfig] = useState<PortfolioConfig>(initialPortfolioConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Active section tracking via intersection observer
  useEffect(() => {
    const sectionIds = ['work', 'project-90-upward', 'capabilities', 'process', 'case-study', 'experiments', 'tools', 'about', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            if (id === 'project-90-upward' || id === 'capabilities' || id === 'case-study') {
              setActiveSection('work');
            } else {
              setActiveSection(id);
            }
            return;
          }
        }
      }

      if (window.scrollY < 400) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#EAEAEA] selection:bg-[#FF5500] selection:text-black font-sans">
      {/* Loading Sequence */}
      {isLoading && (
        <LoadingScreen
          brandName={config.brand.name}
          accentColor={config.brand.accentColor}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Persistent Subtle Cinematic Grain */}
      <div className="fixed inset-0 cinematic-grain pointer-events-none opacity-30 z-30" />

      {/* Top 3-Zone Navigation */}
      <Navigation
        brandName={config.brand.name}
        accentColor={config.brand.accentColor}
        activeSection={activeSection}
        onOpenConfig={() => setIsConfigDrawerOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      <main className="relative z-10 w-full overflow-x-hidden">
        {/* Fullscreen 240-Frame Scroll-Driven Cinematic Hero */}
        <HeroSection config={config} />

        {/* Project 01: 90° UPWARD (AI MOTION / IMAGE → VIDEO) with Biometric & Gaze Isolation */}
        <ProjectNinetyDegrees
          project={config.projects[0]}
          accentColor={config.brand.accentColor}
        />

        {/* Remaining Selected Works: AI Web Experiences, Cinematic Web, AI Creative Experiments */}
        <ProjectShowcase
          projects={config.projects}
          accentColor={config.brand.accentColor}
        />

        {/* Capabilities Editorial Grid: "WHAT I DO" */}
        <CapabilitiesSection
          capabilities={config.capabilities}
          accentColor={config.brand.accentColor}
        />

        {/* Process Section: "FROM IDEA TO EXPERIENCE." */}
        <ProcessSection
          process={config.process}
          accentColor={config.brand.accentColor}
        />

        {/* Featured Case Study: 90° Upward 6-Step Deep Dive */}
        <CaseStudySection
          caseStudy={config.caseStudy}
          accentColor={config.brand.accentColor}
        />

        {/* The Lab: Experiments, Ideas & Things I'm Building */}
        <LabSection
          lab={config.lab}
          accentColor={config.brand.accentColor}
        />

        {/* Tools I Explore */}
        <ToolsSection
          tools={config.tools}
          accentColor={config.brand.accentColor}
        />

        {/* About: "I BUILD AT THE INTERSECTION OF AI, DESIGN & CODE." */}
        <AboutSection config={config} />

        {/* Dramatic Contact Call to Action */}
        <ContactSection
          config={config}
          isOpenModal={isContactModalOpen}
          onOpenModal={() => setIsContactModalOpen(true)}
          onCloseModal={() => setIsContactModalOpen(false)}
        />
      </main>

      {/* Minimal Black Footer */}
      <Footer config={config} />

      {/* Live Configuration Drawer for instant customizations */}
      <ConfigDrawer
        isOpen={isConfigDrawerOpen}
        onClose={() => setIsConfigDrawerOpen(false)}
        config={config}
        onUpdateConfig={setConfig}
      />
    </div>
  );
}
