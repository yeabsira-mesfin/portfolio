import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCode,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaGraduationCap,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaServer,
} from "react-icons/fa";
import myImage from "../images/MyPicture.png";
import windowsConsole from "../images/windows-infrastructure-console.svg";
import appsecPreview from "../images/appsec-vulnerability-manager.svg";
import PortfolioAssistant from "./PortfolioAssistant";

const scenes = [
  { id: "intro", label: "Start", number: "00" },
  { id: "story", label: "Story", number: "01" },
  { id: "projects", label: "Projects", number: "02" },
  { id: "contact", label: "Contact", number: "03" },
];

const projects = [
  {
    id: "appsec",
    title: "AppSec Vulnerability Manager",
    lane: "AppSec + Software",
    summary: "A production-deployed AppSec operations console that normalizes Semgrep, Trivy, and OWASP ZAP findings into one persistent remediation queue.",
    proof: "Python · FastAPI · Semgrep · Trivy · OWASP ZAP · Neon PostgreSQL · Vercel",
    repo: "https://github.com/yeabsira-mesfin/appsec-vulnerability-manager",
    demo: "https://appsec-vulnerability-manager.vercel.app/",
    image: appsecPreview,
    code: "APP",
    accent: "#52F0B6",
  },
  {
    id: "windows",
    title: "Windows Infrastructure Reliability Console",
    lane: "Infrastructure + Security",
    summary: "A Windows reliability lab that turns health checks, network visibility, backup integrity, and failover into one operational view.",
    proof: "PowerShell · Networking · SHA-256 · Failover · React",
    repo: "https://github.com/yeabsira-mesfin/windows-infrastructure-reliability-console",
    image: windowsConsole,
    code: "WIN",
    accent: "#58E6D1",
  },
  {
    id: "cloud",
    title: "Secure Cloud Infrastructure as Code",
    lane: "Cloud + Security",
    summary: "Terraform-based AWS architecture with multi-AZ design, load balancing, autoscaling, segmentation, and encrypted versioned storage.",
    proof: "Terraform · AWS · IaC · Availability · Encryption",
    repo: "https://github.com/yeabsira-mesfin/secure-cloud-infrastructure-iac",
    code: "IAC",
    accent: "#7CB7FF",
  },
  {
    id: "techboard",
    title: "TechBoard",
    lane: "Full Stack + RBAC",
    summary: "A Django and PostgreSQL job platform with role-based authentication, search, resume uploads, applicant tracking, and separate workflows.",
    proof: "Python · Django · PostgreSQL · RBAC · Product UX",
    repo: "https://github.com/yeabsira-mesfin/techboard",
    code: "TB",
    accent: "#B39BFF",
  },
  {
    id: "login",
    title: "Secure Login Analyzer",
    lane: "Security + Python",
    summary: "Authentication event analysis for repeated failures, blocked activity, location anomalies, validation, and testable detection logic.",
    proof: "Python · Authentication · Detection · Testing",
    repo: "https://github.com/yeabsira-mesfin/secure_login_analyzer",
    code: "AUTH",
    accent: "#E8BD73",
  },
  {
    id: "ai-security",
    title: "AI Security Testing Lab",
    lane: "AI Security + AppSec",
    summary: "A defensive gateway for LLM-enabled applications with input validation, sensitive-data redaction, tool allowlisting, output filtering, and automated security regression tests.",
    proof: "Python · FastAPI · LLM Security · PII Redaction · Tool Allowlisting · Pytest",
    repo: "https://github.com/yeabsira-mesfin/ai-security-testing-lab",
    code: "AI",
    accent: "#6EE8D7",
  },
  {
    id: "endpoint-posture",
    title: "SignalDesk Endpoint Posture Advisor",
    lane: "Endpoint Security + Operations",
    summary: "A local security-operations lab that turns synthetic multi-customer endpoint data into posture assessments, prioritized cases, SLA tracking, audit events, and scoped reports.",
    proof: "Python · Endpoint Security · MITRE ATT&CK · Multi-customer Isolation · SLA Tracking · Audit Logging",
    repo: "https://github.com/yeabsira-mesfin/endpoint-posture-advisor",
    code: "EDR",
    accent: "#8AB8FF",
  },
];

const storyCards = [
  {
    eyebrow: "WHAT I AM",
    title: "Software engineer with systems instincts.",
    text: "I build full-stack products, then follow the work deeper into APIs, identity, networking, infrastructure, reliability, and security.",
    icon: FaCode,
    accent: "#58E6D1",
  },
  {
    eyebrow: "WHAT I’M DOING",
    title: "Going deeper into cybersecurity.",
    text: "I am completing an M.S. in Cybersecurity in Computer Science at The George Washington University, focused on secure systems and network security.",
    icon: FaGraduationCap,
    accent: "#7CB7FF",
  },
  {
    eyebrow: "WHAT I’VE DONE",
    title: "Built and operated real client systems.",
    text: "At MMCY, I grew from developer into client-facing leadership while delivering 200+ enterprise event builds and supporting production outcomes.",
    icon: FaServer,
    accent: "#E8BD73",
  },
];

const sceneFromLocation = () => {
  if (typeof window === "undefined") return 0;
  const id = window.location.hash.replace("#", "").trim().toLowerCase();
  const index = scenes.findIndex((item) => item.id === id);
  return index >= 0 ? index : 0;
};

const HeroSignalField = ({ reduceMotion }) => {
  const paths = [
    "M70 210 H190 Q220 210 220 180 V145 H300",
    "M530 118 H650 Q684 118 684 150 V205 H760",
    "M40 480 H165 Q205 480 205 440 V405 H280",
    "M535 470 H625 Q670 470 670 425 V375 H770",
    "M95 650 H245 Q285 650 285 610 V560 H335",
  ];

  return (
    <div className="pointer-events-none absolute -inset-[8%] overflow-hidden rounded-[3rem]" aria-hidden="true">
      <svg viewBox="0 0 820 760" className="absolute inset-0 h-full w-full opacity-75">
        <defs>
          <linearGradient id="signalLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#57E7D3" stopOpacity="0" />
            <stop offset="45%" stopColor="#57E7D3" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#7CB7FF" stopOpacity="0.06" />
          </linearGradient>
          <filter id="nodeGlow" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {paths.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="url(#signalLine)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.28, 0.72, 0.32] }}
            transition={{ pathLength: { duration: 1.8, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 5.5 + index, repeat: Infinity, ease: "easeInOut" } }}
          />
        ))}
      </svg>
      <div className="absolute left-[4%] top-[18%] rounded-full border border-[#58E6D1]/15 bg-[#03131A]/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[.18em] text-[#A5F8ED]/65 backdrop-blur-md">TLS 1.3</div>
      <div className="absolute right-[4%] top-[27%] rounded-full border border-[#7CB7FF]/15 bg-[#03131A]/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[.18em] text-[#B5D5FF]/62 backdrop-blur-md">AUTH / RBAC</div>
      <div className="absolute bottom-[18%] left-[3%] rounded-full border border-[#58E6D1]/15 bg-[#03131A]/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[.18em] text-[#A5F8ED]/62 backdrop-blur-md">API · 200 OK</div>
    </div>
  );
};

const MetallicGear = ({ rotation, reduceMotion }) => (
  <motion.div
    animate={{ rotate: rotation }}
    transition={reduceMotion ? { duration: 0.1 } : { duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
    className="absolute inset-[2.5%] transform-gpu will-change-transform"
  >
    <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="steelFace" cx="38%" cy="30%" r="74%">
          <stop offset="0%" stopColor="#416C73" />
          <stop offset="25%" stopColor="#1E4950" />
          <stop offset="58%" stopColor="#0B2930" />
          <stop offset="82%" stopColor="#071820" />
          <stop offset="100%" stopColor="#020B12" />
        </radialGradient>
        <linearGradient id="toothMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A4D5D6" />
          <stop offset="16%" stopColor="#548187" />
          <stop offset="52%" stopColor="#153A41" />
          <stop offset="100%" stopColor="#06161D" />
        </linearGradient>
        <linearGradient id="bevel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9CFFF2" stopOpacity="0.88" />
          <stop offset="22%" stopColor="#45CFC1" stopOpacity="0.5" />
          <stop offset="62%" stopColor="#092A31" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#020B12" stopOpacity="0.82" />
        </linearGradient>
        <radialGradient id="bolt" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#B5E4E1" />
          <stop offset="35%" stopColor="#4A8281" />
          <stop offset="100%" stopColor="#071A1F" />
        </radialGradient>
        <filter id="cyanGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gearShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="15" floodColor="#00050B" floodOpacity="0.86" />
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#35E0CF" floodOpacity="0.16" />
        </filter>
      </defs>
      <g filter="url(#gearShadow)">
        {Array.from({ length: 32 }).map((_, index) => (
          <rect key={index} x="282" y="5" width="36" height="82" rx="9" fill="url(#toothMetal)" stroke="#67D8CF" strokeOpacity="0.19" strokeWidth="1.4" transform={`rotate(${index * 11.25} 300 300)`} />
        ))}
        <circle cx="300" cy="300" r="235" fill="url(#steelFace)" stroke="#315C61" strokeWidth="5" />
        <circle cx="300" cy="300" r="220" fill="none" stroke="#A5FFF4" strokeOpacity="0.12" strokeWidth="3" />
        <circle cx="300" cy="300" r="199" fill="#04161D" stroke="url(#bevel)" strokeWidth="20" />
        <circle cx="300" cy="300" r="171" fill="#031017" stroke="#57E5D2" strokeOpacity="0.34" strokeWidth="3" />
        <circle cx="300" cy="300" r="154" fill="none" stroke="#A8FFF4" strokeOpacity="0.08" strokeWidth="2" strokeDasharray="2 11" />
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index * Math.PI * 2) / 8 - Math.PI / 2;
          const x = 300 + Math.cos(angle) * 195;
          const y = 300 + Math.sin(angle) * 195;
          return <circle key={index} cx={x} cy={y} r="9" fill="url(#bolt)" stroke="#9AF6EA" strokeOpacity="0.22" />;
        })}
      </g>
      <circle cx="300" cy="300" r="248" fill="none" stroke="#56E6D3" strokeOpacity="0.22" strokeWidth="2" filter="url(#cyanGlow)" />
      <path d="M130 185 A210 210 0 0 1 270 92" fill="none" stroke="#C7FFF8" strokeOpacity="0.24" strokeWidth="3" strokeLinecap="round" />
      <path d="M471 414 A210 210 0 0 1 339 505" fill="none" stroke="#0A0E13" strokeOpacity="0.9" strokeWidth="9" strokeLinecap="round" />
    </svg>
  </motion.div>
);

const Gear = ({ scene, wheelTurn, reduceMotion, onNavigate, showSceneNav = true }) => {
  const rotation = reduceMotion ? scene * 8 : wheelTurn * 18 + scene * 12;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[590px] select-none">
      <div className="absolute inset-[1%] rounded-full bg-[radial-gradient(circle,rgba(86,230,211,.18),rgba(22,121,126,.08)_34%,transparent_69%)] blur-3xl" />
      <div className="circuit-halo pointer-events-none absolute -inset-[8%] opacity-70" />
      <motion.div animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 180, repeat: Infinity, ease: "linear" }} className="absolute inset-[8%] rounded-full border border-dashed border-[#56E6D3]/10 transform-gpu" />
      <MetallicGear rotation={rotation} reduceMotion={reduceMotion} />
      <motion.div animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute inset-[19.5%] z-[7] rounded-full border border-dashed border-[#79EADF]/14 transform-gpu" />

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -2, 0], scale: [1, 1.003, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[23%] z-10 overflow-hidden rounded-full border border-[#8BF4E8]/28 bg-[#03131A] p-[5px] shadow-[0_24px_90px_rgba(0,0,0,.58),0_0_42px_rgba(86,230,211,.11)] transform-gpu"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full border border-white/[.045] bg-[#061820]">
          <img src={myImage} alt="Yeabsira Mesfin" loading={scene === 0 ? "eager" : "lazy"} fetchPriority={scene === 0 ? "high" : "auto"} className="h-full w-full object-cover object-top saturate-[.88] contrast-[1.04]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(1,12,19,.78),transparent_48%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(100,240,225,.08),transparent_52%)]" />
        </div>
      </motion.div>

      {showSceneNav && (
        <div className="absolute inset-0 z-20">
          {scenes.slice(1).map((item, index) => {
            const angle = [-42, 90, 222][index];
            const active = scene === index + 1;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(index + 1)}
                aria-current={active ? "page" : undefined}
                className={`absolute left-1/2 top-1/2 flex min-h-[44px] items-center gap-2 rounded-full border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-xl transition-all duration-500 ${active ? "border-[#89F5E8]/55 bg-[#7CEBDD] text-[#03131A] shadow-[0_0_35px_rgba(86,230,211,.2)]" : "border-[#72CFC6]/22 bg-[#03131A]/90 text-[#D8F6F2]/72 hover:border-[#72CFC6]/45 hover:text-white"}`}
                style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * clamp(135px, 36vw, 255px))) rotate(${-angle}deg)` }}
              >
                <span>{item.number}</span><span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ProjectFallback = ({ project, reduceMotion }) => (
  <div
    className="relative isolate aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-[#7CEBDD]/12 bg-[#01080D]"
    style={{ backgroundImage: `radial-gradient(circle at 50% 42%, ${project.accent}18, transparent 38%), linear-gradient(145deg, #020C12 0%, #031820 52%, #01070B 100%)` }}
  >
    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(124,235,221,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(124,235,221,.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
    <motion.div animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 44, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#7CEBDD]/12" />
    <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
      <motion.div animate={reduceMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} className="grid h-24 w-24 place-items-center rounded-[1.75rem] border border-[#7CEBDD]/18 bg-[#03151D]/88 shadow-[0_18px_70px_rgba(0,0,0,.46)] backdrop-blur-xl">
        <span className="text-3xl font-semibold tracking-[-.06em]" style={{ color: project.accent }}>{project.code}</span>
      </motion.div>
      <p className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#D6EFEC]/58">system architecture preview</p>
    </div>
  </div>
);

const ProjectVisual = ({ project, reduceMotion }) => {
  if (project.image) {
    return (
      <div data-project-image-preview="true" className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[1.25rem] border border-[#7CEBDD]/12 bg-[#01080D] p-2">
        <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="block h-full w-full object-contain" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.035]" />
      </div>
    );
  }
  return <ProjectFallback project={project} reduceMotion={reduceMotion} />;
};

const SceneShell = ({ children, className = "" }) => (
  <div className={`mx-auto grid min-h-[calc(100dvh-7rem)] w-full max-w-7xl items-start gap-8 px-5 pb-14 pt-28 sm:px-7 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-10 lg:pt-24 ${className}`}>{children}</div>
);

const CinematicPortfolio = () => {
  const reduceMotion = useReducedMotion();
  const [scene, setScene] = useState(sceneFromLocation);
  const [wheelTurn, setWheelTurn] = useState(0);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  useEffect(() => {
    const syncFromUrl = () => {
      setScene(sceneFromLocation());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("hashchange", syncFromUrl);
    };
  }, []);

  useEffect(() => {
    const title = scene === 0 ? "Yeabsira Mesfin | Software, Infrastructure & Security Engineer" : `${scenes[scene].label} | Yeabsira Mesfin`;
    document.title = title;
  }, [scene]);

  const navigate = (target) => {
    if (target === scene) return;
    setWheelTurn((value) => value + 1);
    setScene(target);
    const hash = target === 0 ? "" : `#${scenes[target].id}`;
    const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
    window.history.pushState({ scene: scenes[target].id }, "", nextUrl);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const selectProject = (project) => {
    setSelectedProject(project);
    setWheelTurn((value) => value + 1);
    window.setTimeout(() => {
      const card = document.querySelector('[data-project-card="true"]');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      if (rect.top > window.innerHeight - 120 || rect.bottom < 96) {
        card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    }, 100);
  };

  const sceneVariants = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", y: 6 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", y: -4 },
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#020B12] text-[#E8F7F5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(13,86,92,.26),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(40,117,151,.14),transparent_28%),radial-gradient(circle_at_72%_82%,rgba(91,70,151,.09),transparent_28%),linear-gradient(135deg,#020812,#03131b_48%,#020a11)]" />
      <div className="circuit-field pointer-events-none fixed inset-0 opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(165,255,245,.018),transparent_17%,transparent_82%,rgba(74,185,180,.02))]" />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-[#79EADF]/12 bg-[#031019]/88 px-3 py-2.5 shadow-[0_18px_60px_rgba(0,5,11,.36)] backdrop-blur-2xl sm:px-4">
          <button type="button" onClick={() => navigate(0)} className="group flex min-h-[44px] items-center gap-3 text-left" aria-label="Go to portfolio home">
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[#7CEBDD]/22 bg-[#7CEBDD]/[.05] font-mono text-[10px] font-bold text-[#DFFFFB]/90">YM<span className="absolute -inset-1 rounded-full border border-[#7CEBDD]/0 transition-all duration-500 group-hover:border-[#7CEBDD]/35" /></span>
            <span className="hidden sm:block"><span className="block text-sm font-bold tracking-[-.02em] text-[#E8F7F5]/95">Yeabsira Mesfin</span><span className="block font-mono text-[8px] uppercase tracking-[.16em] text-[#C3E6E1]/58">Software · Systems · Security</span></span>
          </button>
          <nav className="flex items-center gap-0.5 sm:gap-1.5" aria-label="Portfolio sections">
            {scenes.slice(1).map((item, index) => {
              const active = scene === index + 1;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(index + 1)}
                  aria-current={active ? "page" : undefined}
                  className={`min-h-[44px] rounded-xl px-2.5 py-2 text-[10px] font-bold uppercase tracking-[.07em] transition-all duration-500 sm:px-3 sm:text-xs sm:tracking-[.1em] ${active ? "bg-[#7CEBDD]/12 text-[#DFFFFB]" : "text-[#D0EAE6]/65 hover:bg-[#7CEBDD]/[.05] hover:text-white"}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={scene} variants={sceneVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: reduceMotion ? 0.08 : 0.58, ease: [0.16, 1, 0.3, 1] }} className="relative z-10">
          {scene === 0 && (
            <SceneShell>
              <div data-intro-content="true" className="order-1 lg:order-1">
                <div className="mb-5 flex items-center gap-3"><span className="h-px w-10 bg-[#58E6D1]/75" /><span className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#77EBDD]">Portfolio / 2026</span></div>
                <h1 className="max-w-4xl text-[clamp(3.25rem,7.5vw,7rem)] font-semibold leading-[.84] tracking-[-.07em] text-[#E8F7F5]">Yeabsira<br /><span className="bg-gradient-to-r from-[#E7FFFB] via-[#58E6D1] to-[#7CB7FF] bg-clip-text text-transparent">Mesfin.</span></h1>
                <p className="mt-7 max-w-xl text-[clamp(1.05rem,2vw,1.55rem)] font-medium leading-[1.4] tracking-[-.02em] text-[#D8EFEC]/82">I build software, understand the systems underneath it, and keep moving deeper into security.</p>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#CDE5E2]/68 sm:text-base">Explore the story, inspect the systems I have built, or jump directly to the work most relevant to software, infrastructure, and security engineering.</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={() => navigate(1)} className="group inline-flex min-h-[44px] items-center gap-3 rounded-full bg-[#DFFFFB] px-5 py-3 text-sm font-bold text-[#03131A] shadow-[0_10px_34px_rgba(86,230,211,.12)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-white">Enter my story <FaArrowRight className="text-xs transition-transform duration-500 group-hover:translate-x-1" /></button>
                  <button type="button" onClick={() => navigate(2)} className="min-h-[44px] rounded-full border border-[#7CEBDD]/20 bg-[#7CEBDD]/[.035] px-4 py-3 text-xs font-bold text-[#D5EFEB]/78 transition-all duration-500 hover:border-[#7CEBDD]/40 hover:text-white">Projects</button>
                  <a href="/resume.html" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#7CEBDD]/20 bg-[#7CEBDD]/[.035] px-4 py-3 text-xs font-bold text-[#D5EFEB]/78 transition-all duration-500 hover:border-[#7CEBDD]/40 hover:text-white">Resume <FaFileAlt className="text-[10px]" /></a>
                </div>
                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#7CEBDD]/10 pt-5 font-mono text-[9px] uppercase tracking-[.14em] text-[#C9E5E1]/58"><span>5+ years building</span><span>200+ enterprise deliveries</span><span>GWU cybersecurity M.S.</span></div>
              </div>
              <div className="order-2 mt-2 lg:order-2 lg:mt-0"><div className="relative mx-auto w-full max-w-[620px]"><HeroSignalField reduceMotion={reduceMotion} /><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div></div>
            </SceneShell>
          )}

          {scene === 1 && (
            <SceneShell>
              <div className="order-2 lg:order-1 lg:sticky lg:top-24"><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div>
              <div data-story-content="true" className="order-1 min-w-0 pr-0 lg:order-2">
                <div className="flex items-center gap-3"><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#77EBDD]">01 / My story</span><span className="h-px flex-1 bg-[#7CEBDD]/12" /></div>
                <h2 className="mt-5 text-[clamp(2.8rem,5.5vw,5.3rem)] font-semibold leading-[.92] tracking-[-.06em] text-[#E8F7F5]">The person<br /><span className="text-[#C6E1DE]/50">behind the system.</span></h2>
                <div className="mt-7 grid gap-3">
                  {storyCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.article key={card.eyebrow} initial={reduceMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} whileHover={reduceMotion ? undefined : { x: 3 }} className="group rounded-[1.4rem] border border-[#7CEBDD]/12 bg-[#7CEBDD]/[.03] p-5 backdrop-blur-xl transition-colors duration-500 hover:bg-[#7CEBDD]/[.05]">
                        <div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#7CEBDD]/14 bg-[#020B12]/45 text-base" style={{ color: card.accent }}><Icon /></span><div className="min-w-0"><p className="font-mono text-[9px] font-bold uppercase tracking-[.18em]" style={{ color: card.accent }}>{card.eyebrow}</p><h3 className="mt-1.5 text-lg font-semibold tracking-[-.025em] text-[#F0FFFD]/92">{card.title}</h3><p className="mt-2 text-sm leading-6 text-[#D1E6E3]/68">{card.text}</p></div></div>
                      </motion.article>
                    );
                  })}
                </div>
                <button type="button" onClick={() => navigate(2)} className="group mt-6 inline-flex min-h-[44px] items-center gap-3 text-sm font-bold text-[#70E7D7]">See what I build <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-1" /></button>
              </div>
            </SceneShell>
          )}

          {scene === 2 && (
            <div data-project-scene="true" className="mx-auto min-h-[100dvh] w-full max-w-[1480px] px-5 pb-16 pt-28 sm:px-7 lg:px-8 lg:pt-28">
              <div className="grid gap-7 lg:grid-cols-[minmax(420px,520px)_minmax(0,1fr)] lg:items-start lg:gap-10">
                <div data-project-gear="true" className="order-2 mx-auto w-full max-w-[520px] lg:order-1 lg:sticky lg:top-24"><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} showSceneNav={false} /></div>

                <div className="order-1 min-w-0 lg:order-2">
                  <div data-project-controls="true" className="min-w-0">
                    <div className="flex items-center gap-3"><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#9BC6FF]">02 / Project orbit</span><span className="h-px flex-1 bg-[#7CEBDD]/12" /></div>
                    <h2 className="mt-4 text-[clamp(2.45rem,4vw,4rem)] font-semibold leading-[.92] tracking-[-.055em] text-[#E8F7F5]">Selected <span className="text-[#C6E1DE]/50">work.</span></h2>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-[#D1E6E3]/66">Choose a project to inspect the engineering problem, implementation, and technology behind it.</p>
                    <div className="mt-6 grid gap-2 sm:grid-cols-2">
                      {projects.map((project) => {
                        const active = selectedProject.id === project.id;
                        return (
                          <button
                            key={project.id}
                            type="button"
                            onClick={() => selectProject(project)}
                            aria-pressed={active}
                            className={`min-h-[64px] w-full rounded-2xl border p-3.5 text-left transition-all duration-500 ${active ? "border-[#7CEBDD]/35 bg-[#7CEBDD]/[.08] shadow-[0_0_32px_rgba(88,230,209,.04)]" : "border-[#7CEBDD]/10 bg-[#7CEBDD]/[.02] hover:border-[#7CEBDD]/22 hover:bg-[#7CEBDD]/[.04]"}`}
                          >
                            <div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#7CEBDD]/14 font-mono text-[9px] font-bold" style={{ color: project.accent }}>{project.code}</span><div className="min-w-0"><p className={`line-clamp-2 text-sm font-semibold leading-5 ${active ? "text-[#F0FFFD]" : "text-[#D5EAE7]/78"}`}>{project.title}</p><p className="mt-0.5 font-mono text-[8px] uppercase tracking-[.11em] text-[#C5DFDB]/55">{project.lane}</p></div></div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.article
                      data-project-card="true"
                      key={selectedProject.id}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: .99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: .994 }}
                      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-6 min-w-0 overflow-hidden rounded-[1.8rem] border border-[#7CEBDD]/14 bg-[#03131A]/90 p-3 shadow-[0_30px_90px_rgba(0,5,11,.5)] backdrop-blur-xl sm:p-4"
                    >
                      <ProjectVisual project={selectedProject} reduceMotion={reduceMotion} />
                      <div className="p-3 pb-4 pt-5 sm:p-4 sm:pb-4">
                        <p className="font-mono text-[9px] font-bold uppercase tracking-[.16em]" style={{ color: selectedProject.accent }}>{selectedProject.lane}</p>
                        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-.04em] text-[#F3FFFD] sm:text-3xl">{selectedProject.title}</h3>
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#D3E7E4]/70">{selectedProject.summary}</p>
                        <div className="mt-4 rounded-xl border border-[#7CEBDD]/10 bg-[#7CEBDD]/[.025] px-3.5 py-3 font-mono text-[9px] leading-5 text-[#D2E9E5]/62">{selectedProject.proof}</div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          {selectedProject.demo && <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#DFFFFB] px-4 py-2.5 text-xs font-bold text-[#03131A] transition hover:bg-white">Open live product <FaExternalLinkAlt className="text-[9px]" /></a>}
                          <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#7CEBDD]/16 px-4 py-2.5 text-xs font-bold text-[#E0F4F1]/78 transition-colors duration-500 hover:border-[#7CEBDD]/32 hover:text-white">Repository <FaGithub className="text-[10px]" /></a>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {scene === 3 && (
            <SceneShell>
              <div data-contact-roller="true" className="order-2 lg:order-1 lg:sticky lg:top-24"><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div>
              <div data-contact-content="true" className="order-1 lg:order-2">
                <div className="flex items-center gap-3"><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#77EBDD]">03 / Contact</span><span className="h-px flex-1 bg-[#7CEBDD]/12" /></div>
                <h2 className="mt-5 text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[.9] tracking-[-.06em] text-[#E8F7F5]">Let’s build<br /><span className="text-[#C6E1DE]/50">what comes next.</span></h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-[#D1E6E3]/70">I am interested in software engineering, infrastructure, application security, and security engineering work where product thinking and systems thinking meet.</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a href="mailto:yeabsira.mesfin29@gmail.com" className="group rounded-2xl border border-[#7CEBDD]/12 bg-[#7CEBDD]/[.03] p-4 transition-all duration-500 hover:border-[#58E6D1]/35 hover:bg-[#7CEBDD]/[.05]"><FaEnvelope className="text-[#58E6D1]" /><p className="mt-4 font-mono text-[9px] uppercase tracking-[.16em] text-[#CAE5E1]/60">Email</p><p className="mt-1 break-all text-sm font-semibold text-[#EEFFFC]/86">yeabsira.mesfin29@gmail.com</p></a>
                  <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-[#7CEBDD]/12 bg-[#7CEBDD]/[.03] p-4 transition-all duration-500 hover:border-[#7CB7FF]/35 hover:bg-[#7CEBDD]/[.05]"><FaLinkedinIn className="text-[#7CB7FF]" /><p className="mt-4 font-mono text-[9px] uppercase tracking-[.16em] text-[#CAE5E1]/60">LinkedIn</p><p className="mt-1 text-sm font-semibold text-[#EEFFFC]/86">Yeabsira Mesfin</p></a>
                  <a href="https://github.com/yeabsira-mesfin" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-[#7CEBDD]/12 bg-[#7CEBDD]/[.03] p-4 transition-all duration-500 hover:border-[#B39BFF]/35 hover:bg-[#7CEBDD]/[.05]"><FaGithub className="text-[#B39BFF]" /><p className="mt-4 font-mono text-[9px] uppercase tracking-[.16em] text-[#CAE5E1]/60">GitHub</p><p className="mt-1 text-sm font-semibold text-[#EEFFFC]/86">@yeabsira-mesfin</p></a>
                  <a href="/resume.html" className="group rounded-2xl border border-[#7CEBDD]/12 bg-[#7CEBDD]/[.03] p-4 transition-all duration-500 hover:border-[#E8BD73]/35 hover:bg-[#7CEBDD]/[.05]"><FaFileAlt className="text-[#E8BD73]" /><p className="mt-4 font-mono text-[9px] uppercase tracking-[.16em] text-[#CAE5E1]/60">Resume</p><p className="mt-1 text-sm font-semibold text-[#EEFFFC]/86">View printable resume</p></a>
                  <div className="rounded-2xl border border-[#7CEBDD]/12 bg-[#7CEBDD]/[.03] p-4 sm:col-span-2"><FaMapMarkerAlt className="text-[#E8BD73]" /><p className="mt-4 font-mono text-[9px] uppercase tracking-[.16em] text-[#CAE5E1]/60">Based in</p><p className="mt-1 text-sm font-semibold text-[#EEFFFC]/86">Bristow, Virginia · Open to relocation across the U.S.</p></div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={() => navigate(0)} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#7CEBDD]/16 px-4 py-3 text-xs font-bold text-[#D6EDE9]/76 transition-colors duration-500 hover:text-white"><FaArrowLeft /> Back to start</button><button type="button" onClick={() => navigate(2)} className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#DFFFFB] px-4 py-3 text-xs font-bold text-[#03131A]">Review projects <FaArrowRight /></button></div>
              </div>
            </SceneShell>
          )}
        </motion.main>
      </AnimatePresence>

      <PortfolioAssistant scene={scenes[scene].id} />
    </div>
  );
};

export default CinematicPortfolio;
