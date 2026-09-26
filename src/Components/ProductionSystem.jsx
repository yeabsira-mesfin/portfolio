import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaDatabase,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedinIn,
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
} from "react-icons/fa";
import myImage from "../images/MyPicture.png";
import windowsConsole from "../images/windows-infrastructure-console.svg";

const sectionIds = ["overview", "history", "services", "capabilities", "current"];

const navItems = [
  ["Overview", "overview"],
  ["History", "history"],
  ["Services", "services"],
  ["Capabilities", "capabilities"],
  ["Current", "current"],
];

const systemNodes = [
  { id: "product", label: "PRODUCT", x: 90, y: 92, tone: "#8fb8aa" },
  { id: "api", label: "API", x: 270, y: 72, tone: "#a9c7bd" },
  { id: "identity", label: "IDENTITY", x: 456, y: 104, tone: "#e3b77a" },
  { id: "data", label: "DATA", x: 112, y: 280, tone: "#9eb5c9" },
  { id: "runtime", label: "RUNTIME", x: 300, y: 250, tone: "#88ad9f" },
  { id: "observe", label: "OBSERVE", x: 474, y: 298, tone: "#c9aa7f" },
];

const nodeDetails = {
  product: "Responsive product interfaces and workflows designed around real users.",
  api: "REST APIs, integrations, validation, backend logic, and service boundaries.",
  identity: "Authentication, authorization, JWT, RBAC, and secure access paths.",
  data: "SQL and NoSQL data modeling, integrity, performance, and reliable handling.",
  runtime: "Linux, Docker, networking, automation, cloud, deployment, and recovery.",
  observe: "Monitoring, troubleshooting, traffic analysis, incident thinking, and feedback loops.",
};

const connections = [
  ["product", "api"],
  ["api", "identity"],
  ["product", "data"],
  ["api", "runtime"],
  ["identity", "observe"],
  ["data", "runtime"],
  ["runtime", "observe"],
];

const history = [
  {
    year: "2019",
    phase: "Foundation",
    title: "Started building through freelance software work.",
    text: "Interfaces, APIs, full-stack applications, client requirements, debugging, and the habit of shipping working software.",
    signal: "Software delivery",
  },
  {
    year: "2022–2025",
    phase: "Production",
    title: "Grew from developer into enterprise technical leadership at MMCY.",
    text: "Delivered and supported 200+ event technology implementations, handled integrations and live issues, and led account managers while supporting clients including BCD Travel, YPO, Abbott, and CDW.",
    signal: "Operations + leadership",
  },
  {
    year: "2025–Now",
    phase: "Systems",
    title: "Expanded deeper into infrastructure and cybersecurity.",
    text: "M.S. Cybersecurity in Computer Science at GWU, with hands-on work in networking, secure systems, authentication, infrastructure reliability, Linux, cloud, and defensive engineering.",
    signal: "Build + operate + secure",
  },
];

const projects = [
  {
    id: "windows",
    title: "Windows Infrastructure Reliability Console",
    domain: "Infrastructure / Security",
    status: "Operational",
    summary: "One view for Windows health, network checks, backup integrity, and failover behavior.",
    detail: "PowerShell health checks, network visibility, SHA-256 backup verification, failover simulation, and Windows CI brought together through a focused operational interface.",
    proves: "Connects software engineering with reliability, recovery, evidence, and practical operations.",
    tags: ["PowerShell", "Windows", "Networking", "Integrity", "React"],
    repo: "https://github.com/yeabsira-mesfin/windows-infrastructure-reliability-console",
    image: windowsConsole,
  },
  {
    id: "cloud",
    title: "Secure Cloud Infrastructure as Code",
    domain: "Cloud / Infrastructure",
    status: "Defined as code",
    summary: "AWS infrastructure modeled for repeatability, availability, segmentation, encryption, and recovery.",
    detail: "Terraform architecture with multi-AZ design, load balancing, autoscaling, security groups, and encrypted versioned storage.",
    proves: "Treats infrastructure as reviewable, repeatable software instead of one-off configuration.",
    tags: ["Terraform", "AWS", "IaC", "Cloud Security"],
    repo: "https://github.com/yeabsira-mesfin/secure-cloud-infrastructure-iac",
  },
  {
    id: "hosting",
    title: "High Availability Hosting Lab",
    domain: "Reliability / Runtime",
    status: "Resilient by design",
    summary: "A redundant hosting environment designed around health, failover, visibility, and recovery behavior.",
    detail: "Dockerized services, NGINX load balancing, health checks, failover testing, Python support tooling, and Prometheus monitoring.",
    proves: "Moves beyond deployment into availability, observability, and recovery thinking.",
    tags: ["Docker", "NGINX", "Prometheus", "Python"],
    repo: "https://github.com/yeabsira-mesfin/high-availability-hosting-lab",
  },
  {
    id: "techboard",
    title: "TechBoard",
    domain: "Product / Full Stack",
    status: "End-to-end",
    summary: "A role-aware job platform where product UX, permissions, backend logic, and data all have to agree.",
    detail: "Django and PostgreSQL application with role-based authentication, job search, resume uploads, applicant tracking, and employer and candidate workflows.",
    proves: "Shows full-stack product engineering with clear authorization boundaries and real user flows.",
    tags: ["Python", "Django", "PostgreSQL", "RBAC"],
    repo: "https://github.com/yeabsira-mesfin/techboard",
  },
  {
    id: "login",
    title: "Secure Login Analyzer",
    domain: "Security / Detection",
    status: "Tested signals",
    summary: "Authentication events translated into understandable, deterministic security signals.",
    detail: "Python rules for repeated failures, blocked IP activity, location anomalies, input validation, and automated tests.",
    proves: "Turns security behavior into code that can be inspected, tested, and reasoned about.",
    tags: ["Python", "Authentication", "Detection", "Testing"],
    repo: "https://github.com/yeabsira-mesfin/secure_login_analyzer",
  },
];

const capabilityGroups = [
  {
    id: "build",
    label: "BUILD",
    title: "Software engineering",
    icon: FaCode,
    accent: "#9fc2b6",
    statement: "Translate ambiguous requirements into useful, maintainable software.",
    items: ["Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "REST APIs", "SQL", "MongoDB"],
  },
  {
    id: "operate",
    label: "OPERATE",
    title: "Infrastructure & reliability",
    icon: FaServer,
    accent: "#91acc2",
    statement: "Design for visibility, automation, recovery, and calm operations.",
    items: ["Linux", "Docker", "Networking", "DNS", "CI/CD", "Git", "Terraform", "Monitoring", "Troubleshooting", "Testing"],
  },
  {
    id: "secure",
    label: "SECURE",
    title: "Security engineering",
    icon: FaShieldAlt,
    accent: "#d9b177",
    statement: "Make identity, access, validation, and defensive visibility part of the design.",
    items: ["JWT", "RBAC", "Authentication", "Secure APIs", "Network Security", "Traffic Analysis", "Secure Coding", "Incident Thinking"],
  },
];

const ProductionSystem = () => {
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("overview");
  const [activeNode, setActiveNode] = useState("runtime");
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const [activeCapability, setActiveCapability] = useState(capabilityGroups[0].id);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.2, 0.45] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const project = projects.find((item) => item.id === activeProject) || projects[0];
  const capability = capabilityGroups.find((item) => item.id === activeCapability) || capabilityGroups[0];
  const nodeById = Object.fromEntries(systemNodes.map((node) => [node.id, node]));

  return (
    <div className="production-shell min-h-screen bg-[#0f1515] text-[#edf0eb]">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/[0.08] bg-[#121a19]/82 px-3 py-2.5 shadow-[0_20px_60px_rgba(0,0,0,.2)] backdrop-blur-2xl sm:px-4">
          <a href="#overview" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#8fb8aa]/25 bg-[#8fb8aa]/10 text-sm font-black text-[#bcd4cb]">YM</span>
            <span className="hidden sm:block">
              <span className="block text-sm font-black tracking-[-0.02em]">Yeabsira Mesfin</span>
              <span className="mt-0.5 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#88ad9f] shadow-[0_0_12px_rgba(136,173,159,.55)]" />
                portfolio system / healthy
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Portfolio sections">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  activeSection === id ? "bg-white/[0.07] text-white" : "text-white/38 hover:bg-white/[0.035] hover:text-white/70"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://github.com/yeabsira-mesfin" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/42 transition hover:border-white/15 hover:text-white" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/42 transition hover:border-white/15 hover:text-white" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </header>

      <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <div className="rounded-full border border-white/[0.07] bg-[#121a19]/70 p-2 backdrop-blur-xl">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="group relative block p-2" aria-label={label}>
              <span className={`block rounded-full transition-all ${activeSection === id ? "h-5 w-1.5 bg-[#9fc2b6]" : "h-1.5 w-1.5 bg-white/20 group-hover:bg-white/45"}`} />
            </a>
          ))}
        </div>
      </aside>

      <main className="system-scroll">
        <section id="overview" className="system-section relative min-h-screen overflow-hidden px-5 pb-16 pt-28 sm:px-7 lg:px-10 lg:pt-32">
          <div className="ops-grid pointer-events-none absolute inset-0 opacity-45" />
          <div className="pointer-events-none absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-[#8fb8aa]/8 blur-[110px]" />
          <div className="pointer-events-none absolute right-[4%] top-[24%] h-96 w-96 rounded-full bg-[#6f899f]/8 blur-[130px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid min-h-[calc(100vh-11rem)] items-center gap-12 lg:grid-cols-[1.02fr_.98fr] xl:gap-16">
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#8fb8aa]/18 bg-[#8fb8aa]/7 px-3 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-[#b4cec5]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8fb8aa]" />
                  Software / Infrastructure / Security
                </div>

                <h1 className="mt-7 max-w-4xl text-[clamp(3.7rem,8vw,7.7rem)] font-black leading-[0.82] tracking-[-0.075em] text-[#f0f2ed]">
                  Yeabsira<br />Mesfin.
                </h1>

                <p className="mt-8 max-w-2xl text-[clamp(1.25rem,2vw,1.8rem)] font-semibold leading-[1.24] tracking-[-0.025em] text-white/72">
                  I build software like a well-run production system: <span className="text-[#a9c7bd]">clear, observable, resilient, and secure.</span>
                </p>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/40">
                  Full Stack Software Engineer with 5+ years of experience and an M.S. Cybersecurity in Computer Science candidate at The George Washington University. I care about what happens after code ships: reliability, access, monitoring, recovery, and the people depending on the system.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#services" className="group inline-flex items-center gap-3 rounded-xl bg-[#dce6e1] px-5 py-3.5 text-sm font-black text-[#101716] transition hover:-translate-y-0.5 hover:bg-white">
                    Inspect the work <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="mailto:yeabsira.mesfin29@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-3.5 text-sm font-black text-white/58 transition hover:border-white/15 hover:text-white">
                    <FaEnvelope /> Contact
                  </a>
                </div>

                <div className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4">
                  {[
                    ["5+", "years building"],
                    ["200+", "enterprise deliveries"],
                    ["10+", "full-stack apps"],
                    ["3", "engineering lanes"],
                  ].map(([value, label]) => (
                    <div key={label} className="bg-[#111918] px-4 py-4">
                      <p className="text-2xl font-black tracking-[-0.04em] text-[#edf0eb]">{value}</p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-white/25">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.975 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.08 }} className="relative">
                <div className="absolute -inset-8 rounded-[3rem] bg-[#8fb8aa]/6 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#111918]/92 shadow-[0_34px_100px_rgba(0,0,0,.32)] backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                    <div>
                      <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-white/27">system topology</p>
                      <p className="mt-1 text-sm font-black text-white/72">Engineering surface</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-[#8fb8aa]/15 bg-[#8fb8aa]/6 px-3 py-1.5">
                      <motion.span className="h-1.5 w-1.5 rounded-full bg-[#8fb8aa]" animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.2, repeat: Infinity }} />
                      <span className="font-mono text-[8px] font-black uppercase tracking-[0.16em] text-[#abc6bd]">observable</span>
                    </div>
                  </div>

                  <div className="relative aspect-[1.18/1] min-h-[410px] overflow-hidden bg-[radial-gradient(circle_at_50%_44%,rgba(143,184,170,.06),transparent_38%)]">
                    <div className="ops-grid absolute inset-0 opacity-35" />
                    <svg viewBox="0 0 580 390" className="absolute inset-0 h-full w-full" aria-hidden="true">
                      {connections.map(([fromId, toId], index) => {
                        const from = nodeById[fromId];
                        const to = nodeById[toId];
                        return (
                          <g key={`${fromId}-${toId}`}>
                            <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(222,231,226,.10)" strokeWidth="1.2" />
                            {!reduceMotion && (
                              <motion.circle
                                r="2.5"
                                fill={index % 3 === 0 ? "#d9b177" : "#9fc2b6"}
                                initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                                animate={{ cx: [from.x, to.x], cy: [from.y, to.y], opacity: [0, 0.8, 0] }}
                                transition={{ duration: 4.3 + index * 0.27, delay: index * 0.55, repeat: Infinity, ease: "linear" }}
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    {systemNodes.map((node) => {
                      const active = node.id === activeNode;
                      return (
                        <motion.button
                          key={node.id}
                          type="button"
                          onMouseEnter={() => setActiveNode(node.id)}
                          onFocus={() => setActiveNode(node.id)}
                          onClick={() => setActiveNode(node.id)}
                          whileHover={reduceMotion ? undefined : { y: -2 }}
                          className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 font-mono text-[8px] font-black tracking-[0.14em] transition sm:text-[9px] ${
                            active ? "border-white/20 bg-[#e5ebe7] text-[#111817] shadow-[0_10px_35px_rgba(0,0,0,.2)]" : "border-white/[0.09] bg-[#111817]/90 text-white/38 hover:border-white/15 hover:text-white/65"
                          }`}
                          style={{ left: `${(node.x / 580) * 100}%`, top: `${(node.y / 390) * 100}%` }}
                        >
                          {node.label}
                        </motion.button>
                      );
                    })}

                    <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/[0.07] bg-[#0f1515]/92 p-4 backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
                      <div className="flex items-start gap-4">
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: nodeById[activeNode].tone }} />
                        <div>
                          <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-white/27">active surface / {nodeById[activeNode].label}</p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-white/58">{nodeDetails[activeNode]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="history" className="system-section relative min-h-screen overflow-hidden bg-[#e9ece7] px-5 py-24 text-[#17201e] sm:px-7 lg:px-10 lg:py-28">
          <div className="pointer-events-none absolute right-[-8rem] top-20 h-80 w-80 rounded-full bg-[#9fc2b6]/20 blur-[110px]" />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[.58fr_1.42fr] lg:gap-16">
              <div>
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#6f827c]">01 / operational history</p>
                <p className="mt-5 max-w-xs text-sm leading-6 text-black/45">A career viewed as a system evolving through releases, production pressure, and deeper operational responsibility.</p>
              </div>
              <div>
                <h2 className="max-w-5xl text-[clamp(2.8rem,6vw,5.8rem)] font-black leading-[0.92] tracking-[-0.065em]">Built in software.<br /><span className="text-black/22">Hardened in production.</span></h2>
              </div>
            </div>

            <div className="mt-16 overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white/55 shadow-[0_28px_80px_rgba(24,36,32,.06)] backdrop-blur">
              <div className="grid border-b border-black/[0.07] bg-[#f4f5f2]/75 px-5 py-3 font-mono text-[8px] font-black uppercase tracking-[0.17em] text-black/34 sm:grid-cols-[140px_1fr_170px]">
                <span>Release</span><span className="hidden sm:block">Change log</span><span className="hidden text-right sm:block">Primary signal</span>
              </div>
              {history.map((item, index) => (
                <motion.article
                  key={item.year}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="grid gap-4 border-b border-black/[0.07] px-5 py-7 last:border-b-0 sm:grid-cols-[140px_1fr_170px] sm:items-start sm:gap-7"
                >
                  <div>
                    <p className="text-2xl font-black tracking-[-0.04em]">{item.year}</p>
                    <p className="mt-1 font-mono text-[8px] font-black uppercase tracking-[0.16em] text-[#72857f]">{item.phase}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-[-0.03em] sm:text-2xl">{item.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-black/48">{item.text}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/75 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-black/42">
                      <FaCheckCircle className="text-[#7d9c91]" /> {item.signal}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="system-section relative min-h-screen overflow-hidden bg-[#0f1515] px-5 py-24 sm:px-7 lg:px-10 lg:py-28">
          <div className="ops-grid pointer-events-none absolute inset-0 opacity-25" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[.58fr_1.42fr] lg:gap-16">
              <div>
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#9fc2b6]">02 / service registry</p>
              </div>
              <div>
                <h2 className="max-w-5xl text-[clamp(2.8rem,6vw,5.8rem)] font-black leading-[0.92] tracking-[-0.065em] text-[#edf0eb]">Projects as systems.<br /><span className="text-white/20">Not screenshots.</span></h2>
                <p className="mt-6 max-w-3xl text-base leading-7 text-white/38">Each project is presented around the engineering behavior it demonstrates: what it handles, how it is designed, and what kind of system thinking it proves.</p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-[.72fr_1.28fr] xl:gap-7">
              <div className="space-y-2">
                {projects.map((item, index) => {
                  const active = item.id === project.id;
                  return (
                    <button key={item.id} type="button" onMouseEnter={() => setActiveProject(item.id)} onFocus={() => setActiveProject(item.id)} onClick={() => setActiveProject(item.id)} className={`group w-full rounded-2xl border p-4 text-left transition sm:p-5 ${active ? "border-white/[0.14] bg-white/[0.055]" : "border-transparent bg-transparent hover:border-white/[0.07] hover:bg-white/[0.02]"}`}>
                      <div className="flex items-start gap-4">
                        <span className={`font-mono text-[8px] font-black ${active ? "text-[#9fc2b6]" : "text-white/17"}`}>0{index + 1}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-sm font-black sm:text-base ${active ? "text-white" : "text-white/48 group-hover:text-white/70"}`}>{item.title}</span>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#7f9f94]" />
                            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-white/22">{item.status}</span>
                          </div>
                        </div>
                        <FaArrowRight className={`mt-1 text-[10px] transition ${active ? "translate-x-0 text-[#9fc2b6]" : "-translate-x-1 text-white/15 group-hover:translate-x-0 group-hover:text-white/40"}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:sticky lg:top-28">
                <AnimatePresence mode="wait">
                  <motion.article key={project.id} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }} className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#121a19] p-3 shadow-[0_30px_90px_rgba(0,0,0,.26)] sm:p-4">
                    {project.image ? (
                      <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-[#0b1010]">
                        <img src={project.image} alt={`${project.title} preview`} className="aspect-[16/8.5] w-full object-cover opacity-90" />
                      </div>
                    ) : (
                      <div className="service-visual relative grid aspect-[16/8.5] place-items-center overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-[#0b1010]">
                        <div className="ops-grid absolute inset-0 opacity-35" />
                        <motion.div animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative grid h-28 w-28 place-items-center rounded-[2rem] border border-[#9fc2b6]/15 bg-[#9fc2b6]/5 text-3xl text-[#a9c7bd]">
                          {project.id === "cloud" ? <FaServer /> : project.id === "hosting" ? <FaNetworkWired /> : project.id === "techboard" ? <FaDatabase /> : <FaShieldAlt />}
                        </motion.div>
                        {!reduceMotion && <motion.div className="absolute h-52 w-52 rounded-full border border-white/[0.06]" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}><span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#9fc2b6]" /></motion.div>}
                      </div>
                    )}

                    <div className="p-3 pt-6 sm:p-5 sm:pt-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-[#9fc2b6]">{project.domain}</p>
                          <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">{project.title}</h3>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#8fb8aa]/13 bg-[#8fb8aa]/5 px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-[0.14em] text-[#a9c7bd]"><span className="h-1.5 w-1.5 rounded-full bg-[#8fb8aa]" /> {project.status}</span>
                      </div>
                      <p className="mt-4 text-base font-semibold leading-7 text-white/58">{project.summary}</p>
                      <p className="mt-3 text-sm leading-6 text-white/34">{project.detail}</p>
                      <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-white/20">engineering signal</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-white/52">{project.proves}</p>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] font-black text-white/34">{tag}</span>)}
                      </div>
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#b6ccc5] transition hover:gap-3 hover:text-white">Open repository <FaExternalLinkAlt className="text-[10px]" /></a>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="system-section relative min-h-screen overflow-hidden bg-[#e9ece7] px-5 py-24 text-[#17201e] sm:px-7 lg:px-10 lg:py-28">
          <div className="pointer-events-none absolute left-[-8rem] bottom-16 h-80 w-80 rounded-full bg-[#9eb5c9]/20 blur-[120px]" />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[.58fr_1.42fr] lg:gap-16">
              <div><p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#6f827c]">03 / capability topology</p></div>
              <div>
                <h2 className="max-w-5xl text-[clamp(2.8rem,6vw,5.8rem)] font-black leading-[0.92] tracking-[-0.065em]">Three surfaces.<br /><span className="text-black/22">One engineering system.</span></h2>
                <p className="mt-6 max-w-3xl text-base leading-7 text-black/44">The useful story is not a percentage bar. It is how software, infrastructure, and security reinforce one another in a real system.</p>
              </div>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
              <div className="grid gap-3">
                {capabilityGroups.map((item) => {
                  const Icon = item.icon;
                  const active = item.id === capability.id;
                  return (
                    <button key={item.id} type="button" onClick={() => setActiveCapability(item.id)} onMouseEnter={() => setActiveCapability(item.id)} onFocus={() => setActiveCapability(item.id)} className={`rounded-2xl border p-5 text-left transition sm:p-6 ${active ? "border-black/[0.10] bg-white/80 shadow-[0_18px_55px_rgba(25,35,31,.06)]" : "border-black/[0.05] bg-white/35 hover:bg-white/60"}`}>
                      <div className="flex items-start gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: `${item.accent}25`, color: item.accent }}><Icon /></span>
                        <div>
                          <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-black/32">{item.label}</p>
                          <h3 className="mt-1 text-xl font-black tracking-[-0.03em]">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-black/43">{item.statement}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={capability.id} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} className="relative overflow-hidden rounded-[2rem] border border-black/[0.08] bg-[#17201e] p-6 text-white shadow-[0_28px_80px_rgba(25,35,31,.10)] sm:p-8">
                  <div className="ops-grid absolute inset-0 opacity-20" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em]" style={{ color: capability.accent }}>active capability / {capability.label}</p>
                        <h3 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl">{capability.title}</h3>
                      </div>
                      <motion.span className="h-3 w-3 rounded-full" style={{ backgroundColor: capability.accent }} animate={reduceMotion ? undefined : { scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.8, repeat: Infinity }} />
                    </div>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/42">{capability.statement}</p>
                    <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {capability.items.map((item, index) => (
                        <motion.div key={item} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035 }} className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3 text-xs font-black text-white/54">{item}</motion.div>
                      ))}
                    </div>

                    <div className="mt-8 rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                      <div className="flex items-center justify-between font-mono text-[8px] font-black uppercase tracking-[0.17em] text-white/20"><span>engineering loop</span><span>continuous</span></div>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {["requirements", "design", "build", "test", "deploy", "observe", "improve"].map((step, index, all) => (
                          <div key={step} className="flex items-center gap-2"><span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-[0.12em] text-white/34">{step}</span>{index < all.length - 1 && <span className="text-white/14">→</span>}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="current" className="system-section relative min-h-screen overflow-hidden bg-[#0f1515] px-5 py-24 sm:px-7 lg:px-10 lg:py-28">
          <div className="ops-grid pointer-events-none absolute inset-0 opacity-28" />
          <div className="pointer-events-none absolute right-[8%] top-[20%] h-80 w-80 rounded-full bg-[#d9b177]/7 blur-[120px]" />
          <div className="relative mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
            <div>
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#d9b177]">04 / current operating state</p>
              <h2 className="mt-5 max-w-5xl text-[clamp(3rem,6.5vw,6.4rem)] font-black leading-[0.87] tracking-[-0.07em] text-[#edf0eb]">Software foundation.<br /><span className="text-white/18">Systems direction.</span></h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-white/42 sm:text-lg">I am completing an M.S. in Cybersecurity in Computer Science at The George Washington University and applying my software background to infrastructure reliability, networking, authentication, defensive engineering, and secure systems.</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:yeabsira.mesfin29@gmail.com" className="inline-flex items-center gap-3 rounded-xl bg-[#dce6e1] px-5 py-3.5 text-sm font-black text-[#101716] transition hover:-translate-y-0.5 hover:bg-white"><FaEnvelope /> Start a conversation</a>
                <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-3.5 text-sm font-black text-white/55 transition hover:text-white"><FaLinkedinIn /> LinkedIn</a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-[#121a19] p-5 shadow-[0_30px_90px_rgba(0,0,0,.24)] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
                <div>
                  <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-white/22">profile health</p>
                  <p className="mt-1 text-lg font-black">Current operating state</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#8fb8aa]/14 bg-[#8fb8aa]/5 px-3 py-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#8fb8aa]" /><span className="font-mono text-[8px] font-black uppercase tracking-[0.14em] text-[#a9c7bd]">growing</span></div>
              </div>

              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <img src={myImage} alt="Yeabsira Mesfin" className="h-16 w-16 rounded-2xl object-cover object-top" />
                <div><p className="text-lg font-black">Yeabsira Mesfin</p><p className="mt-1 text-xs font-semibold text-white/32">Software Engineer · Infrastructure · Security</p></div>
              </div>

              <div className="mt-4 grid gap-2">
                {[
                  ["Education", "M.S. Cybersecurity in Computer Science · GWU", "#d9b177"],
                  ["Established", "5+ years software development", "#9fc2b6"],
                  ["Current focus", "Infrastructure reliability · network security · secure systems", "#91acc2"],
                  ["Target", "Software · Infrastructure · Security Engineering", "#a9c7bd"],
                ].map(([label, value, color]) => (
                  <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-4">
                    <div className="flex items-start gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} /><div><p className="font-mono text-[8px] font-black uppercase tracking-[0.16em] text-white/20">{label}</p><p className="mt-1.5 text-sm font-black leading-5 text-white/56">{value}</p></div></div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-5">
                <span className="font-mono text-[8px] font-black uppercase tracking-[0.16em] text-white/19">No alerts. Ready for the next system.</span>
                <FaCheckCircle className="text-[#8fb8aa]" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductionSystem;
