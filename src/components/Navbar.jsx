import React, { useState, useEffect } from 'react';
import { sound } from '../services/audio';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import '../styles/Navbar.css';

export default function Navbar({ onReturnToTitle }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "HOME", href: "#home" },
    { label: "GAME", href: "#game" },
    { label: "STORY", href: "#story" },
    { label: "CHARACTER", href: "#character" },
  ];

  const handleNavClick = (e, href) => {
    sound.playHover();
    setMobileOpen(false);
  };

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playHover();
  };

  return (
    <header className={`navbar-header ${scrolled ? 'is-scrolled' : 'is-transparent'}`}>
      <div className="navbar-inner">
        {/* Brand Logo / Emblem */}
        <a 
          href="#home" 
          className="navbar-brand font-pixel-ui"
          onClick={() => sound.playHover()}
        >
          <div className="box-emblem-wrapper">
            <img src="/box-icon.svg" alt="Pandora's Box Logo" className="box-emblem-icon" />
          </div>
          <span className="brand-text">
            PANDORA'S <span className="text-cyan-glow">BOX</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links-desktop">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link font-pixel-ui"
              onMouseEnter={() => sound.playHover()}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              <span className="nav-link-dot" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & CTA */}
        <div className="navbar-actions">
          {/* Audio Synthesizer SFX Mute Toggle */}
          <button
            className="sound-toggle-btn"
            onClick={handleSoundToggle}
            title={isMuted ? "Enable Retro SFX" : "Mute Retro SFX"}
            aria-label="Toggle Retro SFX"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="sound-toggle-label font-pixel-ui">
              {isMuted ? "SFX: OFF" : "SFX: ON"}
            </span>
          </button>

          {/* Title Screen Return Button */}
          {onReturnToTitle && (
            <button
              className="title-return-btn font-pixel-ui"
              onClick={() => {
                sound.playHover();
                onReturnToTitle();
              }}
              title="Return to Game Title Screen"
            >
              TITLE MENU
            </button>
          )}

          {/* Pre-Register Primary Action Button */}
          <a
            href="#pre-register"
            className="nav-cta-btn font-pixel-ui"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playSelect()}
          >
            <span>PRE-REGISTER</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => {
              sound.playHover();
              setMobileOpen(!mobileOpen);
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <span className="font-pixel-ui text-cyan-glow">NAVIGATION MENU</span>
          </div>
          <div className="mobile-drawer-links">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-nav-link font-pixel-ui"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="mobile-pointer">▶</span>
                {item.label}
              </a>
            ))}
            <a
              href="#pre-register"
              className="mobile-nav-link cta font-pixel-ui"
              onClick={(e) => handleNavClick(e, '#pre-register')}
            >
              <span className="mobile-pointer">★</span>
              PRE-REGISTER NOW
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
