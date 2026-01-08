import { useEffect } from "react";
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

import { SiTypescript, SiPostman, SiLinux, SiGithub, SiMongodb, SiMysql } from "react-icons/si";

const devSkills = [
  { name: "HTML", icon: <FaHtml5 className="text-[#F16529] h-12 w-12" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6] h-12 w-12" /> },
  { name: "Tailwind CSS", icon: <SiTypescript className="text-[#38B2AC] h-12 w-12" /> }, // NOTE: we'll replace below
  { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E] h-12 w-12" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#007ACC] h-12 w-12" /> },
  { name: "React.js", icon: <FaReact className="text-[#61DBFB] h-12 w-12" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-[#68A063] h-12 w-12" /> },
  { name: "Java", icon: <FaJava className="text-[#c25656] h-12 w-12" /> },
  { name: "MySQL", icon: <SiMysql className="text-[#00758F] h-12 w-12" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-[#47A248] h-12 w-12" /> },
  { name: "GitHub", icon: <SiGithub className="text-[#111827] h-12 w-12" /> },
];

// Tailwind has an official icon in react-icons/si on many versions: SiTailwindcss
// If your project has it, swap in SiTailwindcss (shown below in a safe way).
let TailwindIcon = null;
try {
  // eslint-disable-next-line global-require
  TailwindIcon = require("react-icons/si").SiTailwindcss;
} catch (e) {
  TailwindIcon = null;
}
// Patch Tailwind skill icon if available
if (TailwindIcon) {
  const idx = devSkills.findIndex((s) => s.name === "Tailwind CSS");
  if (idx !== -1) {
    devSkills[idx] = {
      name: "Tailwind CSS",
      icon: <TailwindIcon className="text-[#38B2AC] h-12 w-12" />,
    };
  }
}

const cloudSupportSkills = [
  { name: "Networking", icon: <FaNetworkWired className="text-[#4CAF50] h-12 w-12" /> },
  { name: "Linux CLI", icon: <SiLinux className="text-[#1B4332] h-12 w-12" /> },
  { name: "Troubleshooting & RCA", icon: <FaTools className="text-[#243d27] h-12 w-12" /> },
  { name: "Logging & Monitoring", icon: <FaTachometerAlt className="text-[#243d27] h-12 w-12" /> },
  { name: "API Testing", icon: <SiPostman className="text-[#FF6C37] h-12 w-12" /> },
];

const cybersecuritySkills = [
  { name: "Network Security Fundamentals", icon: <FaShieldAlt className="text-[#4CAF50] h-12 w-12" /> },
  { name: "Secure Authentication", icon: <FaLock className="text-[#1B4332] h-12 w-12" /> },
  { name: "OWASP Top 10 Awareness", icon: <FaBug className="text-[#c25656] h-12 w-12" /> },
  { name: "SIEM Exposure", icon: <FaTachometerAlt className="text-[#243d27] h-12 w-12" /> },
];

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const SkillGrid = ({ items, wide = false }) => (
    <motion.div
      className="flex flex-wrap justify-center gap-10 mt-8"
      variants={containerVariants}
    >
      {items.map((skill, index) => (
        <motion.div
          key={`${skill.name}-${index}`}
          className={`flex items-center bg-[#f0f8f8] shadow-lg rounded-xl p-6 ${
            wide ? "w-64" : "w-52"
          } transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl`}
          variants={itemVariants}
        >
          {skill.icon}
          <span className="ml-4 text-lg text-[#243d27] font-semibold">
            {skill.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section
      id="skills"
      className="bg-dark-green text-[#243d27] py-16 px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#243d27] to-[#4CAF50] opacity-20 -z-10" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-5xl mx-auto space-y-4 text-center"
      >
        <motion.h2 className="text-3xl font-bold text-white" variants={itemVariants}>
          Skills
        </motion.h2>

        <motion.h3 className="mt-8 text-2xl font-bold text-white" variants={itemVariants}>
          Software Development
        </motion.h3>
        <SkillGrid items={devSkills} />

        <motion.h3 className="mt-12 text-2xl font-bold text-white" variants={itemVariants}>
          Cloud Support Foundations
        </motion.h3>
        <SkillGrid items={cloudSupportSkills} wide />

        <motion.h3 className="mt-12 text-2xl font-bold text-white" variants={itemVariants}>
          Cybersecurity Foundations
        </motion.h3>
        <SkillGrid items={cybersecuritySkills} wide />
      </motion.div>
    </section>
  );
};

export default Skills;
