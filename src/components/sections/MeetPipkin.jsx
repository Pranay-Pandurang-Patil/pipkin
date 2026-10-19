import React, { useState } from "react";
import { ASSETS } from "../../data/assets";
import {
  Sparkles,
  Palette,
  Heart,
  BookOpen,
  Star,
  Compass,
} from "lucide-react";
import { soundEngine } from "../../utils/audio";

export default function MeetPipkin() {
  const [activeBadge, setActiveBadge] = useState("curious");

  const personalityBadges = [
    {
      id: "curious",
      label: "Curious",
      icon: Compass,
      color: "#f97316",
      bg: "#ffedd5",
      border: "#fed7aa",
      quote: "Always peeking around corners to see what's blooming next!",
    },
    {
      id: "creative",
      label: "Creative",
      icon: Palette,
      color: "#ec4899",
      bg: "#fce7f3",
      border: "#fbcfe8",
      quote: "Weaving colors, 3D polygons, and cozy storybook charm.",
    },
    {
      id: "kind",
      label: "Kind",
      icon: Heart,
      color: "#e11d48",
      bg: "#ffe4e6",
      border: "#fecdd3",
      quote: "Sharing warm herbal tea and quiet words of encouragement.",
    },
    {
      id: "learning",
      label: "Always Learning",
      icon: BookOpen,
      color: "#8b5cf6",
      bg: "#f3e8ff",
      border: "#e9d5ff",
      quote:
        "Exploring new shader nodes, rigging tricks, and art styles every sunrise.",
    },
  ];

  const handleBadgeHover = (badge) => {
    setActiveBadge(badge.id);
  };

  const handleBadgeClick = (badge) => {
    setActiveBadge(badge.id);
    soundEngine.playChime(659.25, "sine", 0.2);
  };

  return (
    <section id="meet" className="section-meet" aria-labelledby="meet-heading">
      <div className="meet-ambient-blush" />
      <div className="section-bg-image meet-bg-image" />

      <div className="meet-container">
        {/* Left/Top Content */}
        <div className="meet-header">
          <div className="meet-tag">
            <Sparkles size={14} className="text-pink" />
            <span>02 — Character Bio</span>
          </div>

          <h2 id="meet-heading" className="meet-title">
            Meet Pipkin
          </h2>

          <p className="meet-desc">
            A curious little pony who loves creativity, cozy moments and
            bringing ideas to life.
          </p>

          {/* 4 Personality Badges */}
          <div
            className="badges-list"
            role="list"
            aria-label="Personality Traits"
          >
            {personalityBadges.map((badge) => {
              const IconComp = badge.icon;
              const isSelected = activeBadge === badge.id;
              return (
                <button
                  key={badge.id}
                  type="button"
                  onMouseEnter={() => handleBadgeHover(badge)}
                  onClick={() => handleBadgeClick(badge)}
                  className={`personality-badge ${isSelected ? "is-selected" : ""}`}
                  style={{
                    backgroundColor: badge.bg,
                    borderColor: badge.border,
                    color: badge.color,
                  }}
                  aria-pressed={isSelected}
                >
                  <IconComp size={16} />
                  <span className="badge-label">{badge.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Badge Quote Card */}
          <div className="badge-quote-card">
            <span className="quote-icon">“</span>
            <p className="quote-text">
              {personalityBadges.find((b) => b.id === activeBadge)?.quote}
            </p>
          </div>
        </div>

        {/* Character Image Area */}
        <div className="character-art-frame">
          <div className="character-art-glow" />

          {/* Character Image Asset with Fallback handling */}
          <picture className="character-picture">
            <source srcSet={ASSETS.meetWebp} type="image/webp" />
            <img
              src={ASSETS.meet}
              alt="Pipkin, an enchanting whimsical 3D character pony adorned with flower garland"
              className="character-img"
              loading="lazy"
            />
          </picture>

          {/* Floating Details Ribbon */}
          <div className="character-stamp">
            <span className="stamp-icon">✿</span>
            <div className="stamp-text">
              <strong>Pipkin the Wonder Pony</strong>
              <span>Whispering Meadow Native</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .section-meet {
          position: relative;
          background: #fdf7f4;
          color: #2c2533;
          padding: 6.5rem 3rem;
          overflow: hidden;
        }
          .meet-bg-image {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(
      rgba(253, 247, 244, 0.45),
      rgba(253, 247, 244, 0.65)
    ),
    url('/assets/meet-bg.png') center / cover no-repeat;
}

        .meet-ambient-blush {
          position: absolute;
          top: -10%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, rgba(253, 247, 244, 0) 70%);
          pointer-events: none;
        }

        .meet-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .meet-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .meet-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          border-radius: var(--border-radius-pill);
          background: #fae8eb;
          border: 1px solid #f9d1d9;
          color: #be185d;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          width: fit-content;
        }

        .text-pink {
          color: #ec4899;
        }

        .meet-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4vw, 3.4rem);
          font-weight: 800;
          color: #1e1b4b;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .meet-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #584c66;
          max-width: 620px;
        }

        /* 4 Personality Badges */
        .badges-list {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .personality-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.15rem;
          border-radius: var(--border-radius-pill);
          border-width: 1.5px;
          border-style: solid;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .personality-badge:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }

        .personality-badge.is-selected {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 20px rgba(244, 114, 182, 0.35);
          outline: 2px solid #f472b6;
          outline-offset: 2px;
        }

        .badge-quote-card {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem 1.4rem;
          background: #ffffff;
          border-radius: var(--border-radius-md);
          border: 1px solid #f0e6e4;
          box-shadow: 0 4px 18px rgba(70, 40, 80, 0.05);
          max-width: 580px;
          margin-top: 0.25rem;
          animation: fadeIn 0.3s ease;
        }

        .quote-icon {
          font-family: var(--font-serif);
          font-size: 2rem;
          line-height: 1;
          color: #f472b6;
        }

        .quote-text {
          font-size: 0.92rem;
          color: #6b5b75;
          line-height: 1.5;
          font-style: italic;
          margin-top: 0.15rem;
        }

        /* Character Art Area */
        .character-art-frame {
          position: relative;
          width: 100%;
          min-height: 440px;
          background: linear-gradient(135deg, #ffffff 0%, #fff1f2 50%, #fae8eb 100%);
          border-radius: var(--border-radius-lg);
          border: 2px solid #fae8eb;
          box-shadow: 0 20px 45px rgba(220, 180, 200, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .character-art-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 60px rgba(220, 180, 200, 0.35);
        }

        .character-art-glow {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 114, 182, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
          pointer-events: none;
        }

        .character-picture {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 420px;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .character-img {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(120, 50, 90, 0.15));
          transition: transform 0.5s ease;
        }

        .character-art-frame:hover .character-img {
          transform: scale(1.03) translateY(-4px);
        }

        .character-stamp {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 3;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid #fed7aa;
          padding: 0.6rem 1.1rem;
          border-radius: var(--border-radius-pill);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
        }

        .stamp-icon {
          color: #f472b6;
          font-size: 1.1rem;
        }

        .stamp-text {
          display: flex;
          flex-direction: column;
          font-size: 0.76rem;
          line-height: 1.3;
        }

        .stamp-text strong {
          color: #2c2533;
        }

        .stamp-text span {
          color: #71717a;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .section-meet {
            padding: 4.5rem 1.5rem;
          }
          .character-art-frame {
            min-height: 340px;
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
