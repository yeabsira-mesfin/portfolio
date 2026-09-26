import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import windowsConsole from "../images/windows-infrastructure-console.svg";

const projects = [
  {
    id: "windows-console",
    number: "01",
    title: "Windows Infrastructure Reliability Console",
    category: "Infrastructure",
    secondary: "Security",
    summary: "A reliability lab that turns Windows health, network checks, backup integrity, and failover into one operational view.",
    challenge: "Make infrastructure health observable and verifiable instead of relying on manual spot checks.",
    build: "PowerShell health checks, network visibility, SHA-256 backup verification, failover simulation, and Windows CI surfaced through a focused interface.",
    proves: "I can connect software engineering with practical operations, evidence, and recovery thinking.",
    tags: ["PowerShell", "Windows", "Networking", "Integrity", "React"],
    repo: "https://github.com/yeabsira-mesfin/windows-infrastructure-reliability-console",
    image: windowsConsole,
    accent: "#d9ff43",
  },
  {
    id: "cloud-iac",
    number: "02",
    title: "Secure Cloud Infrastructure as Code",
    category: "Infrastructure",
    secondary: "Security",
    summary: "AWS infrastructure modeled as code with availability, scaling, segmentation, encryption, and recovery built into the design.",
    challenge: "Design cloud infrastructure so repeatability, resilience, and security controls are part of the architecture from the start.",
    build: "Terraform configuration for multi-AZ design, load balancing, autoscaling, security groups, and encrypted versioned storage.",
    proves: "I understand infrastructure as a software problem: declarative, reviewable, repeatable, and testable.",
    tags: ["Terraform", "AWS", "IaC", "Cloud Security"],
    repo: "https://github.com/yeabsira-mesfin/secure-cloud-infrastructure-iac",
    code: "IAC",
    accent: "#76e4f7",
  },
  {
    id: "ha-hosting",
    number: "03",
    title: "High Availability Hosting Lab",
    category: "Infrastructure",
    secondary: "Software",
    summary: "A containerized hosting environment built around redundancy, health checks, failover behavior, and monitoring.",
    challenge: "Keep a web service useful when one component becomes unhealthy or unavailable.",
    build: "Dockerized services, NGINX load balancing, health checks, failover testing, Python support tooling, and Prometheus monitoring.",
    proves: "I think beyond deployment and into availability, observability, and recovery behavior.",
    tags: ["Docker", "NGINX", "Prometheus", "Python"],
    repo: "https://github.com/yeabsira-mesfin/high-availability-hosting-lab",
    code: "HA",
    accent: "#ffb86b",
  },
  {
    id: "ops-toolkit",
    number: "04",
    title: "Infrastructure Operations Toolkit",
    category: "Infrastructure",
    secondary: "Software",
    summary: "A Python toolkit for service checks, incident evidence, backups, and integrity verification.",
    challenge: "Reduce repetitive operational work while preserving useful evidence for troubleshooting and recovery.",
    build: "HTTP and TCP monitoring, structured incident evidence, backup creation, and SHA-256 integrity verification in a reusable Python toolkit.",
    proves: "I use code to make operational work faster, more consistent, and easier to reason about.",
    tags: ["Python", "Monitoring", "Runbooks", "Integrity"],
    repo: "https://github.com/yeabsira-mesfin/infrastructure-operations-toolkit",
    code: "OPS",
    accent: "#c9a7ff",
  },
  {
    id: "login-analyzer",
    number: "05",
    title: "Secure Login Analyzer",
    category: "Security",
    secondary: "Software",
    summary: "Authentication event analysis focused on repeated failures, blocked activity, anomalies, validation, and testable detection logic.",
    challenge: "Turn raw authentication events into clear signals that can support defensive investigation.",
    build: "Python rules for repeated login failures, blocked IP activity, location anomalies, input validation, and automated tests.",
    proves: "I can translate security behavior into deterministic code and validation rather than vague alerts.",
    tags: ["Python", "Authentication", "Detection", "Testing"],
    repo: "https://github.com/yeabsira-mesfin/secure_login_analyzer",
    code: "AUTH",
    accent: "#ff7c9f",
  },
  {
    id: "techboard",
    number: "06",
    title: "TechBoard",
    category: "Software",
    secondary: "Security",
    summary: "A full-stack job platform with role-based authentication, search, resume uploads, applicant tracking, and separate user workflows.",
    challenge: "Support two distinct user types with clear permissions and useful end-to-end workflows in one product.",
    build: "Django and PostgreSQL application with role-based authentication, job search and filtering, resume uploads, applicant tracking, and employer / candidate dashboards.",
    proves: "I can design full-stack products where data, permissions, UX, and backend behavior have to work together.",
    tags: ["Python", "Django", "PostgreSQL", "RBAC"],
    repo: "https://github.com/yeabsira-mesfin/techboard",
    code: "TB",
    accent: "#d9ff43",
  },
  {
    id: "tourist-trail",
    number: "07",
    title: "Tourist Trail",
    category: "Software",
    secondary: "Product",
    summary: "A travel discovery experience that demonstrates product UI, responsive interaction, and front-end delivery.",
    challenge: "Make travel discovery feel simple and visual across screen sizes.",
    build: "A responsive React experience focused on discoverability, navigation, and clean product interaction.",
    proves: "I care about the human side of engineering, not only the backend and infrastructure underneath it.",
    tags: ["React", "Responsive UI", "Product"],
    demo: "https://tourist-trail.vercel.app/",
    code: "WEB",
    accent: "#76e4f7",
  },
];

const filters = ["All", "Software", "Infrastructure", "Security"];

const VisualPanel = ({ project, reduceMotion }) => {
  if (project.image) {
    return (
      <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#08090b]">
        <img src={project.image} alt={`${project.title} project preview`} className="aspect-[16/10] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e]/70 via-transparent to-transparent" />
      </div>
    );
  }

  if (project.demo) {
    return (
      <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white">
        <div className="flex items-center gap-1.5 border-b border-black/8 bg-[#efede7] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#74d680]" />
          <span className="ml-3 truncate font-mono text-[9px] font-bold text-black/35">live preview / {project.demo}</span>
        </div>
        <iframe src={project.demo} title={`${project.title} live preview`} className="aspect-[16/10] w-full pointer-events-none" scrolling="no" loading="lazy" />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#08090b]">
      <div className="signal-grid absolute inset-0 opacity-50" />
      <div className="absolute h-56 w-56 rounded-full blur-[80px]" style={{ backgroundColor: `${project.accent}18` }} />
      <motion.div
        animate={reduceMotion ? undefined : { rotate: [0, 3, 0, -3, 0], y: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative grid h-36 w-36 place-items-center rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl backdrop-blur-xl"
      >
        <span className="text-5xl font-black tracking-[-0.08em]" style={{ color: project.accent }}>{project.code}</span>
        <span className="absolute bottom-5 font-mono text-[8px] font-black uppercase tracking-[0.22em] text-white/28">case file</span>
      </motion.div>
      {!reduceMotion && (
        <motion.div className="absolute h-56 w-56 rounded-full border border-white/8" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
          <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full" style={{ backgroundColor: project.accent }} />
        </motion.div>
      )}
    </div>
  );
};

const Projects = () => {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(projects[0].id);

  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "All" || project.category === filter || project.secondary === filter),
    [filter],
  );

  const selected = visibleProjects.find((project) => project.id === selectedId) || visibleProjects[0];

  const chooseFilter = (nextFilter) => {
    const nextProjects = projects.filter(
      (project) => nextFilter === "All" || project.category === nextFilter || project.secondary === nextFilter,
    );
    setFilter(nextFilter);
    setSelectedId(nextProjects[0].id);
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-[#0b0c0e] px-5 py-24 text-white sm:px-7 lg:px-10 lg:py-32">
      <div className="absolute right-[-8rem] top-32 h-80 w-80 rounded-full bg-[#d9ff43]/7 blur-[110px]" />
      <div className="absolute bottom-32 left-[-10rem] h-80 w-80 rounded-full bg-cyan-300/7 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[#d9ff43]">02 / Selected work</p>
          </div>
          <div>
            <h2 className="max-w-5xl text-[clamp(2.8rem,6vw,5.8rem)] font-black leading-[0.92] tracking-[-0.06em] text-[#f4f1e8]">
              Not a gallery. <span className="text-white/25">A set of engineering decisions.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/45 sm:text-lg">
              Pick a lane, inspect a project, and see the problem, the build, and what the work demonstrates. The goal is to show how I think, not just what the final screen looks like.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-2 border-y border-white/8 py-4">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => chooseFilter(item)}
              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${
                filter === item
                  ? "bg-[#d9ff43] text-[#0b0c0e]"
                  : "border border-white/10 bg-white/[0.035] text-white/45 hover:border-white/20 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
          <span className="ml-auto hidden items-center font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/22 sm:flex">{visibleProjects.length} case files</span>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-start xl:gap-12">
          <div className="space-y-2">
            {visibleProjects.map((project) => {
              const active = selected.id === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onMouseEnter={() => setSelectedId(project.id)}
                  onFocus={() => setSelectedId(project.id)}
                  onClick={() => setSelectedId(project.id)}
                  className={`group w-full rounded-2xl border p-4 text-left transition sm:p-5 ${
                    active ? "border-white/18 bg-white/[0.075]" : "border-transparent bg-transparent hover:border-white/8 hover:bg-white/[0.025]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`mt-0.5 font-mono text-[10px] font-black ${active ? "text-[#d9ff43]" : "text-white/22"}`}>{project.number}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/36">{project.category}</span>
                        {project.secondary && <span className="text-[9px] font-black uppercase tracking-[0.14em] text-white/22">+ {project.secondary}</span>}
                      </div>
                      <h3 className={`mt-3 text-lg font-black tracking-[-0.025em] transition sm:text-xl ${active ? "text-white" : "text-white/62 group-hover:text-white"}`}>{project.title}</h3>
                      <p className={`mt-2 line-clamp-2 text-sm leading-6 transition ${active ? "text-white/48" : "text-white/28"}`}>{project.summary}</p>
                    </div>
                    <FaArrowRight className={`mt-2 shrink-0 text-xs transition ${active ? "translate-x-0 text-[#d9ff43]" : "-translate-x-1 text-white/18 group-hover:translate-x-0 group-hover:text-white/60"}`} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.article
                key={selected.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.32 }}
                className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#121417] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-4"
              >
                <VisualPanel project={selected} reduceMotion={reduceMotion} />

                <div className="p-3 pb-4 pt-6 sm:p-5 sm:pb-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: selected.accent }}>Case file {selected.number} / {selected.category}</p>
                      <h3 className="mt-2 max-w-xl text-2xl font-black tracking-[-0.035em] text-[#f4f1e8] sm:text-3xl">{selected.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      {selected.repo && (
                        <a href={selected.repo} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/55 transition hover:border-white/20 hover:text-white" aria-label={`Open ${selected.title} repository`}><FaGithub /></a>
                      )}
                      {selected.demo && (
                        <a href={selected.demo} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/55 transition hover:border-white/20 hover:text-white" aria-label={`Open ${selected.title} live demo`}><FaExternalLinkAlt className="text-xs" /></a>
                      )}
                    </div>
                  </div>

                  <div className="mt-7 grid gap-5 sm:grid-cols-3">
                    {[["Challenge", selected.challenge], ["Build", selected.build], ["Signal", selected.proves]].map(([label, text]) => (
                      <div key={label} className="border-t border-white/8 pt-4">
                        <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-white/25">{label}</p>
                        <p className="mt-2 text-xs font-semibold leading-6 text-white/52 sm:text-sm">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {selected.tags.map((tag) => <span key={tag} className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-[10px] font-bold text-white/42">{tag}</span>)}
                  </div>

                  {(selected.repo || selected.demo) && (
                    <a href={selected.repo || selected.demo} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-black transition hover:gap-3" style={{ color: selected.accent }}>
                      {selected.repo ? "Inspect the repository" : "Open the live product"} <FaArrowRight className="text-xs" />
                    </a>
                  )}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
