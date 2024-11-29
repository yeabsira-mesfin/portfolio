import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-white bg-gradient-to-br from-green-600 to-blue-600">
      {/* Floating Points */}
      <motion.div
        className="absolute w-16 h-16 bg-white rounded-full top-10 left-10 opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-20 h-20 bg-white rounded-full bottom-20 right-20 opacity-30"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Main Hero Content */}
      <motion.h1
        className="text-5xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to My Portfolio
      </motion.h1>
      <motion.p
        className="mt-4 text-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Scroll to explore
      </motion.p>
    </div>
  );
};

export default HeroSection;
