import React from "react";
import { motion } from "framer-motion";
import myImage from "../images/MyPicture.png";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen pt-24 pb-16 overflow-hidden text-white bg-dark-green">
      
      {/* Background Animations */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-32 h-32 bg-white rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 80, 0],
              x: [0, 80, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        
        {/* Profile Image */}
        <motion.div
          className="w-48 p-2 mx-auto mb-8 bg-white rounded-full shadow-2xl sm:w-56 md:w-64 aspect-square"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={myImage}
            alt="Profile"
            className="object-cover w-full h-full rounded-full"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="
            font-bold 
            text-[clamp(2.2rem,5vw,3.75rem)]
            leading-tight
            tracking-tight
          "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Software Engineer
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="
            mt-4 
            text-[clamp(1.25rem,3vw,1.75rem)]
            font-semibold
            text-[#d2f5e3]
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          Web Development & Cybersecurity Foundations
        </motion.h2>

        {/* Description */}
        {/* <motion.p
          className="
            mt-4 
            text-base sm:text-lg 
            text-[#c7eedc]
            max-w-2xl 
            mx-auto
          "
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Focused on secure, user-friendly applications and practical security analysis.
        </motion.p> */}

        {/* CTA Buttons (optional) */}
        {/* Add buttons here if you want */}
      </div>
    </section>
  );
};

export default HeroSection;
