import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import myImage from "../images/MyPicture.png";

const accents = [
  { top: "10%", left: "6%", size: "9rem", delay: 0 },
  { top: "58%", left: "12%", size: "6rem", delay: 0.6 },
  { top: "16%", right: "9%", size: "7rem", delay: 1.1 },
];

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#061b15] px-6 pb-20 pt-28 text-white"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

      {!reduceMotion &&
        accents.map((item, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border border-emerald-300/10 bg-emerald-300/5 blur-sm"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              width: item.size,
              height: item.size,
            }}
            animate={{ y: [0, -22, 0], x: [0, 14, 0], rotate: [0, 5, 0] }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          />
        ))}

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-emerald-100 uppercase backdrop-blur">
            Software engineering • infrastructure • cybersecurity
          </div>

          <h1 className="max-w-4xl font-black leading-[0.94] tracking-[-0.055em]">
            <span className="block text-[clamp(3rem,7vw,6.4rem)]">Yeabsira Mesfin</span>
            <span className="mt-4 block bg-gradient-to-r from-emerald-300 via-cyan-200 to-sky-300 bg-clip-text text-[clamp(1.8rem,4vw,3.8rem)] leading-[1.02] text-transparent">
              Software Engineer building reliable systems.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/70 sm:text-xl">
            M.S. Cybersecurity in Computer Science candidate at GWU with a
            software engineering foundation and growing hands-on focus in
            infrastructure reliability, automation, networking, cloud, and
            secure systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Python", "Full-Stack", "Linux", "Windows", "Docker", "Terraform", "Security"].map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-semibold text-emerald-50/80"
                >
                  {skill}
                </span>
              ),
            )}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-300 px-6 py-3.5 text-sm font-extrabold text-[#061b15] shadow-[0_16px_40px_rgba(110,231,183,0.16)] transition hover:-translate-y-0.5 hover:bg-emerald-200"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3" aria-label="Professional links">
            <a
              href="https://github.com/yeabsira-mesfin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
            >
              <FaGithub className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yeabsira-mesfin-abera-76379928a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
            >
              <FaLinkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="https://x.com/YeabsiraMesfin9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
            >
              <FaXTwitter className="h-4 w-4" /> X
            </a>
            <a
              href="mailto:yeabsira.mesfin29@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
            >
              <FaEnvelope className="h-4 w-4" /> Gmail
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-lg"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
        >
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-emerald-300/20 via-cyan-300/5 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-2 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Current focus
                </p>
                <p className="mt-1 text-sm text-white/65">
                  Software + infrastructure engineering
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-300/10 px-3 py-1.5 text-xs font-bold text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.7)]" />
                Building
              </span>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-[1.45rem] bg-[#0a281f]">
              <img
                src={myImage}
                alt="Yeabsira Mesfin, software engineer and cybersecurity graduate student"
                className="aspect-[4/4.35] w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061b15] via-[#061b15]/75 to-transparent px-5 pb-5 pt-16">
                <p className="text-xl font-extrabold">Yeabsira Mesfin</p>
                <p className="mt-1 text-sm text-emerald-100/70">
                  M.S. Cybersecurity @ GWU • Software Engineer
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4">
              {[
                ["5+", "Years"],
                ["200+", "Deliveries"],
                ["4+", "Infra/Sec Labs"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-black/10 px-3 py-3 text-center"
                >
                  <div className="text-lg font-black text-white">{value}</div>
                  <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/45">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
