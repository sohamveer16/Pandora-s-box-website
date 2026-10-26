import React, { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameSection from './components/GameSection';
import StorySection from './components/StorySection';
import CharacterSection from './components/CharacterSection';
import PreRegister from './components/PreRegister';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import { sound } from './services/audio';
import './styles/index.css';

export default function App() {
  // Application mode: 'title' (nostalgic opening title screen) or 'website' (interactive game portal)
  const [currentMode, setCurrentMode] = useState('title');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState(null);

  /**
   * Transition from Title Screen into Website
   */
  const handleEnterSite = (sectionId = 'home') => {
    setTargetSection(sectionId);
    setIsTransitioning(true);
  };

  /**
   * Complete transition callback after GSAP curtain wipe
   */
  const handleTransitionComplete = () => {
    setCurrentMode('website');
    setIsTransitioning(false);
  };

  /**
   * Return back to Title Screen
   */
  const handleReturnToTitle = () => {
    sound.playSelect();
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentMode('title');
  };

  return (
    <div className="game-app-root">
      {/* Subtle Retro Scanline Overlay */}
      <div className="scanline-overlay" />

      {/* Custom Desktop Magical Pixel Cursor */}
      <CustomCursor />

      {/* Cyan Magical Particles & Floating Embers */}
      <ParticleBackground count={currentMode === 'title' ? 35 : 45} />

      {/* Page Transition Effect (Pixel fragmentation & flash wipe) */}
      <PageTransition
        isTransitioning={isTransitioning}
        targetSection={targetSection}
        onComplete={handleTransitionComplete}
      />

      {/* Mode 1: Initial Nostalgic Title Screen */}
      {currentMode === 'title' && (
        <TitleScreen onEnterSite={handleEnterSite} />
      )}

      {/* Mode 2: Main Website Experience */}
      {currentMode === 'website' && (
        <div className="main-website-layout">
          {/* Dynamic Floating Navbar */}
          <Navbar onReturnToTitle={handleReturnToTitle} />

          {/* 1. Cinematic Hero Framework with Parallax */}
          <Hero />

          {/* 2. Game Overview & Artwork Showcase */}
          <GameSection />

          {/* 3. Story & Lore Chapters */}
          <StorySection />

          {/* 4. Primary Character Showcase */}
          <CharacterSection />

          {/* 5. Pre-Registration Ritual Altar Form */}
          <PreRegister />

          {/* 6. Footer & Return Options */}
          <Footer onReturnToTitle={handleReturnToTitle} />
        </div>
      )}
    </div>
  );
}
