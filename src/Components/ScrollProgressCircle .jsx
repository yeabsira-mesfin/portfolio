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
       
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white" 
          strokeWidth="5"
          className="opacity-70"
        />

       
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
