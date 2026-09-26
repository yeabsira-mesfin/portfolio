import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowDown, FaArrowRight, FaGithub, FaLinkedinIn } from "react-icons/fa";
import myImage from "../images/MyPicture.png";

const nodes = [
  { id: "ui", label: "UI", x: 78, y: 78, detail: "React interfaces built for clarity, speed, and real users." },
  { id: "api", label: "API", x: 275, y: 92, detail: "Secure REST APIs, authentication, validation, and integration design." },
  { id: "auth", label: "AUTH", x: 466, y: 70, detail: "JWT, RBAC, access control, and secure application boundaries." },
  { id: "data", label: "DATA", x: 118, y: 285, detail: "SQL and NoSQL data modeling, performance tuning, and integrity." },
  { id: "infra", label: "INFRA", x: 320, y: 260, detail: "Linux, Docker, networking, automation, reliability, and cloud systems." },
  { id: "observe", label: "OBSERVE", x: 492, y: 315, detail: "Monitoring, incident thinking, traffic analysis, and operational feedback." },
];

const connections = [
  ["ui", "api"],
  ["api", "auth"],
  ["ui", "data"],
  ["api", "infra"],
  ["auth", "observe"],
  ["data", "infra"],
  ["infra", "observe"],
];

const proof = [
  ["5+", "years building"],
  ["10+", "full-stack apps"],
  ["40%", "DB performance gain"],
  ["30%", "faster releases"],
  ["0", "critical incidents / 2 yrs"],
];

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState(nodes[1]);
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#0b0c0e] px-5 pb-10 pt-28 text-white sm:px-7 lg:px-10 lg:pt-32">
      <div className="signal-grid absolute inset-0 opacity-45" />
      <div className="absolute left-[8%] top-[9%] h-64 w-64 rounded-full bg-[#d9ff43]/8 blur-[90px]" />
      <div className="absolute right-[2%] top-[20%] h-96 w-96 rounded-full bg-cyan-300/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid min-h-[calc(100vh-10rem)] items-center gap-12 lg:grid-cols-[1.04fr_.96fr] xl:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d9ff43]/20 bg-[#d9ff43]/8 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.17em] text-[#d9ff43]">
                <span className="h-2 w-2 rounded-full bg-[#d9ff43] shadow-[0_0_16px_rgba(217,255,67,0.7)]" />
                Building now
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/35">
                Software / Infrastructure / Security
              </span>
            </div>

            <h1 className="max-w-4xl tracking-[-0.065em]">
              <span className="block text-[clamp(3.6rem,8vw,7.4rem)] font-black leading-[0.82] text-[#f4f1e8]">Yeabsira</span>
              <span className="block text-[clamp(3.6rem,8vw,7.4rem)] font-black leading-[0.82] text-[#d9ff43]">Mesfin.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-white/88">
              I build systems that <span className="text-[#d9ff43]">ship</span>, stay reliable when the pressure rises, and get stronger through security.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/48 sm:text-lg">
              Full Stack Software Engineer with 5+ years of experience and an M.S. Cybersecurity in Computer Science candidate at The George Washington University. My work lives where product engineering, infrastructure, and security meet.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="group inline-flex items-center gap-3 rounded-2xl bg-[#d9ff43] px-5 py-3.5 text-sm font-black text-[#0b0c0e] transition hover:-translate-y-1 hover:bg-[#e7ff83]">
                Explore selected work
                <FaArrowDown className="text-xs transition-transform group-hover:translate-y-1" />
              </a>
              <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.045] px-5 py-3.5 text-sm font-black text-white/80 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white">
                <FaLinkedinIn /> LinkedIn
              </a>
              <a href="https://github.com/yeabsira-mesfin" target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/[0.045] text-white/65 transition hover:border-white/25 hover:text-white" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-white/8 pt-6">
              <img src={myImage} alt="Yeabsira Mesfin, software engineer and cybersecurity graduate student" className="h-12 w-12 rounded-full object-cover object-top ring-2 ring-[#d9ff43]/30" />
              <div>
                <p className="text-sm font-black text-white/85">Engineer who likes the full picture</p>
                <p className="mt-0.5 text-xs leading-5 text-white/40">From UI and APIs to networks, deployment, monitoring, and access control.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#d9ff43]/10 via-cyan-300/5 to-transparent blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111316]/88 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d9ff43]" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">yeabsira.systems.map</span>
              </div>

              <div className="relative aspect-[1.12/1] min-h-[390px] overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(217,255,67,0.07),transparent_36%)] sm:min-h-[430px]">
                <svg viewBox="0 0 600 420" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  {connections.map(([fromId, toId], index) => {
                    const from = byId[fromId];
                    const to = byId[toId];
                    return (
                      <g key={`${fromId}-${toId}`}>
                        <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(255,255,255,0.09)" strokeWidth="1.4" />
                        {!reduceMotion && (
                          <motion.circle
                            r="3.2"
                            fill="#d9ff43"
                            initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                            animate={{ cx: [from.x, to.x], cy: [from.y, to.y], opacity: [0, 1, 0] }}
                            transition={{ duration: 2.6 + index * 0.2, delay: index * 0.32, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {nodes.map((node) => {
                  const selected = activeNode.id === node.id;
                  return (
                    <motion.button
                      key={node.id}
                      type="button"
                      onMouseEnter={() => setActiveNode(node)}
                      onFocus={() => setActiveNode(node)}
                      onClick={() => setActiveNode(node)}
                      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                      className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 font-mono text-[10px] font-black tracking-[0.12em] transition sm:text-xs ${
                        selected
                          ? "border-[#d9ff43]/60 bg-[#d9ff43] text-[#0b0c0e] shadow-[0_0_30px_rgba(217,255,67,0.2)]"
                          : "border-white/12 bg-[#0b0c0e]/90 text-white/65 hover:border-white/25 hover:text-white"
                      }`}
                      style={{ left: `${(node.x / 600) * 100}%`, top: `${(node.y / 420) * 100}%` }}
                      aria-label={`Inspect ${node.label} layer`}
                    >
                      {node.label}
                      {!reduceMotion && selected && (
                        <motion.span className="absolute -inset-2 -z-10 rounded-2xl border border-[#d9ff43]/25" animate={{ scale: [1, 1.22], opacity: [0.7, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                      )}
                    </motion.button>
                  );
                })}

                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-[#0b0c0e]/92 p-4 backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#d9ff43]">Active layer / {activeNode.label}</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/70 sm:text-base">{activeNode.detail}</p>
                    </div>
                    <span className="hidden rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 sm:inline-flex">Hover nodes</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025]">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/8 sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
            {proof.map(([value, label]) => (
              <div key={label} className="px-4 py-4 sm:px-5">
                <div className="text-2xl font-black tracking-[-0.04em] text-[#f4f1e8]">{value}</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/32">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <a href="#about" className="mt-8 inline-flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 transition hover:text-[#d9ff43]">
          Scroll to the story <FaArrowRight />
        </a>
      </div>
    </section>
  );
};

export default Hero;
