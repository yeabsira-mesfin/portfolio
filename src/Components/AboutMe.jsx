import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CV from "../images/YEABSIRA MESFIN.pdf";

import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { FaTools, FaNetworkWired } from "react-icons/fa";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.25 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

 
 

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 py-16 overflow-hidden bg-gray-50"
    >
      {/* soft background accents (same design) */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-[#2a9d8f] to-[#4CAF50] opacity-15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[#1B4332] to-[#2a9d8f] opacity-10 blur-3xl" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-[#1B4332] text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>

        <motion.p
          className="mt-4 text-center text-[#1B4332]/80 text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Software Engineer with experience in customer-facing support, web development,
          and cybersecurity foundations.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-3"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Left card: Quick Profile */}
      <motion.div 
  variants={fadeUp}
  transition={{ duration: 0.7 }}
  className="p-6 bg-white border border-gray-100 shadow-lg lg:col-span-1 rounded-2xl"
>
  <h3 className="text-xl font-bold text-[#1B4332]">Quick Profile</h3>

  {/* Clean paragraph-based profile (no list styling) */}
  <div className="mt-4 space-y-3 text-[#1B4332]/80">
    <p>
      <span className="font-semibold text-[#1B4332]">
        M.S. Cybersecurity
      </span>{" "}
      @ GWU (Expected 2027)
    </p>

    <p>
     Software Engineer with strong experience in{" "}
      <span className="font-semibold text-[#1B4332]">
        web development and customer-facing applications
      </span>.
    </p>

    <p>
      Background in{" "}
      <span className="font-semibold text-[#1B4332]">
        secure development practices
      </span>, usability, and foundational cybersecurity concepts.
    </p>
  </div>

  {/* Buttons */}
  <div className="flex flex-col gap-3 mt-6">
    <a
      href={CV}
      download="Yeabsira_Mesfin_Resume"
      className="inline-flex items-center justify-center rounded-xl bg-[#1B4332] text-white px-5 py-3 font-semibold shadow-md hover:bg-[#2a9d8f] transition"
    >
      Download Resume (PDF)
    </a>

    <a
      href="#projects"
      className="inline-flex items-center justify-center rounded-xl border border-[#1B4332] text-[#1B4332] px-5 py-3 font-semibold hover:bg-[#1B4332] hover:text-white transition"
    >
      View Projects
    </a>
  </div>

  {/* Socials */}
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




          {/* Right card: My Story + Focused On */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="p-6 bg-white border border-gray-100 shadow-lg lg:col-span-2 rounded-2xl"
          >
            {/* <h3 className="text-xl font-bold text-[#1B4332]">My Story</h3> */}

            <div className="mt-4 space-y-4 text-[#1B4332]/80 leading-relaxed">
              <p>
                I’m a software engineer with experience building and supporting web
                applications in customer-facing environments. I enjoy working on problems that
                require careful troubleshooting, clear communication, and reliable system behavior.
              </p>

              <p>
                Alongside web development, I’m building a{" "}
                <span className="font-semibold text-[#1B4332]">
                  cybersecurity foundation
                </span>{" "}
                focused on secure coding practices, authentication concepts, and awareness of
                common web vulnerabilities.
              </p>

              <p>
                I’m currently pursuing an M.S. in Cybersecurity at GWU and preparing for roles
                where I can grow into operating and improving secure, scalable systems.
              </p>
            </div>

          

           
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
