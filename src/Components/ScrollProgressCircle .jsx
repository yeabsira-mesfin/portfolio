import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollProgressCircle = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min((scrollTop / docHeight) * 100, 100); // Clamped between 0-100
      setScrollY(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed z-50 top-20 right-8" // Adjusted top margin for a defined spacing
      style={{ width: "80px", height: "80px" }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ transform: "rotate(-90deg)" }} // Ensures the progress starts from the top
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#2d2d2d" // Background stroke color
          strokeWidth="10"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#00C853" // Progress stroke color
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: "0, 282" }} // 2πr ≈ 282
          animate={{
            strokeDasharray: `${(scrollY / 100) * 282}, 282`,
          }}
        />
      </svg>
    </div>
  );
};

export default ScrollProgressCircle;
