import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

const quickQuestions = [
  "What kind of roles is Yeabsira looking for?",
  "What has Yeabsira worked on?",
  "What security projects has he built?",
  "What is he studying now?",
];

const knowledge = [
  {
    keywords: ["role", "roles", "job", "jobs", "looking for", "career", "position", "opportunity"],
    answer:
      "Yeabsira is focused on software engineering, infrastructure engineering, security engineering, application security, and adjacent technical roles where coding, systems, and security overlap. He is especially interested in work where he can build, troubleshoot, automate, and improve reliable systems.",
  },
  {
    keywords: ["experience", "worked", "work", "background", "company", "client", "mmcy"],
    answer:
      "Yeabsira has 3+ years of professional software and technical delivery experience. At MMCY, he built and supported event technology solutions for enterprise clients including BCD Travel, YPO, Abbott, and CDW. His work combined full-stack development, integrations, troubleshooting, production support, client delivery, and team leadership.",
  },
  {
    keywords: ["project", "projects", "built", "portfolio", "github"],
    answer:
      "His recent projects include a Windows Infrastructure Reliability Console, a high-availability hosting lab, secure AWS infrastructure as code, an infrastructure operations toolkit, and a Secure Login Analyzer. He has also built full-stack product applications and an AI Study Planner using Python, file parsing, and AI API integration. You can explore the project cards on this site or open his GitHub from the header.",
  },
  {
    keywords: ["security", "cyber", "cybersecurity", "soc", "secure", "authentication"],
    answer:
      "Yeabsira is completing an M.S. in Cybersecurity in Computer Science at George Washington University. His security work includes secure API design, JWT and RBAC, authentication analysis, Linux and networking labs, infrastructure hardening, integrity verification, and security-focused coursework and projects.",
  },
  {
    keywords: ["study", "studying", "education", "degree", "school", "university", "gwu", "master", "masters"],
    answer:
      "Yeabsira is an M.S. Cybersecurity in Computer Science candidate at The George Washington University, expected in 2027. He also holds a B.S. in Computer Science. His current learning connects cybersecurity with software engineering, infrastructure, networking, and secure systems.",
  },
  {
    keywords: ["skill", "skills", "technology", "stack", "language", "languages", "react", "python", "javascript"],
    answer:
      "His core stack includes JavaScript, TypeScript, React, Next.js, Node.js, Express.js, REST APIs, SQL, MySQL, MongoDB, Java, Python, C#, HTML, CSS, Git, Docker, Linux, CI/CD, testing, debugging, JWT, RBAC, and secure API design. He also works with infrastructure and reliability tooling in hands-on projects.",
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

  return "I can help with Yeabsira's experience, projects, technical skills, cybersecurity work, education, current focus, and the kinds of roles he is looking for. Try asking one of those topics.";
};

const PortfolioBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I am Yeabsira's portfolio assistant. Want to know more about him? Ask about his work, projects, skills, cybersecurity focus, or the roles he is looking for.",
    },
  ]);

  const suggestions = useMemo(() => quickQuestions.slice(0, 3), []);

  const submitQuestion = (question) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    setMessages((current) => [
      ...current,
      { from: "user", text: cleanQuestion },
      { from: "bot", text: findAnswer(cleanQuestion) },
    ]);
    setInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitQuestion(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-[70] flex max-h-[min(620px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#071f18] text-white shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:right-6"
            aria-label="Yeabsira portfolio assistant"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-[#061b15] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-300 text-sm font-black text-[#061b15]">
                  YM
                </div>
                <div>
                  <p className="text-sm font-extrabold">Ask about Yeabsira</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-emerald-200/55">
                    Portfolio assistant
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-lg text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close portfolio assistant"
              >
                ×
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    "flex " + (message.from === "user" ? "justify-end" : "justify-start")
                  }
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
                </div>
              ))}

              {messages.length === 1 && (
                <div className="space-y-2 pt-1">
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
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/10 bg-[#061b15] p-3">
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
                  placeholder="Ask about Yeabsira..."
                  className="max-h-24 min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-emerald-300/35"
                />
                <button
                  type="submit"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-300 text-lg font-black text-[#061b15] transition hover:bg-emerald-200"
                  aria-label="Send question"
                >
                  ↑
                </button>
              </div>
              <p className="mt-2 px-1 text-[10px] leading-4 text-white/30">
                Answers are limited to information presented in Yeabsira's portfolio profile.
              </p>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-4 z-[70] flex items-center gap-3 rounded-full border border-emerald-100/15 bg-emerald-300 px-4 py-3 text-sm font-extrabold text-[#061b15] shadow-[0_16px_45px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:bg-emerald-200 sm:right-6"
        aria-expanded={open}
        aria-label="Open Yeabsira portfolio assistant"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#061b15] text-[10px] font-black text-emerald-200">
          YM
        </span>
        <span className="hidden sm:inline">{open ? "Close" : "Want to know more about me?"}</span>
        <span className="sm:hidden">{open ? "Close" : "Ask me"}</span>
      </button>
    </>
  );
};

export default PortfolioBot;
