import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ count = 45, speed = 0.4, density = 'normal' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.floor(count * 0.4) : count;

    // Create particles
    const particles = Array.from({ length: actualCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * speed + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseVal: Math.random() * Math.PI,
      isSquare: Math.random() > 0.4 // Pixel feeling: some square particles
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        // Reset if off top or sides
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse subtle repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal));
        ctx.fillStyle = `rgba(0, 243, 255, ${currentOpacity})`;

        if (p.isSquare) {
          // Pixelated square particle
          const s = Math.round(p.size * 1.5);
          ctx.fillRect(Math.round(p.x), Math.round(p.y), s, s);
        } else {
          // Round ember
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    render();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, speed, density]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    />
  );
}
