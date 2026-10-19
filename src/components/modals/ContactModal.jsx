import React, { useState, useEffect } from 'react';
import { X, Mail, Copy, Check, Send, Sparkles, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { soundEngine } from '../../utils/audio';

export default function ContactModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [projectType, setProjectType] = useState('3D Character & Whimsical Art');
  const [message, setMessage] = useState('');

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contact.email);
    setCopied(true);
    soundEngine.playChime(783.99, 'sine', 0.2);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.playChime(659.25, 'triangle', 0.25);
    // Real legitimate mailto handler to prevent silently discarding submissions
    const subject = encodeURIComponent(`[${projectType}] Project Inquiry from ${name || 'A Friend'}`);
    const body = encodeURIComponent(
      `Hi Pipkin,\n\n${message || 'I love your whimsical 3D work and would love to collaborate!'}\n\nWarmly,\n${name || 'Friend'}`
    );
    window.location.href = `mailto:${SITE_CONFIG.contact.email}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div
      className="contact-backdrop"
      onClick={() => {
        soundEngine.playChime(440, 'sine', 0.15);
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="contact-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => {
            soundEngine.playChime(440, 'sine', 0.15);
            onClose();
          }}
          className="contact-close-btn"
          aria-label="Close contact modal"
        >
          <X size={20} />
        </button>

        <div className="contact-modal-header">
          <div className="contact-badge">
            <Sparkles size={14} className="text-pink" />
            <span>Say Hi ♧</span>
          </div>
          <h3 id="contact-modal-title" className="contact-title">
            Send a Message to Pipkin
          </h3>
          <p className="contact-subtitle">
            Whether for a whimsical 3D character commission, animation, or a friendly hello.
          </p>
        </div>

        {/* Quick Email Copy Row */}
        <div className="email-copy-bar">
          <div className="email-left">
            <Mail size={16} className="text-pink" />
            <span className="email-text">{SITE_CONFIG.contact.email}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="btn-copy-email"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Legitimate Contact Form (Dispatches to user mail client) */}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="contact-name">Your Name</label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Flora Stardust"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="project-type">Project Type</label>
            <select
              id="project-type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="3D Character & Whimsical Art">3D Character & Whimsical Art</option>
              <option value="Environment Modeling & Diorama">Environment Modeling & Diorama</option>
              <option value="Keyframe Animation & Rigging">Keyframe Animation & Rigging</option>
              <option value="Just Saying Hi ✿">Just Saying Hi ✿</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell Pipkin about your idea, dream world, or project timeline..."
              required
            />
          </div>

          <button type="submit" className="btn-send-message">
            <Send size={16} />
            <span>Open in Email Client →</span>
          </button>

          <p className="form-footer-note">
            Configurable destination: <code>src/data/config.js</code>. Opens directly in your default mail app so messages are never lost.
          </p>
        </form>
      </div>

      <style>{`
        .contact-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 10, 25, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.25s ease;
        }

        .contact-card {
          position: relative;
          background: #ffffff;
          border-radius: var(--border-radius-lg);
          max-width: 540px;
          width: 100%;
          padding: 2.25rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
          border: 1px solid #fed7aa;
          color: #2c2533;
        }

        .contact-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fdf4f0;
          color: #2c2533;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .contact-close-btn:hover {
          background: #f472b6;
          color: #ffffff;
        }

        .contact-modal-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: #be185d;
          background: #fce7f3;
          padding: 0.2rem 0.65rem;
          border-radius: var(--border-radius-pill);
          width: fit-content;
        }

        .text-pink { color: #f472b6; }
        .text-green { color: #16a34a; }

        .contact-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e1b4b;
        }

        .contact-subtitle {
          font-size: 0.92rem;
          color: #64748b;
          line-height: 1.5;
        }

        .email-copy-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fdf2f8;
          border: 1px solid #fbcfe8;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-md);
          margin-bottom: 1.5rem;
        }

        .email-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .email-text {
          font-size: 0.92rem;
          font-weight: 600;
          color: #881337;
        }

        .btn-copy-email {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--border-radius-pill);
          background: #ffffff;
          border: 1px solid #fbcfe8;
          font-size: 0.78rem;
          font-weight: 600;
          color: #881337;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.2s;
        }

        .btn-copy-email:hover {
          background: #fce7f3;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-sm);
          border: 1.5px solid #e2e8f0;
          font-family: inherit;
          font-size: 0.92rem;
          color: #1e293b;
          background: #f8fafc;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #f472b6;
          background: #ffffff;
        }

        .btn-send-message {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.5rem;
          border-radius: var(--border-radius-pill);
          background: linear-gradient(135deg, #f472b6, #e11d48);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          box-shadow: 0 6px 20px rgba(225, 29, 72, 0.35);
          cursor: pointer;
          transition: all 0.25s;
          margin-top: 0.5rem;
        }

        .btn-send-message:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(225, 29, 72, 0.5);
        }

        .form-footer-note {
          font-size: 0.75rem;
          color: #94a3b8;
          text-align: center;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
