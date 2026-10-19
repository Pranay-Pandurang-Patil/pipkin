import React, { useEffect } from 'react';
import { X, ExternalLink, Cpu, Layers, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundEngine.playChime(440, 'sine', 0.15);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={() => {
        soundEngine.playChime(440, 'sine', 0.15);
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playChime(440, 'sine', 0.15);
            onClose();
          }}
          className="modal-close-btn"
          aria-label="Close project modal"
        >
          <X size={20} />
        </button>

        {/* Modal Media Banner */}
        <div className="modal-media-header">
          <picture>
            <source srcSet={project.imageFallback} type="image/webp" />
            <img
              src={project.image}
              alt={project.title}
              className="modal-banner-img"
            />
          </picture>
          <div className="modal-banner-gradient" />
          <span className="modal-category-pill">{project.category}</span>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-title-area">
            <h3 id="modal-project-title" className="modal-project-title">
              {project.title} — {project.subtitle}
            </h3>
            <div className="modal-tags-row">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag-pill">{tag}</span>
              ))}
            </div>
          </div>

          <p className="modal-full-desc">{project.fullDescription}</p>

          {/* Key Highlights */}
          <div className="modal-section-block">
            <h4 className="modal-section-title">
              <Sparkles size={16} className="text-pink" />
              <span>Key Innovations & Artistry</span>
            </h4>
            <ul className="modal-highlights-list">
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Software Used */}
          <div className="modal-section-block">
            <h4 className="modal-section-title">
              <Layers size={16} className="text-purple" />
              <span>Pipeline & Software</span>
            </h4>
            <div className="software-pills">
              {project.software.map((sw) => (
                <span key={sw} className="software-badge">{sw}</span>
              ))}
            </div>
          </div>

          {/* Production Stats */}
          {project.stats && (
            <div className="modal-stats-grid">
              {Object.entries(project.stats).map(([k, v]) => (
                <div key={k} className="stat-box">
                  <span className="stat-label">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="stat-val">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 10, 25, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: modalFadeIn 0.25s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-card {
          position: relative;
          background: #ffffff;
          border-radius: var(--border-radius-lg);
          max-width: 680px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes modalPop {
          from { transform: scale(0.92) translateY(12px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          color: #1e1b4b;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          border: 1px solid #fed7aa;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: #f472b6;
          color: #ffffff;
          transform: rotate(90deg);
        }

        .modal-media-header {
          position: relative;
          width: 100%;
          height: 280px;
          background: #1e1b4b;
          overflow: hidden;
        }

        .modal-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-banner-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20, 10, 30, 0.8) 0%, transparent 60%);
        }

        .modal-category-pill {
          position: absolute;
          bottom: 1.25rem;
          left: 1.5rem;
          background: rgba(255, 255, 255, 0.95);
          color: #4c1d95;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.35rem 0.9rem;
          border-radius: var(--border-radius-pill);
        }

        .modal-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          color: #2c2533;
        }

        .modal-project-title {
          font-family: var(--font-serif);
          font-size: 1.85rem;
          font-weight: 800;
          color: #1e1b4b;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .modal-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .project-tag-pill {
          font-size: 0.76rem;
          font-weight: 600;
          background: #f3e8ff;
          color: #6b21a8;
          padding: 0.25rem 0.65rem;
          border-radius: var(--border-radius-pill);
        }

        .modal-full-desc {
          font-size: 0.98rem;
          line-height: 1.7;
          color: #475569;
        }

        .modal-section-block {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .modal-section-title {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.92rem;
          font-weight: 700;
          color: #1e1b4b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .text-pink { color: #f472b6; }
        .text-purple { color: #a855f7; }

        .modal-highlights-list {
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.5;
        }

        .software-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .software-badge {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.35rem 0.8rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--border-radius-pill);
          color: #1e293b;
        }

        .modal-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
          background: #f8fafc;
          padding: 1.25rem;
          border-radius: var(--border-radius-md);
          border: 1px solid #e2e8f0;
        }

        @media (min-width: 500px) {
          .modal-stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-box {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .stat-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #64748b;
          font-weight: 600;
        }

        .stat-val {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f172a;
        }
      `}</style>
    </div>
  );
}
