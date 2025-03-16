import React from "react";
import { motion } from "framer-motion";
import AM from '../images/AM.png'
import EM from '../images/EM.png'
import BE from '../images/BE.png'
import FE from '../images/FE.png'
import MA from '../images/MA.png'
import UX from '../images/UX.png'
import WD from '../images/WD.png'

const servicesData = [
    {
      title: "Account Management",
      img: AM,
      description:
        "Effectively managing client accounts, fostering strong relationships, and ensuring their needs are met with customized solutions.",
    },
    {
      "title": "Data Entry & Management",
      "img": FE,
      "description": "Accurately inputting, organizing, and managing data to ensure efficiency, consistency, and easy accessibility for businesses."
    }
, 
   
    {
      "title": "Event Tech Solutions",
      "img": EM,
      "description": "Utilizing Cvent and SpotMe to streamline event planning, execution, and attendee engagement through innovative technology solutions."
    }
,    
    {
      "title": "Full Stack Development",
      "img": BE,
      "description": "Designing and developing end-to-end web applications with intuitive user interfaces, scalable backend systems, and seamless API integration."
    },
     
    {
      title: "UX/UI Design",
      img: UX,
      description:
        "Designing intuitive, user-centered interfaces and experiences that captivate and enhance usability.",
    },
    {
      title: "Web Design",
      img: WD,
      description:
        "Crafting visually stunning, responsive, and functional websites that effectively communicate your brand's vision.",
    },
  ];
  

const Services = () => {
  return (
    <section id="services" className="py-16 px-8 bg-gray-50 text-[#1B4332]">
      <div className="mx-auto text-center max-w-7xl">
        <h2 className="mb-8 text-4xl font-bold">Services</h2>
        <p className="mb-12 text-lg">
          Here’s what I specialize in bringing your ideas to life through innovative and tailored solutions.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.title}
              className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={service.img}
                alt={service.title}
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-semibold">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
