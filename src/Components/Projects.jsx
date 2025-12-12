import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    {
      id: 3,
      title: "Tourist Trail",
      liveDemo: "https://tourist-trail.vercel.app/",
      github: "https://github.com/yeabsira-mesfin/tourist-trail",
      oneLine: "Discover and plan trips with a user-friendly travel web app.",
      tags: ["React", "Maps", "Dashboard", "Public"],
      caseStudy: {
        problem: [
          "Travelers need a way to discover and plan trips to new destinations with reliable information."
        ],
        solution: [
          "Responsive app for exploring destinations.",
          "Interactive maps and search.",
          "Key metrics and usage insights."
        ],
        techStack: ["React.js", "JavaScript", "CSS", "APIs"],
        security: [
          "Input validation for search.",
          "Safe API data handling.",
          "Error handling for requests."
        ],
        improveNext: [
          "Add user authentication.",
          "Expand data sources."
        ]
      }
    },
    {
      id: 4,
      title: "TaskFlow (Task Manager)",
      liveDemo: "https://project-managment-ten.vercel.app/",
      github: "https://github.com/yeabsira-mesfin/task-manager",
      oneLine: "Simple, intuitive task manager with dashboard insights.",
      tags: ["React", "Dashboard", "Productivity"],
      caseStudy: {
        problem: [
          "Users need a simple way to organize and track tasks."
        ],
        solution: [
          "Clean task management interface.",
          "Task creation, editing, completion.",
          "Dashboard with key metrics."
        ],
        techStack: ["React.js", "JavaScript", "CSS"],
        security: [
          "Input validation for tasks.",
          "Error handling for actions.",
          "TODO: Confirm if authentication is implemented."
        ],
        improveNext: [
          "Add authentication.",
          "Enable notifications."
        ]
      }
    },
    {
      id: 2,
      title: "ShopEase (Shop Here)",
      liveDemo: "https://shop-ease-sigma-jade.vercel.app/",
      github: "https://github.com/yeabsira-mesfin/shop-ease",
      oneLine: "E-commerce platform for easy product browsing and purchase.",
      tags: ["React", "E-commerce", "Metrics"],
      caseStudy: {
        problem: [
          "Shoppers want a fast, easy way to browse and purchase products online."
        ],
        solution: [
          "User-friendly e-commerce site.",
          "Product search, filter, cart.",
          "Product metrics for shop owners."
        ],
        techStack: ["React.js", "JavaScript", "CSS"],
        security: [
          "Input validation for checkout.",
          "Safe cart data handling.",
          "TODO: Confirm if payment/auth features exist."
        ],
        improveNext: [
          "Integrate payment processing.",
          "Add user accounts."
        ]
      }
    },
    {
      id: 1,
      title: "Home Of Games",
      liveDemo: "https://homeofgames.vercel.app/",
      github: "https://github.com/yeabsira-mesfin/home-of-games",
      oneLine: "Game discovery and review platform with user activity dashboard.",
      tags: ["React", "Games", "Dashboard"],
      caseStudy: {
        problem: [
          "Gamers want a central place to discover and review games."
        ],
        solution: [
          "Browse and review games.",
          "Search, filter, review features.",
          "Dashboard for user activity."
        ],
        techStack: ["React.js", "JavaScript", "CSS", "APIs"],
        security: [
          "Input validation for reviews.",
          "Safe API integration.",
          "Error handling for actions."
        ],
        improveNext: [
          "Add authentication/profiles.",
          "Expand moderation tools."
        ]
      }
    }
  ];

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

  // No details expand/collapse logic needed

  return (
    <>
      <GlobalStyles />
      <motion.div
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
        <motion.p className="py-1 mb-3 text-center" variants={itemVariants}>
          Interested in exploring more? Visit my{' '}
          <a
            href="https://github.com/yeabsira-mesfin"
            className="text-[#2a9d8f] font-bold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{' '}
          for a deeper look at my work.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
        >
          {projectData.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative p-4 transition-all duration-500 ease-in-out transform shadow-2xl bg-dark-green rounded-2xl group focus-within:ring-2 focus-within:ring-[#2a9d8f] cursor-pointer"
              variants={itemVariants}
              tabIndex={0}
              onClick={e => {
                if (!e.target.closest('a')) {
                  window.open(project.liveDemo, '_blank', 'noopener,noreferrer');
                }
              }}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
                  window.open(project.liveDemo, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <div className="mb-4 overflow-hidden shadow-lg rounded-2xl">
                <iframe
                  src={project.liveDemo}
                  className="w-full h-48 transition-all duration-300 ease-in-out transform sm:h-56 md:h-60 rounded-2xl hover:scale-105"
                  title={project.title}
                  scrolling="no"
                  style={{
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out",
                  }}
                ></iframe>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-base text-[#d2f5e3] mb-1">
                  {project.oneLine}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-medium bg-[#2a9d8f] text-white rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* No Details button */}
              </div>
              {/* Hover overlay for desktop */}
              <div
                className="absolute inset-0 z-10 hidden group-hover:flex bg-black bg-opacity-80 flex-col justify-center items-center rounded-2xl transition-opacity duration-300"
                aria-hidden="false"
              >
                <div className="px-4 py-2 text-center w-full h-full flex flex-col justify-center items-center">
                  <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-sm text-[#d2f5e3] mb-2">{project.oneLine}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-xs font-medium bg-[#2a9d8f] text-white rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* No expandable details for mobile/accessibility */}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Projects;
