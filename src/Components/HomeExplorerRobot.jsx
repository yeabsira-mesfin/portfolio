import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const isHomeSceneVisible = () => {
  const heading = document.querySelector("h1");
  return Boolean(heading && heading.textContent?.replace(/\s+/g, " ").includes("Yeabsira Mesfin"));
};

const HomeExplorerRobot = () => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const syncVisibility = () => setVisible(isHomeSceneVisible());
    syncVisibility();

    const root = document.getElementById("root");
    if (!root) return undefined;

    const observer = new MutationObserver(syncVisibility);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    window.addEventListener("resize", syncVisibility);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncVisibility);
    };
  }, []);

  const startJourney = () => {
    const enterButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim().startsWith("Enter my story")
    );
    enterButton?.click();
  };

  return (
    <>
      <style>{`button[aria-label="Open Yeabsira's story"] { display: none !important; }`}</style>
      <AnimatePresence>
        {visible && (
          <motion.button
            key="home-explorer-robot"
            type="button"
            aria-label="Explore Yeabsira Mesfin's portfolio"
            onClick={startJourney}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.9 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: [0, -12, 0, -3, 0],
                    rotate: [0, -1.5, 1.5, -0.6, 0],
                  }
            }
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.88 }}
            transition={
              reduceMotion
                ? { duration: 0.1 }
                : {
                    opacity: { duration: 0.32 },
                    scale: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 4.6, repeat: Infinity, repeatDelay: 1.5, ease: [0.22, 1, 0.36, 1] },
                    rotate: { duration: 4.6, repeat: Infinity, repeatDelay: 1.5, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            whileHover={reduceMotion ? undefined : { scale: 1.05, y: -8 }}
            whileTap={reduceMotion ? undefined : { y: -14, scale: 0.98 }}
            className="fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-[max(18px,env(safe-area-inset-right))] z-[10000] w-[72px] border-0 bg-transparent p-0 text-left sm:bottom-7 sm:right-7 sm:w-[80px]"
          >
            <motion.div
              className="absolute bottom-[92%] right-0 w-[132px] rounded-2xl border border-[#7CEBDD]/20 bg-[#061720]/95 px-3 py-2.5 shadow-[0_18px_60px_rgba(0,8,15,.5)] backdrop-blur-2xl sm:w-[148px]"
              animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-semibold leading-4 text-[#ECFFFC] sm:text-[11px]">Touch me to explore</p>
              <p className="mt-1 font-mono text-[7px] uppercase tracking-[.15em] text-[#6EE8D7]/60">start the journey</p>
              <span className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-[#7CEBDD]/20 bg-[#061720]" />
            </motion.div>

            <div className="relative mx-auto aspect-[.78/1] w-full">
              <motion.div
                animate={reduceMotion ? undefined : { scaleX: [1, 0.72, 1], opacity: [0.3, 0.16, 0.3] }}
                transition={{ duration: 4.6, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                className="absolute bottom-0 left-[15%] h-[9%] w-[70%] rounded-[50%] bg-black/55 blur-md"
              />

              <svg viewBox="0 0 160 205" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_16px_24px_rgba(0,0,0,.5)]" aria-hidden="true">
                <defs>
                  <linearGradient id="homeRobotShell" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#E5EFF1" />
                    <stop offset="78%" stopColor="#AFBDC2" />
                    <stop offset="100%" stopColor="#FAFDFD" />
                  </linearGradient>
                  <radialGradient id="homeRobotFace" cx="50%" cy="35%" r="75%">
                    <stop offset="0%" stopColor="#13313D" />
                    <stop offset="68%" stopColor="#06141B" />
                    <stop offset="100%" stopColor="#02080C" />
                  </radialGradient>
                  <filter id="homeEyeGlow" x="-120%" y="-120%" width="340%" height="340%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                <motion.g
                  animate={reduceMotion ? undefined : { rotate: [0, 2.4, -2.4, 0] }}
                  transition={{ duration: 4.6, repeat: Infinity, repeatDelay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "80px 62px" }}
                >
                  <ellipse cx="80" cy="53" rx="50" ry="43" fill="url(#homeRobotShell)" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="2" />
                  <rect x="42" y="27" width="76" height="50" rx="24" fill="url(#homeRobotFace)" stroke="#92EDE4" strokeOpacity="0.24" />
                  <ellipse cx="61" cy="50" rx="11" ry="7" fill="#42E8E7" filter="url(#homeEyeGlow)" />
                  <ellipse cx="99" cy="50" rx="11" ry="7" fill="#42E8E7" filter="url(#homeEyeGlow)" />
                  <ellipse cx="57" cy="47" rx="3" ry="2" fill="#DFFFFF" opacity="0.85" />
                  <ellipse cx="95" cy="47" rx="3" ry="2" fill="#DFFFFF" opacity="0.85" />
                </motion.g>

                <path d="M51 91 C54 78 106 78 109 91 L116 148 C117 165 103 178 80 178 C57 178 43 165 44 148 Z" fill="url(#homeRobotShell)" stroke="#FFFFFF" strokeOpacity="0.55" />
                <path d="M46 98 C35 105 32 121 34 151 C35 161 39 167 44 169 L52 110 Z" fill="url(#homeRobotShell)" opacity="0.94" />
                <path d="M114 98 C125 105 128 121 126 151 C125 161 121 167 116 169 L108 110 Z" fill="url(#homeRobotShell)" opacity="0.94" />
                <rect x="75" y="174" width="10" height="10" rx="4" fill="#92A1A7" />
                <ellipse cx="80" cy="187" rx="47" ry="11" fill="url(#homeRobotShell)" stroke="#DCE8EA" />
                <rect x="33" y="186" width="94" height="12" rx="6" fill="#C4D0D4" opacity="0.92" />
                <ellipse cx="80" cy="186" rx="42" ry="7" fill="#FBFEFE" />
                <ellipse cx="80" cy="191" rx="30" ry="4" fill="#64E8DC" opacity="0.14" />
              </svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeExplorerRobot;
