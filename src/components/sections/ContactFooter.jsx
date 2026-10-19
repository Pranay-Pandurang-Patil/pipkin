import React from "react";
import { SITE_CONFIG } from "../../data/config";
import { ASSETS } from "../../data/assets";
import { ArrowRight, Mail, MapPin, Clock, Sparkles, Heart } from "lucide-react";
import { soundEngine } from "../../utils/audio";

export default function ContactFooter({ onOpenContact }) {
  const handleContactClick = () => {
    soundEngine.playChime(659.25, "triangle", 0.3);
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.location.href = `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(SITE_CONFIG.contact.subject)}`;
    }
  };

  return (
    <footer
      id="contact"
      className="section-contact-footer"
      aria-labelledby="contact-heading"
    >
      {/* Sunset Background Layer using hero-bg */}
      <div className="footer-bg-layer" />
      <div className="footer-gradient-overlay" />

      <div className="footer-container">
        {/* Decorative Annotation */}
        <div className="footer-annotation" aria-hidden="true">
          <span className="annotation-script">
            {SITE_CONFIG.footerAnnotation}
          </span>
        </div>

        {/* Main Header & Call to Action */}
        <div className="footer-header">
          <div className="footer-tag">
            <Sparkles size={14} className="text-peach" />
            <span>06 — Collaboration</span>
          </div>

          <h2 id="contact-heading" className="footer-title">
            Let's Create Together
          </h2>

          <p className="footer-desc">
            Have a project, an idea or just want to say hi? I'd love to hear
            from you!
          </p>

          <button
            type="button"
            onClick={handleContactClick}
            className="btn-get-in-touch"
            aria-label="Get in touch with Pipkin studio"
          >
            <span>Get in Touch →</span>
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Configurable Contact Information Card */}
        <div className="contact-info-card">
          <div className="info-block">
            <div className="info-icon-box">
              <Mail size={18} />
            </div>
            <div className="info-text">
              <span className="info-label">Direct Studio Email</span>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(SITE_CONFIG.contact.subject)}`}
                className="info-value email-link"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>

          <div className="info-block">
            <div className="info-icon-box">
              <MapPin size={18} />
            </div>
            <div className="info-text">
              <span className="info-label">Studio Meadow</span>
              <span className="info-value">{SITE_CONFIG.contact.location}</span>
            </div>
          </div>

          <div className="info-block">
            <div className="info-icon-box">
              <Clock size={18} />
            </div>
            <div className="info-text">
              <span className="info-label">Availability & Timezone</span>
              <span className="info-value">{SITE_CONFIG.contact.timezone}</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-socials-row">
          <span className="socials-label">Follow Pipkin's adventures:</span>
          <div className="socials-list">
            {SITE_CONFIG.contact.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                onClick={() => soundEngine.playChime(523.25, "sine", 0.15)}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Pipkin Studio ✦ Crafted with wonder,
            pastel dreams, and 3D magic.
          </p>
          <div className="heart-credit">
            <span>Made with</span>
            <Heart size={14} className="heart-pulse text-pink" fill="#f472b6" />
            <span>for storybook dreamers</span>
          </div>
        </div>
      </div>

      <style>{`
        .section-contact-footer {
          position: relative;
          background: #140d21;
          color: #ffffff;
          padding: 7rem 3rem 3rem 3rem;
          overflow: hidden;
          min-height: 85vh;
          display: flex;
          align-items: center;
        }

        .footer-bg-layer {
  position: absolute;
  inset: 0;
  background-image: url('/assets/contact-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.55;
  z-index: 0;
  transform: scale(1.02);
  pointer-events: none;
}

        .footer-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(20, 13, 33, 0.94) 0%,
            rgba(35, 18, 48, 0.85) 50%,
            rgba(15, 8, 25, 0.98) 100%
          );
          z-index: 1;
        }

        .footer-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .footer-annotation {
          text-align: center;
          margin-bottom: -1rem;
        }

        .annotation-script {
          font-family: var(--font-hand);
          font-size: 1.85rem;
          color: #ffd8df;
          text-shadow: 0 0 15px rgba(244, 114, 182, 0.5);
          display: inline-block;
          animation: subtleWobble 4s infinite ease-in-out;
        }

        @keyframes subtleWobble {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg) scale(1.03); }
        }

        .footer-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.25rem;
        }

        .footer-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          border-radius: var(--border-radius-pill);
          background: rgba(255, 181, 155, 0.15);
          border: 1px solid rgba(255, 181, 155, 0.35);
          color: #fed7aa;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .text-peach {
          color: #ffb59b;
        }

        .footer-title {
          font-family: var(--font-serif);
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.01em;
          text-shadow: 0 4px 25px rgba(0, 0, 0, 0.6), 0 0 40px rgba(244, 114, 182, 0.3);
        }

        .footer-desc {
          font-size: 1.2rem;
          line-height: 1.7;
          color: #fce7f3;
          max-width: 580px;
        }

        .btn-get-in-touch {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.05rem 2.4rem;
          border-radius: var(--border-radius-pill);
          background: linear-gradient(135deg, #f472b6, #e11d48);
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 700;
          box-shadow: 0 8px 30px rgba(225, 29, 72, 0.45);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-top: 0.75rem;
        }

        .btn-get-in-touch:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 38px rgba(225, 29, 72, 0.6);
          background: linear-gradient(135deg, #fb7185, #f43f5e);
        }

        /* Configurable Contact Card */
        .contact-info-card {
          background: rgba(30, 20, 45, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: var(--border-radius-lg);
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 640px) {
          .contact-info-card {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .info-block {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .info-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(244, 114, 182, 0.15);
          border: 1px solid rgba(244, 114, 182, 0.3);
          color: #f472b6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .info-label {
          font-size: 0.74rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #d1b8dc;
        }

        .info-value {
          font-size: 0.92rem;
          color: #ffffff;
          font-weight: 500;
        }

        .email-link {
          color: #fbcfe8;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }

        .email-link:hover {
          color: #ffffff;
        }

        /* Socials Row */
        .footer-socials-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
        }

        .socials-label {
          font-size: 0.82rem;
          color: #cbd5e1;
          letter-spacing: 0.03em;
        }

        .socials-list {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .social-pill {
          padding: 0.45rem 1.1rem;
          border-radius: var(--border-radius-pill);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #fce7f3;
          font-size: 0.84rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }

        .social-pill:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: #f472b6;
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.8rem;
          color: #94a3b8;
          text-align: center;
        }

        .heart-credit {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #cbd5e1;
        }

        .heart-pulse {
          animation: pulseHeart 1.5s infinite ease-in-out;
        }

        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }

        @media (max-width: 768px) {
          .section-contact-footer {
            padding: 5rem 1.5rem 2.5rem 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
