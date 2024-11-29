import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden text-white bg-dark-green">
      {/* Background Animations: Glowing Circles */}
      <motion.div
        className="absolute top-0 left-0 z-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {/* Floating circles */}
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute w-32 h-32 rounded-full bg-green-500 opacity-20`}
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, Math.random() * 100, 0],
              x: [0, Math.random() * 100, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Hero Content */}
      <div className="z-10 text-center">
        <motion.h1
          className="text-6xl font-bold md:text-7xl"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          Welcome to My Portfolio
        </motion.h1>
        <motion.p
          className="mt-4 text-xl text-green-300 md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
        >
          Crafting Elegant Web Experiences with Modern Technologies
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;
