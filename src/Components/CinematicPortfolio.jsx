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
import PortfolioAssistant from "./PortfolioAssistant";
import StoryExperienceTimeline from "./StoryExperienceTimeline";

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
];

const storyCards = [
  {
    eyebrow: "WHAT I AM",
    title: "Software engineer with systems instincts.",
    text: "I build full-stack products, but I naturally follow the work deeper: APIs, identity, networking, infrastructure, reliability, and security.",
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
        {[[70,210],[300,145],[530,118],[760,205],[40,480],[280,405],[535,470],[770,375],[95,650],[335,560]].map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4"
            fill={index % 3 === 0 ? "#7CB7FF" : "#58E6D1"}
            filter="url(#nodeGlow)"
            animate={reduceMotion ? undefined : { opacity: [0.24, 0.95, 0.24], r: [3.5, 5.2, 3.5] }}
            transition={{ duration: 3.2 + (index % 4) * 0.6, repeat: Infinity, delay: index * 0.17, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <div className="absolute left-[4%] top-[18%] rounded-full border border-[#58E6D1]/10 bg-[#03131A]/55 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[.18em] text-[#7DEEDF]/32 backdrop-blur-md sm:text-[8px]">TLS 1.3</div>
      <div className="absolute right-[4%] top-[27%] rounded-full border border-[#7CB7FF]/10 bg-[#03131A]/55 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[.18em] text-[#9EC8FF]/30 backdrop-blur-md sm:text-[8px]">AUTH / RBAC</div>
      <div className="absolute bottom-[20%] left-[3%] rounded-full border border-[#58E6D1]/10 bg-[#03131A]/55 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[.18em] text-[#7DEEDF]/30 backdrop-blur-md sm:text-[8px]">API · 200 OK</div>
      <div className="absolute bottom-[13%] right-[5%] rounded-full border border-[#B39BFF]/10 bg-[#03131A]/55 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[.18em] text-[#C8B9FF]/28 backdrop-blur-md sm:text-[8px]">CI/CD · HEALTHY</div>
    </div>
  );
};

const RobotAssistant = ({ reduceMotion, onOpen }) => (
  <motion.button
    type="button"
    onClick={onOpen}
    aria-label="Open Yeabsira's story"
    className="group absolute bottom-[8%] right-[6%] z-[35] w-[clamp(64px,15vw,86px)] cursor-pointer border-0 bg-transparent p-0 text-left sm:bottom-[5%] sm:right-[4%] lg:bottom-[3%] lg:right-[3%]"
    animate={reduceMotion ? undefined : { y: [0, -9, 0, -2, 0], rotate: [0, -1.2, 1.2, -0.5, 0] }}
    transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 1.4, ease: [0.22, 1, 0.36, 1] }}
    whileHover={reduceMotion ? undefined : { y: -7, scale: 1.035 }}
    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
  >
    <motion.div
      className="absolute bottom-[88%] right-0 w-[122px] rounded-2xl border border-[#7CEBDD]/16 bg-[#071821]/88 px-3 py-2.5 shadow-[0_16px_50px_rgba(0,8,15,.38)] backdrop-blur-xl sm:w-[145px] sm:px-3.5 sm:py-3"
      animate={reduceMotion ? undefined : { y: [0, -2, 0], opacity: [0.86, 1, 0.9] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <p className="text-[10px] font-semibold leading-4 text-[#E8FAF8] sm:text-[11px]">Touch me to explore</p>
      <p className="mt-1 font-mono text-[7px] uppercase tracking-[.16em] text-[#6EE8D7]/55">start the journey</p>
      <span className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-[#7CEBDD]/16 bg-[#071821]" />
    </motion.div>

    <div className="relative mx-auto aspect-[.78/1] w-full">
      <motion.div
        animate={reduceMotion ? undefined : { scaleX: [1, 0.78, 1], opacity: [0.28, 0.16, 0.28] }}
        transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
        className="absolute bottom-[1%] left-[16%] h-[9%] w-[68%] rounded-[50%] bg-black/50 blur-md"
      />
      <svg viewBox="0 0 160 205" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_18px_24px_rgba(0,0,0,.45)]" aria-hidden="true">
        <defs>
          <linearGradient id="robotShell" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#DCE8EB" />
            <stop offset="76%" stopColor="#AEBCC3" />
            <stop offset="100%" stopColor="#F7FBFC" />
          </linearGradient>
          <radialGradient id="robotFace" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#102A36" />
            <stop offset="65%" stopColor="#06131A" />
            <stop offset="100%" stopColor="#02080C" />
          </radialGradient>
          <filter id="eyeGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <motion.g
          animate={reduceMotion ? undefined : { rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "80px 62px" }}
        >
          <ellipse cx="80" cy="53" rx="50" ry="43" fill="url(#robotShell)" stroke="#F9FFFF" strokeOpacity="0.72" strokeWidth="2" />
          <rect x="42" y="27" width="76" height="50" rx="24" fill="url(#robotFace)" stroke="#92EDE4" strokeOpacity="0.18" />
          <ellipse cx="61" cy="50" rx="11" ry="7" fill="#45E5E6" filter="url(#eyeGlow)" />
          <ellipse cx="99" cy="50" rx="11" ry="7" fill="#45E5E6" filter="url(#eyeGlow)" />
          <ellipse cx="57" cy="47" rx="3" ry="2" fill="#CFFFFF" opacity="0.8" />
          <ellipse cx="95" cy="47" rx="3" ry="2" fill="#CFFFFF" opacity="0.8" />
        </motion.g>

        <path d="M51 91 C54 78 106 78 109 91 L116 148 C117 165 103 178 80 178 C57 178 43 165 44 148 Z" fill="url(#robotShell)" stroke="#FFFFFF" strokeOpacity="0.5" />
        <path d="M46 98 C35 105 32 121 34 151 C35 161 39 167 44 169 L52 110 Z" fill="url(#robotShell)" opacity="0.92" />
        <path d="M114 98 C125 105 128 121 126 151 C125 161 121 167 116 169 L108 110 Z" fill="url(#robotShell)" opacity="0.92" />
        <rect x="75" y="174" width="10" height="10" rx="4" fill="#91A0A7" />
        <ellipse cx="80" cy="187" rx="47" ry="11" fill="url(#robotShell)" stroke="#D9E5E7" />
        <rect x="33" y="186" width="94" height="12" rx="6" fill="#BFCBD0" opacity="0.9" />
        <ellipse cx="80" cy="186" rx="42" ry="7" fill="#F7FBFC" opacity="0.96" />
        <ellipse cx="80" cy="191" rx="30" ry="4" fill="#64E8DC" opacity="0.12" />
      </svg>
    </div>
  </motion.button>
);

const MetallicGear = ({ rotation, reduceMotion }) => (
  <motion.div
    animate={{ rotate: rotation }}
    transition={reduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 24, damping: 17, mass: 1.7, restDelta: 0.01 }}
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

const Gear = ({ scene, wheelTurn, reduceMotion, onNavigate, compact = false, showSceneNav = true }) => {
  const rotation = reduceMotion ? scene * 35 : wheelTurn * 118 + scene * 44;

  return (
    <div className={`relative mx-auto aspect-square w-full select-none ${compact ? "max-w-[220px]" : "max-w-[590px]"}`}>
      <div className="absolute inset-[1%] rounded-full bg-[radial-gradient(circle,rgba(86,230,211,.18),rgba(22,121,126,.08)_34%,transparent_69%)] blur-3xl" />
      <div className="circuit-halo pointer-events-none absolute -inset-[8%] opacity-70" />
      <motion.div animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 110, repeat: Infinity, ease: "linear" }} className="absolute inset-[8%] rounded-full border border-dashed border-[#56E6D3]/10 transform-gpu" />
      <MetallicGear rotation={rotation} reduceMotion={reduceMotion} />
      <motion.div animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 62, repeat: Infinity, ease: "linear" }} className="absolute inset-[19.5%] z-[7] rounded-full border border-dashed border-[#79EADF]/14 transform-gpu" />

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -2, 0], scale: [1, 1.003, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[23%] z-10 overflow-hidden rounded-full border border-[#8BF4E8]/28 bg-[#03131A] p-[5px] shadow-[0_24px_90px_rgba(0,0,0,.58),0_0_42px_rgba(86,230,211,.11)] transform-gpu"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full border border-white/[.045] bg-[#061820]">
          <img src={myImage} alt="Yeabsira Mesfin" className="h-full w-full object-cover object-top saturate-[.88] contrast-[1.04]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(1,12,19,.78),transparent_48%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(100,240,225,.08),transparent_52%)]" />
          <motion.div animate={reduceMotion ? undefined : { x: ["-145%", "195%"] }} transition={{ duration: 7.2, repeat: Infinity, repeatDelay: 4.2, ease: "easeInOut" }} className="absolute inset-y-0 w-16 rotate-[14deg] bg-gradient-to-r from-transparent via-[#B8FFF7]/10 to-transparent blur-xl" />
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
                className={`absolute left-1/2 top-1/2 flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.17em] backdrop-blur-xl transition-all duration-700 sm:text-[10px] ${active ? "border-[#89F5E8]/55 bg-[#7CEBDD] text-[#03131A] shadow-[0_0_35px_rgba(86,230,211,.2)]" : "border-[#72CFC6]/15 bg-[#03131A]/82 text-[#C6F8F3]/46 hover:border-[#72CFC6]/35 hover:text-[#DFFFFB]"}`}
                style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * clamp(155px, 39vw, 255px))) rotate(${-angle}deg)` }}
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
    className="relative isolate aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-[#7CEBDD]/10 bg-[#01080D]"
    style={{ backgroundImage: `radial-gradient(circle at 50% 42%, ${project.accent}18, transparent 38%), linear-gradient(145deg, #020C12 0%, #031820 52%, #01070B 100%)` }}
  >
    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(124,235,221,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(124,235,221,.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
    <motion.div
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#7CEBDD]/12"
    />
    <div className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full" style={{ backgroundColor: project.accent, boxShadow: `0 0 18px ${project.accent}` }} />
    <div className="absolute right-[15%] top-[34%] h-1.5 w-1.5 rounded-full bg-[#7CB7FF] shadow-[0_0_16px_rgba(124,183,255,.85)]" />
    <div className="absolute bottom-[24%] left-[20%] h-1.5 w-1.5 rounded-full bg-[#58E6D1] shadow-[0_0_16px_rgba(88,230,209,.8)]" />
    <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        className="grid h-24 w-24 place-items-center rounded-[1.75rem] border border-[#7CEBDD]/14 bg-[#03151D]/88 shadow-[0_18px_70px_rgba(0,0,0,.46)] backdrop-blur-xl"
      >
        <span className="text-3xl font-semibold tracking-[-.06em]" style={{ color: project.accent }}>{project.code}</span>
      </motion.div>
      <p className="mt-4 font-mono text-[8px] font-bold uppercase tracking-[.24em] text-[#C9E8E4]/32">system architecture preview</p>
    </div>
  </div>
);

const ProjectVisual = ({ project, reduceMotion }) => {
  if (project.id === "appsec" && project.demo) {
    return (
      <div className="relative aspect-[21/9] overflow-hidden rounded-[1.25rem] border border-[#52F0B6]/15 bg-[#01080D]">
        <iframe
          src={project.demo}
          title="AppSec Vulnerability Manager live preview"
          loading="lazy"
          tabIndex="-1"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-[#01080D]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.035]" />
        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-[#52F0B6]/20 bg-[#02120F]/90 px-2.5 py-1 font-mono text-[7px] font-bold uppercase tracking-[.18em] text-[#78F7C8] backdrop-blur-md">Live product preview</div>
      </div>
    );
  }

  if (project.image) {
    return (
      <div className="relative overflow-hidden rounded-[1.25rem] border border-[#7CEBDD]/10 bg-[#01080D]">
        <img src={project.image} alt={`${project.title} preview`} className="block max-h-[330px] w-full object-contain" />
      </div>
    );
  }

  return <ProjectFallback project={project} reduceMotion={reduceMotion} />;
};

const HeroVisual = ({ scene, wheelTurn, reduceMotion, onNavigate }) => (
  <div className="relative mx-auto w-full max-w-[640px] px-1 sm:px-3">
    <HeroSignalField reduceMotion={reduceMotion} />
    <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={onNavigate} />
    {scene === 0 && <RobotAssistant reduceMotion={reduceMotion} onOpen={() => onNavigate(1)} />}
  </div>
);

const SceneShell = ({ children }) => (
  <div className="mx-auto grid min-h-[calc(100dvh-7rem)] w-full max-w-7xl items-center gap-8 px-5 pb-10 pt-28 sm:px-7 lg:grid-cols-[.92fr_1.08fr] lg:gap-14 lg:px-10 lg:pb-8 lg:pt-24">{children}</div>
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
    }, reduceMotion ? 80 : 760);
  };

  const sceneVariants = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(5px)", scale: 0.996, y: 7 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", scale: 1.004, y: -6 },
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#020B12] text-[#E8F7F5]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(13,86,92,.26),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(40,117,151,.14),transparent_28%),radial-gradient(circle_at_72%_82%,rgba(91,70,151,.09),transparent_28%),linear-gradient(135deg,#020812,#03131b_48%,#020a11)]" />
      <div className="circuit-field pointer-events-none fixed inset-0 opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(165,255,245,.018),transparent_17%,transparent_82%,rgba(74,185,180,.02))]" />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-[#79EADF]/10 bg-[#031019]/72 px-3 py-2.5 shadow-[0_18px_60px_rgba(0,5,11,.36)] backdrop-blur-2xl sm:px-4">
          <button type="button" onClick={() => navigate(0)} className="group flex items-center gap-3 text-left">
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[#7CEBDD]/18 bg-[#7CEBDD]/[.04] font-mono text-[10px] font-bold text-[#DFFFFB]/80">YM<span className="absolute -inset-1 rounded-full border border-[#7CEBDD]/0 transition-all duration-700 group-hover:border-[#7CEBDD]/35" /></span>
            <span className="hidden sm:block"><span className="block text-sm font-bold tracking-[-.02em] text-[#E8F7F5]/90">Yeabsira Mesfin</span><span className="block font-mono text-[8px] uppercase tracking-[.18em] text-[#B8DCD8]/35">Software · Systems · Security</span></span>
          </button>
          <nav className="flex items-center gap-0.5 sm:gap-1.5" aria-label="Portfolio sections">
            {scenes.slice(1).map((item, index) => (
              <button key={item.id} type="button" onClick={() => navigate(index + 1)} className={`rounded-xl px-2 py-2 text-[9px] font-bold uppercase tracking-[.09em] transition-all duration-700 sm:px-3 sm:text-xs sm:tracking-[.12em] ${scene === index + 1 ? "bg-[#7CEBDD]/10 text-[#CFFFF8]" : "text-[#C8E6E2]/36 hover:bg-[#7CEBDD]/[.04] hover:text-[#DFFFFB]/80"}`}>{item.label}</button>
            ))}
          </nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={scene} variants={sceneVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: reduceMotion ? 0.08 : 0.94, ease: [0.16, 1, 0.3, 1] }} className="relative z-10">
          {scene === 0 && (
            <SceneShell>
              <div className="order-2 lg:order-1">
                <div className="mb-5 flex items-center gap-3"><span className="h-px w-10 bg-[#58E6D1]/65" /><span className="font-mono text-[9px] font-bold uppercase tracking-[.22em] text-[#58E6D1]">Portfolio / 2026</span></div>
                <h1 className="max-w-4xl text-[clamp(3.25rem,7.5vw,7rem)] font-semibold leading-[.84] tracking-[-.07em] text-[#E8F7F5]">Yeabsira<br /><span className="bg-gradient-to-r from-[#E7FFFB] via-[#58E6D1] to-[#7CB7FF] bg-clip-text text-transparent">Mesfin.</span></h1>
                <p className="mt-7 max-w-xl text-[clamp(1.05rem,2vw,1.55rem)] font-medium leading-[1.35] tracking-[-.02em] text-[#D4ECE9]/72">I build software, understand the systems underneath it, and keep moving deeper into security.</p>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#C5E1DE]/42 sm:text-base">Want to step into the story? Turn the mechanism and move through what I am, what I have built, and where I am going next.</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={() => navigate(1)} className="group inline-flex items-center gap-3 rounded-full bg-[#DFFFFB] px-5 py-3.5 text-sm font-bold text-[#03131A] shadow-[0_10px_34px_rgba(86,230,211,.12)] transition-all duration-700 hover:-translate-y-0.5 hover:bg-white">Enter my story <FaArrowRight className="text-xs transition-transform duration-700 group-hover:translate-x-1" /></button>
                  <button type="button" onClick={() => navigate(2)} className="rounded-full border border-[#7CEBDD]/14 bg-[#7CEBDD]/[.025] px-4 py-3 text-xs font-bold text-[#C8EAE6]/60 transition-all duration-700 hover:border-[#7CEBDD]/35 hover:text-[#E8FFFC]">Jump to projects</button>
                  <button type="button" onClick={() => navigate(3)} className="rounded-full border border-[#7CEBDD]/14 bg-[#7CEBDD]/[.025] px-4 py-3 text-xs font-bold text-[#C8EAE6]/60 transition-all duration-700 hover:border-[#7CEBDD]/35 hover:text-[#E8FFFC]">Contact</button>
                </div>
                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#7CEBDD]/8 pt-5 font-mono text-[9px] uppercase tracking-[.17em] text-[#B9D9D5]/28"><span>5+ years building</span><span>200+ enterprise deliveries</span><span>GWU cybersecurity M.S.</span></div>
              </div>
              <div className="order-1 lg:order-2"><HeroVisual scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div>
            </SceneShell>
          )}

          {scene === 1 && (
            <SceneShell>
              <div><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div>
              <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto pr-1 lg:max-h-[76vh]">
                <div className="flex items-center gap-3"><span className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#58E6D1]">01 / My story</span><span className="h-px flex-1 bg-[#7CEBDD]/8" /></div>
                <h2 className="mt-5 text-[clamp(2.8rem,5.5vw,5.3rem)] font-semibold leading-[.9] tracking-[-.065em] text-[#E8F7F5]">The person<br /><span className="text-[#C6E1DE]/24">behind the system.</span></h2>
                <div className="mt-7 grid gap-3">
                  {storyCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.article key={card.eyebrow} initial={reduceMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.09, duration: 0.76, ease: [0.16, 1, 0.3, 1] }} whileHover={reduceMotion ? undefined : { x: 3 }} className="group rounded-[1.4rem] border border-[#7CEBDD]/9 bg-[#7CEBDD]/[.025] p-5 backdrop-blur-xl transition-colors duration-700 hover:bg-[#7CEBDD]/[.04]">
                        <div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#7CEBDD]/10 bg-[#020B12]/35 text-base" style={{ color: card.accent }}><Icon /></span><div><p className="font-mono text-[8px] font-bold uppercase tracking-[.2em]" style={{ color: card.accent }}>{card.eyebrow}</p><h3 className="mt-1.5 text-lg font-semibold tracking-[-.025em] text-[#E8F7F5]/88">{card.title}</h3><p className="mt-2 text-sm leading-6 text-[#C5DFDC]/42">{card.text}</p></div></div>
                      </motion.article>
                    );
                  })}
                </div>
                <StoryExperienceTimeline onViewProjects={() => navigate(2)} />
              </div>
            </SceneShell>
          )}

          {scene === 2 && (
            <div data-project-scene="true" className="mx-auto min-h-[100dvh] w-full max-w-[1480px] px-5 pb-10 pt-28 sm:px-7 lg:px-8 lg:pt-24">
              <div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">
                <div className="min-w-0">
                  <div className="flex items-center gap-3"><span className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#7CB7FF]">02 / Project orbit</span><span className="h-px flex-1 bg-[#7CEBDD]/8" /></div>
                  <h2 className="mt-4 text-[clamp(2.45rem,4vw,4rem)] font-semibold leading-[.9] tracking-[-.06em] text-[#E8F7F5]">Selected<br /><span className="text-[#C6E1DE]/24">work.</span></h2>
                  <p className="mt-4 text-sm leading-6 text-[#C5DFDC]/40">Choose a project. The mechanism follows while the work gets the space it deserves.</p>
                  <div className="mt-6 max-h-[56vh] space-y-2 overflow-y-auto pr-1 lg:max-h-[58vh]">
                    {projects.map((project) => {
                      const active = selectedProject.id === project.id;
                      return (
                        <button key={project.id} type="button" onClick={() => { setSelectedProject(project); setWheelTurn((value) => value + 1); }} className={`w-full rounded-2xl border p-3.5 text-left transition-all duration-700 ${active ? "border-[#7CEBDD]/30 bg-[#7CEBDD]/[.07] shadow-[0_0_32px_rgba(88,230,209,.04)]" : "border-[#7CEBDD]/7 bg-[#7CEBDD]/[.012] hover:border-[#7CEBDD]/18 hover:bg-[#7CEBDD]/[.03]"}`}>
                          <div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#7CEBDD]/10 font-mono text-[9px] font-bold" style={{ color: project.accent }}>{project.code}</span><div className="min-w-0"><p className={`truncate text-sm font-semibold ${active ? "text-[#EFFFFC]" : "text-[#C8E2DF]/62"}`}>{project.title}</p><p className="mt-0.5 font-mono text-[8px] uppercase tracking-[.14em] text-[#B8D6D2]/28">{project.lane}</p></div></div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div data-project-gear="true" className="hidden xl:flex xl:flex-col xl:items-center xl:justify-center xl:self-center">
                  <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} compact showSceneNav={false} />
                  <p className="mt-4 max-w-[190px] text-center font-mono text-[7px] uppercase tracking-[.2em] text-[#A8D8D2]/24">rotating project mechanism</p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.article
                    data-project-card="true"
                    key={selectedProject.id}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: .99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: .994 }}
                    transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
                    className="min-w-0 overflow-hidden rounded-[1.8rem] border border-[#7CEBDD]/11 bg-[#03131A]/84 p-3 shadow-[0_30px_90px_rgba(0,5,11,.5)] backdrop-blur-xl sm:p-4"
                  >
                    <ProjectVisual project={selectedProject} reduceMotion={reduceMotion} />
                    <div className="p-3 pb-4 pt-5 sm:p-4 sm:pb-4">
                      <p className="font-mono text-[8px] font-bold uppercase tracking-[.18em]" style={{ color: selectedProject.accent }}>{selectedProject.lane}</p>
                      <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-.04em] text-[#E8F7F5]/92 sm:text-3xl">{selectedProject.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#C5DFDC]/48">{selectedProject.summary}</p>
                      <div className="mt-4 rounded-xl border border-[#7CEBDD]/7 bg-[#7CEBDD]/[.02] px-3.5 py-3 font-mono text-[9px] leading-5 text-[#BDDCD8]/42">{selectedProject.proof}</div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {selectedProject.demo && <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#DFFFFB] px-4 py-2.5 text-xs font-bold text-[#03131A] transition hover:bg-white">Open live product <FaExternalLinkAlt className="text-[9px]" /></a>}
                        <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#7CEBDD]/10 px-4 py-2.5 text-xs font-bold text-[#D3EFEB]/66 transition-colors duration-700 hover:border-[#7CEBDD]/25 hover:text-white">Repository <FaGithub className="text-[10px]" /></a>
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          )}

          {scene === 3 && (
            <SceneShell>
              <div><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div>
              <div>
                <div className="flex items-center gap-3"><span className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#58E6D1]">03 / Contact</span><span className="h-px flex-1 bg-[#7CEBDD]/8" /></div>
                <h2 className="mt-5 text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[.87] tracking-[-.065em] text-[#E8F7F5]">Let’s build<br /><span className="text-[#C6E1DE]/24">what comes next.</span></h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-[#C5DFDC]/44">I am interested in software engineering, infrastructure, application security, and security engineering work where product thinking and systems thinking meet.</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a href="mailto:yeabsira.mesfin29@gmail.com" className="group rounded-2xl border border-[#7CEBDD]/9 bg-[#7CEBDD]/[.025] p-4 transition-all duration-700 hover:border-[#58E6D1]/35 hover:bg-[#7CEBDD]/[.045]"><FaEnvelope className="text-[#58E6D1]" /><p className="mt-4 font-mono text-[8px] uppercase tracking-[.18em] text-[#B9D9D5]/28">Email</p><p className="mt-1 break-all text-sm font-semibold text-[#E0F7F3]/76">yeabsira.mesfin29@gmail.com</p></a>
                  <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-[#7CEBDD]/9 bg-[#7CEBDD]/[.025] p-4 transition-all duration-700 hover:border-[#7CB7FF]/35 hover:bg-[#7CEBDD]/[.045]"><FaLinkedinIn className="text-[#7CB7FF]" /><p className="mt-4 font-mono text-[8px] uppercase tracking-[.18em] text-[#B9D9D5]/28">LinkedIn</p><p className="mt-1 text-sm font-semibold text-[#E0F7F3]/76">Yeabsira Mesfin</p></a>
                  <a href="https://github.com/yeabsira-mesfin" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-[#7CEBDD]/9 bg-[#7CEBDD]/[.025] p-4 transition-all duration-700 hover:border-[#B39BFF]/35 hover:bg-[#7CEBDD]/[.045]"><FaGithub className="text-[#B39BFF]" /><p className="mt-4 font-mono text-[8px] uppercase tracking-[.18em] text-[#B9D9D5]/28">GitHub</p><p className="mt-1 break-all text-sm font-semibold text-[#E0F7F3]/76">github.com/yeabsira-mesfin</p></a>
                  <div className="rounded-2xl border border-[#7CEBDD]/9 bg-[#7CEBDD]/[.025] p-4"><FaMapMarkerAlt className="text-[#E8BD73]" /><p className="mt-4 font-mono text-[8px] uppercase tracking-[.18em] text-[#B9D9D5]/28">Based in</p><p className="mt-1 text-sm font-semibold text-[#E0F7F3]/76">Bristow, Virginia · Open to relocation across the U.S.</p></div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={() => navigate(0)} className="inline-flex items-center gap-2 rounded-full border border-[#7CEBDD]/10 px-4 py-3 text-xs font-bold text-[#C8EAE6]/52 transition-colors duration-700 hover:text-white"><FaArrowLeft /> Back to start</button><button type="button" onClick={() => navigate(2)} className="inline-flex items-center gap-2 rounded-full bg-[#DFFFFB] px-4 py-3 text-xs font-bold text-[#03131A]">Review projects <FaArrowRight /></button></div>
              </div>
            </SceneShell>
          )}
        </motion.main>
      </AnimatePresence>

      {scene === 3 && <PortfolioAssistant />}

      {transitioning && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .58 }} className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle_at_center,rgba(86,230,211,.055),rgba(2,11,18,.1)_38%,rgba(2,11,18,.38))]" />}
    </div>
  );
};

export default CinematicPortfolio;
