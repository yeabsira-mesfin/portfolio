import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from "react-icons/fa";

const skills = [
  { name: "HTML/CSS", icon: <FaHtml5 className="text-[#F16529] h-12 w-12" /> },
  { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E] h-12 w-12" /> },
  { name: "React.js", icon: <FaReact className="text-[#61DBFB] h-12 w-12" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-[#68A063] h-12 w-12" /> },
  { name: "Tailwind CSS", icon: <FaCss3Alt className="text-[#38B2AC] h-12 w-12" /> },
  { name: "TypeScript", icon: <FaCss3Alt className="text-[#007ACC] h-12 w-12" /> },
];

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.2, 
  });

  if (inView) {
    controls.start("visible");
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      id="skills"
      className="bg-white text-[#243d27] py-16 px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#243d27] to-[#4CAF50]
       opacity-20 -z-10"></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-5xl mx-auto space-y-4 text-center"
      >
        <motion.h2
          className="text-3xl font-bold text-[#243d27]"
          variants={itemVariants}
        >
          Skills
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-10 mt-8"
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-center bg-[#f0f8f8] shadow-lg
               rounded-xl p-6 transition-all duration-500 ease-in-out hover:scale-105 
               hover:shadow-2xl"
              variants={itemVariants}
            >
              {skill.icon}
              <span className="ml-4 text-lg text-[#243d27] font-semibold">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
