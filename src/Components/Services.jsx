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
  "Infrastructure",
  "Cybersecurity",
  "Event Technology",
  "Product",
];

const services = [
  {
    title: "Front-End & Product Engineering",
    img: FE,
    description:
      "Responsive, accessible interfaces built with React, modern JavaScript, Tailwind CSS, and product-focused iteration.",
    tag: "Software Development",
    proof:
      "Hands-on experience building client-facing interfaces, dashboards, workflows, and portfolio applications.",
  },
  {
    title: "Back-End & API Development",
    img: BE,
    description:
      "Server-side logic, REST APIs, authentication flows, data handling, validation, and integration work.",
    tag: "Software Development",
    proof:
      "Python, Node.js, Express, databases, Postman, and practical debugging across full-stack systems.",
  },
  {
    title: "Infrastructure Reliability & Automation",
    img: EM,
    description:
      "Building hands-on labs around Linux and Windows operations, monitoring, failover, backup verification, containers, and automation.",
    tag: "Infrastructure",
    proof:
      "Portfolio work includes Docker, NGINX, Prometheus, Terraform, PowerShell, health checks, and incident runbooks.",
  },
  {
    title: "Networking & Operational Troubleshooting",
    img: MA,
    description:
      "Working through DNS, TCP/IP, service health, network security concepts, logs, and structured root-cause thinking.",
    tag: "Infrastructure",
    proof:
      "Graduate cybersecurity labs and infrastructure projects focused on availability, evidence, and recovery.",
  },
  {
    title: "Secure Application Practices",
    img: WD,
    description:
      "Applying authentication, validation, secure coding, least-privilege thinking, and OWASP-aware development practices.",
    tag: "Cybersecurity",
    proof:
      "Security-focused graduate coursework plus practical login analysis and infrastructure security projects.",
  },
  {
    title: "Security Monitoring & Detection",
    img: MA,
    description:
      "Exploring security events, suspicious authentication behavior, monitoring logic, incident evidence, and defensive workflows.",
    tag: "Cybersecurity",
    proof:
      "Built a secure login analyzer and operational monitoring utilities with automated testing.",
  },
  {
    title: "Cvent & SpotMe Event Technology Builds",
    img: AM,
    description:
      "Building registration websites, attendee experiences, mobile event apps, and event workflows using Cvent and SpotMe.",
    tag: "Event Technology",
    proof:
      "Delivered 200+ end-to-end event builds including registration, attendee experiences, mobile app work, custom code, analytics, and live troubleshooting.",
  },
  {
    title: "UX-Focused Technical Delivery",
    img: UX,
    description:
      "Turning requirements into clear, usable experiences while balancing reliability, performance, maintainability, and stakeholder needs.",
    tag: "Product",
    proof:
      "Client-facing delivery experience with iterative feedback, edge-case handling, and cross-functional communication.",
  },
];

const Services = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (activeFilter === "All") return services;
    return services.filter((item) => item.tag === activeFilter);
  }, [activeFilter]);

  return (
    <section id="services" className="relative overflow-hidden bg-[#f5f8f6] px-6 py-24 text-[#0d2c22] sm:px-8">
      <div className="absolute right-[-12rem] top-8 h-96 w-96 rounded-full bg-emerald-300/16 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
            What I do
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Technical work across software, infrastructure, security, and event technology.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#4f6c61]">
            My strongest value comes from being able to move between coding,
            troubleshooting, systems thinking, client requirements, and
            operational reliability.
          </p>
        </motion.div>

        <div className="mt-9 flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                "rounded-full px-4 py-2 text-sm font-bold transition " +
                (activeFilter === filter
                  ? "bg-[#0d2c22] text-white shadow-lg"
                  : "border border-emerald-900/10 bg-white text-[#315447] hover:border-emerald-500/30 hover:text-emerald-700")
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((item, index) => (
            <motion.article
              layout
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group overflow-hidden rounded-[1.6rem] border border-emerald-900/8 bg-white shadow-[0_18px_45px_rgba(19,67,50,0.07)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.img}
                  alt=""
                  className="h-44 w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071e17]/45 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#071e17]/75 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white backdrop-blur">
                  {item.tag}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-extrabold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#587267]">{item.description}</p>
                <div className="mt-5 border-t border-emerald-900/8 pt-4">
                  <p className="text-xs leading-5 text-[#6b8178]">
                    <span className="font-extrabold text-[#174b39]">Proof:</span>{" "}
                    {item.proof}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;