import { motion } from "framer-motion"; // For animations
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaCss3 } from "react-icons/fa"; // Import icons from react-icons

const skills = [
  { name: "HTML/CSS", icon: <FaHtml5 className="text-[#F16529] h-12 w-12" /> },
  { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E] h-12 w-12" /> },
  { name: "React.js", icon: <FaReact className="text-[#61DBFB] h-12 w-12" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-[#68A063] h-12 w-12" /> },
  { name: "Tailwind CSS", icon: <FaCss3Alt className="text-[#38B2AC] h-12 w-12" /> },
  { name: "TypeScript", icon: <FaCss3Alt className="text-[#007ACC] h-12 w-12" /> },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="bg-white text-[#243d27] py-16 px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#243d27] to-[#4CAF50] opacity-20 -z-10"></div>
      <div className="max-w-5xl mx-auto space-y-4 text-center">
        <motion.h2
          className="text-3xl font-bold text-[#243d27]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Skills
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-10 mt-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-center bg-[#f0f8f8] shadow-lg rounded-xl p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {skill.icon}
              <span className="ml-4 text-lg text-[#243d27] font-semibold">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
