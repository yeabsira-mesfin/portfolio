import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CV from "../images/YEABSIRA MESFIN.pdf";

import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 22 },
      visible: { opacity: 1, y: 0 },
    }),
    [],
  );

  const metrics = [
    { label: "Projects Built", value: "50+" },
    { label: "Promotions Earned", value: "3" },
    { label: "Client Work", value: "Hands-On" },
    { label: "Focus Areas", value: "Full-Stack Development & Security" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 py-16 overflow-hidden bg-gray-50"
      aria-label="About me section"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-[#2a9d8f] to-[#4CAF50] opacity-15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[#1B4332] to-[#2a9d8f] opacity-10 blur-3xl" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-[#1B4332] text-center"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          About Me
        </motion.h2>

        <motion.p
          className="mt-4 text-center text-[#1B4332]/80 text-lg max-w-3xl mx-auto"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          I’m Yeabsira, a web developer and master’s student in cybersecurity in
          computer science at GWU. I enjoy building clean, reliable web
          applications, working with real users, and continuously improving my
          skills across software development, and secure-by-design systems.
        </motion.p>

        {/* Highlights */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="grid grid-cols-2 gap-3 mt-8 sm:grid-cols-4"
          aria-label="Highlights"
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              className="px-4 py-3 text-center bg-white border border-gray-100 shadow-sm rounded-2xl"
            >
              <div className="text-xl font-bold text-[#1B4332]">{m.value}</div>
              <div className="text-xs text-[#1B4332]/70">{m.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-3"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={
            reduceMotion
              ? undefined
              : { visible: { transition: { staggerChildren: 0.08 } } }
          }
        >
          {/* Quick Profile */}
          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            transition={{ duration: 0.65 }}
            className="p-6 bg-white border border-gray-100 shadow-lg lg:col-span-1 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-[#1B4332]">Quick Profile</h3>

            <div className="mt-4 space-y-3 text-[#1B4332]/80">
              <p>
                <span className="font-semibold text-[#1B4332]">
                  M.S. in Cybersecurity (Computer Science track)
                </span>{" "}
                @ The George Washington University (Expected 2027)
              </p>

              <p>
                Web developer with hands-on experience building{" "}
                <span className="font-semibold text-[#1B4332]">
                  real client-facing applications
                </span>{" "}
                using React, JavaScript, and backend tools.
              </p>

              <p>
                Currently focused on{" "}
                <span className="font-semibold text-[#1B4332]">
                  Python development, software engineering fundamentals, and
                  secure web practices
                </span>
                , with an interest in building systems that are both useful and
                safe.
              </p>

              <p className="text-sm text-[#1B4332]/70">
                Open to full-time roles, internships, and part-time
                opportunities.
              </p>

              <p className="text-sm text-[#1B4332]/70">
                Outside of tech, I enjoy soccer and running to stay disciplined
                and focused.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <a
                href={CV}
                download="Yeabsira_Mesfin_Resume.pdf"
                className="inline-flex items-center justify-center rounded-xl bg-[#1B4332] text-white px-5 py-3 font-semibold shadow-md hover:bg-[#2a9d8f] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]/30"
              >
                Download Resume
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl border border-[#1B4332] text-[#1B4332] px-5 py-3 font-semibold hover:bg-[#1B4332] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]/30"
              >
                View Projects
              </a>
            </div>

            <div className="flex items-center justify-center gap-5 mt-6">
              <a
                href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B4332] hover:text-[#2a9d8f] transition transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-7 w-7" />
              </a>

              <a
                href="https://github.com/yeabsira-mesfin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B4332] hover:text-[#2a9d8f] transition transform hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub className="h-7 w-7" />
              </a>

              <a
                href="https://x.com/YeabsiraMesfin9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B4332] hover:text-[#2a9d8f] transition transform hover:scale-110"
                aria-label="X"
              >
                <FaXTwitter className="h-7 w-7" />
              </a>

              <a
                href="mailto:yeabsira.mesfin@gwmail.gwu.edu"
                className="text-[#1B4332] hover:text-[#2a9d8f] transition transform hover:scale-110"
                aria-label="Email"
              >
                <FaEnvelope className="h-7 w-7" />
              </a>
            </div>
          </motion.div>

          {/* My Story */}
          
<motion.div
  variants={reduceMotion ? undefined : fadeUp}
  transition={{ duration: 0.65, delay: 0.05 }}
  className="flex flex-col h-full p-6 bg-white border border-gray-100 shadow-lg lg:col-span-2 rounded-2xl"
>
  <h3 className="text-xl font-bold text-[#1B4332]">My Story</h3>

  <div className="mt-4 space-y-4 text-[#1B4332]/80 leading-relaxed">
    <p>
      I started my journey by building web projects for real users and learning
      quickly through hands-on work. Over time, I took on more responsibility,
      supported multiple clients, and learned how to stay focused and reliable
      even when managing several tasks at once.
    </p>

    <p>
      I enjoy working across the stack, from front-end development and user
      experience to backend logic, debugging, and problem solving. I like fixing
      bugs, improving existing features, and turning ideas into simple, reliable
      solutions through collaboration and clear communication.
    </p>

    <p>
      I am currently pursuing a master’s degree in{" "}
      <span className="font-semibold text-[#1B4332]">
        Cybersecurity in Computer Science
      </span>{" "}
      at GWU. I’m looking for opportunities where I can continue building
      software, learn from strong teams, and grow into roles that value both
      solid engineering and security awareness.
    </p>
  </div>

 
  {/* Bottom section */}
<div className="flex flex-col items-center gap-4 pt-8 mt-auto">
  {/* subtle divider */}
  <div className="w-16 h-[2px] bg-[#1B4332]/20 rounded-full" />

  {/* small personal line */}
  <p className="text-sm text-[#1B4332]/70 text-center max-w-md">
    Always learning, building, and looking for opportunities where I can grow
    and contribute meaningfully.
  </p>

  {/* buttons */}
  <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
    <a
      href="#services"
      className="inline-flex items-center justify-center rounded-xl bg-gray-50 px-6 py-3 text-sm font-semibold text-[#1B4332] ring-1 ring-inset ring-[#1B4332]/10 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]/30"
    >
      See Focus Areas
    </a>

    <a
      href="#contact"
      className="inline-flex items-center justify-center rounded-xl bg-[#1B4332] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]/30"
    >
      Contact Me
    </a>
  </div>
</div>

</motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
