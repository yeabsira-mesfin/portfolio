import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const isStoryTarget = (element) => element?.textContent?.includes("The person") && element?.textContent?.includes("Built and operated real client systems.");

const chapters = [
  { period: "2019 → PRESENT", title: "Full-stack foundation", text: "Built web and mobile applications across JavaScript, TypeScript, React, Next.js, Node.js, Express, Python, Java, SQL and MongoDB, with secure API design, testing, debugging and production support.", accent: "#58E6D1" },
  { period: "FEB 2022 → AUG 2025", title: "MMCY · Enterprise delivery", text: "Progressed from Cvent developer into client-facing leadership. Delivered 200+ end-to-end enterprise event builds and supported BCD, YPO, Abbott and CDW across custom development, integrations, analytics and live troubleshooting.", accent: "#7CB7FF" },
  { period: "LEADERSHIP", title: "Account management + team leadership", text: "Led four account managers, delivered recurring training to team members, coordinated production work and helped teams solve high-pressure client issues without losing sight of reliability or user experience.", accent: "#E8BD73" },
  { period: "SECURITY + SYSTEMS", title: "Engineering deeper into security", text: "Expanded into authentication, RBAC, secure APIs, Linux, Docker, CI/CD, network security and application security while completing an M.S. in Cybersecurity in Computer Science at George Washington University.", accent: "#B39BFF" },
];

export default function StoryExperience() {
  const [target, setTarget] = useState(null);
  useEffect(() => {
    const sync = () => setTarget(Array.from(document.querySelectorAll("main div")).find((element) => isStoryTarget(element) && String(element.className).includes("overflow-y-auto")) || null);
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  if (!target) return null;

  return createPortal(
    <section data-story-experience="true" className="relative mt-8 overflow-hidden rounded-[1.6rem] border border-[#7CEBDD]/10 bg-[#03131A]/72 p-5 shadow-[0_28px_80px_rgba(0,5,11,.24)] backdrop-blur-xl sm:p-6">
      <motion.div aria-hidden="true" className="absolute left-0 top-0 h-px bg-gradient-to-r from-transparent via-[#58E6D1] to-transparent" initial={{ width: "0%", opacity: 0 }} whileInView={{ width: "100%", opacity: .7 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
      <div className="flex items-center gap-3"><span className="font-mono text-[8px] font-bold uppercase tracking-[.22em] text-[#58E6D1]">Experience / Journey</span><span className="h-px flex-1 bg-[#7CEBDD]/10" /></div>
      <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight tracking-[-.04em] text-[#E8F7F5]/92">Five+ years of building, shipping, supporting and leading.</h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#C5DFDC]/48">My path has moved from hands-on software development into enterprise delivery, technical leadership and security-focused engineering.</p>
      <div className="relative mt-6 space-y-3 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-gradient-to-b before:from-[#58E6D1]/55 before:via-[#7CB7FF]/25 before:to-transparent">
        {chapters.map((chapter, index) => (
          <motion.article key={chapter.title} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .35 }} transition={{ delay: index * .08, duration: .7, ease: [0.16,1,.3,1] }} className="group relative pl-7">
            <motion.span aria-hidden="true" className="absolute left-0 top-5 h-[15px] w-[15px] rounded-full border bg-[#03131A]" style={{ borderColor: chapter.accent, boxShadow: `0 0 18px ${chapter.accent}35` }} whileInView={{ scale: [0.7,1.18,1] }} viewport={{ once: true }} />
            <div className="rounded-2xl border border-[#7CEBDD]/8 bg-[#020B12]/28 p-4 transition duration-500 group-hover:-translate-y-0.5 group-hover:border-[#7CEBDD]/18 group-hover:bg-[#7CEBDD]/[.035]">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[.17em]" style={{ color: chapter.accent }}>{chapter.period}</p>
              <h4 className="mt-1.5 text-base font-semibold text-[#E8F7F5]/88">{chapter.title}</h4>
              <p className="mt-2 text-xs leading-5 text-[#D7ECE9]/52 sm:text-sm sm:leading-6">{chapter.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[7px] uppercase tracking-[.15em] text-[#B9D9D5]/38"><span className="rounded-full border border-[#7CEBDD]/8 px-2.5 py-1.5">200+ enterprise builds</span><span className="rounded-full border border-[#7CEBDD]/8 px-2.5 py-1.5">4 account managers led</span><span className="rounded-full border border-[#7CEBDD]/8 px-2.5 py-1.5">Software · Systems · Security</span></div>
    </section>, target
  );
}
