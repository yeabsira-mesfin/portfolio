import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Code from '../images/Coding.png';
import Exercise from '../images/Exercising.jpg';
import Football from '../images/Football.jpg';
import Hiking from '../images/Hikinggg.jpg';
import Reading from '../images/Reading.jpeg';
import VideoGames from '../images/VideoGames.jpg';

// Hobby data
const hobbies = [
  { name: "Coding", image: Code },
  { name: "Exercising", image: Exercise },
  { name: "Football", image: Football },
  { name: "Hiking", image: Hiking },
  { name: "Reading", image: Reading },
  { name: "Video Games", image: VideoGames },
];

const Hobbies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hobbies.length); // Loop the images
    }, 3500); // 3500 ms = 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hobbies" className="bg-[#1B4332] text-white py-16 px-8 relative">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        key={currentIndex}
        style={{
          backgroundImage: `url(${hobbies[currentIndex].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
      ></motion.div>

      <div className="z-10 max-w-5xl mx-auto space-y-6 text-center">
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
              <motion.div
                className="flex flex-col items-center justify-center w-full h-full text-white bg-center bg-cover shadow-lg"
                style={{
                  backgroundImage: `url(${hobbies[currentIndex].image})`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Caption at the bottom-left */}
                <div className="absolute bottom-0 left-0 w-full py-4 text-left bg-opacity-50 bg-green-950">
                  <h3 className="pl-4 text-2xl font-semibold">{hobbies[currentIndex].name}</h3>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
