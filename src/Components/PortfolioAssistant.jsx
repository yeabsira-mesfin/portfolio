import { useEffect, useMemo, useState } from "react";
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
      transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
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
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m Yeabsira’s portfolio assistant. Ask me about his specialties, recent projects, current work, or the roles he is targeting.",
    },
  ]);

  useEffect(() => {
    const updateLocation = () => {
      document.querySelectorAll("p").forEach((node) => {
        if (node.textContent?.trim() === "Bristow, Virginia") {
          node.textContent = "Bristow, Virginia · Open to relocation across the U.S.";
        }
      });
    };

    updateLocation();
    const observer = new MutationObserver(updateLocation);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const visiblePrompts = useMemo(() => quickPrompts.slice(0, 4), []);

  const excitedJump = () => {
    if (reduceMotion) return;
    controls.start({
      y: [0, -14, 0, -7, 0],
      rotate: [0, -3, 3, -1, 0],
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
    });
  };

  const toggleChat = () => {
    setOpen((value) => {
      const next = !value;
      if (next) excitedJump();
      return next;
    });
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

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.985, filter: "blur(4px)" }}
            transition={{ duration: reduceMotion ? 0.08 : 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute bottom-[108px] right-3 z-[100] flex max-h-[min(70vh,620px)] w-[min(380px,calc(100vw-24px))] flex-col overflow-hidden rounded-[1.6rem] border border-[#7cebdd]/16 bg-[#03131a]/95 shadow-[0_28px_90px_rgba(0,5,11,.62),0_0_40px_rgba(88,230,209,.06)] backdrop-blur-2xl sm:bottom-[116px] sm:right-5"
            aria-label="Chat with Yeabsira's portfolio assistant"
          >
            <div className="flex items-center justify-between border-b border-[#7cebdd]/10 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full border border-[#7cebdd]/15 bg-[#7cebdd]/[.045]">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-2 rounded-full bg-[#58e6d1] shadow-[0_0_7px_rgba(88,230,209,.8)]" />
                    <span className="h-1.5 w-2 rounded-full bg-[#58e6d1] shadow-[0_0_7px_rgba(88,230,209,.8)]" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#effffc]">Ask about Yeabsira</p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[.16em] text-[#7cebdd]/45">portfolio assistant · online</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full text-[#cce6e2]/45 transition hover:bg-[#7cebdd]/[.06] hover:text-white" aria-label="Minimize chat">
                <FaTimes className="text-xs" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-5 sm:text-[13px] ${message.role === "user" ? "rounded-br-md bg-[#dffffb] text-[#03131a]" : "rounded-bl-md border border-[#7cebdd]/10 bg-[#7cebdd]/[.035] text-[#d9eeeb]/78"}`}>
                    {message.text}
                  </div>
                </motion.div>
              ))}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {visiblePrompts.map((prompt) => (
                  <button key={prompt} type="button" onClick={() => ask(prompt)} className="rounded-full border border-[#7cebdd]/10 bg-[#7cebdd]/[.025] px-2.5 py-1.5 text-[9px] font-medium text-[#cce8e4]/55 transition hover:border-[#7cebdd]/25 hover:bg-[#7cebdd]/[.05] hover:text-[#effffc]">
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="border-t border-[#7cebdd]/10 p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-[#7cebdd]/11 bg-[#020b12]/55 p-1.5 pl-3 focus-within:border-[#7cebdd]/28">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about projects, skills, experience…"
                  className="min-w-0 flex-1 border-0 bg-transparent py-2 text-[12px] text-[#ecfbf9] outline-none placeholder:text-[#9ab7b3]/30"
                />
                <button type="submit" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#dffffb] text-[#03131a] transition hover:bg-white" aria-label="Send message">
                  <FaArrowUp className="text-[10px]" />
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto absolute bottom-3 right-3 z-[110] flex items-end gap-2 sm:bottom-5 sm:right-5">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, x: 6, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 5, scale: 0.97 }}
              className="mb-3 hidden max-w-[178px] rounded-2xl border border-[#7cebdd]/14 bg-[#061720]/88 px-3 py-2.5 shadow-[0_14px_44px_rgba(0,5,11,.4)] backdrop-blur-xl min-[390px]:block"
            >
              <p className="text-[10px] font-semibold leading-4 text-[#effffc]">Want to know more about me?</p>
              <p className="mt-1 font-mono text-[7px] uppercase tracking-[.15em] text-[#70e8d8]/50">tap the little assistant</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={toggleChat}
          whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className="relative z-[120] grid h-[74px] w-[68px] place-items-center rounded-[1.35rem] border border-[#7cebdd]/12 bg-[#071720]/72 p-1 shadow-[0_18px_48px_rgba(0,5,11,.46),0_0_26px_rgba(88,230,209,.06)] backdrop-blur-xl sm:h-[78px] sm:w-[72px]"
          aria-label={open ? "Minimize portfolio assistant" : "Open portfolio assistant"}
          aria-expanded={open}
        >
          <RobotMark reduceMotion={reduceMotion} controls={controls} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#58e6d1] shadow-[0_0_9px_rgba(88,230,209,.85)]" />
        </motion.button>
      </div>
    </div>
  );
};

export default PortfolioAssistant;
