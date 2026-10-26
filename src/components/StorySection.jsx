import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../services/audio';
import { storyData } from '../data/story';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Sparkles, Key } from 'lucide-react';
import '../styles/StorySection.css';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-header-anim',
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

      gsap.fromTo(
        '.story-tablet-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.story-grid-container',
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" className="story-section" ref={sectionRef}>
      {/* Mystic runic background texture */}
      <div className="story-bg-glyphs">
        <span>ᚦ</span>
        <span>ᛉ</span>
        <span>ᚨ</span>
        <span>ᚱ</span>
      </div>

      <div className="section-wrapper">
        {/* Section Header */}
        <div className="story-section-header">
          <div className="section-kicker font-pixel-ui story-header-anim">
            <BookOpen size={16} className="text-cyan-glow" />
            <span>THE ARCHIVES</span>
            <span className="placeholder-tag">[STORY PLACEHOLDER]</span>
          </div>

          <h2 className="story-section-title font-pixel-title story-header-anim">
            TALES OF THE <span className="text-cyan-glow">SEALED VESSEL</span>
          </h2>

          <p className="story-section-subtitle font-body story-header-anim">
            An enigma slumbering beneath crumbling mausoleums. The mythologies below represent
            flexible placeholder narratives designed for seamless replacement upon canon finalization.
          </p>
        </div>

        {/* 3 Mystic Monolith / Tablet Cards */}
        <div className="story-grid-container">
          {storyData.chapters.map((chapter, idx) => {
            const isHovered = activeCard === idx;
            return (
              <div
                key={chapter.id}
                className={`story-tablet-card pixel-box ${isHovered ? 'is-active-tablet' : ''}`}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveCard(idx);
                }}
              >
                {/* Ancient Rune Top Seal */}
                <div className="tablet-rune-seal">
                  <span className="rune-glyph font-fantasy">{chapter.runicSymbol}</span>
                  <div className="rune-aura" />
                </div>

                {/* Chapter Badge */}
                <div className="tablet-badge-row">
                  <span className="chapter-badge font-pixel-ui">{chapter.badge}</span>
                  <span className="placeholder-tag small">{chapter.hookPlaceholder}</span>
                </div>

                {/* Title */}
                <h3 className="tablet-title font-pixel-ui text-cyan-glow">
                  {chapter.title}
                </h3>

                {/* Story Summary */}
                <p className="tablet-summary font-body">
                  {chapter.summary}
                </p>

                {/* Ancient Inscription Quote */}
                <blockquote className="tablet-quote font-fantasy">
                  {chapter.quote}
                </blockquote>

                {/* Interactive Status Indicator */}
                <div className="tablet-footer font-pixel-ui">
                  <span className="tablet-status-dot" />
                  <span>SEAL STATUS: [DORMANT]</span>
                </div>

                {/* Card Corner Runes */}
                <span className="tablet-corner t-tl">⌜</span>
                <span className="tablet-corner t-tr">⌝</span>
                <span className="tablet-corner t-bl">⌞</span>
                <span className="tablet-corner t-br">⌟</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Lore Note */}
        <div className="story-bottom-note pixel-box">
          <Key size={18} className="text-cyan-glow" />
          <p className="font-pixel-ui">
            [NOTE: FINAL CANON LORE, CHARACTER ROSTERS, AND WORLD MAPS WILL BE BOUND VIA THE REST API ONCE WRITTEN]
          </p>
        </div>
      </div>
    </section>
  );
}
