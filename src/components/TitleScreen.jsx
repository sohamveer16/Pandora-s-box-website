import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../services/audio';
import graveyardBg from '../assets/backgrounds/graveyard-bg.svg';
import magicCircle from '../assets/backgrounds/magic-circle.svg';
import gsap from 'gsap';
import '../styles/TitleScreen.css';

export default function TitleScreen({ onEnterSite }) {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const titleContainerRef = useRef(null);
  const menuItemsRef = useRef([]);

  const menuOptions = [
    { label: "START / ENTER", section: "home", isPrimary: true },
    { label: "GAME", section: "game" },
    { label: "STORY", section: "story" },
    { label: "CHARACTER", section: "character" },
    { label: "PRE-REGISTER", section: "pre-register", isHighlight: true }
  ];

  // Always-fresh copy of the active index so the key handler never needs re-binding
  const activeIndexRef = useRef(0);
  useEffect(() => {
    activeIndexRef.current = activeMenuIndex;
  }, [activeMenuIndex]);

  // Intro animation: runs ONCE on mount (previously it re-ran on every hover)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".title-logo-main",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", clearProps: "all" }
      )
      .fromTo(
        ".title-tagline",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", clearProps: "all" },
        "-=0.6"
      )
      .fromTo(
        ".title-menu-item",
        { opacity: 0, x: -25 },
        // clearProps hands the transform back to CSS so the hover slide works
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out", clearProps: "all" },
        "-=0.4"
      )
      .fromTo(
        ".title-prompt-footer",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, clearProps: "all" },
        "-=0.2"
      );
    }, titleContainerRef);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation (bound once)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const len = menuOptions.length;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.playHover();
        setActiveMenuIndex((prev) => (prev + 1) % len);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.playHover();
        setActiveMenuIndex((prev) => (prev - 1 + len) % len);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect(menuOptions[activeIndexRef.current].section);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (sectionId) => {
    sound.playSelect();
    onEnterSite(sectionId);
  };

  const handleHover = (index) => {
    if (activeMenuIndex !== index) {
      sound.playHover();
      setActiveMenuIndex(index);
    }
  };

  return (
    <div className="title-screen-root" ref={titleContainerRef}>
      {/* Background Graveyard Sanctuary Artwork */}
      <div className="title-bg-layer">
        <img
          src={graveyardBg}
          alt="Graveyard Sanctuary"
          className="title-bg-image"
        />
        <div className="title-ambient-fog" />
      </div>

      {/* Central Magic Summon Circle Platform */}
      <div className="title-magic-circle-container">
        <img
          src={magicCircle}
          alt="Mystic Summon Circle"
          className="title-magic-circle-img"
        />
      </div>

      {/* Foreground Content & Nostalgic Game Menu */}
      <div className="title-content-wrapper">
        <div className="title-header-group">
          <div className="title-badge font-pixel-ui">
            <span className="seal-dot" /> AN ORIGINAL 2D ACTION-ADVENTURE
          </div>

          <h1 className="title-logo-main font-pixel-title">
            <span className="title-word-pandora">PANDORA'S</span>
            <span className="title-word-box text-cyan-glow">BOX</span>
          </h1>

          <p className="title-tagline font-fantasy">
            WHERE ANCIENT PROPHECIES AWAKEN
          </p>
        </div>

        {/* Nostalgic Title Menu Navigation */}
        <nav className="title-menu-container" aria-label="Game Title Menu">
          {menuOptions.map((opt, idx) => {
            const isSelected = activeMenuIndex === idx;
            return (
              <button
                key={opt.section}
                ref={(el) => (menuItemsRef.current[idx] = el)}
                className={`title-menu-item font-pixel-ui ${isSelected ? 'is-active' : ''} ${
                  opt.isHighlight ? 'is-highlight' : ''
                }`}
                onMouseEnter={() => handleHover(idx)}
                onFocus={() => setActiveMenuIndex(idx)}
                onClick={() => handleSelect(opt.section)}
              >
                {/* Runic indicator cursor */}
                <span className="menu-pointer">
                  {isSelected ? '▶' : ' '}
                </span>
                
                <span className="menu-label-text">{opt.label}</span>

                {/* Subtitle / action tag */}
                {opt.isHighlight && (
                  <span className="menu-special-badge">READY</span>
                )}

                {/* Decorative border corners */}
                <span className="btn-corner c-tl" />
                <span className="btn-corner c-tr" />
                <span className="btn-corner c-bl" />
                <span className="btn-corner c-br" />
              </button>
            );
          })}
        </nav>

        {/* Nostalgic Arcade Footer Prompt */}
        <div className="title-prompt-footer">
          <p className="press-key-hint font-pixel-ui">
            [ PRESS <span className="key-cap">ENTER</span> OR CLICK TO BEGIN ]
          </p>
          <span className="build-ver-tag font-pixel-ui">V 0.9.1 • ALPHA PREVIEW</span>
        </div>
      </div>
    </div>
  );
}
