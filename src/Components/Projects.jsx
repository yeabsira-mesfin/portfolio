import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const GlobalStyles = () => (
  <style>
    {`
      ::-webkit-scrollbar {
        width: 1px;
        height: 1px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #4CAF50;
        border-radius: 1px;
        border: 1px solid #1F2A34;
      }

      ::-webkit-scrollbar-track {
        background: #1F2A34;
        border-radius: 1px;
      }

      scrollbar-color: #4CAF50;
      scrollbar-width: thin;
    `}
  </style>
);

const Projects = () => {
  const projectData = [
    {
      id: 3,
      title: "Tourist Trail",
      liveDemo: "https://tourist-trail.vercel.app/",
      oneLine: "Discover and plan trips with a user-friendly travel web app.",
      tags: ["React", "Maps", "Dashboard", "Public"],
    },
    {
      id: 4,
      title: "TaskFlow (Task Manager)",
      liveDemo: "https://project-managment-ten.vercel.app/",
      oneLine: "Simple, intuitive task manager with dashboard insights.",
      tags: ["React", "Dashboard", "Productivity"],
    },
    {
      id: 2,
      title: "ShopEase (Shop Here)",
      liveDemo: "https://shop-ease-sigma-jade.vercel.app/",
      oneLine: "E-commerce platform for easy product browsing and purchase.",
      tags: ["React", "E-commerce", "Metrics"],
    },
    {
      id: 1,
      title: "Home Of Games",
      liveDemo: "https://homeofgames.vercel.app/",
      oneLine: "Game discovery and review platform with user activity dashboard.",
      tags: ["React", "Games", "Dashboard"],
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <GlobalStyles />
      <motion.section
        ref={ref}
        id="projects"
        className="px-8 py-16 text-white bg-dark-green"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h2
          className="mb-5 text-4xl font-bold text-center md:text-5xl"
          variants={itemVariants}
        >
          My Projects
        </motion.h2>

        <motion.p className="mb-8 text-center" variants={itemVariants}>
          Interested in exploring more? Visit my{" "}
          <a
            href="https://github.com/yeabsira-mesfin"
            className="text-[#2a9d8f] font-bold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </motion.p>

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
        >
          {projectData.map((project) => (
            <motion.div
              key={project.id}
              className="p-4 transition-all duration-500 transform shadow-2xl bg-dark-green rounded-2xl cursor-pointer hover:scale-[1.02]"
              variants={itemVariants}
              tabIndex={0}
              onClick={() =>
                window.open(project.liveDemo, "_blank", "noopener,noreferrer")
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(project.liveDemo, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <div className="mb-4 overflow-hidden shadow-lg rounded-2xl">
                <iframe
                  src={project.liveDemo}
                  title={project.title}
                  scrolling="no"
                  className="w-full h-48 pointer-events-none sm:h-56 md:h-60 rounded-2xl"
                />
              </div>

              <h3 className="mb-1 text-lg font-semibold text-white">
                {project.title}
              </h3>

              <p className="mb-2 text-[#d2f5e3] text-sm">
                {project.oneLine}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs font-medium bg-[#2a9d8f] text-white rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </>
  );
};

export default Projects;
