import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressCircle = () => {
  const { scrollYProgress } = useScroll();

  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  return (
    <div className="fixed z-50 top-12 right-4 sm:top-16 sm:right-8 md:top-24 md:right-16">
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16" 
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="5"
          className="opacity-70"
        />

        {/* Progress Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#1B4332"
          strokeWidth="5"
          strokeDasharray="282.6"
          strokeDashoffset="282.6"
          style={{
            pathLength: smoothProgress,
          }}
          className="transition-all ease-linear"
        />
      </svg>
    </div>
  );
};

export default ScrollProgressCircle;
