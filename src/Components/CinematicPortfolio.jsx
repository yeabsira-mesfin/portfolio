import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCode,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaGraduationCap,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaServer,
} from "react-icons/fa";
import myImage from "../images/MyPicture.png";
import windowsConsole from "../images/windows-infrastructure-console.svg";

const scenes = [
  { id: "intro", label: "Start", number: "00" },
  { id: "story", label: "Story", number: "01" },
  { id: "projects", label: "Projects", number: "02" },
  { id: "contact", label: "Contact", number: "03" },
];

const projects = [
  {
    id: "windows",
    title: "Windows Infrastructure Reliability Console",
    lane: "Infrastructure + Security",
    summary:
      "A Windows reliability lab that turns health checks, network visibility, backup integrity, and failover into one operational view.",
    proof: "PowerShell · Networking · SHA-256 · Failover · React",
    repo: "https://github.com/yeabsira-mesfin/windows-infrastructure-reliability-console",
    image: windowsConsole,
    code: "WIN",
    accent: "#F0B93F",
  },
  {
    id: "cloud",
    title: "Secure Cloud Infrastructure as Code",
    lane: "Cloud + Security",
    summary:
      "Terraform-based AWS architecture with multi-AZ design, load balancing, autoscaling, segmentation, and encrypted versioned storage.",
    proof: "Terraform · AWS · IaC · Availability · Encryption",
    repo: "https://github.com/yeabsira-mesfin/secure-cloud-infrastructure-iac",
    code: "IAC",
    accent: "#D712CA",
  },
  {
    id: "techboard",
    title: "TechBoard",
    lane: "Full Stack + RBAC",
    summary:
      "A Django and PostgreSQL job platform with role-based authentication, search, resume uploads, applicant tracking, and separate workflows.",
    proof: "Python · Django · PostgreSQL · RBAC · Product UX",
    repo: "https://github.com/yeabsira-mesfin/techboard",
    code: "TB",
    accent: "#8D67FF",
  },
  {
    id: "login",
    title: "Secure Login Analyzer",
    lane: "Security + Python",
    summary:
      "Authentication event analysis for repeated failures, blocked activity, location anomalies, validation, and testable detection logic.",
    proof: "Python · Authentication · Detection · Testing",
    repo: "https://github.com/yeabsira-mesfin/secure_login_analyzer",
    code: "AUTH",
    accent: "#DF2C41",
  },
];

const storyCards = [
  {
    eyebrow: "WHAT I AM",
    title: "Software engineer with systems instincts.",
    text: "I build full-stack products, but I naturally follow the work deeper: APIs, identity, networking, infrastructure, reliability, and security.",
    icon: FaCode,
    accent: "#F0B93F",
  },
  {
    eyebrow: "WHAT I’M DOING",
    title: "Going deeper into cybersecurity.",
    text: "I am completing an M.S. in Cybersecurity in Computer Science at The George Washington University, focused on secure systems and network security.",
    icon: FaGraduationCap,
    accent: "#D712CA",
  },
  {
    eyebrow: "WHAT I’VE DONE",
    title: "Built and operated real client systems.",
    text: "At MMCY, I grew from developer into client-facing leadership while delivering 200+ enterprise event builds and supporting production outcomes.",
    icon: FaServer,
    accent: "#8D67FF",
  },
];

const Gear = ({ scene, wheelTurn, reduceMotion, onNavigate }) => {
  const rotation = reduceMotion ? scene * 40 : wheelTurn * 160 + scene * 62;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] select-none">
      <div className="absolute inset-[3%] rounded-full bg-[radial-gradient(circle,rgba(215,18,202,.16),rgba(78,7,231,.06)_38%,transparent_68%)] blur-2xl" />

      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: reduceMotion ? 0.15 : 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-[5%]"
      >
        {Array.from({ length: 28 }).map((_, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 h-[7%] w-[2.1%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-white/30 to-white/5"
            style={{ transform: `translate(-50%, -50%) rotate(${index * (360 / 28)}deg) translateY(-685%)` }}
          />
        ))}
        <div className="absolute inset-[6%] rounded-full border border-white/15 bg-[conic-gradient(from_30deg,rgba(215,18,202,.42),rgba(78,7,231,.1),rgba(240,185,63,.3),rgba(215,18,202,.42))] p-[1px] shadow-[0_0_80px_rgba(215,18,202,.12)]">
          <div className="h-full w-full rounded-full bg-[#0b080d]" />
        </div>
        <div className="absolute inset-[15%] rounded-full border border-dashed border-white/16" />
        <div className="absolute inset-[27%] rounded-full border border-white/10" />
      </motion.div>

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -7, 0], scale: [1, 1.012, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[19%] z-10 overflow-hidden rounded-full border border-white/18 bg-[#160d18] p-2 shadow-[0_24px_90px_rgba(0,0,0,.55)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <img
            src={myImage}
            alt="Yeabsira Mesfin"
            className="h-full w-full object-cover object-top saturate-[.9] contrast-[1.03]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,6,12,.8),transparent_42%)]" />
          <motion.div
            animate={reduceMotion ? undefined : { x: ["-120%", "160%"] }}
            transition={{ duration: 5.2, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
            className="absolute inset-y-0 w-20 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl"
          />
        </div>
      </motion.div>

      <div className="absolute inset-0 z-20">
        {scenes.slice(1).map((item, index) => {
          const angle = [-42, 90, 222][index];
          const active = scene === index + 1;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(index + 1)}
              className={`absolute left-1/2 top-1/2 flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.17em] backdrop-blur-xl transition sm:text-[10px] ${
                active
                  ? "border-[#F0B93F]/50 bg-[#F0B93F] text-[#120c13] shadow-[0_0_32px_rgba(240,185,63,.22)]"
                  : "border-white/12 bg-[#0d0910]/80 text-white/45 hover:border-white/28 hover:text-white"
              }`}
              style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * clamp(150px, 38vw, 245px))) rotate(${-angle}deg)` }}
            >
              <span>{item.number}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-[11%] z-[5] rounded-full border border-white/[.045]" />
      <div className="pointer-events-none absolute inset-[33%] z-20 rounded-full border border-[#F4DEEA]/10" />
    </div>
  );
};

const SceneShell = ({ children }) => (
  <div className="mx-auto grid min-h-[calc(100dvh-7rem)] w-full max-w-7xl items-center gap-8 px-5 pb-10 pt-28 sm:px-7 lg:grid-cols-[.92fr_1.08fr] lg:gap-14 lg:px-10 lg:pb-8 lg:pt-24">
    {children}
  </div>
);

const CinematicPortfolio = () => {
  const reduceMotion = useReducedMotion();
  const [scene, setScene] = useState(0);
  const [wheelTurn, setWheelTurn] = useState(0);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (target) => {
    if (target === scene || transitioning) return;
    setTransitioning(true);
    setWheelTurn((value) => value + 1);
    window.setTimeout(() => {
      setScene(target);
      setTransitioning(false);
    }, reduceMotion ? 80 : 520);
  };

  const sceneVariants = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", scale: 0.985, y: 14 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", scale: 1.015, y: -10 },
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#080609] text-[#F4DEEA]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(70,20,59,.45),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(78,7,231,.15),transparent_26%),radial-gradient(circle_at_72%_80%,rgba(215,18,202,.12),transparent_28%),linear-gradient(135deg,#080609,#100912_46%,#09070b)]" />
      <div className="film-grid pointer-events-none fixed inset-0 opacity-40" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,.025),transparent_16%,transparent_84%,rgba(255,255,255,.025))]" />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/9 bg-[#0c080e]/68 px-3.5 py-2.5 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-2xl sm:px-4">
          <button type="button" onClick={() => navigate(0)} className="group flex items-center gap-3 text-left">
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/14 bg-white/[.04] font-mono text-[10px] font-bold text-white/80">
              YM
              <span className="absolute -inset-1 rounded-full border border-[#D712CA]/0 transition group-hover:border-[#D712CA]/35" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-bold tracking-[-.02em] text-white/86">Yeabsira Mesfin</span>
              <span className="block font-mono text-[8px] uppercase tracking-[.18em] text-white/30">Software · Systems · Security</span>
            </span>
          </button>

          <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Portfolio sections">
            {scenes.slice(1).map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(index + 1)}
                className={`rounded-xl px-2.5 py-2 text-[10px] font-bold uppercase tracking-[.12em] transition sm:px-3 sm:text-xs ${
                  scene === index + 1 ? "bg-white/[.08] text-white" : "text-white/38 hover:bg-white/[.04] hover:text-white/75"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={scene}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: reduceMotion ? 0.08 : 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {scene === 0 && (
            <SceneShell>
              <div className="order-2 lg:order-1">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#F0B93F]/65" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[.22em] text-[#F0B93F]">Portfolio / 2026</span>
                </div>
                <h1 className="max-w-4xl text-[clamp(3.5rem,7.5vw,7rem)] font-semibold leading-[.84] tracking-[-.07em] text-[#F4DEEA]">
                  Yeabsira<br /><span className="bg-gradient-to-r from-[#F4DEEA] via-[#D712CA] to-[#F0B93F] bg-clip-text text-transparent">Mesfin.</span>
                </h1>
                <p className="mt-7 max-w-xl text-[clamp(1.15rem,2vw,1.55rem)] font-medium leading-[1.35] tracking-[-.02em] text-white/70">
                  I build software, understand the systems underneath it, and keep moving deeper into security.
                </p>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/38 sm:text-base">
                  Want to step into the story? Turn the wheel and move through what I am, what I have built, and where I am going next.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(1)}
                    className="group inline-flex items-center gap-3 rounded-full bg-[#F4DEEA] px-5 py-3.5 text-sm font-bold text-[#160d18] transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    Enter my story <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </button>
                  <button type="button" onClick={() => navigate(2)} className="rounded-full border border-white/12 bg-white/[.025] px-4 py-3 text-xs font-bold text-white/58 transition hover:border-white/24 hover:text-white">Jump to projects</button>
                  <button type="button" onClick={() => navigate(3)} className="rounded-full border border-white/12 bg-white/[.025] px-4 py-3 text-xs font-bold text-white/58 transition hover:border-white/24 hover:text-white">Contact</button>
                </div>

                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/8 pt-5 font-mono text-[9px] uppercase tracking-[.17em] text-white/25">
                  <span>5+ years building</span>
                  <span>200+ enterprise deliveries</span>
                  <span>GWU cybersecurity M.S.</span>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} />
              </div>
            </SceneShell>
          )}

          {scene === 1 && (
            <SceneShell>
              <div>
                <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} />
              </div>

              <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto pr-1 lg:max-h-[76vh]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#D712CA]">01 / My story</span>
                  <span className="h-px flex-1 bg-white/8" />
                </div>
                <h2 className="mt-5 text-[clamp(2.8rem,5.5vw,5.3rem)] font-semibold leading-[.9] tracking-[-.065em] text-[#F4DEEA]">The person<br /><span className="text-white/25">behind the system.</span></h2>

                <div className="mt-7 grid gap-3">
                  {storyCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.article
                        key={card.eyebrow}
                        initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.09, duration: 0.5 }}
                        whileHover={reduceMotion ? undefined : { x: 5 }}
                        className="group rounded-[1.4rem] border border-white/9 bg-white/[.035] p-5 backdrop-blur-xl"
                      >
                        <div className="flex gap-4">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/8 bg-black/10 text-base" style={{ color: card.accent }}><Icon /></span>
                          <div>
                            <p className="font-mono text-[8px] font-bold uppercase tracking-[.2em]" style={{ color: card.accent }}>{card.eyebrow}</p>
                            <h3 className="mt-1.5 text-lg font-semibold tracking-[-.025em] text-white/88">{card.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-white/40">{card.text}</p>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>

                <button type="button" onClick={() => navigate(2)} className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-[#F0B93F]">
                  See what I build <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </SceneShell>
          )}

          {scene === 2 && (
            <div className="mx-auto min-h-[100dvh] w-full max-w-7xl px-5 pb-10 pt-28 sm:px-7 lg:px-10 lg:pt-24">
              <div className="grid min-h-[calc(100dvh-8rem)] gap-7 lg:grid-cols-[.42fr_1.58fr] lg:items-center lg:gap-9">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#8D67FF]">02 / Project orbit</span>
                    <span className="h-px flex-1 bg-white/8" />
                  </div>
                  <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[.9] tracking-[-.06em]">Selected<br /><span className="text-white/25">work.</span></h2>
                  <p className="mt-5 text-sm leading-6 text-white/38">Choose a project. The wheel stays in motion while the work comes into focus.</p>

                  <div className="mt-7 space-y-2">
                    {projects.map((project) => {
                      const active = selectedProject.id === project.id;
                      return (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => { setSelectedProject(project); setWheelTurn((value) => value + 1); }}
                          className={`w-full rounded-2xl border p-3.5 text-left transition ${active ? "border-white/17 bg-white/[.07]" : "border-white/6 bg-white/[.018] hover:border-white/12 hover:bg-white/[.035]"}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/8 font-mono text-[9px] font-bold" style={{ color: project.accent }}>{project.code}</span>
                            <div className="min-w-0">
                              <p className={`truncate text-sm font-semibold ${active ? "text-white" : "text-white/55"}`}>{project.title}</p>
                              <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[.14em] text-white/23">{project.lane}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
                  <div className="hidden lg:block">
                    <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.article
                      key={selectedProject.id}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, rotateY: 4 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, rotateY: -4 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#100b12]/78 p-3 shadow-[0_30px_90px_rgba(0,0,0,.4)] backdrop-blur-xl sm:p-4"
                    >
                      {selectedProject.image ? (
                        <img src={selectedProject.image} alt={`${selectedProject.title} preview`} className="aspect-[16/10] w-full rounded-[1.25rem] object-cover" />
                      ) : (
                        <div className="project-mesh relative grid aspect-[16/10] place-items-center overflow-hidden rounded-[1.25rem] border border-white/7 bg-[#09070b]">
                          <motion.div
                            animate={reduceMotion ? undefined : { rotate: 360 }}
                            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                            className="absolute h-[68%] w-[68%] rounded-full border border-dashed border-white/10"
                          />
                          <div className="relative grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-white/[.035] text-3xl font-semibold" style={{ color: selectedProject.accent }}>{selectedProject.code}</div>
                        </div>
                      )}
                      <div className="p-3 pb-4 pt-5 sm:p-4 sm:pb-4">
                        <p className="font-mono text-[8px] font-bold uppercase tracking-[.18em]" style={{ color: selectedProject.accent }}>{selectedProject.lane}</p>
                        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-.04em] text-white/90 sm:text-3xl">{selectedProject.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-white/42">{selectedProject.summary}</p>
                        <div className="mt-4 rounded-xl border border-white/7 bg-white/[.025] px-3.5 py-3 font-mono text-[9px] leading-5 text-white/35">{selectedProject.proof}</div>
                        <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white/65 transition hover:text-white">Open repository <FaExternalLinkAlt className="text-[9px]" /></a>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {scene === 3 && (
            <SceneShell>
              <div>
                <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#F0B93F]">03 / Contact</span>
                  <span className="h-px flex-1 bg-white/8" />
                </div>
                <h2 className="mt-5 text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[.87] tracking-[-.065em] text-[#F4DEEA]">Let’s build<br /><span className="text-white/25">what comes next.</span></h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/42">
                  I am interested in software engineering, infrastructure, application security, and security engineering work where product thinking and systems thinking meet.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a href="mailto:yeabsira.mesfin29@gmail.com" className="group rounded-2xl border border-white/9 bg-white/[.035] p-4 transition hover:border-[#F0B93F]/35 hover:bg-white/[.055]">
                    <FaEnvelope className="text-[#F0B93F]" />
                    <p className="mt-4 font-mono text-[8px] uppercase tracking-[.18em] text-white/25">Email</p>
                    <p className="mt-1 text-sm font-semibold text-white/75">yeabsira.mesfin29@gmail.com</p>
                  </a>
                  <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/9 bg-white/[.035] p-4 transition hover:border-[#D712CA]/35 hover:bg-white/[.055]">
                    <FaLinkedinIn className="text-[#D712CA]" />
                    <p className="mt-4 font-mono text-[8px] uppercase tracking-[.18em] text-white/25">LinkedIn</p>
                    <p className="mt-1 text-sm font-semibold text-white/75">Yeabsira Mesfin</p>
                  </a>
                  <a href="https://github.com/yeabsira-mesfin" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/9 bg-white/[.035] p-4 transition hover:border-[#8D67FF]/35 hover:bg-white/[.055]">
                    <FaGithub className="text-[#8D67FF]" />
                    <p className="mt-4 font-mono text-[8px] uppercase tracking-[.18em] text-white/25">GitHub</p>
                    <p className="mt-1 text-sm font-semibold text-white/75">github.com/yeabsira-mesfin</p>
                  </a>
                  <div className="rounded-2xl border border-white/9 bg-white/[.035] p-4">
                    <FaMapMarkerAlt className="text-[#DF2C41]" />
                    <p className="mt-4 font-mono text-[8px] uppercase tracking-[.18em] text-white/25">Based in</p>
                    <p className="mt-1 text-sm font-semibold text-white/75">Bristow, Virginia</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button type="button" onClick={() => navigate(0)} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-xs font-bold text-white/50 hover:text-white"><FaArrowLeft /> Back to start</button>
                  <button type="button" onClick={() => navigate(2)} className="inline-flex items-center gap-2 rounded-full bg-[#F4DEEA] px-4 py-3 text-xs font-bold text-[#160d18]">Review projects <FaArrowRight /></button>
                </div>
              </div>
            </SceneShell>
          )}
        </motion.main>
      </AnimatePresence>

      {transitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle_at_center,rgba(215,18,202,.08),rgba(8,6,9,.15)_40%,rgba(8,6,9,.55))]"
        />
      )}
    </div>
  );
};

export default CinematicPortfolio;
