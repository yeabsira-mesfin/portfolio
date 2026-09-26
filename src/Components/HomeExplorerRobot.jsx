import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const getCurrentScene = () => {
  const navButtons = Array.from(document.querySelectorAll("header nav button"));
  const activeButton = navButtons.find((button) =>
    String(button.className).includes("bg-[#7CEBDD]/10")
  );
  const activeLabel = activeButton?.textContent?.trim().toLowerCase();

  if (activeLabel === "story") return "story";
  if (activeLabel === "projects") return "projects";
  if (activeLabel === "contact") return "contact";

  const heading = document.querySelector("h1");
  const normalizedHeading = heading?.textContent?.replace(/\s+/g, "");
  if (normalizedHeading?.includes("YeabsiraMesfin")) return "intro";

  const bodyText = document.body.textContent || "";
  if (bodyText.includes("Let’s build what comes next.") || bodyText.includes("Let's build what comes next.")) return "contact";
  if (bodyText.includes("Software engineer with systems instincts.")) return "story";
  if (bodyText.includes("Windows Infrastructure Reliability Console")) return "projects";

  return null;
};

const sceneCopy = {
  intro: {
    title: "Touch me to explore my journey",
    idle: "Bzzz... ready to explore?",
    aria: "Start Yeabsira Mesfin's portfolio journey",
  },
  story: {
    title: "Wanna see my projects?",
    idle: "Bzzz... my projects are waiting",
    aria: "Continue to Yeabsira Mesfin's projects",
  },
  projects: {
    title: "Contact me",
    idle: "Bzzz... want to build something together?",
    aria: "Continue to Yeabsira Mesfin's contact page",
  },
};

const findHeaderButton = (label) =>
  Array.from(document.querySelectorAll("header button")).find(
    (button) => button.textContent?.trim().toLowerCase() === label.toLowerCase()
  );

const HomeExplorerRobot = () => {
  const reduceMotion = useReducedMotion();
  const [scene, setScene] = useState(null);
  const [awake, setAwake] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimerRef = useRef(null);
  const navigateTimerRef = useRef(null);

  const resetIdleTimer = () => {
    window.clearTimeout(idleTimerRef.current);
    setIdle(false);
    idleTimerRef.current = window.setTimeout(() => setIdle(true), 60000);
  };

  useEffect(() => {
    const syncScene = () => setScene(getCurrentScene());
    syncScene();

    const root = document.getElementById("root");
    if (!root) return undefined;

    const observer = new MutationObserver(syncScene);
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("resize", syncScene);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncScene);
    };
  }, []);

  useEffect(() => {
    resetIdleTimer();
    return () => window.clearTimeout(idleTimerRef.current);
  }, [scene]);

  useEffect(
    () => () => {
      window.clearTimeout(idleTimerRef.current);
      window.clearTimeout(navigateTimerRef.current);
    },
    []
  );

  const navigateToNextScene = () => {
    let nextButton;

    if (scene === "intro") {
      nextButton = Array.from(document.querySelectorAll("button")).find(
        (button) => button.textContent?.trim().startsWith("Enter my story")
      );
    } else if (scene === "story") {
      nextButton = findHeaderButton("Projects");
    } else if (scene === "projects") {
      nextButton = findHeaderButton("Contact");
    }

    nextButton?.click();
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  const handleRobotActivate = () => {
    resetIdleTimer();

    if (!awake) {
      setAwake(true);
      window.clearTimeout(navigateTimerRef.current);
      navigateTimerRef.current = window.setTimeout(navigateToNextScene, 360);
      return;
    }

    navigateToNextScene();
  };

  const visible = Boolean(scene && scene !== "contact");
  const copy = scene ? sceneCopy[scene] : null;

  return (
    <>
      <style>{`
        button[aria-label="Open Yeabsira's story"] { display: none !important; }
        html { scroll-behavior: smooth; }
        [data-journey-robot="true"] {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {visible && copy && (
          <motion.button
            key={`journey-robot-${scene}`}
            data-journey-robot="true"
            type="button"
            aria-label={copy.aria}
            onClick={handleRobotActivate}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.94 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: [0, -5, 0, -1, 0],
                    rotate: [0, -0.6, 0.6, -0.2, 0],
                  }
            }
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 7, scale: 0.95 }}
            transition={
              reduceMotion
                ? { duration: 0.08 }
                : {
                    opacity: { duration: 0.24 },
                    scale: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 5.6, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut" },
                    rotate: { duration: 5.6, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut" },
                  }
            }
            whileHover={reduceMotion ? undefined : { scale: 1.025, y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="fixed bottom-[max(10px,env(safe-area-inset-bottom))] right-[max(8px,env(safe-area-inset-right))] z-[10000] h-[188px] w-[188px] select-none border-0 bg-transparent p-0 text-left sm:bottom-5 sm:right-5 sm:h-[205px] sm:w-[205px]"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <motion.div
              className="absolute right-0 top-0 w-[172px] rounded-2xl border border-[#7CEBDD]/22 bg-[#061720]/96 px-3.5 py-3 shadow-[0_18px_60px_rgba(0,8,15,.5)] backdrop-blur-2xl sm:w-[188px]"
              animate={
                reduceMotion
                  ? undefined
                  : idle
                    ? { y: [0, -3, 0], scale: [1, 1.018, 1] }
                    : { y: [0, -1.5, 0] }
              }
              transition={{ duration: idle ? 1.7 : 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[11px] font-semibold leading-4 text-[#ECFFFC] sm:text-[12px]">
                {idle ? copy.idle : copy.title}
              </p>
              <span className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 border-b border-r border-[#7CEBDD]/22 bg-[#061720]" />
            </motion.div>

            <div className="absolute bottom-0 right-0 h-[112px] w-[88px] sm:h-[124px] sm:w-[96px]">
              <motion.div
                animate={reduceMotion ? undefined : { scaleX: [1, 0.8, 1], opacity: [0.28, 0.17, 0.28] }}
                transition={{ duration: 5.6, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut" }}
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
                  animate={reduceMotion ? undefined : { rotate: [0, 1.4, -1.4, 0] }}
                  transition={{ duration: 5.6, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut" }}
                  style={{ transformOrigin: "80px 62px" }}
                >
                  <ellipse cx="80" cy="53" rx="50" ry="43" fill="url(#homeRobotShell)" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="2" />
                  <rect x="42" y="27" width="76" height="50" rx="24" fill="url(#homeRobotFace)" stroke="#92EDE4" strokeOpacity="0.24" />

                  <AnimatePresence initial={false}>
                    {awake ? (
                      <motion.g
                        key="awake-eyes"
                        initial={{ opacity: 0, scaleY: 0.12 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: "80px 50px" }}
                      >
                        <ellipse cx="61" cy="50" rx="11" ry="7" fill="#42E8E7" filter="url(#homeEyeGlow)" />
                        <ellipse cx="99" cy="50" rx="11" ry="7" fill="#42E8E7" filter="url(#homeEyeGlow)" />
                        <ellipse cx="57" cy="47" rx="3" ry="2" fill="#DFFFFF" opacity="0.85" />
                        <ellipse cx="95" cy="47" rx="3" ry="2" fill="#DFFFFF" opacity="0.85" />
                      </motion.g>
                    ) : (
                      <motion.g key="sleeping-eyes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <path d="M50 51 Q61 58 72 51" fill="none" stroke="#59E4E1" strokeWidth="4" strokeLinecap="round" filter="url(#homeEyeGlow)" />
                        <path d="M88 51 Q99 58 110 51" fill="none" stroke="#59E4E1" strokeWidth="4" strokeLinecap="round" filter="url(#homeEyeGlow)" />
                      </motion.g>
                    )}
                  </AnimatePresence>
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