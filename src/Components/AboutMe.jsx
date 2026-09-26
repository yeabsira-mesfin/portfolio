import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa";

const chapters = [
  {
    index: "01",
    label: "2019 / Build",
    title: "I learned by shipping.",
    text: "I started with freelance software work, turning requirements into working interfaces, APIs, and full-stack products. That gave me a product mindset before I ever had a formal title.",
    accent: "#d9ff43",
  },
  {
    index: "02",
    label: "2022-2025 / Operate",
    title: "Then production changed the questions.",
    text: "At MMCY I moved from developer to client-facing leadership while delivering and supporting enterprise event technology for teams including BCD Travel, YPO, Abbott, and CDW. Reliability, debugging, integrations, and calm incident response became part of the craft.",
    accent: "#76e4f7",
  },
  {
    index: "03",
    label: "Now / Secure",
    title: "Now I am going deeper into systems and security.",
    text: "My M.S. Cybersecurity in Computer Science work at GWU is pushing me further into network security, infrastructure, authentication, defensive engineering, and the systems thinking behind dependable software.",
    accent: "#ffb86b",
  },
];

const principles = [
  "Make the system understandable before making it clever.",
  "Design for failure paths, not only happy paths.",
  "Security and reliability are product features.",
  "Measure what changed after the code shipped.",
];

const AboutMe = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden bg-[#f4f1e8] px-5 py-24 text-[#101113] sm:px-7 lg:px-10 lg:py-32">
      <div className="absolute right-[-8rem] top-12 h-72 w-72 rounded-full bg-[#d9ff43]/35 blur-[100px]" />
      <div className="absolute left-[-10rem] top-[46%] h-80 w-80 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[.62fr_1.38fr] lg:gap-16"
        >
          <div>
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[#51604f]">01 / The story</p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-black/48">
              The shortest version of how software development turned into a broader obsession with systems, operations, and security.
            </p>
          </div>

          <div>
            <h2 className="max-w-5xl text-[clamp(2.8rem,6vw,6rem)] font-black leading-[0.93] tracking-[-0.065em]">
              I started by asking, <span className="text-black/28">“does it work?”</span>
              <br />
              Now I ask, <span className="underline decoration-[#d9ff43] decoration-[0.18em] underline-offset-[0.12em]">“will it hold up?”</span>
            </h2>
          </div>
        </motion.div>

        <div className="mt-20 grid gap-4 lg:grid-cols-3">
          {chapters.map((chapter, index) => (
            <motion.article
              key={chapter.index}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className="group relative overflow-hidden rounded-[1.7rem] border border-black/8 bg-white/65 p-6 shadow-[0_20px_60px_rgba(28,30,26,0.07)] backdrop-blur sm:p-7"
            >
              <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: chapter.accent }} />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-black/40">{chapter.label}</span>
                <span className="text-4xl font-black tracking-[-0.06em] text-black/8 transition group-hover:text-black/14">{chapter.index}</span>
              </div>
              <h3 className="mt-8 text-2xl font-black tracking-[-0.035em]">{chapter.title}</h3>
              <p className="mt-4 text-sm leading-7 text-black/56">{chapter.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-black/10 pt-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-black/38">Proof, not adjectives</p>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
              {[
                ["200+", "enterprise deliveries"],
                ["5,000+", "attendee records / zero data loss"],
                ["40%", "database performance improvement"],
                ["30%", "release cycle reduction"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">{value}</div>
                  <p className="mt-2 text-xs font-bold leading-5 text-black/43">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.7rem] bg-[#101113] p-6 text-white sm:p-7"
          >
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#d9ff43]">How I work</p>
            <div className="mt-5 space-y-4">
              {principles.map((principle) => (
                <div key={principle} className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#d9ff43] text-[9px] text-[#101113]">
                    <FaCheck />
                  </span>
                  <p className="text-sm font-semibold leading-6 text-white/68">{principle}</p>
                </div>
              ))}
            </div>
            <a href="#projects" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#d9ff43] transition hover:gap-3">
              See how that shows up in the work <FaArrowRight className="text-xs" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
