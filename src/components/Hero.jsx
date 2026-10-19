import React from 'react';
import { ASSETS } from '../data/assets';
import { SITE_CONFIG } from '../data/config';
import HeroParticles from './canvas/HeroParticles';
import { Play, ArrowDown } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function Hero({ onOpenShowreel, onExplore }) {
  const handleExploreClick = () => {
    soundEngine.playChime(440, 'sine', 0.2);
    if (onExplore) {
      onExplore();
    } else {
      const buildSection = document.getElementById('build') || document.getElementById('wonder');
      if (buildSection) {
        buildSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleShowreelClick = () => {
    soundEngine.playChime(659.25, 'triangle', 0.3);
    if (onOpenShowreel) onOpenShowreel();
  };

  return (
    <section id="hero" className="hero-panel" aria-label="Hero Introduction">
      {/* Background Image Container */}
      <div className="hero-background-layer" />

      {/* Subtle Readability Gradient Overlay */}
      <div className="hero-gradient-overlay" />

      {/* Subtle Floating Stardust Canvas */}
      <HeroParticles />

      {/* Upper-Right Handwritten Annotation */}
      <aside className="hero-annotation" aria-hidden="true">
        <span className="annotation-text">{SITE_CONFIG.annotation}</span>
      </aside>

      {/* Hero Content Lower-Left */}
      <div className="hero-content">
        <div className="hero-text-block">
          <p className="hero-intro-line">{SITE_CONFIG.introLine}</p>
          <h1 className="hero-display-heading">{SITE_CONFIG.heroHeading}</h1>
          <p className="hero-supporting-text">{SITE_CONFIG.tagline}</p>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <button
              type="button"
              onClick={handleExploreClick}
              className="btn-primary-explore"
              aria-label="Explore My World"
            >
              <span>Explore My World</span>
              <ArrowDown size={16} className="btn-icon-bounce" />
            </button>

            <button
              type="button"
              onClick={handleShowreelClick}
              className="btn-secondary-showreel"
              aria-label="Watch Showreel"
            >
              <Play size={15} fill="currentColor" />
              <span>Watch Showreel ▷</span>
            </button>
          </div>
        </div>

        {/* Bottom-Left Scroll Indicator */}
        <div className="hero-scroll-indicator" onClick={handleExploreClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleExploreClick(); }}>
          <span className="scroll-indicator-text">{SITE_CONFIG.scrollPrompt}</span>
        </div>
      </div>

      <style>{`
        .hero-panel {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8rem 4rem 3rem 4rem;
          color: #ffffff;
        }

        .hero-background-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('${ASSETS.heroBg}'), url('${ASSETS.heroBgFallback}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
          transform: scale(1.01);
          transition: transform 12s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .hero-panel:hover .hero-background-layer {
          transform: scale(1.04);
        }

        /* Subtle layered gradient overlay for text readability without washing out landscape */
        .hero-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to top right,
            rgba(20, 10, 30, 0.8) 0%,
            rgba(25, 12, 38, 0.45) 40%,
            rgba(15, 8, 25, 0.15) 70%,
            rgba(0, 0, 0, 0) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        /* Handwritten annotation in upper-right */
        .hero-annotation {
          position: absolute;
          top: 5.5rem;
          right: 2rem;
          z-index: 10;
          transform: rotate(3deg);
          pointer-events: none;
        }

        .annotation-text {
          font-family: var(--font-hand);
          font-size: 1.45rem;
          color: #ffd8df;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6), 0 0 15px rgba(244, 114, 182, 0.4);
          letter-spacing: 0.02em;
          display: inline-block;
          animation: gentleFloat 4s ease-in-out infinite;
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(3deg);
          }
          50% {
            transform: translateY(-5px) rotate(1.5deg);
          }
        }

        /* Lower-Left Content Area */
        .hero-content {
          position: relative;
          z-index: 10;
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          max-width: 520px;
        }

        .hero-intro-line {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 500;
          color: #ffe4ea;
          letter-spacing: 0.04em;
          margin-bottom: 0.25rem;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .hero-display-heading {
          font-family: var(--font-serif);
          font-size: clamp(3.2rem, 5.5vw, 4.8rem);
          font-weight: 800;
          line-height: 1.05;
          color: #ffffff;
          margin-bottom: 0.9rem;
          text-shadow: 0 4px 20px rgba(45, 10, 30, 0.7), 0 0 35px rgba(244, 114, 182, 0.35);
          letter-spacing: -0.02em;
        }

        .hero-supporting-text {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          line-height: 1.6;
          color: #fce7f3;
          margin-bottom: 1.75rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
          font-weight: 400;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary-explore {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.6rem;
          border-radius: var(--border-radius-pill);
          background: linear-gradient(135deg, #f472b6, #e11d48);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          box-shadow: 0 4px 18px rgba(225, 29, 72, 0.4), 0 0 12px rgba(244, 114, 182, 0.3);
          transition: all 0.25s ease;
        }

        .btn-primary-explore:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(225, 29, 72, 0.55), 0 0 20px rgba(244, 114, 182, 0.5);
          background: linear-gradient(135deg, #fb7185, #f43f5e);
        }

        .btn-icon-bounce {
          animation: bounceDown 2s infinite ease-in-out;
        }

        @keyframes bounceDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }

        .btn-secondary-showreel {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.4rem;
          border-radius: var(--border-radius-pill);
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          font-size: 0.95rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.25s ease;
        }

        .btn-secondary-showreel:hover {
          background: rgba(255, 255, 255, 0.28);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }

        /* Bottom-Left Scroll Indicator */
        .hero-scroll-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          opacity: 0.85;
          transition: opacity 0.2s, transform 0.2s;
          width: fit-content;
        }

        .hero-scroll-indicator:hover {
          opacity: 1;
          transform: translateY(2px);
        }

        .scroll-indicator-text {
          font-size: 0.82rem;
          font-weight: 500;
          color: #fbcfe8;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .hero-panel {
            height: 92vh;
            min-height: 580px;
            padding: 5.5rem 1.5rem 2rem 1.5rem;
          }

          .hero-background-layer {
            background-position: center;
          }

          .hero-annotation {
            top: 4.8rem;
            right: 1.25rem;
          }

          .annotation-text {
            font-size: 1.2rem;
          }

          .hero-display-heading {
            font-size: 3.2rem;
          }
        }
      `}</style>
    </section>
  );
}
