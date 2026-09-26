import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { FaArrowUp, FaTimes } from "react-icons/fa";

const quickPrompts = [
  "What does Yeabsira specialize in?",
  "What is he working on now?",
  "Show me his recent projects",
  "What roles is he looking for?",
];

const answers = {
  specialties:
    "Yeabsira works where software, infrastructure, and security meet. His strongest lanes are full-stack software engineering, infrastructure and networking, application security, authentication, cloud systems, and reliability. He is especially comfortable with Python, JavaScript/TypeScript, React, Node.js, Linux, Docker, AWS, Terraform, and security-focused engineering.",
  current:
    "Right now, Yeabsira is completing his M.S. in Cybersecurity in Computer Science at The George Washington University while building deeper hands-on work in network security, infrastructure reliability, secure authentication, cloud security, and software engineering.",
  projects:
    "Recent work includes the Windows Infrastructure Reliability Console, Secure Cloud Infrastructure as Code, TechBoard, and Secure Login Analyzer. Together they show infrastructure monitoring and failover, AWS/Terraform security, full-stack RBAC workflows, and authentication-event detection.",
  roles:
    "He is targeting Software Engineer, Full-Stack Engineer, Infrastructure Engineer, Application Security Engineer, Security Engineer, and related systems roles. He is based in Bristow, Virginia and is open to relocation across the U.S.",
  experience:
    "Yeabsira has 5+ years of software experience, including freelance work starting in 2019 and several years at MMCY. At MMCY he grew from developer into client-facing leadership and delivered 200+ enterprise event builds while working across production troubleshooting, integrations, analytics, custom development, and security-oriented systems work.",
  education:
    "Yeabsira earned a B.S. in Computer Science and is now completing an M.S. in Cybersecurity in Computer Science at The George Washington University. His current focus includes network security, information policy, secure systems, infrastructure, and software security.",
};

const getReply = (question) => {
  const text = question.toLowerCase();

  if (/special|skill|stack|technology|technologies|strong/.test(text)) return answers.specialties;
  if (/current|now|school|gwu|degree|study|studying|course/.test(text)) return answers.current;
  if (/project|build|recent|portfolio|github/.test(text)) return answers.projects;
  if (/role|job|looking|target|career|relocat|location/.test(text)) return answers.roles;
  if (/experience|mmcy|work history|years|background/.test(text)) return answers.experience;
  if (/education|college|university|master|bachelor/.test(text)) return answers.education;

  return "I can help with Yeabsira's specialties, recent projects, current GWU work, experience, education, or the roles he is targeting. Try one of the suggested questions below.";
};

const RobotMark = ({ reduceMotion, controls }) => (
  <motion.div animate={controls} className="relative mx-auto h-[70px] w-[58px] transform-gpu">
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-[31px] w-[48px] -translate-x-1/2 rounded-[46%] border border-white/80 bg-[linear-gradient(145deg,#ffffff_0%,#dce8eb_52%,#aebcc3_100%)] shadow-[0_8px_18px_rgba(0,0,0,.24)]"
    >
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

const PortfolioAssistant = () => {
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const lastTouchActivation = useRef(0);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [mobileViewport, setMobileViewport] = useState({ active: false, height: 0, keyboardInset: 0 });
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m Yeabsira’s portfolio assistant. Ask me about his specialties, recent projects, current work, or the roles he is targeting.",
    },
  ]);

  const visiblePrompts = useMemo(() => quickPrompts.slice(0, 4), []);

  useEffect(() => {
    const viewport = window.visualViewport;

    const syncViewport = () => {
      const mobile = window.innerWidth < 640;
      const height = viewport?.height || window.innerHeight;
      const keyboardInset = mobile && viewport
        ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
        : 0;

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
    if (!open || !mobileViewport.active) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, mobileViewport.active]);

  const excitedJump = () => {
    if (reduceMotion) return;
    controls.start({
      y: [0, -10, 0, -4, 0],
      rotate: [0, -2, 2, -0.7, 0],
      transition: { duration: 0.66, ease: [0.16, 1, 0.3, 1] },
    });
  };

  const toggleChat = () => {
    setOpen((value) => {
      const next = !value;
      if (next) excitedJump();
      return next;
    });
  };

  const handlePointerUp = (event) => {
    if (event.pointerType === "mouse") return;
    lastTouchActivation.current = Date.now();
    event.preventDefault();
    toggleChat();
  };

  const handleClick = () => {
    if (Date.now() - lastTouchActivation.current < 650) return;
    toggleChat();
  };

  const ask = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((items) => [
      ...items,
      { role: "user", text: trimmed },
      { role: "assistant", text: getReply(trimmed) },
    ]);
    setInput("");
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ask(input);
  };

  const mobileChatStyle = mobileViewport.active
    ? {
        bottom: `${Math.max(12, mobileViewport.keyboardInset + 10)}px`,
        maxHeight: `${Math.max(260, mobileViewport.height - 24)}px`,
      }
    : undefined;

  return (
    <div className="pointer-events-none fixed inset-0 z-[11000]">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.992 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.994 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={mobileChatStyle}
            className="pointer-events-auto fixed inset-x-2 z-[11100] flex max-h-[calc(100dvh-24px)] flex-col overflow-hidden rounded-[1.45rem] border border-[#7cebdd]/18 bg-[#03131a]/98 shadow-[0_28px_90px_rgba(0,5,11,.68),0_0_40px_rgba(88,230,209,.07)] backdrop-blur-2xl sm:absolute sm:inset-x-auto sm:bottom-[126px] sm:right-5 sm:max-h-[min(70vh,620px)] sm:w-[380px]"
            aria-label="Chat with Yeabsira's portfolio assistant"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#7cebdd]/10 px-4 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#7cebdd]/15 bg-[#7cebdd]/[.045]">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-2 rounded-full bg-[#58e6d1] shadow-[0_0_7px_rgba(88,230,209,.8)]" />
                    <span className="h-1.5 w-2 rounded-full bg-[#58e6d1] shadow-[0_0_7px_rgba(88,230,209,.8)]" />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#effffc]">Ask about Yeabsira</p>
                  <p className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-[.16em] text-[#7cebdd]/45">portfolio assistant · online</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 shrink-0 touch-manipulation place-items-center rounded-full text-[#cce6e2]/55 transition duration-300 hover:bg-[#7cebdd]/[.06] hover:text-white"
                aria-label="Minimize chat"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 scroll-smooth">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 ${
                      message.role === "user"
                        ? "rounded-br-md bg-[#dffffb] text-[#03131a]"
                        : "rounded-bl-md border border-[#7cebdd]/10 bg-[#7cebdd]/[.035] text-[#d9eeeb]/78"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {visiblePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => ask(prompt)}
                    className="touch-manipulation rounded-full border border-[#7cebdd]/10 bg-[#7cebdd]/[.025] px-3 py-2 text-[11px] font-medium text-[#cce8e4]/58 transition duration-300 hover:border-[#7cebdd]/25 hover:bg-[#7cebdd]/[.05] hover:text-[#effffc] sm:px-2.5 sm:py-1.5 sm:text-[9px]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="shrink-0 border-t border-[#7cebdd]/10 bg-[#03131a]/98 p-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:pb-3">
              <div className="flex items-center gap-2 rounded-2xl border border-[#7cebdd]/14 bg-[#020b12]/70 p-1.5 pl-3 transition-colors duration-300 focus-within:border-[#7cebdd]/38">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about projects, skills, experience…"
                  className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-[16px] text-[#ecfbf9] outline-none placeholder:text-[#9ab7b3]/38 sm:py-2 sm:text-[13px]"
                />
                <button
                  type="submit"
                  className="grid h-10 w-10 shrink-0 touch-manipulation place-items-center rounded-xl bg-[#dffffb] text-[#03131a] transition duration-300 hover:bg-white"
                  aria-label="Send message"
                >
                  <FaArrowUp className="text-[10px]" />
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto fixed bottom-[max(8px,env(safe-area-inset-bottom))] right-[max(6px,env(safe-area-inset-right))] z-[11200] sm:bottom-5 sm:right-5">
        <motion.button
          type="button"
          onPointerUp={handlePointerUp}
          onClick={handleClick}
          whileTap={reduceMotion ? undefined : { scale: 0.975 }}
          className={`${open ? "w-[92px]" : "w-[232px]"} relative h-[112px] touch-manipulation select-none border-0 bg-transparent p-0 text-left transition-[width] duration-300`}
          style={{ WebkitTapHighlightColor: "transparent" }}
          aria-label={open ? "Minimize portfolio assistant" : "Open portfolio assistant"}
          aria-expanded={open}
        >
          <AnimatePresence>
            {!open && (
              <motion.div
                initial={{ opacity: 0, x: 5, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 4, scale: 0.98 }}
                transition={{ duration: reduceMotion ? 0.08 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute bottom-4 left-0 w-[154px] rounded-2xl border border-[#7cebdd]/16 bg-[#061720]/94 px-3 py-2.5 shadow-[0_14px_44px_rgba(0,5,11,.45)] backdrop-blur-xl"
              >
                <p className="text-[11px] font-semibold leading-4 text-[#effffc]">Touch anywhere to chat</p>
                <span className="absolute -right-1.5 bottom-5 h-3 w-3 rotate-45 border-r border-t border-[#7cebdd]/16 bg-[#061720]" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-0 right-0 grid h-[88px] w-[82px] place-items-center rounded-[1.35rem] border border-[#7cebdd]/14 bg-[#071720]/82 p-1 shadow-[0_18px_48px_rgba(0,5,11,.5),0_0_26px_rgba(88,230,209,.07)] backdrop-blur-xl">
            <RobotMark reduceMotion={reduceMotion} controls={controls} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#58e6d1] shadow-[0_0_9px_rgba(88,230,209,.85)]" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default PortfolioAssistant;
