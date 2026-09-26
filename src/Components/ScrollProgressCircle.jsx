import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressCircle = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.45,
  });

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 hidden items-center gap-3 rounded-full border border-white/10 bg-[#0b0c0e]/75 px-3 py-2 text-white/35 backdrop-blur-xl md:flex">
      <svg className="h-7 w-7 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
        <motion.circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="#d9ff43"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          style={{ pathLength: smoothProgress }}
        />
      </svg>
      <span className="font-mono text-[8px] font-black uppercase tracking-[0.18em]">scroll signal</span>
    </div>
  );
};

export default ScrollProgressCircle;
