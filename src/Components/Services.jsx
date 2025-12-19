import { motion } from "framer-motion";

import AM from "../images/AM.png";
import EM from "../images/EM.png";
import BE from "../images/BE.png";
import FE from "../images/FE.png";
import MA from "../images/MA.png";
import UX from "../images/UX.png";
import WD from "../images/WD.png";

const highlightsData = [
  {
    title: "Front-End Engineering",
    img: FE,
    description: "Building responsive, accessible UIs with React, Tailwind CSS, and modern JavaScript.",
    tag: "Web Development",
  },
  {
    title: "Back-End & APIs",
    img: BE,
    description: "Developing server-side logic and REST APIs with Node.js/Express and integrating databases.",
    tag: "Web Development",
  },
  {
    title: "Secure Web Application Design (Entry-Level)",
    img: WD,
    description: "Applying secure coding basics—input validation, auth fundamentals, and OWASP Top 10 awareness.",
    tag: "Cybersecurity",
  },
  {
    title: "Security Data & Monitoring (Foundations)",
    img: MA,
    description: "Organizing technical data and exploring monitoring/log analysis concepts (SIEM exposure).",
    tag: "Cybersecurity",
  },
  {
    title: "Troubleshooting & Root Cause Thinking",
    img: EM,
    description: "Diagnosing deployment/runtime issues, reproducing bugs, and communicating fixes clearly.",
    tag: "Cloud Support",
  },
  {
    title: "Client & Cross-Functional Collaboration",
    img: AM,
    description: "Working directly with clients and teams to gather requirements and deliver reliable solutions.",
    tag: "Professional",
  },
  {
    title: "UX-Focused Engineering",
    img: UX,
    description: "Prioritizing usability and clarity while keeping performance and reliability in mind.",
    tag: "Product",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12 },
  }),
};

const tagStyle = (tag) => {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
  switch (tag) {
    case "Web Development":
      return `${base} bg-[#e6f6f6] text-[#1B4332]`;
    case "Cybersecurity":
      return `${base} bg-[#eaf3ea] text-[#1B4332]`;
    case "Cloud Support":
      return `${base} bg-[#eef2ff] text-[#1B4332]`;
    case "Professional":
      return `${base} bg-[#fff7ed] text-[#1B4332]`;
    default:
      return `${base} bg-gray-100 text-[#1B4332]`;
  }
};

const Services = () => {
  return (
    // ✅ IMPORTANT: id must match navbar href="#services"
    <section id="services" className="scroll-mt-24 py-16 px-8 bg-gray-50 text-[#1B4332]">
      <div className="mx-auto text-center max-w-7xl">
        <h2 className="mb-4 text-4xl font-bold">Services</h2>
        <p className="mb-12 text-lg text-[#1B4332]/80">
          Areas where I can contribute as an entry-level engineer,web development, cybersecurity foundations, and troubleshooting.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlightsData.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden transition bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl"
            >
              <div className="relative">
                <img src={item.img} alt={item.title} className="object-cover w-full h-44" />
                <div className="absolute top-4 left-4">
                  <span className={tagStyle(item.tag)}>{item.tag}</span>
                </div>
              </div>

              <div className="p-6 text-left">
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="leading-relaxed text-gray-700">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
