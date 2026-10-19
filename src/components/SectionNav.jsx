import React from 'react';
import { SITE_CONFIG } from '../data/config';
import { soundEngine } from '../utils/audio';

export default function SectionNav({ activeSection = 'wonder', onSectionClick }) {
  // Navigation rail items (excluding hero)
  const railItems = SITE_CONFIG.sections.filter((s) => s.id !== 'hero');

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    soundEngine.playChime(523.25, 'sine', 0.15);
    if (onSectionClick) {
      onSectionClick(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <aside className="section-nav-rail" aria-label="Section Navigation Rail">
      <div className="rail-track">
        {/* Vertical Connecting Line */}
        <div className="rail-line" />

        <ul className="rail-list">
          {railItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="rail-item">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`rail-link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="rail-dot" />
                  <span className="rail-text">{item.railLabel}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`
        .section-nav-rail {
          position: fixed;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 40;
          display: none;
        }

        .rail-track {
          position: relative;
          padding: 0.5rem 0;
        }

        .rail-line {
          position: absolute;
          left: 10px;
          top: 14px;
          bottom: 14px;
          width: 2px;
          background: linear-gradient(
            to bottom,
            rgba(244, 114, 182, 0.2),
            rgba(192, 132, 252, 0.4),
            rgba(244, 114, 182, 0.2)
          );
          z-index: 1;
        }

        .rail-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .rail-item {
          display: flex;
          align-items: center;
        }

        .rail-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.35rem 0.6rem;
          border-radius: var(--border-radius-pill);
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 2px 10px rgba(70, 40, 80, 0.05);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .rail-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #d1b8dc;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .rail-text {
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #6b5b75;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .rail-link:hover {
          background: #ffffff;
          transform: translateX(-4px);
          box-shadow: 0 4px 14px rgba(244, 114, 182, 0.25);
        }

        .rail-link:hover .rail-dot {
          background: #f472b6;
          transform: scale(1.3);
        }

        .rail-link:hover .rail-text {
          color: #be185d;
        }

        .rail-link.is-active {
          background: #ffffff;
          border-color: #fbcfe8;
          transform: translateX(-6px);
          box-shadow: 0 4px 18px rgba(244, 114, 182, 0.35);
        }

        .rail-link.is-active .rail-dot {
          background: #e11d48;
          transform: scale(1.4);
          box-shadow: 0 0 10px rgba(225, 29, 72, 0.6);
        }

        .rail-link.is-active .rail-text {
          color: #881337;
          font-weight: 700;
        }

        @media (min-width: 1024px) {
          .section-nav-rail {
            display: block;
          }
        }
      `}</style>
    </aside>
  );
}
