import { motion, useReducedMotion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const metrics = [
  { value: "5+", label: "Years Building" },
  { value: "200+", label: "Client Deliveries" },
  { value: "M.S.", label: "Cybersecurity @ GWU" },
  { value: "3", label: "Engineering Lanes" },
];

const focusAreas = [
  {
    title: "Software Engineering",
    text: "Full-stack applications, APIs, debugging, product-minded development, and maintainable code.",
  },
  {
    title: "Infrastructure Reliability",
    text: "Linux and Windows fundamentals, networking, containers, automation, monitoring, failover, and backup thinking.",
  },
  {
    title: "Cybersecurity",
    text: "Authentication, network security, secure coding, incident thinking, and security-focused graduate coursework.",
  },
];

const AboutMe = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f4f8f6] px-6 py-24 text-[#0d2c22] sm:px-8"
    >
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
            About me
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Software engineer expanding deeper into infrastructure and security.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#315447] sm:text-lg">
            I am Yeabsira Mesfin, a software engineer and M.S. Cybersecurity in
            Computer Science candidate at The George Washington University. My
            background combines full-stack development, client-facing technical
            delivery, troubleshooting, and team leadership. I am now applying
            that engineering foundation to reliable systems, infrastructure
            automation, networking, cloud, and secure operations.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-emerald-900/8 bg-white px-4 py-5 text-center shadow-[0_12px_35px_rgba(20,65,49,0.06)]"
            >
              <div className="text-2xl font-black tracking-tight text-[#0d2c22]">
                {metric.value}
              </div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-[#527064]">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.7rem] border border-emerald-900/8 bg-[#0b2a20] p-7 text-white shadow-2xl"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">
              Quick profile
            </p>
            <h3 className="mt-3 text-2xl font-black">Engineering foundation</h3>

            <div className="mt-6 space-y-5 text-sm leading-7 text-emerald-50/70">
              <p>
                <span className="font-bold text-white">Education:</span> M.S.
                Cybersecurity in Computer Science at GWU, expected 2027, with a
                B.S. in Computer Science.
              </p>
              <p>
                <span className="font-bold text-white">Development:</span>{" "}
                Python, JavaScript, React, Node.js, REST APIs, databases,
                debugging, and full-stack application delivery.
              </p>
              <p>
                <span className="font-bold text-white">Systems direction:</span>{" "}
                infrastructure reliability, Linux, Windows, networking,
                containers, Infrastructure as Code, monitoring, backup
                verification, and automation.
              </p>
              <p>
                <span className="font-bold text-white">Career focus:</span>{" "}
                software engineering, infrastructure engineering, security
                engineering, and adjacent technical roles where coding and
                systems thinking meet.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-xl bg-emerald-300 px-5 py-3 text-sm font-extrabold text-[#061b15] transition hover:bg-emerald-200"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Contact Me
              </a>
            </div>
          </motion.article>

          <motion.article
            initial={reduceMotion ? false : { opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="rounded-[1.7rem] border border-emerald-900/8 bg-white p-7 shadow-[0_18px_55px_rgba(20,65,49,0.08)]"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
              How I am growing
            </p>
            <h3 className="mt-3 text-2xl font-black">Three connected engineering lanes</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4a695d]">
              I do not see software, infrastructure, and security as separate
              identities. The most useful systems work often sits at the
              intersection of all three.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                  className="rounded-2xl border border-emerald-900/8 bg-[#f7faf8] p-5"
                >
                  <div className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-emerald-700 text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <h4 className="font-extrabold">{area.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#587267]">{area.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-emerald-900/8 pt-6">
              <p className="max-w-lg text-sm leading-6 text-[#587267]">
                I value practical work, clear communication, measurable
                reliability, and systems that can be understood and maintained.
              </p>
              <div className="ml-5 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#174b39] transition hover:-translate-y-0.5 hover:text-emerald-600"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://github.com/yeabsira-mesfin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#174b39] transition hover:-translate-y-0.5 hover:text-emerald-600"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
                <a
                  href="https://x.com/YeabsiraMesfin9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#174b39] transition hover:-translate-y-0.5 hover:text-emerald-600"
                  aria-label="X"
                >
                  <FaXTwitter className="h-6 w-6" />
                </a>
                <a
                  href="mailto:yeabsira.mesfin29@gmail.com"
                  className="text-[#174b39] transition hover:-translate-y-0.5 hover:text-emerald-600"
                  aria-label="Email"
                >
                  <FaEnvelope className="h-6 w-6" />
                </a>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;