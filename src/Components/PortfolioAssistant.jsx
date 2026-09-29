import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { FaArrowUp, FaTimes } from "react-icons/fa";

const quickPrompts = [
  "What does Yeabsira specialize in?",
  "Show me his recent projects",
  "What roles is he targeting?",
  "What does he do outside of work?",
];

const answers = {
  greeting: "Hi! I’m Yeabsira’s portfolio assistant. You can ask me about his engineering background, projects, cybersecurity work, education, job interests, or hobbies.",
  specialties: "Yeabsira works where software, infrastructure, and security meet. His strongest lanes include full-stack engineering, secure APIs, authentication and authorization, infrastructure and networking, application security, Python, JavaScript/TypeScript, React, Node.js, Docker, Linux, SQL, and cloud-focused engineering.",
  current: "Yeabsira is completing an M.S. in Cybersecurity in Computer Science at The George Washington University while building deeper hands-on work in network security, application security, infrastructure reliability, secure authentication, and AI security testing.",
  projects: "Featured work includes AppSec Vulnerability Manager, Windows Infrastructure Reliability Console, Secure Cloud Infrastructure as Code, TechBoard, Secure Login Analyzer, AI Security Testing Lab, and SignalDesk Endpoint Posture Advisor. Open the Projects section to inspect each one.",
  roles: "He is targeting Software Engineer, Full-Stack Engineer, Infrastructure Engineer, Application Security Engineer, Security Engineer, and related systems roles. He is open to DC/Northern Virginia opportunities and U.S. remote roles.",
  experience: "Yeabsira has 5+ years of software experience, including freelance work and several years at MMCY. At MMCY he progressed from developer into client-facing leadership, delivered 200+ enterprise event builds, supported production systems, integrations, analytics, and troubleshooting, and worked with enterprise clients including BCD, YPO, Abbott, and CDW.",
  education: "Yeabsira earned a B.S. in Computer Science and is completing an M.S. in Cybersecurity in Computer Science at The George Washington University, with work spanning network security, secure systems, information policy, infrastructure, and software security.",
  hobbies: "Outside of engineering, Yeabsira enjoys football, hiking, reading, exercising, video games, and of course building software. He likes activities that mix curiosity, problem solving, and staying active.",
  authorization: "Yeabsira is authorized to work in the U.S. without employer sponsorship and does not require sponsorship now or later.",
  contact: "The Contact section has direct links to Yeabsira’s email, LinkedIn, GitHub, and printable resume.",
  resume: "You can open Yeabsira’s printable resume from the Resume link on the Home or Contact section.",
};

const getReply = (question) => {
  const text = question.trim().toLowerCase();
  if (!text) return "Ask me anything about Yeabsira’s work, projects, background, or interests.";
  if (/^(hi|hello|hey|yo|good morning|good afternoon|good evening)\b/.test(text) || /how are you|what can you do/.test(text)) return answers.greeting;
  if (/hobb|outside|free time|fun|football|soccer|hiking|reading|exercise|gaming|video game/.test(text)) return answers.hobbies;
  if (/sponsor|authorization|authorized|work permit|work status/.test(text)) return answers.authorization;
  if (/contact|email|linkedin|github|reach/.test(text)) return answers.contact;
  if (/resume|cv/.test(text)) return answers.resume;
  if (/special|skill|stack|technology|technologies|strong|language|framework/.test(text)) return answers.specialties;
  if (/current|now|school|gwu|degree|study|studying|course/.test(text)) return answers.current;
  if (/project|build|recent|portfolio/.test(text)) return answers.projects;
  if (/role|job|looking|target|career|relocat|location/.test(text)) return answers.roles;
  if (/experience|mmcy|work history|years|background|client/.test(text)) return answers.experience;
  if (/education|college|university|master|bachelor/.test(text)) return answers.education;
  return "I can help with Yeabsira’s specialties, projects, experience, education, job interests, work authorization, hobbies, resume, or contact information. Try one of the suggested questions below.";
};

const RobotMark = ({ reduceMotion, controls }) => (
  <motion.div animate={controls} className="relative mx-auto h-[70px] w-[58px] transform-gpu">
    <motion.div animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} className="absolute left-1/2 top-0 h-[31px] w-[48px] -translate-x-1/2 rounded-[46%] border border-white/80 bg-[linear-gradient(145deg,#ffffff_0%,#dce8eb_52%,#aebcc3_100%)] shadow-[0_8px_18px_rgba(0,0,0,.24)]">
      <div className="absolute inset-x-[7px] top-[7px] h-[17px] rounded-full border border-[#73e9df]/15 bg-[radial-gradient(circle_at_50%_30%,#12303a,#061219_68%,#02080c)]">
        <span className="absolute left-[8px] top-[5px] h-[6px] w-[9px] rounded-full bg-[#45e5e6] shadow-[0_0_8px_rgba(69,229,230,.9)]" />
        <span className="absolute right-[8px] top-[5px] h-[6px] w-[9px] rounded-full bg-[#45e5e6] shadow-[0_0_8px_rgba(69,229,230,.9)]" />
      </div>
    </motion.div>
    <div className="absolute left-1/2 top-[29px] h-[27px] w-[33px] -translate-x-1/2 rounded-[42%_42%_48%_48%] border border-white/70 bg-[linear-gradient(145deg,#ffffff,#d5e0e4_58%,#abb9bf)] shadow-[0_8px_16px_rgba(0,0,0,.18)]" />
    <div className="absolute left-[3px] top-[34px] h-[24px] w-[8px] rotate-[8deg] rounded-full bg-[linear-gradient(#f8fbfc,#bac7cc)]" />
    <div className="absolute right-[3px] top-[34px] h-[24px] w-[8px] -rotate-[8deg] rounded-full bg-[linear-gradient(#f8fbfc,#bac7cc)]" />
    <div className="absolute bottom-[7px] left-1/2 h-[8px] w-[47px] -translate-x-1/2 rounded-[50%] border border-white/60 bg-[linear-gradient(#eef4f5,#aebdc2)]" />
    <div className="absolute bottom-[2px] left-1/2 h-[7px] w-[51px] -translate-x-1/2 rounded-[50%] bg-[#b9c6cb] shadow-[0_5px_12px_rgba(0,0,0,.34)]" />
    <div className="absolute bottom-0 left-1/2 h-[4px] w-[34px] -translate-x-1/2 rounded-[50%] bg-[#58e6d1]/20 blur-[2px]" />
  </motion.div>
);

const sceneHint = {
  intro: "Curious? Ask me anything.",
  story: "Want to know more about my journey?",
  projects: "Ask me about any project.",
  contact: "Want to talk? I can help.",
};

const PortfolioAssistant = ({ scene = "intro" }) => {
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const lastScrollY = useRef(0);
  const hintReadyAt = useRef(Date.now() + 1800);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [hintVisible, setHintVisible] = useState(true);
  const [mobileViewport, setMobileViewport] = useState({ active: false, height: 0, keyboardInset: 0 });
  const [messages, setMessages] = useState([{ role: "assistant", text: answers.greeting }]);

  const visiblePrompts = useMemo(() => quickPrompts, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    const syncViewport = () => {
      const mobile = window.innerWidth < 640;
      const height = viewport?.height || window.innerHeight;
      const keyboardInset = mobile && viewport ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) : 0;
      setMobileViewport({ active: mobile, height, keyboardInset });
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    viewport?.addEventListener("resize", syncViewport);
    viewport?.addEventListener("scroll", syncViewport);
    return () => {
      window.removeEventListener("resize", syncViewport);
      viewport?.removeEventListener("resize", syncViewport);
      viewport?.removeEventListener("scroll", syncViewport);
    };
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    hintReadyAt.current = Date.now() + 1800;
    setHintVisible(true);

    const handleScroll = () => {
      if (!mobileViewport.active || open || Date.now() < hintReadyAt.current) return;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastScrollY.current;
      if (y < 36) setHintVisible(true);
      else if (delta > 12) setHintVisible(false);
      else if (delta < -9) setHintVisible(true);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileViewport.active, open, scene]);

  useEffect(() => {
    if (!open) return undefined;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), reduceMotion ? 0 : 220);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.setTimeout(() => launcherRef.current?.focus(), 0);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, reduceMotion]);

  useEffect(() => {
    if (!open || !mobileViewport.active) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, mobileViewport.active]);

  const excitedJump = () => {
    if (reduceMotion) return;
    controls.start({ y: [0, -10, 0, -4, 0], rotate: [0, -2, 2, -0.7, 0], transition: { duration: 0.66, ease: [0.16, 1, 0.3, 1] } });
  };

  const openChat = () => {
    setOpen(true);
    setHintVisible(false);
    excitedJump();
  };

  const closeChat = () => {
    setOpen(false);
    hintReadyAt.current = Date.now() + 900;
    setHintVisible(true);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  };

  const ask = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setMessages((items) => [...items, { role: "user", text: trimmed }, { role: "assistant", text: getReply(trimmed) }]);
    setInput("");
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ask(input);
  };

  const mobileChatStyle = mobileViewport.active
    ? { bottom: `${Math.max(10, mobileViewport.keyboardInset + 8)}px`, maxHeight: `${Math.max(280, mobileViewport.height - 20)}px` }
    : undefined;

  return (
    <div className="pointer-events-none fixed inset-0 z-[11000]" data-portfolio-assistant="true" data-scene={scene}>
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-labelledby="portfolio-assistant-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.992 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={mobileChatStyle}
            className="pointer-events-auto fixed inset-x-2 z-[11100] flex max-h-[calc(100dvh-20px)] flex-col overflow-hidden rounded-[1.45rem] border border-[#7cebdd]/22 bg-[#03131a]/98 shadow-[0_28px_90px_rgba(0,5,11,.68),0_0_40px_rgba(88,230,209,.07)] backdrop-blur-2xl sm:absolute sm:inset-x-auto sm:bottom-[118px] sm:right-5 sm:max-h-[min(70vh,620px)] sm:w-[390px]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#7cebdd]/12 px-4 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#7cebdd]/18 bg-[#7cebdd]/[.05]"><div className="flex gap-1"><span className="h-1.5 w-2 rounded-full bg-[#58e6d1] shadow-[0_0_7px_rgba(88,230,209,.8)]" /><span className="h-1.5 w-2 rounded-full bg-[#58e6d1] shadow-[0_0_7px_rgba(88,230,209,.8)]" /></div></div>
                <div className="min-w-0"><p id="portfolio-assistant-title" className="truncate text-sm font-semibold text-[#effffc]">Ask about Yeabsira</p><p className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-[.14em] text-[#9fe8df]/62">portfolio assistant · online</p></div>
              </div>
              <button type="button" onClick={closeChat} className="grid h-11 w-11 shrink-0 touch-manipulation place-items-center rounded-full text-[#d4ebe7]/70 transition duration-300 hover:bg-[#7cebdd]/[.07] hover:text-white" aria-label="Close portfolio assistant"><FaTimes className="text-xs" /></button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 scroll-smooth" aria-live="polite">
              {messages.map((message, index) => (
                <motion.div key={`${message.role}-${index}`} initial={reduceMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 ${message.role === "user" ? "rounded-br-md bg-[#dffffb] text-[#03131a]" : "rounded-bl-md border border-[#7cebdd]/12 bg-[#7cebdd]/[.04] text-[#e0f1ee]/82"}`}>{message.text}</div>
                </motion.div>
              ))}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {visiblePrompts.map((prompt) => <button key={prompt} type="button" onClick={() => ask(prompt)} className="min-h-[38px] touch-manipulation rounded-full border border-[#7cebdd]/12 bg-[#7cebdd]/[.03] px-3 py-2 text-[11px] font-medium text-[#d6ebe8]/72 transition duration-300 hover:border-[#7cebdd]/28 hover:bg-[#7cebdd]/[.06] hover:text-white">{prompt}</button>)}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="shrink-0 border-t border-[#7cebdd]/12 bg-[#03131a]/98 p-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:pb-3">
              <label htmlFor="portfolio-assistant-input" className="sr-only">Ask Yeabsira’s portfolio assistant a question</label>
              <div className="flex items-center gap-2 rounded-2xl border border-[#7cebdd]/18 bg-[#020b12]/70 p-1.5 pl-3 transition-colors duration-300 focus-within:border-[#7cebdd]/45">
                <input ref={inputRef} id="portfolio-assistant-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about projects, skills, experience…" autoComplete="off" className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-[16px] text-[#ecfbf9] outline-none placeholder:text-[#b4ccc8]/48 sm:py-2 sm:text-[13px]" />
                <button type="submit" className="grid h-10 w-10 shrink-0 touch-manipulation place-items-center rounded-xl bg-[#dffffb] text-[#03131a] transition duration-300 hover:bg-white" aria-label="Send message"><FaArrowUp className="text-[10px]" /></button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {!open && (
        <div data-portfolio-assistant-launcher="true" className="pointer-events-auto fixed bottom-[max(10px,env(safe-area-inset-bottom))] right-[max(8px,env(safe-area-inset-right))] z-[11200] sm:bottom-5 sm:right-5">
          <button ref={launcherRef} type="button" onClick={openChat} className="relative h-[116px] w-[92px] touch-manipulation select-none border-0 bg-transparent p-0 text-left" aria-label="Open portfolio assistant" aria-expanded="false">
            <AnimatePresence>
              {hintVisible && (
                <motion.div initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.9, filter: "blur(2px)" }} transition={{ duration: reduceMotion ? 0.08 : 0.55, ease: [0.16, 1, 0.3, 1] }} className="pointer-events-none absolute bottom-[96px] right-0 w-[154px] rounded-2xl border border-[#7cebdd]/20 bg-[#061720]/96 px-3 py-2.5 shadow-[0_14px_44px_rgba(0,5,11,.45)] backdrop-blur-xl">
                  <p className="text-[11px] font-semibold leading-4 text-[#effffc]">{sceneHint[scene] || sceneHint.intro}</p><span className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 border-b border-r border-[#7cebdd]/20 bg-[#061720]" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="pointer-events-none absolute bottom-0 right-0 grid h-[92px] w-[84px] place-items-center rounded-[1.35rem] border border-[#7cebdd]/16 bg-[#071720]/88 p-1 shadow-[0_18px_48px_rgba(0,5,11,.5),0_0_26px_rgba(88,230,209,.07)] backdrop-blur-xl"><RobotMark reduceMotion={reduceMotion} controls={controls} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#58e6d1] shadow-[0_0_9px_rgba(88,230,209,.85)]" /></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioAssistant;
