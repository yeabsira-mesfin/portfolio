import { useEffect, useRef } from "react";
import "./CyberCursorTrail.css";

const trailSteps = [0, 1, 2, 3];

export default function CyberCursorTrail() {
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!overlay) return undefined;

    const elements = [
      overlay.querySelector("[data-cyber-head]"),
      ...overlay.querySelectorAll("[data-cyber-particle]"),
    ];
    const particles = elements.map((element, index) => ({
      element,
      x: 0,
      y: 0,
      ease: index === 0 ? 0.38 : 0.26 - index * 0.032,
    }));

    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let initialized = false;
    let visible = false;

    const position = (particle) => {
      particle.element.style.transform =
        `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%)`;
    };

    const animate = () => {
      frame = 0;
      if (!visible) return;

      let moving = false;
      particles.forEach((particle, index) => {
        const previous = particles[index - 1];
        const nextX = index === 0 ? targetX : previous.x;
        const nextY = index === 0 ? targetY : previous.y;
        const dx = nextX - particle.x;
        const dy = nextY - particle.y;

        if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
          moving = true;
        }

        particle.x += dx * particle.ease;
        particle.y += dy * particle.ease;
        position(particle);
      });

      if (moving) frame = window.requestAnimationFrame(animate);
    };

    const hide = () => {
      visible = false;
      overlay.classList.remove("is-visible");
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const move = (event) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }

      // Offset from the native cursor so buttons and text stay clear.
      targetX = event.clientX + 19;
      targetY = event.clientY + 19;
      if (!initialized) {
        particles.forEach((particle) => {
          particle.x = targetX;
          particle.y = targetY;
          position(particle);
        });
        initialized = true;
      }

      visible = true;
      overlay.classList.add("is-visible");
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    finePointer.addEventListener("change", hide);
    reducedMotion.addEventListener("change", hide);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      finePointer.removeEventListener("change", hide);
      reducedMotion.removeEventListener("change", hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={overlayRef} className="cyber-cursor-overlay" aria-hidden="true">
      <span className="cyber-cursor-head" data-cyber-head>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2 20 5.5v6.2c0 5.1-3.3 8.5-8 10.3-4.7-1.8-8-5.2-8-10.3V5.5L12 2Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {trailSteps.map((step) => (
        <span className={`cyber-cursor-particle cyber-cursor-particle-${step + 1}`} data-cyber-particle key={step} />
      ))}
    </div>
  );
}
