import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const getActiveNavScene = () => {
  const activeNav = Array.from(document.querySelectorAll("header nav button")).find((button) =>
    String(button.className).includes("bg-[#7CEBDD]/10")
  );

  const label = activeNav?.textContent?.trim().toLowerCase();
  if (label === "story" || label === "projects" || label === "contact") return label;
  return null;
};

const getCurrentScene = () => {
  // The highlighted navigation item is the source of truth. This prevents old
  // transition content from making the robot think it is still on another page.
  const navScene = getActiveNavScene();
  if (navScene) return navScene;

  const heading = document.querySelector("h1");
  const normalizedHeading = heading?.textContent?.replace(/\s+/g, "");
  if (normalizedHeading?.includes("YeabsiraMesfin")) return "intro";

  // Fallbacks only for the short moment before the nav highlight updates.
  const bodyText = document.body?.innerText || "";
  if (
    bodyText.includes("03 / Contact") ||
    bodyText.includes("Let’s build what comes next.") ||
    bodyText.includes("Let's build what comes next.") ||
    document.querySelector('[aria-label="Open portfolio assistant"]') ||
    document.querySelector('[aria-label="Minimize portfolio assistant"]')
  ) {
    return "contact";
  }

  if (
    bodyText.includes("02 / Project orbit") ||
    bodyText.includes("Choose a project. The mechanism responds")
  ) {
    return "projects";
  }

  if (
    bodyText.includes("Software engineer with systems instincts.") ||
    bodyText.includes("Going deeper into cybersecurity.") ||
    bodyText.includes("Built and operated real client systems.")
  ) {
    return "story";
  }

  return null;
};

const sceneCopy = {
  intro: {
    title: "Click to explore more",
    idle: "Bzzz... your journey is waiting.",
    aria: "Explore more of Yeabsira Mesfin's journey",
  },
  story: {
    title: "Wanna see my projects?",
    idle: "Bzzz... wanna see what I built?",
    aria: "Continue to Yeabsira Mesfin's projects",
  },
  projects: {
    title: "Contact me",
    idle: "Bzzz... let's build something together.",
    aria: "Continue to Yeabsira Mesfin's contact page",
  },
};

const findButton = (matcher) =>
  Array.from(document.querySelectorAll("button")).find((button) => matcher(button.textContent?.trim() || ""));

const JourneyRobot = ({ awake, reduceMotion }) => (
  <div className="pointer-events-none absolute bottom-0 right-0 h-[118px] w-[96px] sm:h-[128px] sm:w-[104px]">
    <motion.div
      animate={reduceMotion ? undefined : { scaleX: [1, 0.8, 1], opacity: [0.3, 0.17, 0.3] }}
      transition={{ duration: 5.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      className="absolute bottom-0 left-[14%] h-[9%] w-[72%] rounded-[50%] bg-black/55 blur-md"
    />

    <svg viewBox="0 0 160 205" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_16px_24px_rgba(0,0,0,.5)]" aria-hidden="true">
      <defs>
        <linearGradient id="journeyRobotShell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#E5EFF1" />
          <stop offset="78%" stopColor="#AFBDC2" />
          <stop offset="100%" stopColor="#FAFDFD" />
        </linearGradient>
        <radialGradient id="journeyRobotFace" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#13313D" />
          <stop offset="68%" stopColor="#06141B" />
          <stop offset="100%" stopColor="#02080C" />
        </radialGradient>
        <filter id="journeyEyeGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <motion.g
        animate={reduceMotion ? undefined : { rotate: [0, 1.3, -1.3, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        style={{ transformOrigin: "80px 62px" }}
      >
        <ellipse cx="80" cy="53" rx="50" ry="43" fill="url(#journeyRobotShell)" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="2" />
        <rect x="42" y="27" width="76" height="50" rx="24" fill="url(#journeyRobotFace)" stroke="#92EDE4" strokeOpacity="0.24" />

        {awake ? (
          <motion.g
            initial={{ opacity: 0, scaleY: 0.1 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "80px 50px" }}
          >
            <ellipse cx="61" cy="50" rx="11" ry="7" fill="#42E8E7" filter="url(#journeyEyeGlow)" />
            <ellipse cx="99" cy="50" rx="11" ry="7" fill="#42E8E7" filter="url(#journeyEyeGlow)" />
            <ellipse cx="57" cy="47" rx="3" ry="2" fill="#DFFFFF" opacity="0.85" />
            <ellipse cx="95" cy="47" rx="3" ry="2" fill="#DFFFFF" opacity="0.85" />
          </motion.g>
        ) : (
          <g>
            <path d="M50 51 Q61 58 72 51" fill="none" stroke="#59E4E1" strokeWidth="4" strokeLinecap="round" filter="url(#journeyEyeGlow)" />
            <path d="M88 51 Q99 58 110 51" fill="none" stroke="#59E4E1" strokeWidth="4" strokeLinecap="round" filter="url(#journeyEyeGlow)" />
          </g>
        )}
      </motion.g>

      <path d="M51 91 C54 78 106 78 109 91 L116 148 C117 165 103 178 80 178 C57 178 43 165 44 148 Z" fill="url(#journeyRobotShell)" stroke="#FFFFFF" strokeOpacity="0.55" />
      <path d="M46 98 C35 105 32 121 34 151 C35 161 39 167 44 169 L52 110 Z" fill="url(#journeyRobotShell)" opacity="0.94" />
      <path d="M114 98 C125 105 128 121 126 151 C125 161 121 167 116 169 L108 110 Z" fill="url(#journeyRobotShell)" opacity="0.94" />
      <rect x="75" y="174" width="10" height="10" rx="4" fill="#92A1A7" />
      <ellipse cx="80" cy="187" rx="47" ry="11" fill="url(#journeyRobotShell)" stroke="#DCE8EA" />
      <rect x="33" y="186" width="94" height="12" rx="6" fill="#C4D0D4" opacity="0.92" />
      <ellipse cx="80" cy="186" rx="42" ry="7" fill="#FBFEFE" />
      <ellipse cx="80" cy="191" rx="30" ry="4" fill="#64E8DC" opacity="0.14" />
    </svg>
  </div>
);

const HomeExplorerRobot = () => {
  const reduceMotion = useReducedMotion();
  const [scene, setScene] = useState(() => (typeof document === "undefined" ? null : getCurrentScene()));
  const [awake, setAwake] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef(null);
  const navigateTimer = useRef(null);

  const armIdleMessage = useCallback(() => {
    window.clearTimeout(idleTimer.current);
    setIdle(false);
    idleTimer.current = window.setTimeout(() => setIdle(true), 60000);
  }, []);

  useEffect(() => {
    const sync = () => setScene(getCurrentScene());

    const handleNavIntent = (event) => {
      const button = event.target instanceof Element ? event.target.closest("header nav button") : null;
      if (!button) return;

      const label = button.textContent?.trim().toLowerCase();
      if (label === "story" || label === "projects" || label === "contact") {
        setScene(label);
      }
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class", "aria-label"],
    });

    document.addEventListener("click", handleNavIntent, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleNavIntent, true);
    };
  }, []);

  useEffect(() => {
    armIdleMessage();
    return () => window.clearTimeout(idleTimer.current);
  }, [scene, armIdleMessage]);

  useEffect(
    () => () => {
      window.clearTimeout(idleTimer.current);
      window.clearTimeout(navigateTimer.current);
    },
    []
  );

  const navigateNext = () => {
    let target;
    let nextScene;

    if (scene === "intro") {
      nextScene = "story";
      target = findButton((text) => text.startsWith("Enter my story"));
    } else if (scene === "story") {
      nextScene = "projects";
      target = findButton((text) => text.toLowerCase() === "projects");
    } else if (scene === "projects") {
      nextScene = "contact";
      target = findButton((text) => text.toLowerCase() === "contact");
    }

    if (!target || !nextScene) return;

    // Update immediately so Story always shows the robot, Projects always has
    // a working Contact action, and Contact never displays both assistants.
    setScene(nextScene);
    target.click();

    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  const activate = () => {
    armIdleMessage();

    if (!awake) {
      setAwake(true);
      window.clearTimeout(navigateTimer.current);
      navigateTimer.current = window.setTimeout(navigateNext, 320);
      return;
    }

    navigateNext();
  };

  if (!scene || scene === "contact") return null;

  const copy = sceneCopy[scene];

  return (
    <>
      <style>{`
        button[aria-label="Open Yeabsira's story"] { display: none !important; }
        [data-journey-robot="true"] {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
      `}</style>

      <motion.button
        data-journey-robot="true"
        type="button"
        aria-label={copy.aria}
        onClick={activate}
        initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -5, 0, -1, 0], rotate: [0, -0.5, 0.5, -0.15, 0] }}
        transition={
          reduceMotion
            ? { duration: 0.08 }
            : {
                opacity: { duration: 0.2 },
                y: { duration: 5.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" },
                rotate: { duration: 5.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" },
              }
        }
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        className="fixed bottom-[max(8px,env(safe-area-inset-bottom))] right-[max(6px,env(safe-area-inset-right))] z-[10000] h-[196px] w-[218px] touch-manipulation select-none border-0 bg-transparent p-0 text-left sm:bottom-5 sm:right-5 sm:h-[212px] sm:w-[236px]"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <motion.div
          className="pointer-events-none absolute right-0 top-0 w-[188px] rounded-2xl border border-[#7CEBDD]/22 bg-[#061720]/96 px-3.5 py-3 shadow-[0_18px_60px_rgba(0,8,15,.5)] backdrop-blur-2xl sm:w-[202px]"
          animate={reduceMotion ? undefined : idle ? { y: [0, -3, 0], scale: [1, 1.015, 1] } : { y: [0, -1.5, 0] }}
          transition={{ duration: idle ? 1.8 : 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-[11px] font-semibold leading-4 text-[#ECFFFC] sm:text-[12px]">{idle ? copy.idle : copy.title}</p>
          <span className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 border-b border-r border-[#7CEBDD]/22 bg-[#061720]" />
        </motion.div>

        <JourneyRobot awake={awake} reduceMotion={reduceMotion} />
      </motion.button>
    </>
  );
};

export default HomeExplorerRobot;
