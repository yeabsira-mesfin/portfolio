import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUp, FaComments, FaTimes } from "react-icons/fa";

const prompts = ["Hi!", "What are Yeabsira's hobbies?", "Tell me about his experience", "What does he build?"];

const replies = {
  greeting: "Hi! 👋 I’m Yeabsira’s portfolio assistant. Nice to meet you. You can ask me about his experience, projects, skills, education, hobbies, or the kinds of roles he is interested in.",
  hobbies: "Outside work and school, Yeabsira enjoys coding, exercising, football, hiking, reading, and video games. He is especially an avid reader and enjoys literary fiction, science fiction, nonfiction, and discovering new books.",
  experience: "Yeabsira has 5+ years of combined software development experience, including freelance work since 2019 and MMCY from February 2022 to August 2025. At MMCY he progressed from developer into client-facing leadership, delivered 200+ enterprise event builds, led four account managers, trained team members, and supported clients including BCD, YPO, Abbott, and CDW.",
  projects: "His portfolio spans full-stack engineering, application security, infrastructure, cloud, and AI. Highlights include AppSec Vulnerability Manager, Windows Infrastructure Reliability Console, Secure Cloud Infrastructure as Code, TechBoard, Secure Login Analyzer, AI Security Testing Lab, and SignalDesk Endpoint Posture Advisor.",
  skills: "His core stack includes JavaScript, TypeScript, React, Next.js, Node.js, Express, Python, Java, SQL, MongoDB, Docker, Linux, REST APIs, JWT, RBAC, CI/CD, testing, debugging, and secure API design.",
  education: "Yeabsira is completing an M.S. in Cybersecurity in Computer Science at The George Washington University. He also holds a B.S. in Computer Science.",
  roles: "He is interested in software engineering, full-stack engineering, infrastructure, application security, security engineering, and related systems roles.",
};

function answer(question) {
  const q = question.trim().toLowerCase();
  if (!q) return "Ask me anything about Yeabsira.";
  if (/^(hi|hey|hello|hello there|good morning|good afternoon|good evening)[!. ]*$/.test(q) || /how are you|nice to meet/.test(q)) return replies.greeting;
  if (/hobb|fun|outside work|free time|read|football|soccer|hiking|game|exercise/.test(q)) return replies.hobbies;
  if (/experience|mmcy|work history|client|years|career/.test(q)) return replies.experience;
  if (/project|build|github|portfolio|appsec|cloud|techboard/.test(q)) return replies.projects;
  if (/skill|stack|technology|language|framework|python|react|node/.test(q)) return replies.skills;
  if (/education|school|gwu|master|degree|university|study/.test(q)) return replies.education;
  if (/role|job|position|looking for|career goal/.test(q)) return replies.roles;
  if (/thank/.test(q)) return "You’re welcome! I’m happy to help. You can keep asking me about Yeabsira’s work, projects, hobbies, or background.";
  if (/who are you|your name/.test(q)) return "I’m Yeabsira’s portfolio assistant. I’m here to help visitors quickly learn about his engineering work and the person behind it.";
  return "I can help with Yeabsira’s experience, projects, skills, education, hobbies, and target roles. You can also just say hi and chat with me.";
}

export default function EnhancedPortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hi! I’m Yeabsira’s portfolio assistant. Ask me anything about his work or interests." }]);
  const quick = useMemo(() => prompts, []);

  const ask = (value) => {
    const text = value.trim();
    if (!text) return;
    setMessages((items) => [...items, { role: "user", text }, { role: "assistant", text: answer(text) }]);
    setInput("");
    setOpen(true);
  };

  return (
    <div className="enhanced-assistant fixed bottom-4 right-4 z-[12000] sm:bottom-5 sm:right-5">
      <AnimatePresence>
        {open && (
          <motion.section initial={{ opacity: 0, y: 12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: .98 }} className="mb-3 flex h-[min(590px,72vh)] w-[min(390px,calc(100vw-24px))] flex-col overflow-hidden rounded-[1.5rem] border border-[#7cebdd]/20 bg-[#03131a]/[.98] shadow-[0_30px_100px_rgba(0,4,10,.72),0_0_45px_rgba(88,230,209,.08)] backdrop-blur-2xl">
            <header className="flex items-center justify-between border-b border-[#7cebdd]/10 px-4 py-3.5">
              <div><p className="text-sm font-semibold text-[#effffc]">Ask about Yeabsira</p><p className="mt-0.5 font-mono text-[8px] uppercase tracking-[.16em] text-[#7cebdd]/50">interactive assistant · online</p></div>
              <button onClick={() => setOpen(false)} aria-label="Close enhanced portfolio assistant" className="grid h-10 w-10 place-items-center rounded-full text-[#d7efec]/60 hover:bg-[#7cebdd]/10 hover:text-white"><FaTimes /></button>
            </header>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 ${message.role === "user" ? "rounded-br-md bg-[#dffffb] text-[#03131a]" : "rounded-bl-md border border-[#7cebdd]/10 bg-[#7cebdd]/[.04] text-[#d9eeeb]/80"}`}>{message.text}</div></div>)}
              <div className="flex flex-wrap gap-1.5 pt-1">{quick.map((prompt) => <button key={prompt} onClick={() => ask(prompt)} className="rounded-full border border-[#7cebdd]/12 px-2.5 py-1.5 text-[9px] text-[#cce8e4]/65 hover:border-[#7cebdd]/30 hover:text-white">{prompt}</button>)}</div>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); ask(input); }} className="flex gap-2 border-t border-[#7cebdd]/10 p-3">
              <input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Ask Yeabsira's portfolio assistant" placeholder="Ask a question or say hi..." className="min-w-0 flex-1 rounded-full border border-[#7cebdd]/12 bg-[#071c24] px-4 py-2.5 text-sm text-white outline-none placeholder:text-[#b9d9d5]/30 focus:border-[#7cebdd]/35" />
              <button aria-label="Send message" className="grid h-10 w-10 place-items-center rounded-full bg-[#dffffb] text-[#03131a]"><FaArrowUp /></button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((value) => !value)} aria-label="Open enhanced portfolio assistant" className="ml-auto grid h-14 w-14 place-items-center rounded-full border border-[#7cebdd]/25 bg-[#061a22]/95 text-[#65ead9] shadow-[0_12px_40px_rgba(0,0,0,.5),0_0_25px_rgba(88,230,209,.12)] transition hover:scale-105 hover:border-[#7cebdd]/50"><FaComments className="text-xl" /></button>
    </div>
  );
}
