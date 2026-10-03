import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaCode, FaLayerGroup, FaShieldAlt, FaUsers } from "react-icons/fa";

const experience = [
  {
    period: "2019 → Present",
    title: "Advanced full-stack systems engineering",
    text: "Built 100+ full-stack web and mobile applications across JavaScript, TypeScript, React, Node.js, Python, Java, SQL, MongoDB, REST APIs, authentication, testing, and production support.",
    proof: "5+ years building · full stack · APIs · secure delivery",
    icon: FaCode,
    accent: "#58E6D1",
  },
  {
    period: "2022 → 2025",
    title: "Enterprise delivery at MMCY",
    text: "Progressed from developer into client-facing leadership while delivering 200+ enterprise event builds and supporting BCD, YPO, Abbott, CDW, and other enterprise teams through launches and live production.",
    proof: "200+ builds · 5,000+ attendee records · zero data loss",
    icon: FaLayerGroup,
    accent: "#7CB7FF",
  },
  {
    period: "Leadership",
    title: "Technical leadership, reliability, and client outcomes",
    text: "Led four developer-account managers in dual technical and client-facing roles, trained teammates, standardized development and delivery workflows, diagnosed production issues, and helped shorten release cycles while keeping critical client delivery stable under time pressure.",
    proof: "4 developer-account managers · 30% faster releases · no critical incidents over 2 years",
    icon: FaUsers,
    accent: "#E8BD73",
  },
  {
    period: "Now",
    title: "Software engineering + cybersecurity",
    text: "Completing an M.S. in Cybersecurity in Computer Science at George Washington University while building both production software and security-focused projects across application security, endpoint posture, infrastructure, secure APIs, RBAC, and AI security testing.",
    proof: "GWU M.S. · software engineering · AppSec · infrastructure · AI security",
    icon: FaShieldAlt,
    accent: "#B39BFF",
  },
];

export default function StoryExperienceTimeline({ onViewProjects }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="story-experience-timeline relative mt-8 overflow-hidden rounded-[1.65rem] border border-[#7CEBDD]/10 bg-[#061720]/55 p-5 shadow-[0_24px_80px_rgba(0,5,11,.25)] backdrop-blur-xl sm:p-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#58E6D1]/[.055] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-[#7CB7FF]/[.045] blur-3xl" />

      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }} className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[8px] font-bold uppercase tracking-[.22em] text-[#58E6D1]">Experience / trajectory</span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#58E6D1]/30 to-transparent" />
        </div>
        <h3 className="mt-3 max-w-2xl text-xl font-semibold tracking-[-.035em] text-[#E8F7F5]/92 sm:text-2xl">Building software, securing systems, and operating both in the real world.</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#C5DFDC]/46">The path has been hands-on from the start: design it, build it, secure it, ship it, support it, and keep improving it.</p>
      </motion.div>

      <div className="relative z-10 mt-6 space-y-3 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-px before:bg-gradient-to-b before:from-[#58E6D1]/45 before:via-[#7CB7FF]/18 before:to-transparent sm:before:left-[23px]">
        {experience.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .72, delay: .08 * index, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduceMotion ? undefined : { x: 4 }}
              className="group relative grid grid-cols-[40px_1fr] gap-3 rounded-2xl border border-[#7CEBDD]/[.075] bg-[#020B12]/30 p-3 transition-colors duration-500 hover:border-[#7CEBDD]/20 hover:bg-[#7CEBDD]/[.035] sm:grid-cols-[48px_1fr] sm:gap-4 sm:p-4"
            >
              <span className="relative z-10 grid h-10 w-10 place-items-center rounded-xl border border-[#7CEBDD]/10 bg-[#071A22] text-sm shadow-[0_0_25px_rgba(88,230,209,.035)] sm:h-12 sm:w-12" style={{ color: item.accent }}><Icon /></span>
              <div className="min-w-0">
                <p className="font-mono text-[7px] font-bold uppercase tracking-[.2em]" style={{ color: item.accent }}>{item.period}</p>
                <h4 className="mt-1 text-sm font-semibold tracking-[-.02em] text-[#E8F7F5]/88 sm:text-base">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-5 text-[#C5DFDC]/46 sm:text-[13px]">{item.text}</p>
                <p className="mt-2 font-mono text-[7px] uppercase tracking-[.12em] text-[#B8D6D2]/30 sm:text-[8px]">{item.proof}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="relative z-10 mt-8 border-t border-[#7CEBDD]/10 pb-1 pt-6">
        <button
          type="button"
          onClick={onViewProjects}
          className="group inline-flex items-center gap-3 rounded-full bg-[#DFFFFB] px-5 py-3.5 text-sm font-bold text-[#03131A] shadow-[0_10px_34px_rgba(86,230,211,.12)] transition-all duration-700 hover:-translate-y-0.5 hover:bg-white"
        >
          See what I build
          <FaArrowRight className="text-xs transition-transform duration-700 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
