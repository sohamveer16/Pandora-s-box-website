import React, { useEffect, useRef } from 'react';
import { sound } from '../services/audio';
import { gameInfo } from '../data/game';
import graveyardBg from '../assets/backgrounds/graveyard-bg.svg';
import magicCircle from '../assets/backgrounds/magic-circle.svg';
import heroChampion from '../assets/characters/hero-champion.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Shield, ChevronDown, Flame } from 'lucide-react';
import '../styles/Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const parallaxBgRef = useRef(null);
  const parallaxMidRef = useRef(null);
  const parallaxFgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        '.hero-main-title',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.4"
      )
      .fromTo(
        '.hero-desc-box',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        '.hero-cta-group',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        '.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );

      // ScrollTrigger Parallax
      gsap.to(parallaxBgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to(parallaxMidRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, heroRef);

    // Desktop Mouse Parallax
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX - innerWidth / 2) / innerWidth;
      const yOffset = (e.clientY - innerHeight / 2) / innerHeight;

      if (parallaxMidRef.current) {
        parallaxMidRef.current.style.transform = `translate3d(${xOffset * -15}px, ${yOffset * -10}px, 0)`;
      }
      if (parallaxFgRef.current) {
        parallaxFgRef.current.style.transform = `translate3d(${xOffset * 20}px, ${yOffset * 15}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* Parallax Layer 1: Sky & Moonlight */}
      <div className="hero-parallax-layer layer-bg" ref={parallaxBgRef}>
        <img
          src={graveyardBg}
          alt="Atmospheric Nocturnal Backdrop"
          className="hero-backdrop-img"
        />
      </div>

      {/* Parallax Layer 2: Gothic Monoliths & Summon Circle */}
      <div className="hero-parallax-layer layer-mid" ref={parallaxMidRef}>
        <div className="hero-magic-platform">
          <img
            src={magicCircle}
            alt="Magic Summon Circle"
            className="hero-circle-img"
          />
        </div>
      </div>

      {/* Parallax Layer 3: Foreground Champion Silhouette & Glow */}
      <div className="hero-parallax-layer layer-fg" ref={parallaxFgRef}>
        <div className="hero-champion-silhouette">
          <img
            src={heroChampion}
            alt="Protagonist Champion"
            className="hero-champion-img"
          />
        </div>
      </div>

      {/* Atmospheric Mist Overlays */}
      <div className="hero-mist-overlay" />

      {/* Hero Cinematic Main Container */}
      <div className="section-wrapper hero-content-container">
        <div className="hero-header-stack">
          {/* Genre / Tagline Badge */}
          <div className="hero-badge font-pixel-ui">
            <span className="badge-rune">ᚲ</span>
            <span className="badge-text">{gameInfo.genre}</span>
            <span className="placeholder-tag">[PREVIEW BUILD]</span>
          </div>

          {/* Main Hero Game Title */}
          <h1 className="hero-main-title font-pixel-title">
            <span className="title-lead">THE LEGEND OF</span>
            <span className="title-core text-cyan-glow">{gameInfo.title}</span>
          </h1>

          {/* Cinematic Short Description Container */}
          <div className="hero-desc-box pixel-box">
            <div className="desc-header">
              <span className="desc-dot active" />
              <span className="desc-tag font-pixel-ui">{gameInfo.descriptionPlaceholder}</span>
            </div>
            <p className="hero-desc-text">
              {gameInfo.overview}
            </p>
            <div className="desc-footer-note font-pixel-ui">
              <Sparkles size={14} className="note-icon text-cyan-glow" />
              <span>[REPLACEABLE MARKETING HOOK & LORE COPY]</span>
            </div>
          </div>

          {/* Flexible Action CTA Buttons */}
          <div className="hero-cta-group">
            <a
              href="#pre-register"
              className="pixel-btn primary hero-primary-cta"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playSelect()}
            >
              <Flame size={18} className="cta-icon" />
              <span>{gameInfo.primaryCtaText}</span>
              <span className="placeholder-tag small">[PRIMARY CTA]</span>
            </a>

            <a
              href="#game"
              className="pixel-btn hero-secondary-cta"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playSelect()}
            >
              <Shield size={18} className="cta-icon" />
              <span>{gameInfo.secondaryCtaText}</span>
              <span className="placeholder-tag small">[SECONDARY CTA]</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <a
            href="#game"
            className="scroll-down-link font-pixel-ui"
            onClick={() => sound.playHover()}
          >
            <span>SCROLL TO ENTER REALM</span>
            <ChevronDown size={18} className="scroll-arrow-anim" />
          </a>
        </div>
      </div>
    </section>
  );
}
