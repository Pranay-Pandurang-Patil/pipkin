import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function Navbar({ onOpenContact, activeSection = 'hero' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Build', href: '#build' },
    { label: 'Meet', href: '#meet' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Play', href: '#play' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    soundEngine.playChime(587.33, 'sine', 0.2); // subtle tap sound
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="navbar-logo"
          aria-label="Pipkin Home"
        >
          <span className="logo-text">Pipkin✦</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions: Sound & Say Hi */}
        <div className="navbar-actions">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="sound-toggle-btn"
            title={isMuted ? 'Turn on gentle chimes' : 'Mute chimes'}
            aria-label={isMuted ? 'Turn on sound' : 'Turn off sound'}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          {/* Say Hi Pill Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playChime(698.46, 'sine', 0.25);
              onOpenContact();
            }}
            className="say-hi-btn"
          >
            Say Hi ♧
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div className="mobile-drawer-header">
            <span className="logo-text">Pipkin✦</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-close-btn"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="mobile-nav-list">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="mobile-nav-link"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="mobile-say-hi-btn"
            >
              Say Hi ♧
            </button>
          </nav>
        </div>
      )}

      <style>{`
        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 60;
          padding: 1rem 2.5rem;
          pointer-events: auto;
          background: rgba(15, 10, 25, 0);
          border-bottom: 1px solid rgba(255, 255, 255, 0);
          transition: background 0.3s ease;
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 100%;
          margin: 0 auto;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          text-decoration: none;
        }

        .logo-text {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
          transition: transform 0.25s ease;
        }

        .navbar-logo:hover .logo-text {
          transform: scale(1.04);
          color: #ffd1dc;
        }

        .desktop-nav {
          display: none;
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          list-style: none;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 0.5rem 1.4rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .nav-link {
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          transition: color 0.2s ease;
          position: relative;
        }

        .nav-link:hover, .nav-link.active {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sound-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }

        .sound-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: scale(1.05);
        }

        .say-hi-btn {
          font-size: 0.88rem;
          font-weight: 600;
          padding: 0.5rem 1.25rem;
          border-radius: var(--border-radius-pill);
          background: #ffe3ea;
          color: #881337;
          border: 1px solid #fecdd3;
          box-shadow: 0 4px 14px rgba(244, 114, 182, 0.3);
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .say-hi-btn:hover {
          background: #ffffff;
          color: #be185d;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(244, 114, 182, 0.45);
        }

        .mobile-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 100;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .mobile-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .mobile-close-btn {
          color: #ffffff;
          padding: 0.5rem;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-link {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: #fce7f3;
          text-decoration: none;
          transition: color 0.2s;
        }

        .mobile-nav-link:hover {
          color: #f472b6;
        }

        .mobile-say-hi-btn {
          margin-top: 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.85rem 2rem;
          border-radius: var(--border-radius-pill);
          background: #ffe3ea;
          color: #881337;
          text-align: center;
        }

        @media (min-width: 900px) {
          .desktop-nav {
            display: block;
          }
          .mobile-menu-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
