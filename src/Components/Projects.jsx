import React from "react";
import { motion } from "framer-motion";

// Adding global styles for scrollbars in the app (for Chrome, Safari, and Firefox)
const GlobalStyles = () => (
  <style>
    {`
      /* For Chrome, Safari, and Opera */
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

      /* For Firefox */
      scrollbar-color: #4CAF50 ;
      scrollbar-width: thin;
    `}
  </style>
);

const Projects = () => {
  const projectData = [
    { id: 1, title: "Home Of Games", embedLink: "https://homeofgames.vercel.app/" },
    { id: 2, title: "Shop Here", embedLink: "https://shopping-lime-omega.vercel.app/" },
    { id: 3, title: "Tourist Trail", embedLink: "https://places-to-visit-pied.vercel.app/" },
    { id: 4, title: "Project Manager", embedLink: "https://project-managment-ten.vercel.app/" },
  ];

  return (
    <>
      <GlobalStyles /> {/* Apply global styles for scrollbars */}
      <div id="projects" className="px-8 py-16 text-white bg-dark-green">
        <h2 className="mb-5 text-4xl font-bold text-center md:text-5xl">My Projects</h2>
        <p className="py-1 mb-3 text-center">Fell free to visit my <a href="https://github.com/yeabsira-mesfin" className="text-[#2a9d8f]" target="_blank">GitHub</a> to see all my projects.</p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projectData.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative p-6 transition-all duration-500 ease-in-out transform shadow-2xl bg-dark-green rounded-2xl hover:scale-105 hover:shadow-2xl hover:bg-[#2a9d8f]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Embedded Preview */}
              <div className="mb-6 overflow-hidden shadow-lg rounded-2xl">
                <iframe
                  src={project.embedLink}
                  className="w-full h-48 rounded-2xl"
                 
                  title={project.title}
                  style={{ overflowX: "hidden", overflowY: "hidden" }}
                ></iframe>
              </div>

              {/* Project Info Bar without background */}
              <div className="p-4 mb-4 text-center rounded-lg">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mb-4 text-lg text-white">
                  Click below to view the full project:
                </p>
                <a
                  href={project.embedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-green-300 hover:text-white"
                >
                  View Full Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
