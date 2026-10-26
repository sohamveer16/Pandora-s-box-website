import React, { useEffect, useRef } from 'react';
import '../styles/CustomCursor.css';

const INTERACTIVE = 'button, a, input, textarea, select, label, .interactive-target, .pixel-btn';

/**
 * Custom cursor — moved with a ref + requestAnimationFrame instead of React state,
 * so moving the mouse no longer re-renders React on every pixel.
 */
export default function CustomCursor() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    let x = -100;
    let y = -100;
    let rafId = null;
    let hovered = false;

    const paint = () => {
      rafId = null;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = '1';
      if (rafId === null) rafId = requestAnimationFrame(paint);
    };

    const onOver = (e) => {
      const isInteractive = !!(e.target.closest && e.target.closest(INTERACTIVE));
      if (isInteractive !== hovered) {
        hovered = isInteractive;
        el.classList.toggle('is-hovered', isInteractive);
      }
    };

    const onDown = () => el.classList.add('is-clicked');
    const onUp = () => el.classList.remove('is-clicked');
    const onLeave = () => { el.style.opacity = '0'; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className="custom-cursor-container" style={{ opacity: 0 }}>
      <div className="cursor-dot" />
      <div className="cursor-ring">
        <span className="ring-corner tl"></span>
        <span className="ring-corner tr"></span>
        <span className="ring-corner bl"></span>
        <span className="ring-corner br"></span>
      </div>
    </div>
  );
}
