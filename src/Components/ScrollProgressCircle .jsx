import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressCircle = () => {
  const { scrollYProgress } = useScroll();

  // Smooth out the progress using a spring transition
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  return (
    <div className="fixed z-50 top-16 right-16">
      <svg
        className="w-16 h-16"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white" /* Adjusted to hero section color */
          strokeWidth="5"
          className="opacity-70"
        />

        {/* Smooth Progress Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#243d27" /* Progress stroke color */
          strokeWidth="5"
          strokeDasharray="282.6"
          strokeDashoffset="282.6"
          style={{
            pathLength: smoothProgress, // Use smooth progress for smooth animation
          }}
          className="transition-all ease-linear"
        />
      </svg>
    </div>
  );
};

export default ScrollProgressCircle;
