import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import AM from "../images/AM.png";
import EM from "../images/EM.png";
import BE from "../images/BE.png";
import FE from "../images/FE.png";
import MA from "../images/MA.png";
import UX from "../images/UX.png";
import WD from "../images/WD.png";

const FILTERS = [
  "All",
  "Software Development",
  "Cybersecurity",
  "Cloud Support",
  "Product",
  "Collaboration",
];

const highlightsData = [
  {
    title: "Front-End Development",
    img: FE,
    description:
      "Building responsive, accessible interfaces with React, Tailwind CSS, and modern JavaScript.",
    tag: "Software Development",
    proof: "Shipped 50+ client-facing pages and UI updates across multiple projects.",
  },
  {
    title: "Back-End & REST APIs",
    img: BE,
    description:
      "Developing server-side logic and REST APIs with Node.js/Express and integrating databases.",
    tag: "Software Development",
    proof: "Built endpoints, validations, and data flows that support real client workflows.",
  },
  {
    title: "Troubleshooting & Root Cause Thinking",
    img: EM,
    description:
      "Diagnosing deployment/runtime issues, reproducing bugs, and communicating fixes clearly.",
    tag: "Cloud Support",
    proof: "Handled time-sensitive issues across multiple clients and platforms.",
  },
  {
    title: "UX-Focused Development",
    img: UX,
    description:
      "Prioritizing usability and clarity while keeping performance and reliability in mind.",
    tag: "Product",
    proof: "Improved UI/UX through iterations, feedback, and practical edge-case handling.",
  },
  {
    title: "Client & Team Collaboration",
    img: AM,
    description:
      "Working directly with clients and cross-functional teams to gather requirements and deliver reliably.",
    tag: "Collaboration",
    proof: "Led communication and coordination across ~20 parallel projects at peak times.",
  },
  {
    title: "Secure Web Practices (Foundations)",
    img: WD,
    description:
      "Applying secure coding basics like input validation, authentication fundamentals, and OWASP Top 10 best practices.",
    tag: "Cybersecurity",
    proof: "Security mindset from coursework and practical web development experience.",
  },
  {
    title: "Security Monitoring Concepts (Foundations)",
    img: MA,
    description:
      "Exploring logging, monitoring, and SIEM fundamentals through labs and coursework.",
    tag: "Cybersecurity",
    proof: "Comfortable reading logs, organizing technical data, and learning tooling quickly.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const tagStyle = (tag) => {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset";

  switch (tag) {
    case "Software Development":
      return `${base} bg-[#e6f6f6] text-[#1B4332] ring-[#1B4332]/10`;
    case "Cybersecurity":
      return `${base} bg-[#eaf3ea] text-[#1B4332] ring-[#1B4332]/10`;
    case "Cloud Support":
      return `${base} bg-[#eef2ff] text-[#1B4332] ring-[#1B4332]/10`;
    case "Collaboration":
      return `${base} bg-[#fff7ed] text-[#1B4332] ring-[#1B4332]/10`;
    case "Product":
      return `${base} bg-[#f3e8ff] text-[#1B4332] ring-[#1B4332]/10`;
    default:
      return `${base} bg-gray-100 text-[#1B4332] ring-[#1B4332]/10`;
  }
};

const chipStyle = (active) => {
  const base =
    "px-4 py-2 rounded-full text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]/30";
  return active
    ? `${base} bg-[#1B4332] text-white`
    : `${base} bg-white text-[#1B4332] border border-gray-200 hover:bg-gray-50`;
};

const Services = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (activeFilter === "All") return highlightsData;
    return highlightsData.filter((x) => x.tag === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="services"
      className="scroll-mt-24 py-16 px-6 sm:px-8 bg-gray-50 text-[#1B4332]"
      aria-label="Services and focus areas"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="mb-3 text-4xl font-bold">What I Do</h2>
          <p className="mx-auto mb-6 max-w-3xl text-lg text-[#1B4332]/80">
            Practical, hands-on focus areas where I contribute across software
            development, security foundations, and troubleshooting.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {FILTERS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFilter(label)}
                className={chipStyle(activeFilter === label)}
                aria-pressed={activeFilter === label}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl bg-[#1B4332] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]/30"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#1B4332] border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]/30"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <motion.article
              key={item.title}
              custom={index}
              variants={reduceMotion ? undefined : cardVariants}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              className="overflow-hidden transition bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl"
              aria-label={item.title}
            >
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-44"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute top-4 left-4">
                  <span className={tagStyle(item.tag)}>{item.tag}</span>
                </div>

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 via-transparent to-transparent" />
              </div>

              <div className="p-6 text-left">
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="leading-relaxed text-gray-700">
                  {item.description}
                </p>

                {item.proof && (
                  <p className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold text-[#1B4332]">
                      Proof:
                    </span>{" "}
                    {item.proof}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
