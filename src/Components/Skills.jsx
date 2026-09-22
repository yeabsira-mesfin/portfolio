import { useEffect, useMemo } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaJava,
  FaShieldAlt,
  FaLock,
  FaBug,
  FaTachometerAlt,
  FaNetworkWired,
  FaTools,
  FaWindows,
  FaServer,
  FaTerminal,
  FaCloud,
} from "react-icons/fa";

import {
  SiTypescript,
  SiPostman,
  SiLinux,
  SiGithub,
  SiMongodb,
  SiMysql,
  SiPython,
  SiTailwindcss,
} from "react-icons/si";

const levelMeta = (level) => {
  if (level === "Advanced") return { value: 92, label: "Advanced" };
  if (level === "Intermediate") return { value: 76, label: "Intermediate" };
  return { value: 60, label: "Foundations" };
};

const devSkills = [
  { name: "Python", level: "Advanced", icon: <SiPython /> },
  { name: "JavaScript", level: "Advanced", icon: <FaJs /> },
  { name: "React", level: "Advanced", icon: <FaReact /> },
  { name: "HTML", level: "Advanced", icon: <FaHtml5 /> },
  { name: "CSS", level: "Advanced", icon: <FaCss3Alt /> },
  { name: "Tailwind CSS", level: "Advanced", icon: <SiTailwindcss /> },
  { name: "TypeScript", level: "Intermediate", icon: <SiTypescript /> },
  { name: "Node.js", level: "Intermediate", icon: <FaNodeJs /> },
  { name: "Java", level: "Intermediate", icon: <FaJava /> },
  { name: "MySQL", level: "Intermediate", icon: <SiMysql /> },
  { name: "MongoDB", level: "Intermediate", icon: <SiMongodb /> },
  { name: "Git & GitHub", level: "Advanced", icon: <SiGithub /> },
];

const infrastructureSkills = [
  { name: "Networking & DNS", level: "Intermediate", icon: <FaNetworkWired /> },
  { name: "Linux CLI", level: "Intermediate", icon: <SiLinux /> },
  { name: "Windows Infrastructure", level: "Foundations", icon: <FaWindows /> },
  { name: "PowerShell Automation", level: "Foundations", icon: <FaTerminal /> },
  { name: "Containers & Docker", level: "Foundations", icon: <FaServer /> },
  { name: "Infrastructure as Code", level: "Foundations", icon: <FaCloud /> },
  { name: "Monitoring & Reliability", level: "Foundations", icon: <FaTachometerAlt /> },
  { name: "Troubleshooting & RCA", level: "Advanced", icon: <FaTools /> },
  { name: "API Testing", level: "Intermediate", icon: <SiPostman /> },
];

const securitySkills = [
  { name: "Network Security", level: "Foundations", icon: <FaShieldAlt /> },
  { name: "Authentication & Access Control", level: "Foundations", icon: <FaLock /> },
  { name: "OWASP Awareness", level: "Foundations", icon: <FaBug /> },
  { name: "Security Monitoring", level: "Foundations", icon: <FaTachometerAlt /> },
];

const SkillCard = ({ skill, inView, reduceMotion }) => {
  const meta = levelMeta(skill.level);

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className="rounded-2xl border border-white/10 bg-white/[0.065] p-5 text-left shadow-xl backdrop-blur"
    >
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-300/10 text-2xl text-emerald-200">
          {skill.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-extrabold text-white">{skill.name}</h4>
          <span className="mt-2 inline-flex rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-100/65">
            {meta.label}
          </span>
        </div>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-black/20">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: meta.value + "%" } : { width: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
        />
      </div>
    </motion.article>
  );
};

const SkillGroup = ({ title, subtitle, skills, inView, reduceMotion }) => (
  <div className="mt-14">
    <div className="max-w-2xl">
      <h3 className="text-2xl font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-emerald-50/55">{subtitle}</p>
    </div>
    <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          inView={inView}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  </div>
);

const Skills = () => {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
    }),
    [],
  );

  return (
    <section id="skills" className="relative overflow-hidden bg-[#061b15] px-6 py-24 sm:px-8">
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-400/8 blur-3xl" />

      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={controls}
        className="relative mx-auto max-w-7xl"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
            Technical toolkit
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Software depth with infrastructure and security breadth.
          </h2>
        </div>

        <SkillGroup
          title="Software Development"
          subtitle="The strongest and most established part of my technical background."
          skills={devSkills}
          inView={inView}
          reduceMotion={reduceMotion}
        />

        <SkillGroup
          title="Infrastructure & Cloud"
          subtitle="Hands-on labs and project work focused on reliable systems, networking, automation, containers, and operations."
          skills={infrastructureSkills}
          inView={inView}
          reduceMotion={reduceMotion}
        />

        <SkillGroup
          title="Cybersecurity"
          subtitle="Graduate study and practical projects centered on defensive security, secure systems, and monitoring."
          skills={securitySkills}
          inView={inView}
          reduceMotion={reduceMotion}
        />
      </motion.div>
    </section>
  );
};

export default Skills;