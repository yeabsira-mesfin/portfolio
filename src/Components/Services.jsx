import React from "react";
import { motion } from "framer-motion";

const servicesData = [
  { name: "Web Development", img: "web-development.jpg" },
  { name: "Event Management", img: "event-management.jpg" },
  { name: "Account Management", img: "account-management.jpg" },
  { name: "Mobile Development", img: "mobile-development.jpg" },
  { name: "UX/UI Design", img: "ux-ui.jpg" },
  { name: "Web Design", img: "web-design.jpg" },
];

const Services = () => {
  return (
    <section
      id="services"
      className="py-16 px-8 bg-gray-50 text-[#1B4332] relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] to-[#4CAF50] opacity-10 -z-10"></div>
      <div className="mx-auto text-center max-w-7xl">
        <motion.h2
          className="mb-8 text-4xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Services
        </motion.h2>
        <motion.p
          className="mb-12 text-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          I offer a range of professional services to help bring your vision to
          life. Explore below:
        </motion.p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.name}
              className="relative p-8 overflow-hidden transition bg-white rounded-lg shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div
                className="absolute inset-0 bg-center bg-cover opacity-20"
                style={{
                  backgroundImage: `url(/images/${service.img})`,
                }}
              ></div>
              <h3 className="relative text-xl font-bold">{service.name}</h3>
              <p className="relative mt-4 text-sm">
                Professional {service.name.toLowerCase()} services designed to
                deliver excellence.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
