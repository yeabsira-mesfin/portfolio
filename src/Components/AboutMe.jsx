import React from "react";

const AboutMe = () => {
  return (
    <section id="about" className="py-16 px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#243d27]">About Me</h2>
        <p className="text-[#243d27]">Hi, I’m Yeabsira! I’m a web developer who loves bringing creative ideas to life. I specialize in React.js, HTML/CSS, JavaScript, Node.js, and TypeScript. My fascination with building and improving things started in college, where I had a blast working on Java projects and figuring out how to make them better.
At my current job, I’ve been promoted  of  much I value building trust with clients and delivering work that truly makes an impact. Outside of coding, I’m a big football fan (weekends are for games!) and an avid reader of thriller novels. Oh, and I also enjoy tinkering with fun side projects when inspiration strikes.
Let’s connect on LinkedIn or GitHub—whether to chat, collaborate, or maybe even work together. Who knows? I could be the person you’ve been looking for!
</p>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-6 mt-6 justify-center">
        <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin text-3xl text-[#243d27]"></i>
        </a>
        <a href="https://x.com/YeabsiraMesfin9" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter text-3xl text-[#243d27]"></i>
        </a>
        <a href="https://github.com/yeabsira-mesfin" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github text-3xl text-[#243d27]"></i>
        </a>
      </div>
    </section>
  );
};

export default AboutMe;
