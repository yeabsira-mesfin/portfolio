import { useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
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
  SiVercel,
} from "react-icons/si";

/* ---------- Level meta ---------- */
const levelMeta = (level) => {
  const badgeBase =
    "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ring-1 ring-black/5";
  switch (level) {
    case "Advanced":
      return { badge: `${badgeBase} bg-emerald-100 text-emerald-800`, value: 92, bar: "bg-emerald-500" };
    case "Intermediate":
      return { badge: `${badgeBase} bg-sky-100 text-sky-800`, value: 76, bar: "bg-sky-500" };
    case "Foundations":
      return { badge: `${badgeBase} bg-orange-100 text-orange-800`, value: 62, bar: "bg-orange-500" };
    default:
      return { badge: `${badgeBase} bg-gray-100 text-gray-700`, value: 60, bar: "bg-emerald-500" };
  }
};

/* ---------- Skills ---------- */
const devSkills = [
  { name: "HTML", level: "Advanced", icon: <FaHtml5 className="h-10 w-10 text-[#F16529]" /> },
  { name: "CSS", level: "Advanced", icon: <FaCss3Alt className="h-10 w-10 text-[#1572B6]" /> },
  { name: "Tailwind CSS", level: "Advanced", icon: <SiTailwindcss className="h-10 w-10 text-[#38B2AC]" /> },
  { name: "JavaScript", level: "Advanced", icon: <FaJs className="h-10 w-10 text-[#F7DF1E]" /> },
  { name: "TypeScript", level: "Intermediate", icon: <SiTypescript className="h-10 w-10 text-[#007ACC]" /> },
  { name: "React.js", level: "Advanced", icon: <FaReact className="h-10 w-10 text-[#61DBFB]" /> },
  { name: "Node.js", level: "Intermediate", icon: <FaNodeJs className="h-10 w-10 text-[#68A063]" /> },
  { name: "Python", level: "Advanced", icon: <SiPython className="h-10 w-10 text-[#3776AB]" /> },
  { name: "Java", level: "Intermediate", icon: <FaJava className="h-10 w-10 text-[#c25656]" /> },
  { name: "MySQL", level: "Intermediate", icon: <SiMysql className="h-10 w-10 text-[#00758F]" /> },
  { name: "MongoDB", level: "Intermediate", icon: <SiMongodb className="h-10 w-10 text-[#47A248]" /> },
  { name: "GitHub", level: "Advanced", icon: <SiGithub className="h-10 w-10 text-[#111827]" /> },
];

const cloudSupportSkills = [
  { name: "Networking", level: "Intermediate", icon: <FaNetworkWired className="h-10 w-10 text-[#4CAF50]" /> },
  { name: "Linux CLI", level: "Intermediate", icon: <SiLinux className="h-10 w-10 text-[#1B4332]" /> },
  { name: "Vercel", level: "Advanced", icon: <SiVercel className="h-10 w-10 text-[#111827]" /> },
  { name: "Troubleshooting & RCA", level: "Advanced", icon: <FaTools className="h-10 w-10 text-[#243d27]" /> },
  { name: "Logging & Monitoring", level: "Foundations", icon: <FaTachometerAlt className="h-10 w-10 text-[#243d27]" /> },
  { name: "API Testing", level: "Intermediate", icon: <SiPostman className="h-10 w-10 text-[#FF6C37]" /> },
];

const cybersecuritySkills = [
  { name: "Network Security Fundamentals", level: "Foundations", icon: <FaShieldAlt className="h-10 w-10 text-[#4CAF50]" /> },
  { name: "Secure Authentication", level: "Foundations", icon: <FaLock className="h-10 w-10 text-[#1B4332]" /> },
  { name: "OWASP Top 10 Awareness", level: "Foundations", icon: <FaBug className="h-10 w-10 text-[#c25656]" /> },
  { name: "SIEM Exposure", level: "Foundations", icon: <FaTachometerAlt className="h-10 w-10 text-[#243d27]" /> },
];

/* ---------- Component ---------- */
const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 22 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.45 } },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  const SkillCard = ({ skill }) => {
    const meta = levelMeta(skill.level);

    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4 }}
        className="relative p-5 overflow-hidden transition border shadow-xl group rounded-3xl border-white/10 bg-white/85 backdrop-blur hover:shadow-2xl"
      >
        {/* glow */}
        <div className="absolute inset-0 transition opacity-0 pointer-events-none group-hover:opacity-100">
          <div className="absolute rounded-full -top-20 -right-20 h-52 w-52 bg-emerald-400/20 blur-3xl" />
          <div className="absolute rounded-full -bottom-24 -left-24 h-52 w-52 bg-white/25 blur-3xl" />
        </div>

        {/* top row */}
        <div className="relative flex items-start gap-4">
          <div className="shrink-0 rounded-2xl bg-[#f0f8f8] p-3 shadow-sm ring-1 ring-black/5">
            {skill.icon}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-left text-base sm:text-lg font-extrabold text-[#243d27] leading-snug">
              {skill.name}
            </h4>

            <div className="flex justify-center mt-3 sm:justify-start">
              <span className={meta.badge}>{skill.level}</span>
            </div>
          </div>
        </div>

        {/* bar (kept where it belongs) */}
        <div className="relative mt-5 h-2.5 w-full rounded-full bg-gray-200">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${meta.value}%` } : { width: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className={`h-2.5 rounded-full ${meta.bar}`}
          />
          <div className="absolute inset-0 rounded-full pointer-events-none ring-1 ring-black/5" />
        </div>
      </motion.div>
    );
  };

  const SkillGrid = ({ items }) => (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((skill, i) => (
        <SkillCard key={`${skill.name}-${i}`} skill={skill} />
      ))}
    </motion.div>
  );

  return (
    <section id="skills" className="relative overflow-hidden bg-[#0b1f12] py-16 px-6 sm:px-10">
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <div className="absolute rounded-full -top-24 -left-24 h-80 w-80 bg-emerald-500/30 blur-3xl" />
        <div className="absolute rounded-full -bottom-24 -right-24 h-80 w-80 bg-white/10 blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-extrabold text-white">Skills</h2>

        <h3 className="mt-10 text-2xl font-bold text-white">Software Development</h3>
        <SkillGrid items={devSkills} />

        <h3 className="text-2xl font-bold text-white mt-14">Cloud Support Foundations</h3>
        <SkillGrid items={cloudSupportSkills} />

        <h3 className="text-2xl font-bold text-white mt-14">Cybersecurity Foundations</h3>
        <SkillGrid items={cybersecuritySkills} />
      </motion.div>
    </section>
  );
};

export default Skills;
