import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowUp, FaTimes } from "react-icons/fa";

const prompts = ["Hi!", "What are his hobbies?", "Tell me about his experience", "What roles is he targeting?"];
const reply = (value) => {
  const q = value.trim().toLowerCase();
  if (/^(hi|hey|hello|good morning|good afternoon|good evening)[!. ]*$/.test(q) || /how are you|nice to meet/.test(q)) return "Hi! 👋 Nice to meet you. I’m Yeabsira’s portfolio assistant. Ask me about his experience, projects, skills, education, hobbies, or the roles he is targeting.";
  if (/hobb|free time|outside work|read|football|soccer|hiking|game|exercise/.test(q)) return "Outside engineering and school, Yeabsira enjoys reading, football, hiking, exercising, coding personal projects, and video games. He especially enjoys literary fiction, science fiction, nonfiction, and discovering new books.";
  if (/experience|mmcy|career|work history|years|client/.test(q)) return "Yeabsira has 5+ years of combined software development experience. At MMCY from February 2022 to August 2025, he progressed from developer into client-facing leadership, delivered 200+ enterprise event builds, led four account managers, trained team members, and supported clients including BCD, YPO, Abbott, and CDW.";
  if (/project|build|github|appsec|cloud|portfolio/.test(q)) return "His work spans full-stack engineering, infrastructure, application security, cloud, and AI. Highlights include AppSec Vulnerability Manager, Windows Infrastructure Reliability Console, Secure Cloud Infrastructure as Code, TechBoard, Secure Login Analyzer, and AI security projects.";
  if (/skill|stack|technology|python|react|node|language/.test(q)) return "His core stack includes JavaScript, TypeScript, React, Next.js, Node.js, Express, Python, Java, SQL, MongoDB, Docker, Linux, REST APIs, JWT, RBAC, CI/CD, testing, debugging, and secure API design.";
  if (/education|school|gwu|master|degree|university|study/.test(q)) return "Yeabsira is completing an M.S. in Cybersecurity in Computer Science at The George Washington University and holds a B.S. in Computer Science.";
  if (/role|job|position|target|looking/.test(q)) return "He is targeting software engineering, full-stack, infrastructure, application security, security engineering, and related systems roles.";
  if (/thank/.test(q)) return "You’re welcome! Ask me anything else about Yeabsira.";
  return "I can answer questions about Yeabsira’s experience, projects, skills, education, hobbies, and target roles. You can also just say hi.";
};

const Robot = ({ reduceMotion }) => (
  <motion.div animate={reduceMotion ? undefined : { y: [0,-3,0], rotate: [0,-1,1,0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} className="relative h-[62px] w-[52px]">
    <div className="absolute left-1/2 top-0 h-[29px] w-[46px] -translate-x-1/2 rounded-[46%] border border-white/80 bg-gradient-to-br from-white via-[#dce8eb] to-[#aebcc3] shadow-lg"><div className="absolute inset-x-[7px] top-[7px] h-[16px] rounded-full bg-[#061219]"><span className="absolute left-[7px] top-[5px] h-[6px] w-[9px] rounded-full bg-[#45e5e6] shadow-[0_0_8px_#45e5e6]"/><span className="absolute right-[7px] top-[5px] h-[6px] w-[9px] rounded-full bg-[#45e5e6] shadow-[0_0_8px_#45e5e6]"/></div></div>
    <div className="absolute left-1/2 top-[27px] h-[25px] w-[31px] -translate-x-1/2 rounded-[42%_42%_48%_48%] border border-white/70 bg-gradient-to-br from-white to-[#abb9bf]"/><div className="absolute bottom-[3px] left-1/2 h-[8px] w-[45px] -translate-x-1/2 rounded-[50%] bg-[#dce8eb] shadow-lg"/>
  </motion.div>
);

export default function PortfolioAssistant() {
  const reduceMotion = useReducedMotion();
  const [open,setOpen] = useState(false); const [input,setInput] = useState("");
  const [messages,setMessages] = useState([{role:"assistant",text:"Hi, I’m Yeabsira’s portfolio assistant. Ask me anything about his work or interests."}]);
  const quick = useMemo(()=>prompts,[]);
  const ask=(value)=>{const text=value.trim(); if(!text)return; setMessages(m=>[...m,{role:"user",text},{role:"assistant",text:reply(text)}]); setInput(""); setOpen(true);};
  return <div className="fixed bottom-4 right-4 z-[10000] sm:bottom-5 sm:right-5">
    <AnimatePresence>{open&&<motion.section aria-label="Chat with Yeabsira's portfolio assistant" initial={{opacity:0,y:12,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:.98}} className="mb-3 flex h-[min(540px,70vh)] w-[min(370px,calc(100vw-24px))] flex-col overflow-hidden rounded-[1.45rem] border border-[#7cebdd]/20 bg-[#03131a]/[.98] shadow-[0_28px_90px_rgba(0,4,10,.72)] backdrop-blur-2xl">
      <header className="flex items-center justify-between border-b border-[#7cebdd]/10 px-4 py-3"><div><p className="text-sm font-semibold text-[#effffc]">Ask about Yeabsira</p><p className="font-mono text-[7px] uppercase tracking-[.16em] text-[#7cebdd]/45">portfolio assistant · online</p></div><button onClick={()=>setOpen(false)} aria-label="Close portfolio assistant" className="grid h-9 w-9 place-items-center rounded-full text-[#d7efec]/60 hover:bg-[#7cebdd]/10"><FaTimes/></button></header>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">{messages.map((m,i)=><div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}><div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 ${m.role==="user"?"rounded-br-md bg-[#dffffb] text-[#03131a]":"rounded-bl-md border border-[#7cebdd]/10 bg-[#7cebdd]/[.04] text-[#d9eeeb]/80"}`}>{m.text}</div></div>)}<div className="flex flex-wrap gap-1.5">{quick.map(p=><button key={p} onClick={()=>ask(p)} className="rounded-full border border-[#7cebdd]/12 px-2.5 py-1.5 text-[9px] text-[#cce8e4]/65 hover:text-white">{p}</button>)}</div></div>
      <form onSubmit={e=>{e.preventDefault();ask(input)}} className="flex gap-2 border-t border-[#7cebdd]/10 p-3"><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask a question or say hi..." className="min-w-0 flex-1 rounded-full border border-[#7cebdd]/12 bg-[#071c24] px-4 py-2.5 text-sm text-white outline-none placeholder:text-[#b9d9d5]/30"/><button aria-label="Send message" className="grid h-10 w-10 place-items-center rounded-full bg-[#dffffb] text-[#03131a]"><FaArrowUp/></button></form>
    </motion.section>}</AnimatePresence>
    <button onClick={()=>setOpen(v=>!v)} aria-label={open?"Minimize portfolio assistant":"Open portfolio assistant"} className="ml-auto flex items-end gap-2 border-0 bg-transparent p-0"><motion.span animate={reduceMotion?undefined:{opacity:[.65,1,.65]}} transition={{duration:3,repeat:Infinity}} className="mb-2 hidden rounded-xl border border-[#7cebdd]/12 bg-[#071821]/90 px-3 py-2 text-[10px] font-semibold text-[#e8faf8]/75 shadow-xl sm:block">Ask me anything</motion.span><Robot reduceMotion={reduceMotion}/></button>
  </div>;
}
