import React from "react";
import { motion } from "framer-motion";

const servicesData = [
  {
    title: "Account Management",
    img: "account-management.jpg",
    description: "Ensuring seamless communication and efficient workflows.",
  },
  {
    title: "Event Management",
    img: "event-management.jpg",
    description: "Streamlining event logistics with tech-driven solutions.",
  },
  {
    title: "Mobile Development",
    img: "mobile-development.jpg",
    description: "Building sleek and efficient mobile applications.",
  },
  {
    title: "UX/UI Design",
    img: "ux-ui.jpg",
    description: "Crafting intuitive and visually appealing user interfaces.",
  },
  {
    title: "Web Design",
    img: "web-design.jpg",
    description: "Designing stunning layouts that captivate users.",
  },
  {
    title: "Web Development",
    img: "web-development.jpg",
    description: "Creating responsive, modern, and user-friendly websites.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 px-8 bg-gray-50 text-[#1B4332]">
      <div className="mx-auto text-center max-w-7xl">
        <h2 className="mb-8 text-4xl font-bold">Services</h2>
        <p className="mb-12 text-lg">
          Here’s what I specialize in—bringing your ideas to life through innovative and tailored solutions.
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
                src={`/images/${service.img}`}
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
