import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const isStoryTarget = (element) => element?.textContent?.includes("The person") && element?.textContent?.includes("Built and operated real client systems.");

export default function StoryExperience() {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    const sync = () => {
      const candidates = Array.from(document.querySelectorAll("main div"));
      const story = candidates.find((element) => isStoryTarget(element) && String(element.className).includes("overflow-y-auto"));
      setTarget(story || null);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  if (!target) return null;

  return createPortal(
    <section data-story-experience="true" className="mt-7 rounded-[1.45rem] border border-[#7CEBDD]/10 bg-[#7CEBDD]/[.025] p-5 backdrop-blur-xl">
      <div className="flex items-center gap-3"><span className="font-mono text-[8px] font-bold uppercase tracking-[.2em] text-[#58E6D1]">Experience</span><span className="h-px flex-1 bg-[#7CEBDD]/10" /></div>
      <h3 className="mt-3 text-xl font-semibold tracking-[-.03em] text-[#E8F7F5]/90">From building software to leading enterprise delivery.</h3>
      <p className="mt-2 text-sm leading-6 text-[#C5DFDC]/48">I have 5+ years of combined software development experience, including freelance work since 2019 and MMCY from February 2022 to August 2025.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-[#7CEBDD]/8 bg-[#020B12]/30 p-3"><p className="font-mono text-[8px] uppercase tracking-[.16em] text-[#7CB7FF]">MMCY · 2022–2025</p><p className="mt-1.5 text-xs leading-5 text-[#D7ECE9]/58">Progressed from developer into client-facing leadership, delivering 200+ enterprise event builds and supporting BCD, YPO, Abbott, and CDW.</p></div>
        <div className="rounded-xl border border-[#7CEBDD]/8 bg-[#020B12]/30 p-3"><p className="font-mono text-[8px] uppercase tracking-[.16em] text-[#E8BD73]">Leadership + Production</p><p className="mt-1.5 text-xs leading-5 text-[#D7ECE9]/58">Led four account managers, trained team members, supported live production, integrations, analytics, troubleshooting, and secure systems work.</p></div>
      </div>
    </section>,
    target
  );
}
