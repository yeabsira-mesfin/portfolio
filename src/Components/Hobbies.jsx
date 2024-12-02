import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hobby data
const hobbies = [
  { name: "Coding", image: "/images/coding.jpg" },
  { name: "Exercising", image: "/images/exercising.jpg" },
  { name: "Football", image: "/images/football.jpg" },
  { name: "Hiking", image: "/images/hiking.jpg" },
  { name: "Reading", image: "/images/reading.jpg" },
  { name: "Video Games", image: "/images/video-games.jpg" },
];

const Hobbies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hobbies.length);
    }, 15000); // 15000 ms = 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hobbies" className="bg-[#243d27] text-white py-16 px-8">
      <div className="max-w-5xl mx-auto space-y-6 text-center">
        <h2 className="text-3xl font-bold">Hobbies</h2>

        {/* Slider Container */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg h-96">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            >
              {/* Slide Content */}
              <div
                className="flex flex-col items-center justify-center w-full h-full text-white bg-center bg-cover shadow-lg"
                style={{ backgroundImage: `url(${hobbies[currentIndex].image})` }}
              >
                <div className="w-full py-4 text-center bg-black bg-opacity-50">
                  <h3 className="text-2xl font-semibold">{hobbies[currentIndex].name}</h3>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
