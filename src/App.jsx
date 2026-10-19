import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionNav from './components/SectionNav';
import BuiltWithWonder from './components/sections/BuiltWithWonder';
import MeetPipkin from './components/sections/MeetPipkin';
import ProjectGallery from './components/sections/ProjectGallery';
import ProcessTimeline from './components/sections/ProcessTimeline';
import PlayTogether from './components/sections/PlayTogether';
import ContactFooter from './components/sections/ContactFooter';

import ProjectModal from './components/modals/ProjectModal';
import ShowreelModal from './components/modals/ShowreelModal';
import ContactModal from './components/modals/ContactModal';

import './styles/variables.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // IntersectionObserver to observe visible section for SectionNav and Navbar
  useEffect(() => {
    const sectionIds = ['hero', 'build', 'wonder', 'meet', 'work', 'process', 'play', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id === 'wonder' ? 'build' : id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-15% 0px -35% 0px',
        threshold: 0.12
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleExplore = () => {
    const el = document.getElementById('build') || document.getElementById('wonder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSectionClick = (sectionId) => {
    const el = document.getElementById(sectionId) || (sectionId === 'build' ? document.getElementById('wonder') : null);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-root">
      {/* Top Floating Glass Navbar */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        activeSection={activeSection}
      />

      {/* Desktop Fixed Section Navigation Rail */}
      <SectionNav
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      {/* Main Full-Width Sequential Layout */}
      <div className="fullwidth-page-container">
        {/* Home Page: Full-Width Cinematic Fantasy Hero */}
        <section id="hero" className="home-hero-wrapper" aria-label="Home Landing Page">
          <Hero
            onOpenShowreel={() => setIsShowreelOpen(true)}
            onExplore={handleExplore}
          />
        </section>

        {/* Build Page: Horizontally Full 100% Screen Width */}
        <BuiltWithWonder />

        {/* Section 02: Meet Pipkin */}
        <MeetPipkin />

        {/* Section 03: My Work */}
        <ProjectGallery onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 04: Process */}
        <ProcessTimeline />

        {/* Section 05: Play Together */}
        <PlayTogether />

        {/* Section 06: Let's Create Together (Footer) */}
        <ContactFooter onOpenContact={() => setIsContactOpen(true)} />
      </div>

      {/* Modals */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {isShowreelOpen && (
        <ShowreelModal onClose={() => setIsShowreelOpen(false)} />
      )}

      {isContactOpen && (
        <ContactModal onClose={() => setIsContactOpen(false)} />
      )}

      <style>{`
        .app-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: var(--bg-primary);
          overflow-x: hidden;
        }

        .fullwidth-page-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .home-hero-wrapper {
          width: 100%;
          min-height: 100vh;
          position: relative;
          display: flex;
        }
      `}</style>
    </div>
  );
}
