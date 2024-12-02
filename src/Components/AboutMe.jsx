import React from "react";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <section id="about" className="py-20 px-10 bg-gray-50">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-[#243d27] mb-8">About Me</h2>
        <p className="text-lg text-[#243d27] leading-relaxed px-4">
          Hi, I’m Yeabsira! I’m a web developer who loves bringing creative ideas to life. I specialize in
          <span className="font-medium"> React.js, HTML/CSS, JavaScript, Node.js,</span> and <span className="font-medium">TypeScript</span>. My fascination with building and improving things started in college, where I had a blast working on Java projects and figuring out how to make them better.
        </p>
        <p className="text-lg text-[#243d27] leading-relaxed px-4 mt-4">
          At my current job, I’ve been promoted twice—proof of how much I value building trust with clients and delivering work that truly makes an impact. Outside of coding, I’m a big football fan (weekends are for games!) and an avid reader of thriller novels. Oh, and I also enjoy tinkering with fun side projects when inspiration strikes.
        </p>
        <p className="text-lg text-[#243d27] leading-relaxed px-4 mt-4">
          Let’s connect on <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="text-[#2a9d8f] underline hover:opacity-80 transition-opacity">LinkedIn</a> or <a href="https://github.com/yeabsira-mesfin" target="_blank" rel="noopener noreferrer" className="text-[#2a9d8f] underline hover:opacity-80 transition-opacity">GitHub</a>—whether to chat, collaborate, or maybe even work together. Who knows? I could be the person you’ve been looking for!
        </p>
      </motion.div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-8 mt-12">
        <motion.a
          href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#243d27] hover:text-[#2a9d8f] transition-transform transform hover:scale-110"
          whileHover={{ scale: 1.2 }}
        >
          <i className="fab fa-linkedin text-4xl"></i>
        </motion.a>
        <motion.a
          href="https://x.com/YeabsiraMesfin9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#243d27] hover:text-[#2a9d8f] transition-transform transform hover:scale-110"
          whileHover={{ scale: 1.2 }}
        >
          <i className="fab fa-twitter text-4xl"></i>
        </motion.a>
        <motion.a
          href="https://github.com/yeabsira-mesfin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#243d27] hover:text-[#2a9d8f] transition-transform transform hover:scale-110"
          whileHover={{ scale: 1.2 }}
        >
          <i className="fab fa-github text-4xl"></i>
        </motion.a>
      </div>
    </section>
  );
};

export default AboutMe;
