import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CV from "../images/YEABSIRA MESFIN.pdf";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-8 py-6 bg-gray-50"
    >
      <div className="mx-auto text-center max-w-7xl">
        <motion.h2
          className="text-4xl font-bold text-[#1B4332] mb-6"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-lg text-[#1B4332] leading-relaxed">
  Hi, I’m Yeabsira! I’m a web developer with a passion for turning ideas into interactive, user-friendly experiences. Whether it’s crafting sleek frontend interfaces or ensuring seamless backend functionality, I love building projects that make an impact. My expertise lies in technologies like <span className="font-medium">React.js, JavaScript, Node.js, HTML/CSS, TypeScript, and more</span>, allowing me to bring designs to life with clean, efficient code.
</p>
<p className="text-lg text-[#1B4332] leading-relaxed mt-4">
  Currently, I work as a web developer, where I build and optimize web applications that enhance user engagement and streamline workflows. I thrive on problem-solving, collaboration, and continuously refining my skills to stay ahead in the ever-evolving tech landscape. Whether it’s developing dynamic event tech solutions or crafting intuitive UI/UX designs, I always aim to deliver high-quality work that exceeds expectations.
</p>
<p className="text-lg text-[#1B4332] leading-relaxed mt-4 mb-5">
Let’s connect on <span className="font-medium">LinkedIn, X (Twitter), GitHub or Gmail</span> whether to chat, collaborate, or maybe even work together. 
Who knows? I could be the person you’ve been looking for!
</p>

          <motion.a
            href={CV}
            download="Your-Name-CV"
            className="bg-[#1B4332] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#2a9d8f] transition duration-300"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Download My CV
          </motion.a>
        </motion.div>
      </div>

      <div className="flex justify-center mt-10 space-x-6">
        <a
          href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1B4332] hover:text-[#2a9d8f] transition transform hover:scale-110"
        >
          <i className="text-4xl fab fa-linkedin"></i>
        </a>
        <a
          href="https://x.com/YeabsiraMesfin9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1B4332] hover:text-[#2a9d8f] transition transform hover:scale-110"
        >
          <i className="text-4xl fab fa-x"></i>
        </a>
        <a
          href="https://github.com/yeabsira-mesfin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1B4332] hover:text-[#2a9d8f] transition transform hover:scale-110"
        >
          <i className="text-4xl fab fa-github"></i>
        </a>
       
        <a
          href="mailto:yeabsira.mesfin29@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1B4332] hover:text-[#2a9d8f] transition transform hover:scale-110"
        >
          <i className="text-4xl fas fa-envelope"></i>
        </a>
      </div>
    </section>
  );
};

export default AboutMe;
