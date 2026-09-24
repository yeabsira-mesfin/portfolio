import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const quickQuestions = [
  "What is Yeabsira good at?",
  "What kind of roles is he looking for?",
  "What security projects has he built?",
  "What is he studying now?",
];

const knowledge = [
  {
    keywords: ["good at", "strength", "strengths", "strong at", "best at", "specialize", "specialty"],
    answer:
      "Yeabsira is strongest where software, infrastructure, and security meet. He is good at full-stack development, API design, debugging, troubleshooting, Linux and networking fundamentals, authentication and access control, infrastructure reliability, technical delivery, and explaining technical work clearly.",
  },
  {
    keywords: ["role", "roles", "job", "jobs", "looking for", "career", "position", "opportunity"],
    answer:
      "Yeabsira is focused on software engineering, infrastructure engineering, security engineering, application security, and adjacent technical roles where coding, systems, and security overlap. He is especially interested in work where he can build, troubleshoot, automate, and improve reliable systems.",
  },
  {
    keywords: ["experience", "worked", "work", "background", "company", "client", "mmcy", "freelance", "freelancing"],
    answer:
      "Yeabsira has 5+ years of software development experience, beginning with freelance work in 2019 and later moving into enterprise technical delivery at MMCY. He has built and supported solutions for clients including BCD Travel, YPO, Abbott, and CDW, combining development, integrations, troubleshooting, production support, client delivery, and team leadership.",
  },
  {
    keywords: ["project", "projects", "built", "portfolio", "github"],
    answer:
      "His recent projects include a Windows Infrastructure Reliability Console, a high-availability hosting lab, secure AWS infrastructure as code, an infrastructure operations toolkit, and a Secure Login Analyzer. He has also built full-stack product applications and an AI Study Planner using Python, file parsing, and AI API integration.",
  },
  {
    keywords: ["security", "cyber", "cybersecurity", "soc", "secure", "authentication", "network security"],
    answer:
      "Yeabsira is completing an M.S. in Cybersecurity in Computer Science at George Washington University. His security work includes secure API design, JWT and RBAC, authentication analysis, Linux and networking labs, infrastructure hardening, integrity verification, traffic analysis, and security-focused graduate coursework and projects.",
  },
  {
    keywords: ["study", "studying", "education", "degree", "school", "university", "gwu", "master", "masters"],
    answer:
      "Yeabsira is an M.S. Cybersecurity in Computer Science candidate at The George Washington University, expected in 2027. He also holds a B.S. in Computer Science. His current learning connects cybersecurity with software engineering, infrastructure, networking, and secure systems.",
  },
  {
    keywords: ["skill", "skills", "technology", "stack", "language", "languages", "react", "python", "javascript"],
    answer:
      "His core stack includes JavaScript, TypeScript, React, Next.js, Node.js, Express.js, REST APIs, SQL, MySQL, MongoDB, Java, Python, C#, HTML, CSS, Git, Docker, Linux, CI/CD, testing, debugging, JWT, RBAC, and secure API design. He also works with infrastructure, networking, and reliability tooling in hands-on projects.",
  },
  {
    keywords: ["achievement", "impact", "result", "results", "metric", "performance"],
    answer:
      "Selected impact includes building 10+ full-stack applications, improving database performance by 40%, reducing release cycles by 30%, processing more than 5,000 attendee records with zero data loss, and supporting production work with no critical incidents over a two-year period.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "connect"],
    answer:
      "The easiest way to reach Yeabsira is through the Contact section on this site. You can also connect through LinkedIn, GitHub, X, or email using the links available throughout the portfolio.",
  },
  {
    keywords: ["current", "currently", "now", "working on", "focus"],
    answer:
      "Right now, Yeabsira is combining his software engineering background with deeper work in infrastructure reliability, automation, networking, cloud, and cybersecurity while completing his master's degree at GWU.",
  },
];

const findAnswer = (question) => {
  const normalized = question.toLowerCase().trim();

  if (!normalized) {
    return "Ask me about Yeabsira's experience, projects, skills, education, security work, or the roles he is targeting.";
  }

  const match = knowledge
    .map((entry) => ({
      ...entry,
      score: entry.keywords.reduce(
        (total, keyword) => total + (normalized.includes(keyword) ? keyword.length : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score)[0];

  if (match?.score > 0) return match.answer;

  return "I can help with Yeabsira's experience, strengths, projects, technical skills, cybersecurity work, education, current focus, and the kinds of roles he is looking for.";
};

const PortfolioBot = () => {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [visualViewport, setVisualViewport] = useState({
    height: typeof window !== "undefined" ? window.innerHeight : 700,
    offsetTop: 0,
    mobile: typeof window !== "undefined" ? window.innerWidth < 640 : false,
  });
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I am Yeabsira's portfolio assistant. Want to know more about him? Ask about his work, projects, skills, cybersecurity focus, or the roles he is looking for.",
    },
  ]);

  const scrollRef = useRef(null);
  const replyTimer = useRef(null);
  const suggestions = useMemo(() => quickQuestions.slice(0, 3), []);

  useEffect(() => {
    const viewport = window.visualViewport;

    const updateViewport = () => {
      setVisualViewport({
        height: viewport?.height || window.innerHeight,
        offsetTop: viewport?.offsetTop || 0,
        mobile: window.innerWidth < 640,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!open || !visualViewport.mobile) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, visualViewport.mobile]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, isTyping, reduceMotion]);

  useEffect(
    () => () => {
      if (replyTimer.current) window.clearTimeout(replyTimer.current);
    },
    [],
  );

  const submitQuestion = (question) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isTyping) return;

    const answer = findAnswer(cleanQuestion);
    setMessages((current) => [...current, { from: "user", text: cleanQuestion }]);
    setInput("");
    setIsTyping(true);

    replyTimer.current = window.setTimeout(() => {
      setMessages((current) => [...current, { from: "bot", text: answer }]);
      setIsTyping(false);
    }, reduceMotion ? 0 : 360);
  };

  const panelStyle = visualViewport.mobile
    ? (() => {
        const height = Math.max(280, Math.min(560, visualViewport.height - 16));
        const top = visualViewport.offsetTop + Math.max(8, visualViewport.height - height - 8);
        return { height: `${height}px`, top: `${top}px` };
      })()
    : undefined;

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[79] bg-black/35 backdrop-blur-[2px]"
              aria-label="Close portfolio assistant"
            />

            <motion.aside
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              style={panelStyle}
              className="fixed inset-x-3 z-[80] flex flex-col overflow-hidden rounded-[1.5rem] border border-emerald-200/15 bg-[#071f18] text-white shadow-[0_28px_90px_rgba(0,0,0,0.5)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-auto sm:max-h-[620px] sm:w-[390px]"
              aria-label="Yeabsira portfolio assistant"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#061b15] px-4 py-3.5 sm:px-5 sm:py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <motion.div
                    animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 rgba(110,231,183,0)", "0 0 24px rgba(110,231,183,.28)", "0 0 0 rgba(110,231,183,0)"] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-300 text-sm font-black text-[#061b15]"
                  >
                    YM
                  </motion.div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold">Ask about Yeabsira</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-200/55">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      Portfolio assistant
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-lg text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close portfolio assistant"
                >
                  ×
                </button>
              </div>

              <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3.5 py-4 sm:px-4">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.22 }}
                      className={"flex " + (message.from === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={
                          "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 " +
                          (message.from === "user"
                            ? "rounded-br-md bg-emerald-300 font-semibold text-[#061b15]"
                            : "rounded-bl-md border border-white/10 bg-white/[0.055] text-emerald-50/80")
                        }
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.055] px-4 py-3">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="h-1.5 w-1.5 rounded-full bg-emerald-300"
                            animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {messages.length === 1 && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 pt-1"
                  >
                    {suggestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => submitQuestion(question)}
                        className="w-full rounded-xl border border-emerald-200/10 bg-emerald-300/5 px-3 py-2.5 text-left text-xs font-semibold leading-5 text-emerald-100/75 transition hover:border-emerald-200/20 hover:bg-emerald-300/10 hover:text-white"
                      >
                        {question}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <form onSubmit={(event) => { event.preventDefault(); submitQuestion(input); }} className="shrink-0 border-t border-white/10 bg-[#061b15] p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        submitQuestion(input);
                      }
                    }}
                    rows="1"
                    enterKeyHint="send"
                    placeholder="Ask about Yeabsira..."
                    className="max-h-24 min-h-[44px] min-w-0 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-3 text-base text-white outline-none placeholder:text-white/30 focus:border-emerald-300/35 sm:text-sm"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-300 text-lg font-black text-[#061b15] transition enabled:hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send question"
                  >
                    ↑
                  </motion.button>
                </div>
                <p className="mt-2 px-1 text-[10px] leading-4 text-white/30">
                  Answers use verified information from Yeabsira's portfolio profile.
                </p>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-[70] flex items-center gap-3 rounded-full border border-emerald-100/15 bg-emerald-300 px-4 py-3 text-sm font-extrabold text-[#061b15] shadow-[0_16px_45px_rgba(0,0,0,0.28)] sm:right-6"
            aria-expanded="false"
            aria-label="Open Yeabsira portfolio assistant"
          >
            <motion.span
              animate={reduceMotion ? undefined : { rotate: [0, 3, -3, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5 }}
              className="grid h-7 w-7 place-items-center rounded-full bg-[#061b15] text-[10px] font-black text-emerald-200"
            >
              YM
            </motion.span>
            <span className="hidden sm:inline">Want to know more about me?</span>
            <span className="sm:hidden">Ask me</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioBot;
