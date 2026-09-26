import { motion, useReducedMotion } from "framer-motion";
import {
  FaCode,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaLock,
  FaNetworkWired,
  FaNodeJs,
  FaPython,
  FaReact,
  FaServer,
  FaShieldAlt,
  FaTerminal,
} from "react-icons/fa";

const lanes = [
  {
    number: "01",
    title: "Build",
    subtitle: "Product and application engineering",
    accent: "#d9ff43",
    statement: "Turn ambiguous requirements into maintainable software that people can actually use.",
    skills: [
      ["JavaScript / TypeScript", FaCode],
      ["React / Next.js", FaReact],
      ["Node.js / Express", FaNodeJs],
      ["Python / Java / C#", FaPython],
      ["REST APIs", FaServer],
      ["SQL / MySQL / MongoDB", FaDatabase],
    ],
  },
  {
    number: "02",
    title: "Operate",
    subtitle: "Infrastructure and reliability",
    accent: "#76e4f7",
    statement: "Look past deploy and design for visibility, automation, recovery, and boringly reliable operation.",
    skills: [
      ["Linux / Bash", FaTerminal],
      ["Docker", FaDocker],
      ["Networking / DNS", FaNetworkWired],
      ["CI/CD", FaGitAlt],
      ["Monitoring / Troubleshooting", FaServer],
      ["Infrastructure as Code", FaCode],
    ],
  },
  {
    number: "03",
    title: "Secure",
    subtitle: "Security engineering foundations",
    accent: "#ffb86b",
    statement: "Treat identity, access, validation, and defensive visibility as part of the system design, not a final checklist.",
    skills: [
      ["JWT / RBAC", FaLock],
      ["Secure API Design", FaShieldAlt],
      ["Network Security", FaNetworkWired],
      ["Authentication", FaLock],
      ["Traffic Analysis", FaServer],
      ["Secure Coding", FaCode],
    ],
  },
];

const workflow = ["requirements", "architecture", "implementation", "tests", "deploy", "observe", "improve"];

const Skills = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative overflow-hidden bg-[#f4f1e8] px-5 py-24 text-[#101113] sm:px-7 lg:px-10 lg:py-32">
      <div className="absolute right-[5%] top-[8%] h-64 w-64 rounded-full bg-cyan-300/25 blur-[110px]" />
      <div className="absolute bottom-[8%] left-[4%] h-72 w-72 rounded-full bg-[#d9ff43]/25 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[#51604f]">03 / Capability map</p>
          </div>
          <div>
            <h2 className="max-w-5xl text-[clamp(2.8rem,6vw,5.8rem)] font-black leading-[0.92] tracking-[-0.06em]">
              Three lanes. <span className="text-black/25">One engineering mindset.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-black/48 sm:text-lg">
              I do not use arbitrary percentage bars for skills. The useful question is where I can contribute, what I have shipped, and how the pieces connect across a real system.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {lanes.map((lane, laneIndex) => (
            <motion.article
              key={lane.title}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: laneIndex * 0.08 }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className="group overflow-hidden rounded-[1.8rem] border border-black/8 bg-white/65 shadow-[0_22px_70px_rgba(25,27,22,0.07)] backdrop-blur"
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-black/35">{lane.number} / {lane.subtitle}</p>
                    <h3 className="mt-3 text-4xl font-black tracking-[-0.05em]">{lane.title}</h3>
                  </div>
                  <span className="mt-1 h-4 w-4 rounded-full shadow-[0_0_30px_currentColor]" style={{ backgroundColor: lane.accent, color: lane.accent }} />
                </div>
                <p className="mt-5 min-h-[84px] text-sm font-semibold leading-7 text-black/52">{lane.statement}</p>
              </div>

              <div className="border-t border-black/8 bg-[#101113] p-3 text-white sm:p-4">
                <div className="grid gap-2">
                  {lane.skills.map(([label, Icon], index) => (
                    <motion.div
                      key={label}
                      whileHover={reduceMotion ? undefined : { x: 5 }}
                      className="flex items-center justify-between rounded-xl border border-white/7 bg-white/[0.035] px-3.5 py-3 transition hover:bg-white/[0.065]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.05] text-sm" style={{ color: lane.accent }}><Icon /></span>
                        <span className="text-xs font-black text-white/66 sm:text-sm">{label}</span>
                      </div>
                      <span className="font-mono text-[9px] font-bold text-white/18">0{index + 1}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mt-14 overflow-hidden rounded-[1.8rem] border border-black/8 bg-[#101113] p-6 text-white sm:p-8"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#d9ff43]">The loop I care about</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] sm:text-3xl">Engineering does not stop at “done.”</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {workflow.map((item, index) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[9px] font-black uppercase tracking-[0.13em] text-white/46">{item}</span>
                  {index < workflow.length - 1 && <span className="text-white/18">→</span>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
