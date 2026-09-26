import React, { useEffect, useState } from "react";
import { FaArrowRight, FaLinkedinIn } from "react-icons/fa";

const links = [
  ["Story", "about"],
  ["Work", "projects"],
  ["Stack", "skills"],
  ["Signals", "updates"],
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = ["hero", ...links.map(([, id]) => id), "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="pointer-events-auto mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b0c0e]/85 px-3 py-2 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-4">
          <a href="#hero" className="group flex min-w-0 items-center gap-3" aria-label="Back to top">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#d9ff43] font-black tracking-[-0.05em] text-[#0b0c0e] transition-transform group-hover:-rotate-3 group-hover:scale-105">
              YM
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-black tracking-[-0.02em]">Yeabsira Mesfin</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Build / Operate / Secure
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`rounded-xl px-3.5 py-2 text-sm font-bold transition ${
                  active === id
                    ? "bg-white/10 text-[#d9ff43]"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.045] text-white/70 transition hover:border-[#d9ff43]/40 hover:text-[#d9ff43] sm:grid"
              aria-label="Yeabsira Mesfin on LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-xl bg-[#d9ff43] px-4 py-2.5 text-sm font-black text-[#0b0c0e] transition hover:-translate-y-0.5 hover:bg-[#e5ff7b] md:inline-flex"
            >
              Start a conversation <FaArrowRight className="text-xs" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.045] text-lg lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? "×" : "≡"}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c0e]/95 p-2 text-white shadow-2xl backdrop-blur-2xl lg:hidden">
            {links.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-white/70 hover:bg-white/5 hover:text-white"
              >
                {label} <span className="text-white/25">↘</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-1 flex items-center justify-between rounded-xl bg-[#d9ff43] px-4 py-3 text-sm font-black text-[#0b0c0e]"
            >
              Contact <FaArrowRight className="text-xs" />
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
