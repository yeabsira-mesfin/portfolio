import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FaCode, FaServer, FaShieldAlt, FaUsers } from "react-icons/fa";

const milestones = [
  {
    period: "2019 → present",
    eyebrow: "FULL-STACK FOUNDATION",
    title: "5+ years building software across web, mobile, APIs, and data.",
    text: "Built 10+ full-stack applications using JavaScript, TypeScript, React, Next.js, Node.js, Express, Python, SQL, MongoDB, and related tools, with a focus on reliable production behavior and secure API design.",
    icon: FaCode,
    accent: "#58E6D1",
  },
  {
    period: "2022 → 2025",
    eyebrow: "MMCY · ENTERPRISE DELIVERY",
    title: "200+ enterprise event builds delivered end to end.",
    text: "Progressed from development into client-facing delivery at MMCY, building registration experiences, attendee hubs, mobile experiences, custom integrations, analytics, and production support for clients including BCD, YPO, Abbott, and CDW.",
    icon: FaServer,
    accent: "#7CB7FF",
  },
  {
    period: "MMCY · LEADERSHIP",
    eyebrow: "CLIENT SUCCESS + TEAM LEADERSHIP",
    title: "Turned engineering execution into dependable client outcomes.",
    text: "Moved through developer, account management, client success, and team leadership responsibilities, leading four account managers, training teammates, troubleshooting live systems, documenting solutions, and keeping high-pressure delivery work moving.",
    icon: FaUsers,
    accent: "#E8BD73",
  },
  {
    period: "2025 → present",
    eyebrow: "GWU · CYBERSECURITY",
    title: "Going deeper into secure systems and security engineering.",
    text: "Completing an M.S. in Cybersecurity in Computer Science at The George Washington University while extending my software background into network security, application security, identity, infrastructure, detection, and secure systems design.",
    icon: FaShieldAlt,
    accent: "#B39BFF",
  },
];

const impact = [
  ["200+", "enterprise builds"],
  ["10+", "full-stack apps"],
  ["4", "account managers led"],
  ["5+ yrs", "software experience"],
];

export default function StoryExperienceTimeline() {
  const reduceMotion = useReducedMotion();
  const [target, setTarget] = useState(null);

  useEffect(() => {
    const findTarget = () => {
      const story = document.querySelector('[data-story-content="true"]');
      setTarget(story || null);
    };

    findTarget();
    const observer = new MutationObserver(findTarget);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  if (!target) return null;

  return createPortal(
    <motion.section
      data-story-experience="true"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-8 overflow-hidden rounded-[1.55rem] border border-[#7CEBDD]/10 bg-[#04151D]/55 p-5 shadow-[0_22px_70px_rgba(0,7,12,.24)] backdrop-blur-xl sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(88,230,209,.08),transparent_28%),radial-gradient(circle_at_92%_86%,rgba(124,183,255,.06),transparent_30%)]" />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: ["-130%", "180%"] }}
        transition={{ duration: 10, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 w-24 rotate-[12deg] bg-gradient-to-r from-transparent via-[#B8FFF7]/[.035] to-transparent blur-2xl"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[8px] font-bold uppercase tracking-[.22em] text-[#58E6D1]">Experience / trajectory</span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#58E6D1]/24 to-transparent" />
        </div>
        <h3 className="mt-3 max-w-2xl text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-.035em] text-[#EAFBF8]/92">Software delivery, enterprise leadership, and a deeper move into security.</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#C6E1DE]/46">The through-line has stayed the same: understand the system, make it reliable, and keep pushing deeper into how it should be secured.</p>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {impact.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * index, duration: 0.55 }}
              className="rounded-xl border border-[#7CEBDD]/8 bg-[#020B12]/32 px-3 py-3"
            >
              <p className="text-lg font-semibold tracking-[-.04em] text-[#E8F7F5]/88">{value}</p>
              <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[.14em] text-[#B9D9D5]/32">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-6 pl-6 sm:pl-7">
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-gradient-to-b from-[#58E6D1]/55 via-[#7CB7FF]/28 to-[#B39BFF]/20 sm:left-[8px]"
          />

          <div className="space-y-3">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={`${item.period}-${item.eyebrow}`}
                  initial={reduceMotion ? false : { opacity: 0, x: 14, y: 4 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ delay: index * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduceMotion ? undefined : { x: 3 }}
                  className="group relative rounded-2xl border border-[#7CEBDD]/8 bg-[#020C13]/38 p-4 transition-colors duration-500 hover:border-[#7CEBDD]/18 hover:bg-[#071B22]/54"
                >
                  <motion.span
                    aria-hidden="true"
                    animate={reduceMotion ? undefined : { boxShadow: [`0 0 0px ${item.accent}00`, `0 0 14px ${item.accent}55`, `0 0 0px ${item.accent}00`] }}
                    transition={{ duration: 3.8, repeat: Infinity, delay: index * 0.7, ease: "easeInOut" }}
                    className="absolute -left-[25px] top-6 h-3.5 w-3.5 rounded-full border-2 border-[#03131A] sm:-left-[27px]"
                    style={{ backgroundColor: item.accent }}
                  />

                  <div className="flex gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#7CEBDD]/9 bg-[#071820]/70 text-sm" style={{ color: item.accent }}><Icon /></span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="font-mono text-[7px] font-bold uppercase tracking-[.18em]" style={{ color: item.accent }}>{item.eyebrow}</p>
                        <span className="font-mono text-[7px] uppercase tracking-[.13em] text-[#B9D9D5]/26">{item.period}</span>
                      </div>
                      <h4 className="mt-1.5 text-[15px] font-semibold leading-5 tracking-[-.02em] text-[#E8F7F5]/88 sm:text-base">{item.title}</h4>
                      <p className="mt-2 text-[13px] leading-5.5 text-[#C5DFDC]/45">{item.text}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>,
    target,
  );
}
