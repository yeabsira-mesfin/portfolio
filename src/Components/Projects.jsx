import React from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const projectData = [
    { id: 1, title: "Project 1", embedLink: "https://project1.vercel.app" },
    { id: 2, title: "Project 2", embedLink: "https://project2.vercel.app" },
    { id: 3, title: "Project 3", embedLink: "https://project3.vercel.app" },
    { id: 4, title: "Project 4", embedLink: "https://project4.vercel.app" },
    { id: 5, title: "Project 5", embedLink: "https://project5.vercel.app" },
  ];

  return (
    <div className="px-8 py-16 text-white bg-dark-green">
      <h2 className="mb-12 text-4xl font-bold text-center md:text-5xl">My Projects</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative p-6 overflow-hidden bg-green-600 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 -z-10"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{
                background: "linear-gradient(120deg, #6DD5FA, #2980B9, #6DD5FA)",
                backgroundSize: "200% 200%",
              }}
            ></motion.div>

            {/* Project Content */}
            <h3 className="mb-4 text-2xl font-bold">{project.title}</h3>
            <p className="mb-4 text-sm">Click below to view the live project:</p>

            {/* Embed Link */}
            <a
              href={project.embedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-white underline"
            >
              View {project.title}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
