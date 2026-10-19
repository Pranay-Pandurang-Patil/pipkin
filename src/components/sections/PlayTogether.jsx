import React, { useState, useRef } from "react";
import PipkinPlayStage from "../play/PipkinPlayStage";
import { PLAY_EMOTES } from "../../data/playEmotes";
import { ASSETS } from "../../data/assets";
import { Sparkles, Hand, Smile, Music, Compass, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { soundEngine } from "../../utils/audio";

const EMOTE_ICON_MAP = {
  Hand,
  Smile,
  Music,
  Sparkles,
  Compass,
};

export default function PlayTogether() {
  const [activeEmote, setActiveEmote] = useState(PLAY_EMOTES[0]);
  const [sparkleCount, setSparkleCount] = useState(12);
  const [isAnimating, setIsAnimating] = useState(false);
  const stageRef = useRef(null);

  const handleEmoteClick = (emote) => {
    setActiveEmote(emote);
    stageRef.current?.play(emote.id); // animate the 3D parts (pivot-based)
    setIsAnimating(true);
    soundEngine.playEmoteTone(emote.soundFrequency, emote.soundType);

    // Increase sparkle points
    setSparkleCount((prev) => prev + emote.sparkleReward);

    // Trigger subtle confetti on Dance or Collect
    if (emote.id === "dance" || emote.id === "collect") {
      try {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.75 },
          colors: ["#f472b6", "#fde047", "#38bdf8", "#86efac"],
        });
      } catch {
        // Safe fallback
      }
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <section id="play" className="section-play" aria-labelledby="play-heading">
      <div className="play-ambient-sage" />
      <div className="play-ambient-pink" />
      <div className="section-bg-image play-bg-image" />

      <div className="play-container">
        {/* Section Header */}
        <div className="play-header">
          <div className="play-tag">
            <Sparkles size={14} className="text-sage" />
            <span>05 — Interactive Sandbox</span>
          </div>

          <h2 id="play-heading" className="play-title">
            Play Together
          </h2>

          <p className="play-desc">
            Interact with Pipkin! Try the emotes, explore the workshop, and find
            hidden surprises.
          </p>

          {/* Sparkle Counter Tracker */}
          <div
            className="sparkle-counter-badge"
            title="Collected by exploring Pipkin's meadow"
          >
            <Sparkles size={16} className="text-gold" />
            <span>
              Meadow Sparkles: <strong>{sparkleCount}</strong> ✨
            </span>
          </div>
        </div>

        {/* Interactive Play Arena */}
        <div className="play-arena-card">
          {/* Animated Character Stage Area */}
          <div
            className={`character-stage ${isAnimating ? activeEmote.animationType : ""}`}
          >
            {/* Speech Bubble */}
            <div className="speech-bubble" role="status" aria-live="polite">
              <span className="speech-badge">
                {activeEmote.badge} {activeEmote.label}
              </span>
              <p className="speech-text">{activeEmote.dialogue}</p>
              <div className="speech-tail" />
            </div>

            {/* Playful Character Artwork with Fallback */}
            <div className="play-artwork-wrapper">
              <PipkinPlayStage ref={stageRef} />
            </div>

            {/* Floating Decorative Garden Butterflies & Flowers */}
            <div className="stage-decorations" aria-hidden="true">
              <span className="decor-item flower-1">🌸</span>
              <span className="decor-item butterfly-1">🦋</span>
              <span className="decor-item clover-1">🍀</span>
              <span className="decor-item sparkle-1">✨</span>
            </div>
          </div>

          {/* Interactive Emotes Action Bar */}
          <div
            className="emotes-bar"
            role="toolbar"
            aria-label="Pipkin Emote Controls"
          >
            <span className="emotes-bar-title">Choose an Emote:</span>
            <div className="emotes-buttons-group">
              {PLAY_EMOTES.map((emote) => {
                const IconComponent = EMOTE_ICON_MAP[emote.icon] || Sparkles;
                const isSelected = activeEmote.id === emote.id;

                return (
                  <button
                    key={emote.id}
                    type="button"
                    onClick={() => handleEmoteClick(emote)}
                    className={`btn-emote ${isSelected ? "is-selected" : ""}`}
                    aria-label={`Trigger ${emote.label} emote`}
                  >
                    <span className="emote-emoji">{emote.badge}</span>
                    <span className="emote-name">{emote.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .section-play {
          position: relative;
          background: #eef5ee;
          color: #2c2533;
          padding: 6.5rem 3rem;
          overflow: hidden;
        }
          .play-bg-image {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(
      rgba(238, 245, 238, 0.40),
      rgba(238, 245, 238, 0.60)
    ),
    url('/assets/play-bg.png') center / cover no-repeat;
}

        .play-ambient-sage {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(167, 243, 208, 0.35) 0%, rgba(238, 245, 238, 0) 70%);
          pointer-events: none;
        }

        .play-ambient-pink {
          position: absolute;
          bottom: -10%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(251, 207, 232, 0.35) 0%, rgba(238, 245, 238, 0) 70%);
          pointer-events: none;
        }

        .play-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .play-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .play-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          border-radius: var(--border-radius-pill);
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          color: #166534;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          width: fit-content;
        }

        .text-sage {
          color: #15803d;
        }

        .play-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4vw, 3.4rem);
          font-weight: 800;
          color: #1e1b4b;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .play-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #4b6352;
          max-width: 620px;
        }

        .sparkle-counter-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 1.1rem;
          background: #ffffff;
          border-radius: var(--border-radius-pill);
          border: 1px solid #fed7aa;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          font-size: 0.88rem;
          color: #854d0e;
          width: fit-content;
        }

        .text-gold {
          color: #eab308;
        }

        /* Play Arena Card */
        .play-arena-card {
          background: #ffffff;
          border-radius: var(--border-radius-lg);
          border: 2px solid #e2ece2;
          box-shadow: 0 16px 40px rgba(70, 100, 80, 0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Character Stage */
        .character-stage {
          position: relative;
          background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #fdf2f8 100%);
          min-height: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem 2rem 2rem;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        /* Speech Bubble */
        .speech-bubble {
          position: relative;
          background: #ffffff;
          border-radius: var(--border-radius-md);
          padding: 1rem 1.5rem;
          box-shadow: 0 8px 24px rgba(70, 100, 80, 0.1);
          border: 1.5px solid #dcfce7;
          max-width: 520px;
          margin-bottom: 2rem;
          z-index: 5;
          text-align: center;
          animation: popBubble 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes popBubble {
          from { transform: scale(0.9) translateY(6px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }

        .speech-badge {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 700;
          color: #166534;
          background: #dcfce7;
          padding: 0.2rem 0.65rem;
          border-radius: var(--border-radius-pill);
          margin-bottom: 0.4rem;
        }

        .speech-text {
          font-size: 0.96rem;
          color: #1e293b;
          line-height: 1.55;
          font-weight: 500;
        }

        .speech-tail {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 16px;
          height: 16px;
          background: #ffffff;
          border-right: 1.5px solid #dcfce7;
          border-bottom: 1.5px solid #dcfce7;
        }

        /* Artwork Wrapper */
        .play-artwork-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 440px;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .play-stage-3d{position:relative;width:100%;height:100%}
        .play-stage-mount{position:absolute;inset:0}.play-stage-mount canvas{display:block;width:100%;height:100%}
        .play-stage-note{position:absolute;inset:0;display:grid;place-items:center;color:#6c5a53;font-size:.95rem}
        .play-character-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 12px 24px rgba(30, 80, 40, 0.15));
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Interactive Animation Classes */
        .wave-action .play-character-img {
          animation: wavePony 0.6s ease-in-out;
        }

        .nod-action .play-character-img {
          animation: nodPony 0.6s ease-in-out;
        }

        .dance-action .play-character-img {
          animation: dancePony 0.6s ease-in-out;
        }

        .collect-action .play-character-img {
          animation: collectPony 0.6s ease-in-out;
        }

        .explore-action .play-character-img {
          animation: explorePony 0.6s ease-in-out;
        }

        @keyframes wavePony {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg) translateY(-5px); }
          75% { transform: rotate(8deg) translateY(-5px); }
        }

        @keyframes nodPony {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(12px) scaleY(0.95); }
          70% { transform: translateY(-8px) scaleY(1.05); }
        }

        @keyframes dancePony {
          0%, 100% { transform: scale(1) rotate(0); }
          25% { transform: scale(1.1) rotate(-6deg) translateY(-14px); }
          75% { transform: scale(1.1) rotate(6deg) translateY(-14px); }
        }

        @keyframes collectPony {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15) translateY(-8px); filter: drop-shadow(0 0 25px rgba(234, 179, 8, 0.7)); }
        }

        @keyframes explorePony {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px) scale(1.04); }
        }

        /* Floating Decorations */
        .stage-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .decor-item {
          position: absolute;
          font-size: 1.5rem;
          opacity: 0.8;
          animation: floatAround 5s ease-in-out infinite alternate;
        }

        .flower-1 { top: 25%; left: 10%; animation-delay: 0.5s; }
        .butterfly-1 { top: 15%; right: 12%; animation-delay: 1.2s; font-size: 1.8rem; }
        .clover-1 { bottom: 20%; left: 8%; animation-delay: 2s; }
        .sparkle-1 { bottom: 25%; right: 10%; animation-delay: 2.7s; }

        @keyframes floatAround {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(8px, -12px) rotate(10deg); }
        }

        /* Emotes Bar */
        .emotes-bar {
          padding: 1.5rem 2rem;
          background: #ffffff;
          border-top: 1px solid #e2ece2;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .emotes-bar-title {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #4b6352;
        }

        .emotes-buttons-group {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .btn-emote {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border-radius: var(--border-radius-pill);
          background: #f8faf8;
          border: 1.5px solid #dcfce7;
          color: #1e293b;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .btn-emote:hover {
          background: #ffffff;
          border-color: #86efac;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.2);
        }

        .btn-emote.is-selected {
          background: #22c55e;
          border-color: #16a34a;
          color: #ffffff;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.35);
        }

        .emote-emoji {
          font-size: 1.15rem;
        }

        @media (max-width: 768px) {
          .section-play {
            padding: 4.5rem 1.5rem;
          }
          .emotes-buttons-group {
            justify-content: center;
          }
          .character-stage {
            min-height: 320px;
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </section>
  );
}
