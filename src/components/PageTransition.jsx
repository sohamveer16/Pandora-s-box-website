import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/PageTransition.css';

export default function PageTransition({ isTransitioning, targetSection, onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isTransitioning) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (targetSection && targetSection !== 'home') {
            const el = document.getElementById(targetSection);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          if (onComplete) onComplete();
        }
      });

      // Runic seal flash and pixel curtain wipe
      tl.to('.transition-flash-overlay', {
        opacity: 0.9,
        duration: 0.35,
        ease: 'power2.in'
      })
      .to('.transition-pixel-col', {
        scaleY: 1,
        stagger: 0.04,
        duration: 0.4,
        ease: 'power3.inOut'
      }, "-=0.15")
      .to('.transition-flash-overlay', {
        opacity: 0,
        duration: 0.3
      })
      .to('.transition-pixel-col', {
        scaleY: 0,
        transformOrigin: 'bottom',
        stagger: 0.04,
        duration: 0.45,
        ease: 'power3.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isTransitioning, targetSection, onComplete]);

  if (!isTransitioning) return null;

  return (
    <div className="page-transition-container" ref={containerRef}>
      {/* Cyan magical energy flash */}
      <div className="transition-flash-overlay" />

      {/* Retro Pixel Columns Wipe */}
      <div className="transition-pixel-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="transition-pixel-col" style={{ '--col-idx': i }}>
            <span className="col-rune">ᚲᛏᛉᚱᛊᚦᚨᚺ</span>
          </div>
        ))}
      </div>
    </div>
  );
}
