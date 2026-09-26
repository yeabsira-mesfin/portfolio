import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaGraduationCap,
  FaLinkedinIn,
  FaLock,
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
} from "react-icons/fa";
import myImage from "../images/MyPicture.png";
import windowsConsole from "../images/windows-infrastructure-console.svg";

const chapters = [
  { id: "gate", label: "Enter" },
  { id: "origin", label: "Origin" },
  { id: "enterprise", label: "Enterprise" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Loadout" },
  { id: "mission", label: "Now" },
  { id: "finish", label: "Connect" },
];

const projects = [
  {
    id: "windows",
    number: "01",
    title: "Windows Infrastructure Reliability Console",
    type: "Infrastructure + Security",
    text: "PowerShell health checks, network visibility, SHA-256 backup verification, failover simulation, and Windows CI in one operational view.",
    proof: "Shows how I connect software engineering with reliability, evidence, and recovery thinking.",
    repo: "https://github.com/yeabsira-mesfin/windows-infrastructure-reliability-console",
    image: windowsConsole,
    accent: "#d9ff43",
  },
  {
    id: "cloud",
    number: "02",
    title: "Secure Cloud Infrastructure as Code",
    type: "Infrastructure + Security",
    text: "Terraform-based AWS architecture with multi-AZ design, load balancing, autoscaling, security groups, and encrypted versioned storage.",
    proof: "Shows repeatable infrastructure design with resilience and security built into the architecture.",
    repo: "https://github.com/yeabsira-mesfin/secure-cloud-infrastructure-iac",
    accent: "#70dcff",
  },
  {
    id: "techboard",
    number: "03",
    title: "TechBoard",
    type: "Full Stack + RBAC",
    text: "Django and PostgreSQL job platform with role-based authentication, job search, resume uploads, applicant tracking, and separate user workflows.",
    proof: "Shows product thinking across UX, permissions, backend logic, and data.",
    repo: "https://github.com/yeabsira-mesfin/techboard",
    accent: "#ffbd6b",
  },
  {
    id: "login",
    number: "04",
    title: "Secure Login Analyzer",
    type: "Security + Python",
    text: "Authentication event analysis for repeated failures, blocked activity, anomalies, validation, and testable detection logic.",
    proof: "Shows how I turn security behavior into deterministic code and useful defensive signals.",
    repo: "https://github.com/yeabsira-mesfin/secure_login_analyzer",
    accent: "#ff7ca8",
  },
];

const loadouts = [
  {
    id: "build",
    label: "BUILD",
    title: "Software Engineering",
    icon: FaCode,
    accent: "#d9ff43",
    text: "Turn ambiguous requirements into maintainable products and APIs.",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "Python", "Java", "C#", "REST APIs", "SQL", "MongoDB"],
  },
  {
    id: "operate",
    label: "OPERATE",
    title: "Infrastructure & Reliability",
    icon: FaServer,
    accent: "#70dcff",
    text: "Design for visibility, automation, deployment, recovery, and dependable operation.",
    skills: ["Linux", "Docker", "CI/CD", "Networking", "DNS", "Git", "Troubleshooting", "Testing", "Monitoring", "Terraform"],
  },
  {
    id: "secure",
    label: "SECURE",
    title: "Security Engineering",
    icon: FaShieldAlt,
    accent: "#ffbd6b",
    text: "Treat identity, access, validation, and defensive visibility as part of the system design.",
    skills: ["JWT", "RBAC", "Secure API Design", "Authentication", "Network Security", "Traffic Analysis", "Secure Coding", "Incident Thinking"],
  },
];

const Shell = ({ chapter, children }) => (
  <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-5 pb-5 pt-24 sm:px-7 sm:pb-7 sm:pt-28 lg:px-10">
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#d9ff43]">
          Career Quest / {String(chapter + 1).padStart(2, "0")}
        </p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/28">
          {chapters[chapter].label}
        </p>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <span className="h-2 w-2 rounded-full bg-[#d9ff43] shadow-[0_0_16px_rgba(217,255,67,.65)]" />
        <span className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-white/30">Exploration active</span>
      </div>
    </div>
    <div className="min-h-0 flex-1">{children}</div>
  </div>
);

const CareerQuest = () => {
  const reduceMotion = useReducedMotion();
  const [chapter, setChapter] = useState(0);
  const [direction, setDirection] = useState(1);
  const [projectId, setProjectId] = useState(projects[0].id);
  const [loadoutId, setLoadoutId] = useState(loadouts[0].id);
  const [discovered, setDiscovered] = useState(new Set());

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === projectId) || projects[0],
    [projectId],
  );
  const selectedLoadout = useMemo(
    () => loadouts.find((loadout) => loadout.id === loadoutId) || loadouts[0],
    [loadoutId],
  );

  const goTo = (next) => {
    const bounded = Math.max(0, Math.min(chapters.length - 1, next));
    if (bounded === chapter) return;
    setDirection(bounded > chapter ? 1 : -1);
    setChapter(bounded);
  };

  const discover = (key) => {
    setDiscovered((current) => {
      const next = new Set(current);
      next.add(key);
      return next;
    });
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") goTo(chapter + 1);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") goTo(chapter - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [chapter]);

  const chapterMotion = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 56, scale: 0.985 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -42, scale: 0.99 },
    transition: { duration: reduceMotion ? 0.15 : 0.42, ease: "easeOut" },
  };

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[#090a0c] text-white">
      <div className="signal-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-[#d9ff43]/7 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[6%] right-[4%] h-96 w-96 rounded-full bg-cyan-300/6 blur-[130px]" />

      <header className="absolute inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#0d0f12]/84 px-3 py-2.5 backdrop-blur-xl sm:px-4">
          <button type="button" onClick={() => goTo(0)} className="flex items-center gap-3 text-left">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#d9ff43] text-sm font-black text-[#090a0c]">YM</span>
            <span className="hidden sm:block">
              <span className="block text-sm font-black">Yeabsira Mesfin</span>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/30">Career Quest</span>
            </span>
          </button>

          <div className="flex items-center gap-1.5">
            {chapters.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                className={`group relative h-2.5 rounded-full transition-all ${index === chapter ? "w-8 bg-[#d9ff43]" : index < chapter ? "w-2.5 bg-white/40" : "w-2.5 bg-white/12 hover:bg-white/25"}`}
                aria-label={`Go to ${item.label}`}
              >
                <span className="pointer-events-none absolute left-1/2 top-5 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/85 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-white/55 group-hover:block">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-[#d9ff43]/35 hover:text-[#d9ff43]" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.main key={chapter} {...chapterMotion} className="absolute inset-0">
          {chapter === 0 && (
            <Shell chapter={chapter}>
              <div className="grid h-full min-h-0 items-center gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#d9ff43]/20 bg-[#d9ff43]/8 px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#d9ff43]">
                    <span className="h-2 w-2 rounded-full bg-[#d9ff43]" /> One engineer. Three paths.
                  </span>
                  <h1 className="mt-7 max-w-4xl text-[clamp(3.8rem,9vw,8rem)] font-black leading-[0.78] tracking-[-0.075em] text-[#f4f1e8]">
                    Enter my<br /><span className="text-[#d9ff43]">career quest.</span>
                  </h1>
                  <p className="mt-7 max-w-2xl text-base font-semibold leading-7 text-white/48 sm:text-lg">
                    This is not a normal portfolio. Move through the chapters and discover how I went from building software to operating enterprise systems and going deeper into cybersecurity.
                  </p>
                  <button type="button" onClick={() => goTo(1)} className="group mt-8 inline-flex items-center gap-4 rounded-2xl bg-[#d9ff43] px-6 py-4 text-sm font-black text-[#090a0c] transition hover:-translate-y-1 hover:bg-[#e5ff7d]">
                    Start the journey <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/22">Tip: use ← → arrow keys</p>
                </div>

                <div className="relative mx-auto w-full max-w-md">
                  <div className="absolute -inset-8 rounded-full bg-[#d9ff43]/8 blur-[80px]" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_28px_90px_rgba(0,0,0,.45)] backdrop-blur-xl">
                    <img src={myImage} alt="Yeabsira Mesfin" className="aspect-[4/4.5] w-full rounded-[1.4rem] object-cover object-top" />
                    <div className="absolute inset-x-4 bottom-4 rounded-[1.2rem] bg-[#090a0c]/90 p-4 backdrop-blur-xl">
                      <p className="text-xl font-black">Yeabsira Mesfin</p>
                      <p className="mt-1 text-xs font-semibold text-white/42">Software Engineer → Infrastructure → Cybersecurity</p>
                    </div>
                  </div>
                </div>
              </div>
            </Shell>
          )}

          {chapter === 1 && (
            <Shell chapter={chapter}>
              <div className="grid h-full min-h-0 items-center gap-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
                <div className="hidden lg:block">
                  <div className="relative mx-auto h-[360px] max-w-sm">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#d9ff43] via-white/15 to-transparent" />
                    {["2019", "BUILD", "SHIP"].map((label, index) => (
                      <motion.div key={label} animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 3 + index, repeat: Infinity }} className="absolute left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#101216] px-5 py-4 text-center shadow-xl" style={{ top: `${index * 36}%` }}>
                        <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#d9ff43]">{label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#d9ff43]">Chapter 01 / 2019</p>
                  <h2 className="mt-5 max-w-4xl text-[clamp(3rem,6.5vw,6.2rem)] font-black leading-[0.88] tracking-[-0.065em] text-[#f4f1e8]">I learned by<br /><span className="text-white/22">shipping things.</span></h2>
                  <p className="mt-7 max-w-2xl text-base leading-7 text-white/48 sm:text-lg">I started with freelance software work in 2019. The first lesson was simple: requirements only matter when they become something real, usable, and maintainable.</p>
                  <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                    {["Interfaces", "APIs", "Full-stack apps"].map((item, index) => (
                      <div key={item} className="rounded-2xl border border-white/9 bg-white/[0.035] p-4">
                        <span className="font-mono text-[9px] font-black text-[#d9ff43]">0{index + 1}</span>
                        <p className="mt-2 text-sm font-black text-white/72">{item}</p>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => goTo(2)} className="mt-8 inline-flex items-center gap-3 text-sm font-black text-[#d9ff43] transition hover:gap-5">What happened after the code shipped? <FaArrowRight /></button>
                </div>
              </div>
            </Shell>
          )}

          {chapter === 2 && (
            <Shell chapter={chapter}>
              <div className="grid h-full min-h-0 items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#70dcff]">Chapter 02 / 2022-2025</p>
                  <h2 className="mt-5 max-w-4xl text-[clamp(3rem,6.5vw,6rem)] font-black leading-[0.88] tracking-[-0.065em] text-[#f4f1e8]">Production changed<br /><span className="text-[#70dcff]">the questions.</span></h2>
                  <p className="mt-7 max-w-2xl text-base leading-7 text-white/48 sm:text-lg">At MMCY, I moved from developer into client-facing leadership while delivering and supporting enterprise event technology. Now the questions became: Will it survive launch day? Can we debug it quickly? Can the team trust the data?</p>
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[["200+", "deliveries"], ["5,000+", "records / zero loss"], ["0", "critical incidents / 2 yrs"], ["4", "account managers led"]].map(([value, label]) => (
                      <div key={label} className="rounded-2xl border border-white/9 bg-white/[0.035] p-4"><p className="text-2xl font-black text-[#f4f1e8]">{value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/28">{label}</p></div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-[#101216] p-5 sm:p-7">
                  <div className="flex items-center gap-3"><FaBriefcase className="text-[#70dcff]" /><span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Enterprise arc</span></div>
                  <div className="mt-6 space-y-3">
                    {["BCD Travel", "YPO", "Abbott", "CDW"].map((client, index) => (
                      <div key={client} className="flex items-center justify-between rounded-xl border border-white/7 bg-white/[0.03] px-4 py-3"><span className="text-sm font-black text-white/65">{client}</span><span className="font-mono text-[9px] text-white/18">CLIENT_0{index + 1}</span></div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-6 text-white/36">The adventure shifted from “build the feature” to “own the outcome.”</p>
                  <button type="button" onClick={() => goTo(3)} className="mt-7 inline-flex items-center gap-3 text-sm font-black text-[#70dcff]">Open the project vault <FaArrowRight /></button>
                </div>
              </div>
            </Shell>
          )}

          {chapter === 3 && (
            <Shell chapter={chapter}>
              <div className="flex h-full min-h-0 flex-col">
                <div className="grid gap-4 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
                  <div>
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#ffbd6b]">Chapter 03 / Project vault</p>
                    <h2 className="mt-4 text-[clamp(2.6rem,5.5vw,5rem)] font-black leading-[0.9] tracking-[-0.06em] text-[#f4f1e8]">Choose a project<br /><span className="text-white/22">to inspect.</span></h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-white/38 lg:ml-auto lg:text-right">Each project is a different room in the same engineering world. Open one, see what it proves, then keep moving.</p>
                </div>

                <div className="mt-6 grid min-h-0 flex-1 gap-4 lg:grid-cols-[.78fr_1.22fr]">
                  <div className="grid content-start gap-2 overflow-y-auto pr-1">
                    {projects.map((project) => {
                      const active = project.id === selectedProject.id;
                      return (
                        <button key={project.id} type="button" onClick={() => { setProjectId(project.id); discover(`project:${project.id}`); }} className={`rounded-2xl border p-4 text-left transition ${active ? "border-white/20 bg-white/[0.075]" : "border-white/6 bg-white/[0.02] hover:bg-white/[0.04]"}`}>
                          <div className="flex items-start gap-3"><span className="font-mono text-[9px] font-black" style={{ color: project.accent }}>{project.number}</span><div><p className={`text-sm font-black ${active ? "text-white" : "text-white/55"}`}>{project.title}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/22">{project.type}</p></div></div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="min-h-0 overflow-y-auto rounded-[1.8rem] border border-white/10 bg-[#101216] p-4 sm:p-5">
                    <AnimatePresence mode="wait">
                      <motion.div key={selectedProject.id} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        {selectedProject.image ? (
                          <img src={selectedProject.image} alt={`${selectedProject.title} preview`} className="aspect-[16/8] w-full rounded-[1.25rem] object-cover" />
                        ) : (
                          <div className="signal-grid grid aspect-[16/8] place-items-center rounded-[1.25rem] border border-white/7 bg-[#090a0c]"><div className="grid h-24 w-24 place-items-center rounded-[1.6rem] border border-white/10 bg-white/[0.04] text-3xl font-black" style={{ color: selectedProject.accent }}>{selectedProject.number}</div></div>
                        )}
                        <div className="pt-5">
                          <span className="font-mono text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: selectedProject.accent }}>{selectedProject.type}</span>
                          <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">{selectedProject.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-white/45">{selectedProject.text}</p>
                          <div className="mt-4 rounded-xl border border-white/7 bg-white/[0.025] p-4"><p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-white/24">What this proves</p><p className="mt-2 text-sm font-semibold leading-6 text-white/58">{selectedProject.proof}</p></div>
                          <div className="mt-4 flex flex-wrap gap-3">
                            <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-black text-white/65 hover:text-white"><FaGithub /> Open repository</a>
                            <span className="inline-flex items-center rounded-xl bg-[#d9ff43]/8 px-3 py-2 font-mono text-[8px] font-black uppercase tracking-[0.16em] text-[#d9ff43]">{discovered.has(`project:${selectedProject.id}`) ? "Discovered ✓" : "Click project to discover"}</span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </Shell>
          )}

          {chapter === 4 && (
            <Shell chapter={chapter}>
              <div className="grid h-full min-h-0 items-center gap-8 lg:grid-cols-[.86fr_1.14fr] lg:gap-12">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#d9ff43]">Chapter 04 / Loadout</p>
                  <h2 className="mt-5 text-[clamp(3rem,6.5vw,6rem)] font-black leading-[0.87] tracking-[-0.065em] text-[#f4f1e8]">Pick an engineering<br /><span className="text-white/22">loadout.</span></h2>
                  <p className="mt-6 max-w-xl text-base leading-7 text-white/42">My career is not one framework. It is three connected capabilities: build software, operate systems, and secure the boundaries between them.</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {loadouts.map((item) => {
                      const Icon = item.icon;
                      const active = item.id === selectedLoadout.id;
                      return <button key={item.id} type="button" onClick={() => { setLoadoutId(item.id); discover(`loadout:${item.id}`); }} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-black transition ${active ? "border-white/20 bg-white/[0.08] text-white" : "border-white/7 bg-white/[0.02] text-white/38 hover:text-white"}`}><Icon style={{ color: item.accent }} /> {item.label}</button>;
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={selectedLoadout.id} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="rounded-[2rem] border border-white/10 bg-[#101216] p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: selectedLoadout.accent }}>{selectedLoadout.label}</p><h3 className="mt-2 text-3xl font-black tracking-[-0.045em]">{selectedLoadout.title}</h3></div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.04] text-xl" style={{ color: selectedLoadout.accent }}>{selectedLoadout.id === "build" ? <FaCode /> : selectedLoadout.id === "operate" ? <FaNetworkWired /> : <FaLock />}</span></div>
                    <p className="mt-4 text-sm leading-6 text-white/42">{selectedLoadout.text}</p>
                    <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {selectedLoadout.skills.map((skill, index) => <motion.div key={skill} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035 }} className="rounded-xl border border-white/7 bg-white/[0.025] px-3 py-3 text-xs font-black text-white/55">{skill}</motion.div>)}
                    </div>
                    <p className="mt-5 font-mono text-[8px] font-black uppercase tracking-[0.16em] text-white/18">{discovered.has(`loadout:${selectedLoadout.id}`) ? "Loadout unlocked ✓" : "Select a loadout to unlock"}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Shell>
          )}

          {chapter === 5 && (
            <Shell chapter={chapter}>
              <div className="grid h-full min-h-0 items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#ffbd6b]">Chapter 05 / Current mission</p>
                  <h2 className="mt-5 max-w-5xl text-[clamp(3rem,6.5vw,6.2rem)] font-black leading-[0.87] tracking-[-0.065em] text-[#f4f1e8]">The next level is<br /><span className="text-[#ffbd6b]">systems + security.</span></h2>
                  <p className="mt-7 max-w-2xl text-base leading-7 text-white/46 sm:text-lg">I am completing an M.S. in Cybersecurity in Computer Science at The George Washington University and using my software foundation to go deeper into network security, infrastructure reliability, authentication, defensive engineering, and secure systems.</p>
                </div>
                <div className="grid gap-3">
                  {[
                    [FaGraduationCap, "GWU", "M.S. Cybersecurity in Computer Science", "#ffbd6b"],
                    [FaNetworkWired, "NETWORK", "Traffic analysis, network behavior, security labs", "#70dcff"],
                    [FaShieldAlt, "SECURITY", "Authentication, access control, secure design", "#d9ff43"],
                    [FaDatabase, "SYSTEMS", "Infrastructure, reliability, monitoring, automation", "#c9a7ff"],
                  ].map(([Icon, label, text, accent]) => (
                    <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.04]" style={{ color: accent }}><Icon /></span><div><p className="font-mono text-[8px] font-black uppercase tracking-[0.18em]" style={{ color: accent }}>{label}</p><p className="mt-1 text-sm font-black text-white/62">{text}</p></div></div>
                  ))}
                  <button type="button" onClick={() => goTo(6)} className="mt-2 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#d9ff43] px-5 py-4 text-sm font-black text-[#090a0c]">Reach the current chapter <FaArrowRight /></button>
                </div>
              </div>
            </Shell>
          )}

          {chapter === 6 && (
            <Shell chapter={chapter}>
              <div className="grid h-full min-h-0 items-center gap-8 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#d9ff43]">Journey complete / for now</p>
                  <h2 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,6.8rem)] font-black leading-[0.84] tracking-[-0.07em] text-[#f4f1e8]">You reached<br /><span className="text-[#d9ff43]">the current chapter.</span></h2>
                  <p className="mt-7 max-w-2xl text-base leading-7 text-white/46 sm:text-lg">I am looking for software engineering, infrastructure engineering, security engineering, and adjacent roles where code and systems thinking meet.</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="mailto:yeabsira.mesfin29@gmail.com" className="inline-flex items-center gap-3 rounded-2xl bg-[#d9ff43] px-5 py-3.5 text-sm font-black text-[#090a0c]"><FaEnvelope /> Email me</a>
                    <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3.5 text-sm font-black text-white/65 hover:text-white"><FaLinkedinIn /> LinkedIn</a>
                    <a href="https://github.com/yeabsira-mesfin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3.5 text-sm font-black text-white/65 hover:text-white"><FaGithub /> GitHub</a>
                  </div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-[#101216] p-6 sm:p-8">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-white/28">Quest summary</p>
                  <div className="mt-5 space-y-3">
                    {[["5+", "years building"], ["200+", "enterprise deliveries"], ["10+", "full-stack apps"], ["3", "engineering lanes"], [String(discovered.size), "things discovered"]].map(([value, label]) => (
                      <div key={label} className="flex items-center justify-between border-b border-white/7 pb-3"><span className="text-sm font-bold text-white/38">{label}</span><span className="text-xl font-black text-[#f4f1e8]">{value}</span></div>
                    ))}
                  </div>
                  <button type="button" onClick={() => goTo(0)} className="mt-6 inline-flex items-center gap-3 text-sm font-black text-[#d9ff43]"><FaArrowLeft /> Replay journey</button>
                </div>
              </div>
            </Shell>
          )}
        </motion.main>
      </AnimatePresence>

      {chapter > 0 && (
        <div className="absolute inset-x-0 bottom-4 z-40 flex items-center justify-center gap-3 px-4 sm:bottom-5">
          <button type="button" onClick={() => goTo(chapter - 1)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0d0f12]/88 px-4 py-3 text-xs font-black text-white/55 backdrop-blur-xl transition hover:text-white"><FaArrowLeft /> Back</button>
          {chapter < chapters.length - 1 && <button type="button" onClick={() => goTo(chapter + 1)} className="inline-flex items-center gap-2 rounded-xl bg-[#d9ff43] px-5 py-3 text-xs font-black text-[#090a0c] transition hover:bg-[#e5ff7d]">Continue <FaArrowRight /></button>}
        </div>
      )}
    </div>
  );
};

export default CareerQuest;
