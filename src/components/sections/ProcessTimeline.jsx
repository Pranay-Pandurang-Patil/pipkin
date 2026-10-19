import React, { useState } from "react";
import { PROCESS_STAGES } from "../../data/processStages";
import { ASSETS } from "../../data/assets";
import {
  Pencil,
  Box,
  Palette,
  Activity,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { soundEngine } from "../../utils/audio";

const ICON_MAP = {
  Pencil,
  Box,
  Palette,
  Activity,
  Sparkles,
};

export default function ProcessTimeline() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = PROCESS_STAGES[activeStageIndex];

  const handleStageClick = (index) => {
    setActiveStageIndex(index);
    soundEngine.playChime(523.25 + index * 60, "sine", 0.2);
  };

  return (
    <section
      id="process"
      className="section-process"
      aria-labelledby="process-heading"
    >
      <div className="process-ambient-peach" />
      <div className="section-bg-image process-bg-image" />

      <div className="process-container">
        {/* Section Header */}
        <div className="process-header">
          <div className="process-tag">
            <Sparkles size={14} className="text-peach" />
            <span>04 — Studio Workflow</span>
          </div>

          <h2 id="process-heading" className="process-title">
            Process
          </h2>

          <p className="process-desc">
            From inspiration to final render — a peek behind the magic.
          </p>
        </div>

        {/* 5-Stage Timeline */}
        <div
          className="timeline-wrapper"
          role="tablist"
          aria-label="5 Stage Production Process"
        >
          {/* Connecting Track Line */}
          <div className="timeline-track">
            <div
              className="timeline-track-fill"
              style={{
                width: `${(activeStageIndex / (PROCESS_STAGES.length - 1)) * 100}%`,
              }}
            />
          </div>

          <div className="timeline-nodes">
            {PROCESS_STAGES.map((stage, idx) => {
              const IconComp = ICON_MAP[stage.icon] || Sparkles;
              const isActive = idx === activeStageIndex;
              const isPassed = idx < activeStageIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${stage.id}`}
                  onClick={() => handleStageClick(idx)}
                  className={`stage-node ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`}
                >
                  <div className="stage-icon-circle">
                    <IconComp size={18} />
                  </div>
                  <span className="stage-num">{stage.step}</span>
                  <span className="stage-label">{stage.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Workspace Content Grid */}
        <div
          className="studio-workspace-grid"
          id={`stage-panel-${activeStage.id}`}
          role="tabpanel"
        >
          {/* Left: Active Stage Story & Tech Specs */}
          <div className="stage-detail-card">
            <div className="detail-header">
              <span className="detail-step-badge">
                Stage {activeStage.step} of 05
              </span>
              <h3 className="detail-title">{activeStage.label} Phase</h3>
              <p className="detail-summary">{activeStage.summary}</p>
            </div>

            <p className="detail-description">{activeStage.description}</p>

            <div className="detail-tools-box">
              <span className="tools-heading">Software & Tools:</span>
              <div className="tools-tags">
                {activeStage.tools.map((t) => (
                  <span key={t} className="tool-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-deliverable">
              <CheckCircle2 size={16} className="text-emerald" />
              <span>
                <strong>Deliverable:</strong> {activeStage.deliverable}
              </span>
            </div>

            <div className="detail-quote">
              <span className="quote-mark">“</span>
              <em>{activeStage.stageQuote}</em>
            </div>
          </div>

          {/* Right: Studio Artwork Placeholder */}
          <div className="studio-artwork-card">
            <div className="artwork-bar">
              <span className="artwork-tab-active">
                Studio Desk • {activeStage.label}
              </span>
              <span className="artwork-status">Behind The Scenes</span>
            </div>

            <div className="artwork-media-container">
              <picture>
                <img
                  src={ASSETS.process}
                  alt={`Studio workflow view during ${activeStage.label} stage`}
                  className="studio-img"
                  loading="lazy"
                />
              </picture>
            </div>

            <div className="artwork-caption">
              <p>
                Blender 3D workspace, topology mesh curves, and artist palette
                swatches.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .section-process {
          position: relative;
          background: #fdf0ea;
          color: #2c2533;
          padding: 6.5rem 3rem;
          overflow: hidden;
        }
          .process-bg-image {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(
      rgba(253, 240, 234, 0.45),
      rgba(253, 240, 234, 0.65)
    ),
    url('/assets/process-bg.png') center / cover no-repeat;
}

        .process-ambient-peach {
          position: absolute;
          top: 0;
          right: 0;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(254, 215, 170, 0.35) 0%, rgba(253, 240, 234, 0) 70%);
          pointer-events: none;
        }

        .process-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .process-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .process-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          border-radius: var(--border-radius-pill);
          background: #ffedd5;
          border: 1px solid #fed7aa;
          color: #c2410c;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          width: fit-content;
        }

        .text-peach {
          color: #ea580c;
        }

        .process-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4vw, 3.4rem);
          font-weight: 800;
          color: #1e1b4b;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .process-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #6c5a53;
          max-width: 620px;
        }

        /* Timeline Navigation */
        .timeline-wrapper {
          position: relative;
          width: 100%;
          padding: 1.5rem 0.5rem;
        }

        .timeline-track {
          position: absolute;
          top: 40px;
          left: 5%;
          right: 5%;
          height: 3px;
          background: #fed7aa;
          z-index: 1;
        }

        .timeline-track-fill {
          height: 100%;
          background: linear-gradient(to right, #f97316, #ec4899);
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .timeline-nodes {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stage-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: transform 0.25s ease;
          background: transparent;
          border: none;
        }

        .stage-node:hover {
          transform: translateY(-3px);
        }

        .stage-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #fed7aa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9a3412;
          box-shadow: 0 4px 14px rgba(154, 52, 18, 0.08);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .stage-node.is-active .stage-icon-circle {
          background: #f97316;
          border-color: #ea580c;
          color: #ffffff;
          transform: scale(1.18);
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
        }

        .stage-node.is-passed .stage-icon-circle {
          border-color: #f97316;
          color: #f97316;
        }

        .stage-num {
          font-family: var(--font-hand);
          font-size: 1.1rem;
          color: #9a3412;
          line-height: 1;
        }

        .stage-label {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #57463f;
          transition: color 0.2s;
        }

        .stage-node.is-active .stage-label {
          color: #c2410c;
        }

        /* Workspace Grid */
        .studio-workspace-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .studio-workspace-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .stage-detail-card {
          background: #ffffff;
          border-radius: var(--border-radius-lg);
          padding: 2rem;
          border: 1px solid #fed7aa;
          box-shadow: 0 10px 30px rgba(154, 52, 18, 0.06);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .detail-step-badge {
          font-size: 0.76rem;
          font-weight: 700;
          color: #ea580c;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e1b4b;
          margin-top: 0.2rem;
        }

        .detail-summary {
          font-size: 0.95rem;
          color: #7c2d12;
          font-weight: 500;
        }

        .detail-description {
          font-size: 0.92rem;
          line-height: 1.65;
          color: #57463f;
        }

        .detail-tools-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tools-heading {
          font-size: 0.8rem;
          font-weight: 700;
          color: #2c2533;
        }

        .tools-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tool-tag {
          font-size: 0.78rem;
          background: #ffedd5;
          color: #9a3412;
          padding: 0.25rem 0.65rem;
          border-radius: var(--border-radius-pill);
          font-weight: 600;
        }

        .detail-deliverable {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: #1e293b;
          background: #f0fdf4;
          padding: 0.65rem 0.9rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid #bbf7d0;
        }

        .text-emerald {
          color: #16a34a;
          flex-shrink: 0;
        }

        .detail-quote {
          display: flex;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: #9a3412;
          border-left: 3px solid #f97316;
          padding-left: 0.75rem;
          margin-top: 0.5rem;
        }

        .quote-mark {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          line-height: 0.8;
          color: #f97316;
        }

        /* Studio Artwork Placeholder Right Card */
        .studio-artwork-card {
          background: #ffffff;
          border-radius: var(--border-radius-lg);
          border: 1px solid #fed7aa;
          box-shadow: 0 10px 30px rgba(154, 52, 18, 0.06);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .artwork-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1.25rem;
          background: #ffedd5;
          border-bottom: 1px solid #fed7aa;
          font-size: 0.8rem;
          font-weight: 600;
          color: #7c2d12;
        }

        .artwork-status {
          font-size: 0.72rem;
          background: #fff;
          padding: 0.2rem 0.6rem;
          border-radius: var(--border-radius-pill);
          color: #ea580c;
        }

        .artwork-media-container {
          position: relative;
          width: 100%;
          height: 280px;
          background: #fff7ed;
          overflow: hidden;
        }

        .studio-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .artwork-caption {
          padding: 1rem 1.25rem;
          font-size: 0.82rem;
          color: #6c5a53;
          line-height: 1.5;
          border-top: 1px solid #fed7aa;
        }

        @media (max-width: 768px) {
          .section-process {
            padding: 4.5rem 1.5rem;
          }
          .timeline-track {
            display: none;
          }
          .timeline-nodes {
            flex-wrap: wrap;
            gap: 1.25rem;
            justify-content: center;
          }
          .stage-icon-circle {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </section>
  );
}
