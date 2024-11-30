import React from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const projectData = [
    { id: 1, title: "Home Of Games", embedLink: "https://homeofgames.vercel.app/" },
    { id: 2, title: "Shop Here", embedLink: "https://shopping-lime-omega.vercel.app/" },
    { id: 3, title: "Tourist Trail", embedLink: "https://places-to-visit-pied.vercel.app/" },
    { id: 4, title: "Project Manager", embedLink: "https://project-managment-ten.vercel.app/" },
  ];

  return (
    <div className="px-8 py-16 text-white bg-dark-green">
      <h2 className="mb-12 text-4xl font-bold text-center md:text-5xl">My Projects</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative p-6 overflow-hidden bg-[#1F2A34] shadow-lg rounded-xl transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-[#283B46]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Embedded Preview */}
            <div className="mb-4 overflow-hidden rounded-lg shadow-md">
              <iframe
                src={project.embedLink}
                className="w-full h-48 rounded-lg"
                frameBorder="0"
                title={project.title}
                style={{ overflowX: "hidden", overflowY: "hidden" }}
              ></iframe>
            </div>

            <h3 className="mb-2 text-2xl font-semibold text-center">{project.title}</h3>
            <p className="mb-4 text-lg text-center">
              Click below to view the full project:
            </p>
            <div className="text-center">
              <a
                href={project.embedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4CAF50] hover:text-white font-bold text-lg"
              >
                View Full Project
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
