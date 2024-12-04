import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="about" className="px-8 py-6 bg-gray-50">
      <div className="mx-auto text-center max-w-7xl">
      
        <h2
          className={`text-4xl font-bold text-[#1B4332] mb-6 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          About Me
        </h2>

       
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-lg text-[#1B4332] leading-relaxed">
            Hi, I’m Yeabsira! I’m a web developer who loves bringing creative ideas to life. I specialize in{" "}
            <span className="font-medium">React.js, HTML/CSS, JavaScript, Node.js,</span> and{" "}
            <span className="font-medium">TypeScript</span>. My fascination with building and improving things started
            in college, where I had a blast working on Java projects and figuring out how to make them better.
          </p>
          <p className="text-lg text-[#1B4332] leading-relaxed mt-4">
            At my current job, I’ve been promoted twice proof of how much I value building trust with clients and
            delivering work that truly makes an impact. Outside of coding, I’m a big football fan (weekends are for
            games!) and an avid reader of thriller novels. Oh, and I also enjoy tinkering with fun side projects when
            inspiration strikes.
          </p>
          <p className="text-lg text-[#1B4332] leading-relaxed mt-4 mb-5">
            Let’s connect on LinkedIn or GitHub whether to chat, collaborate, or maybe even work together. Who knows? I
            could be the person you’ve been looking for!
          </p>
          <motion.a
              href="/path-to-your-cv.pdf"
              download="Your-Name-CV"
              className="bg-[#1B4332] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#2a9d8f] transition duration-300 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Download My CV
            </motion.a>
        </div>
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
          <i className="text-4xl fab fa-twitter"></i>
        </a>
        <a
          href="https://github.com/yeabsira-mesfin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1B4332] hover:text-[#2a9d8f] transition transform hover:scale-110"
        >
          <i className="text-4xl fab fa-github"></i>
        </a>
      </div>
    </section>
  );
};

export default AboutMe;
