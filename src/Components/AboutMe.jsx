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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 22 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  const metrics = [
    { label: "Projects Delivered", value: "50+" },
    { label: "Promotions", value: "3" },
    { label: "Peak Active Projects", value: "20+" },
    { label: "Client-Facing Work", value: "Hands-On" },
  ];

  
  const chipClass =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gray-50 text-[#1B4332] ring-1 ring-inset ring-[#1B4332]/10";

  const chips = [
    "React",
    "JavaScript",
    "HTML/CSS",
    "Node/Express",
    "SQL",
    "Git/GitHub",
    "OWASP Basics",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 py-16 overflow-hidden bg-gray-50"
      aria-label="About me section"
    >
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
          Software developer with web development experience, a cybersecurity
          foundation, and a strong track record in troubleshooting and
          client-facing delivery.
        </motion.p>

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
          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            transition={{ duration: 0.65 }}
            className="p-6 bg-white border border-gray-100 shadow-lg lg:col-span-1 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-[#1B4332]">Quick Profile</h3>

            <div className="mt-4 space-y-3 text-[#1B4332]/80">
              <p>
                <span className="font-semibold text-[#1B4332]">
                  M.S. Cybersecurity in Computer Science
                </span>{" "}
                @ GWU (Expected 2027)
              </p>

              <p>
                Software developer with experience building{" "}
                <span className="font-semibold text-[#1B4332]">
                  client-facing web applications
                </span>{" "}
                and supporting delivery across the full lifecycle.
              </p>

              <p>
                Growing focus on{" "}
                <span className="font-semibold text-[#1B4332]">
                  secure-by-default practices
                </span>
                , authentication concepts, and common web risks.
              </p>
            </div>

            
            <div className="flex flex-wrap gap-2 mt-5">
              {chips.map((c) => (
                <span key={c} className={chipClass}>
                  {c}
                </span>
              ))}
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

          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="p-6 bg-white border border-gray-100 shadow-lg lg:col-span-2 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-[#1B4332]">My Story</h3>

            <div className="mt-4 space-y-4 text-[#1B4332]/80 leading-relaxed">
              <p>
                I build and support web applications in customer-facing
                environments, where reliability and communication matter. I enjoy
                shipping improvements quickly, fixing bugs thoroughly, and making
                sure users feel the product is stable and intuitive.
              </p>

              <p>
                I am also building a cybersecurity foundation alongside software
                development, focusing on secure coding habits, authentication
                concepts, and awareness of common web vulnerabilities. My goal is
                to grow into roles where I can help teams build systems that are
                both useful and secure.
              </p>

              <p>
                Right now I am pursuing an M.S. in{" "}
                <span className="font-semibold text-[#1B4332]">
                  Cybersecurity in Computer Science
                </span>{" "}
                at GWU and looking for opportunities where I can contribute
                immediately while leveling up fast.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-6 sm:flex-row">
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl bg-gray-50 px-5 py-3 text-sm font-semibold text-[#1B4332] ring-1 ring-inset ring-[#1B4332]/10 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]/30"
              >
                See Focus Areas
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#1B4332] px-5 py-3 text-sm font-semibold text-white hover:opacity-95 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]/30"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
