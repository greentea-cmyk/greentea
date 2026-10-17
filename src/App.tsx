/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { LightboxModal } from './components/LightboxModal';
import { PrintConfiguratorModal } from './components/PrintConfiguratorModal';
import { ExhibitionsAndMonographs } from './components/ExhibitionsAndMonographs';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { PHOTOGRAPHY_PROJECTS, PhotoProject } from './data/photography';

export default function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [selectedLightboxProject, setSelectedLightboxProject] = useState<PhotoProject | null>(null);
  const [selectedPrintProject, setSelectedPrintProject] = useState<PhotoProject | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState('General Commission / Print Acquisition');
  const [activeSection, setActiveSection] = useState('projects');

  // Hero project is the flagship architectural work
  const heroProject = PHOTOGRAPHY_PROJECTS.find((p) => p.isHero) || PHOTOGRAPHY_PROJECTS[0];

  const handleOpenInquiry = (topic?: string) => {
    if (topic) setInquiryTopic(topic);
    setIsInquiryOpen(true);
  };

  const handleOpenPrintConfigurator = (project: PhotoProject) => {
    setSelectedPrintProject(project);
  };

  const handleSelectLightboxProject = (project: PhotoProject) => {
    setSelectedLightboxProject(project);
  };

  // Scroll spy to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'monographs', 'exhibitions', 'artist'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isLightMode
          ? 'bg-[#fafafa] text-neutral-900'
          : 'bg-[#09090b] text-[#f4f4f5]'
      }`}
    >
      {/* Navigation adhering to Top Bar Contract */}
      <Navbar
        onOpenInquiry={handleOpenInquiry}
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode((prev) => !prev)}
        activeSection={activeSection}
      />

      <main>
        {/* Split-Screen Hero with full-width credibility metrics below */}
        <HeroSection
          heroProject={heroProject}
          onSelectProject={handleSelectLightboxProject}
          onOpenInquiry={handleOpenInquiry}
          isLightMode={isLightMode}
        />

        {/* Selected Works Gallery with Bento & Technical Index viewports */}
        <ProjectsGallery
          projects={PHOTOGRAPHY_PROJECTS}
          onSelectProject={handleSelectLightboxProject}
          onOpenPrintConfigurator={handleOpenPrintConfigurator}
          isLightMode={isLightMode}
        />

        {/* Monograph Series, Institutional Exhibitions & The Camera Bag */}
        <ExhibitionsAndMonographs
          onOpenInquiry={handleOpenInquiry}
          isLightMode={isLightMode}
        />
      </main>

      {/* Editorial Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} isLightMode={isLightMode} />

      {/* Fullscreen Lightbox Modal with Keyboard Navigation & EXIF Inspector */}
      <LightboxModal
        project={selectedLightboxProject}
        projects={PHOTOGRAPHY_PROJECTS}
        onClose={() => setSelectedLightboxProject(null)}
        onNavigate={(newProj) => setSelectedLightboxProject(newProj)}
        onOpenPrintConfigurator={handleOpenPrintConfigurator}
        isLightMode={isLightMode}
      />

      {/* Limited Edition Print Acquisition & Framing Simulator */}
      <PrintConfiguratorModal
        project={selectedPrintProject}
        onClose={() => setSelectedPrintProject(null)}
        onOpenInquiry={handleOpenInquiry}
        isLightMode={isLightMode}
      />

      {/* Studio Commission & Inquiries Desk */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialTopic={inquiryTopic}
        isLightMode={isLightMode}
      />
    </div>
  );
}
