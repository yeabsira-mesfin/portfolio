import React, { useEffect, useState } from "react";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay to trigger animations
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="about" className="py-6 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading with fade-in effect */}
        <h2
          className={`text-4xl font-bold text-[#243d27] mb-6 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          About Me
        </h2>

        {/* Grouped paragraphs with synchronized animation */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-lg text-[#243d27] leading-relaxed">
            Hi, I’m Yeabsira! I’m a web developer who loves bringing creative ideas to life. I specialize in{" "}
            <span className="font-medium">React.js, HTML/CSS, JavaScript, Node.js,</span> and{" "}
            <span className="font-medium">TypeScript</span>. My fascination with building and improving things started
            in college, where I had a blast working on Java projects and figuring out how to make them better.
          </p>
          <p className="text-lg text-[#243d27] leading-relaxed mt-4">
            At my current job, I’ve been promoted twice proof of how much I value building trust with clients and
            delivering work that truly makes an impact. Outside of coding, I’m a big football fan (weekends are for
            games!) and an avid reader of thriller novels. Oh, and I also enjoy tinkering with fun side projects when
            inspiration strikes.
          </p>
          <p className="text-lg text-[#243d27] leading-relaxed mt-4">
            Let’s connect on LinkedIn or GitHub—whether to chat, collaborate, or maybe even work together. Who knows? I
            could be the person you’ve been looking for!
          </p>
        </div>
      </div>

      {/* Social Media Links with hover animations */}
      <div className="flex justify-center space-x-6 mt-10">
        <a
          href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#243d27] hover:text-[#2a9d8f] transition transform hover:scale-110"
        >
          <i className="fab fa-linkedin text-4xl"></i>
        </a>
        <a
          href="https://x.com/YeabsiraMesfin9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#243d27] hover:text-[#2a9d8f] transition transform hover:scale-110"
        >
          <i className="fab fa-twitter text-4xl"></i>
        </a>
        <a
          href="https://github.com/yeabsira-mesfin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#243d27] hover:text-[#2a9d8f] transition transform hover:scale-110"
        >
          <i className="fab fa-github text-4xl"></i>
        </a>
      </div>
    </section>
  );
};

export default AboutMe;
