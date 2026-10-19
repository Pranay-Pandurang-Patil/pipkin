import React from "react";
import { PROJECTS_DATA } from "../../data/projects";
import { ArrowUpRight, Sparkles, FolderGit2 } from "lucide-react";
import { soundEngine } from "../../utils/audio";

export default function ProjectGallery({ onSelectProject }) {
  const handleCardClick = (project) => {
    soundEngine.playChime(783.99, "sine", 0.25);
    if (onSelectProject) onSelectProject(project);
  };

  return (
    <section id="work" className="section-work" aria-labelledby="work-heading">
      <div className="work-ambient-glow" />

      <div className="work-container">
        {/* Section Header */}
        <div className="work-header">
          <div className="work-tag">
            <Sparkles size={14} className="text-lavender" />
            <span>03 — Portfolio Showcase</span>
          </div>

          <h2 id="work-heading" className="work-title">
            My Work
          </h2>

          <p className="work-desc">
            A collection of 3D projects, animations and interactive experiences.
          </p>
        </div>

        {/* 3 Large Rounded Project Cards */}
        <div className="projects-grid">
          {PROJECTS_DATA.map((project, idx) => (
            <article
              key={project.id}
              className="project-card"
              onClick={() => handleCardClick(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${project.title}: ${project.subtitle}`}
            >
              {/* Artwork Media Area */}
              <div className="card-media-wrapper">
                <picture>
                  <source srcSet={project.imageFallback} type="image/webp" />
                  <img
                    src={project.image}
                    alt={`${project.title} artwork thumbnail`}
                    className="card-artwork-image"
                    loading="lazy"
                  />
                </picture>

                {/* Dark Subtle Bottom Gradient */}
                <div className="card-bottom-gradient" />

                {/* Floating Category Badge */}
                <span className="card-category-badge">{project.category}</span>
              </div>

              {/* Card Footer Content */}
              <div className="card-content-overlay">
                <div className="card-title-group">
                  <span className="card-index">0{idx + 1}</span>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-subtitle">{project.subtitle}</p>
                </div>

                {/* Circular Arrow Button */}
                <div className="circular-arrow-btn" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .section-work {
          position: relative;
          background:
  linear-gradient(
    rgba(237, 233, 246, 0.65),
    rgba(237, 233, 246, 0.75)
  ),
  url('/assets/play-bg.png') center / cover no-repeat;
          color: #2c2533;
          padding: 6.5rem 3rem;
          overflow: hidden;
        }

        .work-ambient-glow {
          position: absolute;
          top: 15%;
          left: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.18) 0%, rgba(237, 233, 246, 0) 70%);
          pointer-events: none;
        }

        .work-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .work-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .work-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          border-radius: var(--border-radius-pill);
          background: #e4ddf4;
          border: 1px solid #d4c8ed;
          color: #6b21a8;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          width: fit-content;
        }

        .text-lavender {
          color: #9333ea;
        }

        .work-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4vw, 3.4rem);
          font-weight: 800;
          color: #1e1b4b;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .work-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #554866;
          max-width: 620px;
        }

        /* 3 Project Cards Grid */
        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .project-card {
          position: relative;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 12px 32px rgba(80, 50, 110, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 48px rgba(80, 50, 110, 0.16);
        }

        .card-media-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
          background: #2e1065;
        }

        .card-artwork-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .project-card:hover .card-artwork-image {
          transform: scale(1.05);
        }

        /* Subtle Dark Bottom Gradient */
        .card-bottom-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 65%;
          background: linear-gradient(to top, rgba(15, 7, 28, 0.88) 0%, rgba(15, 7, 28, 0.35) 60%, rgba(0, 0, 0, 0) 100%);
          pointer-events: none;
        }

        .card-category-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          color: #4c1d95;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          border-radius: var(--border-radius-pill);
          letter-spacing: 0.02em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Content Overlay at bottom */
        .card-content-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.75rem 2rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          z-index: 5;
        }

        .card-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          color: #ffffff;
        }

        .card-index {
          font-family: var(--font-hand);
          font-size: 1.25rem;
          color: #fbcfe8;
          line-height: 1;
        }

        .card-title {
          font-family: var(--font-serif);
          font-size: 1.85rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .card-subtitle {
          font-size: 0.92rem;
          color: #e9d5ff;
          font-weight: 400;
        }

        /* Circular Arrow Button */
        .circular-arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          color: #4c1d95;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .project-card:hover .circular-arrow-btn {
          background: #f472b6;
          color: #ffffff;
          transform: scale(1.12) rotate(45deg);
          box-shadow: 0 8px 24px rgba(244, 114, 182, 0.45);
        }

        @media (max-width: 768px) {
          .section-work {
            padding: 4.5rem 1.5rem;
          }
          .card-media-wrapper {
            height: 240px;
          }
          .card-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
