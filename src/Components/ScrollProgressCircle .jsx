import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressCircle = () => {
  // Capture scroll progress (from 0 to 1)
  const { scrollYProgress } = useScroll();

  // Smooth the scroll progress with a spring effect
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  return (
    <div className="fixed top-10 right-10">
      <svg className="w-16 h-16">
        {/* Background Circle */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#e5e7eb" /* Light gray color */
          strokeWidth="4"
          fill="none"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="#10b981" /* Tailwind green */
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          style={{
            pathLength: smoothProgress, // Link scroll progress to circle's stroke
          }}
        />
      </svg>
    </div>
  );
};

export default ScrollProgressCircle;
