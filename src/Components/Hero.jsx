import React from "react";
import { motion } from "framer-motion";
import myImage from "../images/MyPicture.png";

const HeroSection = () => {
  return (
    <div className="h-[75vh] bg-dark-green text-white flex items-center justify-center relative overflow-hidden mt-16">
      {/* Background Animations */}
      <motion.div
        className="absolute top-0 left-0 z-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-32 h-32 bg-white rounded-full opacity-20"
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
      <div className="z-10 px-6 text-center">
        <motion.div
          className="relative p-1 mx-auto mb-8 overflow-hidden bg-white rounded-full shadow-2xl w-80 h-80"
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-full">
            <img
              src={myImage}
              alt="Your Name"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
        <motion.h1
          className="text-5xl font-bold md:text-6xl"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          Hi, I'm Yeabsira Mesfin
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
        >
          A Web Developer Specializing in React.js & Modern Technologies
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;
