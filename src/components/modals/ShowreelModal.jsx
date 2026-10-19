import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCw, Volume2, Sparkles, Film } from 'lucide-react';
import { ASSETS } from '../../data/assets';
import { soundEngine } from '../../utils/audio';

export default function ShowreelModal({ onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { title: 'The Garden Sunrise', duration: '0:15', tag: 'Environment Art', image: ASSETS.heroBg },
    { title: 'Character Turntable', duration: '0:30', tag: '3D Modeling', image: ASSETS.character },
    { title: 'Velvet Shaders & Rimlight', duration: '0:45', tag: 'NPR Lighting', image: ASSETS.wonder },
    { title: 'Pipkin Locomotion Leap', duration: '1:00', tag: 'Keyframe Rig', image: ASSETS.animations }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    soundEngine.playChime(523.25, 'sine', 0.2);
  };

  const handleSelectChapter = (idx) => {
    setActiveChapter(idx);
    soundEngine.playChime(587.33 + idx * 40, 'triangle', 0.2);
  };

  return (
    <div
      className="showreel-backdrop"
      onClick={() => {
        soundEngine.playChime(440, 'sine', 0.15);
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="showreel-title"
    >
      <div className="showreel-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => {
            soundEngine.playChime(440, 'sine', 0.15);
            onClose();
          }}
          className="showreel-close-btn"
          aria-label="Close showreel"
        >
          <X size={20} />
        </button>

        {/* Video Screen Simulation */}
        <div className="showreel-screen">
          <img
            src={chapters[activeChapter].image}
            alt={chapters[activeChapter].title}
            className={`screen-media ${isPlaying ? 'is-animating' : ''}`}
          />
          <div className="screen-vignette" />

          {/* Chapter Overlay Info */}
          <div className="screen-overlay-info">
            <span className="chapter-pill">{chapters[activeChapter].tag}</span>
            <h3 id="showreel-title" className="chapter-title">
              {chapters[activeChapter].title}
            </h3>
          </div>

          {/* Player Controls Bar */}
          <div className="player-bar">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="btn-play-pause"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
            </button>
            <div className="progress-track">
              <div className={`progress-bar-fill ${isPlaying ? 'anim-progress' : ''}`} />
            </div>
            <span className="time-code">{chapters[activeChapter].duration}</span>
          </div>
        </div>

        {/* Chapters List */}
        <div className="chapters-footer">
          <span className="chapters-header">
            <Film size={15} />
            <span>Showreel Sequence Chapters</span>
          </span>
          <div className="chapters-grid">
            {chapters.map((ch, idx) => (
              <button
                key={ch.title}
                type="button"
                onClick={() => handleSelectChapter(idx)}
                className={`chapter-card ${activeChapter === idx ? 'is-active' : ''}`}
              >
                <span className="ch-num">0{idx + 1}</span>
                <div className="ch-info">
                  <span className="ch-title">{ch.title}</span>
                  <span className="ch-tag">{ch.tag}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .showreel-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 6, 20, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.25s ease;
        }

        .showreel-card {
          position: relative;
          background: #110d1c;
          border-radius: var(--border-radius-lg);
          max-width: 820px;
          width: 100%;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .showreel-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s;
        }

        .showreel-close-btn:hover {
          background: #f472b6;
        }

        .showreel-screen {
          position: relative;
          width: 100%;
          height: 400px;
          background: #000000;
          overflow: hidden;
        }

        .screen-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .screen-media.is-animating {
          animation: panZoom 12s infinite alternate ease-in-out;
        }

        @keyframes panZoom {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1%, -1%); }
        }

        .screen-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 10, 25, 0.9) 0%, transparent 50%, rgba(15, 10, 25, 0.4) 100%);
        }

        .screen-overlay-info {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .chapter-pill {
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(244, 114, 182, 0.3);
          border: 1px solid #f472b6;
          color: #fbcfe8;
          padding: 0.25rem 0.75rem;
          border-radius: var(--border-radius-pill);
          width: fit-content;
        }

        .chapter-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
        }

        .player-bar {
          position: absolute;
          bottom: 1.25rem;
          left: 2rem;
          right: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(20, 15, 30, 0.75);
          backdrop-filter: blur(10px);
          padding: 0.6rem 1.25rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-play-pause {
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-track {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          width: 45%;
          background: linear-gradient(to right, #f472b6, #fbbf24);
        }

        .anim-progress {
          animation: progressSim 10s infinite linear;
        }

        @keyframes progressSim {
          0% { width: 5%; }
          100% { width: 95%; }
        }

        .time-code {
          font-size: 0.78rem;
          color: #cbd5e1;
        }

        .chapters-footer {
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #140d24;
        }

        .chapters-header {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #ffb59b;
        }

        .chapters-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .chapters-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .chapter-card {
          padding: 0.85rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }

        .chapter-card:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .chapter-card.is-active {
          border-color: #f472b6;
          background: rgba(244, 114, 182, 0.12);
        }

        .ch-num {
          font-family: var(--font-hand);
          font-size: 1.25rem;
          color: #f472b6;
        }

        .ch-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .ch-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #ffffff;
        }

        .ch-tag {
          font-size: 0.68rem;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}
