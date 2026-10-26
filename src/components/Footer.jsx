import React from 'react';
import { sound } from '../services/audio';
import { gameInfo } from '../data/game';
import { ChevronUp, Shield, Terminal } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer({ onReturnToTitle }) {
  const scrollToTop = () => {
    sound.playHover();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="game-footer">
      <div className="section-wrapper footer-content-grid">
        {/* Left Column: Brand & Disclaimer */}
        <div className="footer-brand-col">
          <div className="footer-brand-header">
            <img src="/box-icon.svg" alt="Emblem" className="footer-emblem" />
            <span className="footer-title font-pixel-ui">
              PANDORA'S <span className="text-cyan-glow">BOX</span>
            </span>
          </div>

          <p className="footer-disclaimer font-body">
            A 2D pixel-art fantasy action-adventure game. University Prototype Build.
            All artwork compositions and frontend architecture created specifically for the project.
          </p>

          <div className="footer-backend-readiness font-pixel-ui">
            <Terminal size={14} className="text-cyan-glow" />
            <span>JAVA SPRING BOOT REST READY // FRONTEND PROTOTYPE</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading font-pixel-ui">NAVIGATION</h4>
          <ul className="footer-link-list">
            {gameInfo.footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="footer-link font-pixel-ui"
                  onClick={() => sound.playHover()}
                >
                  <span className="link-arrow">›</span> {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Actions & Back to top */}
        <div className="footer-actions-col">
          <h4 className="footer-col-heading font-pixel-ui">PORTAL SEALS</h4>
          
          {onReturnToTitle && (
            <button
              onClick={() => {
                sound.playHover();
                onReturnToTitle();
              }}
              className="pixel-btn footer-title-btn font-pixel-ui"
            >
              <span>RETURN TO TITLE SCREEN</span>
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="footer-scroll-top-btn font-pixel-ui"
            title="Ascend to Top"
          >
            <ChevronUp size={18} />
            <span>ASCEND TO APEX</span>
          </button>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="section-wrapper footer-bottom-inner">
          <span className="copyright-text font-pixel-ui">
            © 2026 PANDORA'S BOX // ALL MYTHS RESERVED
          </span>
          <span className="placeholder-tag small font-pixel-ui">
            [PREVIEW STAGE // PLACEHOLDER REPOSITORY]
          </span>
        </div>
      </div>
    </footer>
  );
}
