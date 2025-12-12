import React from "react";
import { motion } from "framer-motion";
import AM from '../images/AM.png'
import EM from '../images/EM.png'
import BE from '../images/BE.png'
import FE from '../images/FE.png'
import MA from '../images/MA.png'
import UX from '../images/UX.png'
import WD from '../images/WD.png'

const highlightsData = [
  {
    title: "Full-Stack Web Development",
    img: BE,
    description: "Experience in building end-to-end web applications."
  },
  {
    title: "Secure Web Application Design (entry-level)",
    img: WD,
    description: "Foundation in safe data handling and input validation."
  },
  {
    title: "Client & Cross-Functional Collaboration",
    img: AM,
    description: "Experience working with clients and teams to deliver solutions."
  },
  {
    title: "Data Organization & Reporting Dashboards",
    img: MA,
    description: "Presenting key metrics, trends, and usage insights."
  },
  {
    title: "UX-Focused Engineering",
    img: UX,
    description: "Prioritizing user experience and accessibility."
  }
];
  


const ExperienceHighlights = () => {
  return (
    <section id="experience-highlights" className="py-16 px-8 bg-gray-50 text-[#1B4332]">
      <div className="mx-auto text-center max-w-7xl">
        <h2 className="mb-8 text-4xl font-bold">Experience Highlights</h2>
        <p className="mb-12 text-lg">
          Key areas where I bring value as an entry-level engineer.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlightsData.map((item, index) => (
            <motion.div
              key={item.title}
              className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-semibold">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceHighlights;
