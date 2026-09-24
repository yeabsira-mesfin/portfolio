import React, { useState } from "react";
import logo from "../images/Logo.jpg";

const links = [
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Services", "#services"],
  ["Skills", "#skills"],
  ["Hobbies", "#hobbies"],
  ["Updates", "#updates"],
  ["Contact", "#contact"],
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061b15]/86 text-white shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-8">
        <a href="#hero" className="group flex items-center gap-3">
          <img
            src={logo}
            alt="Yeabsira Mesfin logo"
            className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/15 transition group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-extrabold tracking-tight">Yeabsira Mesfin</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/65">
              Software • Infrastructure • Security
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white/72 transition hover:bg-white/7 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span className="text-xl">{isOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#061b15]/98 px-5 py-3 md:hidden">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
