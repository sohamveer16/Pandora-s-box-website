import React, { useEffect, useRef } from 'react';
import { characterData } from '../data/character';
import { sound } from '../services/audio';
import magicCircle from '../assets/backgrounds/magic-circle.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import '../styles/CharacterSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function CharacterSection() {
  const sectionRef = useRef(null);
  const characterCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.char-header-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      // Dramatic character artwork entrance
      gsap.fromTo(
        '.char-visual-stage',
        { opacity: 0, x: -40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: characterCardRef.current,
            start: 'top 80%'
          }
        }
      );

      // Lore & Stats dossier reveal
      gsap.fromTo(
        '.char-dossier-content',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: characterCardRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="character" className="character-section" ref={sectionRef}>
      {/* Background radial atmosphere */}
      <div className="char-ambient-orb" />

      <div className="section-wrapper">
        {/* Section Header */}
        <div className="character-section-header">
          <div className="section-kicker font-pixel-ui char-header-anim">
            <User size={16} className="text-cyan-glow" />
            <span>PRIMARY CHAMPION</span>
            <span className="placeholder-tag">[CHARACTER SHOWCASE]</span>
          </div>

          <h2 className="character-section-title font-pixel-title char-header-anim">
            THE CHOSEN <span className="text-cyan-glow">WARRIOR</span>
          </h2>

          <p className="character-section-subtitle font-body char-header-anim">
            Bearer of celestial blade and ancient courage. An easily replaceable character profile
            framework engineered for modular data expansion.
          </p>
        </div>

        {/* Dramatic Character Showcase Container */}
        <div className="character-showcase-grid" ref={characterCardRef}>
          {/* Left Column: Dramatic Pixel Artwork Stage with Aura */}
          <div className="char-visual-stage pixel-box">
            <div className="char-stage-glow" />

            {/* Character Artwork */}
            <div className="char-img-container">
              <img
                src={characterData.image}
                alt={characterData.name}
                className="char-main-sprite"
              />
            </div>

            {/* Stage Ground Runic Platform */}
            <div className="char-stage-platform">
              <img
                src={magicCircle}
                alt="Summoning circle"
                className="platform-ring-img"
              />
            </div>

            {/* Watermark Tag */}
            <div className="char-tag-overlay font-pixel-ui">
              <span>STATUS: [AWAKENED]</span>
              <span className="text-cyan-glow">PORTRAIT 01</span>
            </div>
          </div>

          {/* Right Column: Character Lore Dossier */}
          <div className="char-dossier-content pixel-box">
            {/* Header / ID */}
            <div className="dossier-id-row">
              <span className="dossier-badge font-pixel-ui">{characterData.role}</span>
              <span className="placeholder-tag">{characterData.descriptionPlaceholder}</span>
            </div>

            <h3 className="dossier-name font-pixel-title text-cyan-glow">
              {characterData.name}
            </h3>

            <h4 className="dossier-title font-fantasy">
              {characterData.title}
            </h4>

            {/* Description Text */}
            <p className="dossier-description font-body">
              {characterData.fullDescription}
            </p>

            {/* Quote */}
            <blockquote className="dossier-quote font-pixel-ui">
              {characterData.quote}
            </blockquote>

            {/* Attributes Matrix */}
            <div className="dossier-attributes-matrix">
              {characterData.attributes.map((attr, idx) => (
                <div key={idx} className="matrix-cell">
                  <span className="attr-label font-pixel-ui">{attr.label}</span>
                  <span className="attr-value font-pixel-ui text-cyan-glow">{attr.value}</span>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="dossier-footer">
              <a
                href="#pre-register"
                className="pixel-btn primary"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playSelect()}
              >
                <Sparkles size={16} />
                <span>RALLY WITH CHAMPION</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
