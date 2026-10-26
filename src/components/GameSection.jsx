import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../services/audio';
import { gameInfo } from '../data/game';
import shotGraveyard from '../assets/game/graveyard.jpg';
import shotPause from '../assets/game/pause-menu.jpg';
import shotCaverns from '../assets/game/caverns.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swords, Eye, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/GameSection.css';

gsap.registerPlugin(ScrollTrigger);

// In-game screenshots shown in the Game Info showcase
const screenshots = [
  { src: shotGraveyard, title: "GRAVEYARD SANCTUARY", caption: "Fight through the moonlit graveyard" },
  { src: shotCaverns, title: "MOSSY CAVERNS", caption: "Leap across glowing ledges and torch-lit caves" },
  { src: shotPause, title: "PAUSE MENU", caption: "Gothic pause menu with sound & music controls" }
];

export default function GameSection() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeShot, setActiveShot] = useState(0);

  const goShot = (dir) => {
    sound.playHover();
    setActiveShot((prev) => (prev + dir + screenshots.length) % screenshots.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.game-header-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        '.game-cinematic-card',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.game-cinematic-card',
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featureTabs = [
    {
      id: "world",
      label: "WORLD DISCOVERY",
      icon: <Compass size={18} />,
      title: "ATMOSPHERIC PIXEL WORLD",
      badge: "[ENVIRONMENT PREVIEW]",
      desc: "Pandora's Box is a 2D fantasy action-adventure game exploring high-contrast nocturnal crypts, monolithic shrines, and atmospheric moonlight realms.",
      placeholderTag: "[GAME OVERVIEW]"
    },
    {
      id: "combat",
      label: "RUNIC COMBAT",
      icon: <Swords size={18} />,
      title: "TACTICAL BLADEPLAY & SPELLCASTING",
      badge: "[COMBAT PREVIEW]",
      desc: "Harness celestial energy infused within ancient blades to parry relentless crypt guardians, unseal enchanted barriers, and counter awakening evils.",
      placeholderTag: "[GAMEPLAY INFORMATION]"
    },
    {
      id: "mystery",
      label: "ANCIENT MYSTERY",
      icon: <Eye size={18} />,
      title: "THE ENIGMA OF THE SEAL",
      badge: "[MYSTERY PREVIEW]",
      desc: "Decipher arcane glyphs and unlock the mechanisms of the legendary relic. Every chamber holds forgotten relics and pivotal choices.",
      placeholderTag: "[GAME DESCRIPTION]"
    }
  ];

  return (
    <section id="game" className="game-section" ref={sectionRef}>
      {/* Background Ambience */}
      <div className="game-ambient-light" />

      <div className="section-wrapper">
        {/* Section Header */}
        <div className="game-section-header">
          <div className="section-kicker font-pixel-ui game-header-anim">
            <span className="kicker-seal">❖</span>
            <span>EXPERIENCE OVERVIEW</span>
            <span className="placeholder-tag">[GAME OVERVIEW]</span>
          </div>

          <h2 className="game-section-title font-pixel-title game-header-anim">
            ENTER THE MYSTICAL <span className="text-cyan-glow">REALM</span>
          </h2>

          <p className="game-section-intro font-body game-header-anim">
            Pandora's Box is a 2D fantasy action-adventure game crafted with atmospheric pixel art,
            evocative gothic architecture, and mysterious runic sorcery.
          </p>
        </div>

        {/* Cinematic Showcase Container */}
        <div className="game-cinematic-card pixel-box">
          {/* Top Feature Selector Tabs */}
          <div className="game-feature-tabs">
            {featureTabs.map((tab, idx) => (
              <button
                key={tab.id}
                className={`feature-tab-btn font-pixel-ui ${activeTab === idx ? 'is-active' : ''}`}
                onClick={() => {
                  sound.playHover();
                  setActiveTab(idx);
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === idx && <span className="tab-active-indicator" />}
              </button>
            ))}
          </div>

          {/* Main Visual Display Area */}
          <div className="game-display-grid">
            {/* Left: Cinematic Pixel Art Frame */}
            <div className="game-art-frame">
              <div className="game-art-viewport">
                {screenshots.map((shot, i) => (
                  <img
                    key={shot.src}
                    src={shot.src}
                    alt={shot.title}
                    className={`game-art-img ${i === activeShot ? 'is-visible' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                ))}

                <button
                  className="shot-nav-btn shot-prev"
                  onClick={() => goShot(-1)}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="shot-nav-btn shot-next"
                  onClick={() => goShot(1)}
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={22} />
                </button>

                <div className="shot-caption font-pixel-ui">
                  <strong>{screenshots[activeShot].title}</strong>
                  <span>{screenshots[activeShot].caption}</span>
                </div>

                {/* Artwork Watermark / Frame Tags */}
                <div className="art-frame-badges">
                  <span className="art-badge-item font-pixel-ui">2D PIXEL CANVAS</span>
                  <span className="art-badge-item font-pixel-ui text-cyan-glow">
                    {featureTabs[activeTab].badge}
                  </span>
                </div>
              </div>

              <div className="shot-thumbs">
                {screenshots.map((shot, i) => (
                  <button
                    key={shot.src}
                    className={`shot-thumb ${i === activeShot ? 'is-active' : ''}`}
                    onClick={() => { sound.playHover(); setActiveShot(i); }}
                    aria-label={`Show ${shot.title}`}
                  >
                    <img src={shot.src} alt="" loading="lazy" draggable={false} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Dynamic Info Panel */}
            <div className="game-info-panel">
              <div className="panel-badge-row">
                <span className="panel-tag font-pixel-ui">{featureTabs[activeTab].placeholderTag}</span>
                <span className="panel-id font-pixel-ui">CHAMBER 0{activeTab + 1}</span>
              </div>

              <h3 className="panel-title font-fantasy text-cyan-glow">
                {featureTabs[activeTab].title}
              </h3>

              <p className="panel-desc">
                {featureTabs[activeTab].desc}
              </p>

              {/* Dynamic Feature Checklist */}
              <div className="panel-spec-list">
                <div className="spec-item">
                  <span className="spec-bullet font-pixel-ui">◆</span>
                  <div>
                    <strong className="font-pixel-ui">ARTWORK MOOD:</strong>
                    <p className="font-body">Gothic graveyard silhouettes, pale moonlight & cyan runic glow.</p>
                  </div>
                </div>

                <div className="spec-item">
                  <span className="spec-bullet font-pixel-ui">◆</span>
                  <div>
                    <strong className="font-pixel-ui">[GAMEPLAY INFORMATION]:</strong>
                    <p className="font-body">[MODULAR PLACEHOLDER - Ready for Spring Boot dynamic payload]</p>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="panel-footer-action">
                <a
                  href="#story"
                  className="pixel-btn"
                  onMouseEnter={() => sound.playHover()}
                >
                  <Sparkles size={16} />
                  <span>UNCOVER THE LORE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
