import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";

const X_PROFILE = "https://x.com/YeabsiraMesfin9";

const networkNodes = [
  { cx: 50, cy: 18, label: "GW" },
  { cx: 20, cy: 46, label: "FW" },
  { cx: 80, cy: 46, label: "API" },
  { cx: 34, cy: 79, label: "IDS" },
  { cx: 68, cy: 79, label: "DB" },
];

const NetworkAnimation = ({ reduceMotion }) => (
  <div className="relative overflow-hidden rounded-[1.45rem] border border-emerald-200/10 bg-[#041711] p-5">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />
    <motion.div
      className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/10"
      animate={reduceMotion ? undefined : { scale: [0.75, 1.2], opacity: [0.7, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
    />
    <motion.div
      className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10"
      animate={reduceMotion ? undefined : { scale: [0.7, 1.35], opacity: [0.65, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
    />

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-emerald-300/70">
          Live security pulse
        </p>
        <p className="mt-1 text-sm font-extrabold text-white">Network telemetry</p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-emerald-200/10 bg-emerald-300/5 px-3 py-1.5 text-[10px] font-bold text-emerald-200">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-emerald-300"
          animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        />
        MONITORING
      </div>
    </div>

    <div className="relative mt-4 aspect-[16/10]">
      <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Animated cybersecurity network">
        <defs>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {[
          [50, 18, 20, 46],
          [50, 18, 80, 46],
          [20, 46, 34, 79],
          [20, 46, 68, 79],
          [80, 46, 34, 79],
          [80, 46, 68, 79],
          [34, 79, 68, 79],
        ].map(([x1, y1, x2, y2], index) => (
          <motion.line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={index % 2 ? "#67e8f9" : "#6ee7b7"}
            strokeOpacity="0.28"
            strokeWidth="0.6"
            strokeDasharray="3 3"
            animate={reduceMotion ? undefined : { strokeDashoffset: [0, -12] }}
            transition={{ duration: 2 + index * 0.12, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {networkNodes.map((node, index) => (
          <g key={node.label}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="9"
              fill="url(#nodeGlow)"
              animate={reduceMotion ? undefined : { r: [7, 10, 7], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.2 }}
            />
            <circle cx={node.cx} cy={node.cy} r="5.2" fill="#08251c" stroke="#6ee7b7" strokeOpacity="0.65" strokeWidth="0.7" />
            <text x={node.cx} y={node.cy + 1.4} textAnchor="middle" fontSize="3.3" fontWeight="800" fill="#d1fae5">
              {node.label}
            </text>
          </g>
        ))}

        <motion.circle
          r="1.35"
          fill="#67e8f9"
          animate={
            reduceMotion
              ? undefined
              : { cx: [50, 20, 34, 68, 80, 50], cy: [18, 46, 79, 79, 46, 18], opacity: [0, 1, 1, 1, 1, 0] }
          }
          transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-emerald-200/15 bg-[#071f18]/90 shadow-[0_0_50px_rgba(52,211,153,0.13)] backdrop-blur">
        <div className="text-center">
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-lg bg-emerald-300 text-xs font-black text-[#061b15]"
          >
            ✓
          </motion.div>
          <span className="text-[7px] font-extrabold uppercase tracking-widest text-emerald-100/55">
            Secure
          </span>
        </div>
      </div>
    </div>

    <div className="relative grid grid-cols-3 gap-2">
      {[
        ["TLS", "Encrypted"],
        ["IDS", "Watching"],
        ["AUTH", "Verified"],
      ].map(([key, value]) => (
        <div key={key} className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2.5">
          <p className="text-[9px] font-extrabold tracking-widest text-emerald-300">{key}</p>
          <p className="mt-1 text-[10px] font-semibold text-white/48">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

const MobileXCard = ({ reduceMotion }) => (
  <motion.a
    href={X_PROFILE}
    target="_blank"
    rel="noopener noreferrer"
    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={reduceMotion ? undefined : { y: -4 }}
    className="group relative block overflow-hidden rounded-[1.8rem] border border-emerald-200/10 bg-[#041711] p-5 shadow-2xl"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(103,232,249,0.12),transparent_28%),radial-gradient(circle_at_25%_80%,rgba(110,231,183,0.12),transparent_30%)]" />
    <div className="relative flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <motion.div
          animate={reduceMotion ? undefined : { rotate: [0, 5, -5, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1 }}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5"
        >
          <FaXTwitter className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <p className="text-sm font-extrabold text-white">Latest cybersecurity posts</p>
          <p className="mt-1 text-xs leading-5 text-emerald-50/45">
            Networking, Linux, infrastructure, authentication, and security engineering
          </p>
        </div>
      </div>
      <motion.span
        animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="text-xl text-emerald-300"
      >
        ↗
      </motion.span>
    </div>

    <div className="relative mt-5 flex items-center gap-2">
      {["NETWORK", "LINUX", "SECURITY"].map((tag, index) => (
        <motion.span
          key={tag}
          animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.35 }}
          className="rounded-full border border-emerald-200/10 bg-emerald-300/5 px-2.5 py-1 text-[9px] font-extrabold tracking-widest text-emerald-200/70"
        >
          {tag}
        </motion.span>
      ))}
    </div>

    <div className="relative mt-5 flex items-center justify-between border-t border-white/8 pt-4">
      <div>
        <p className="text-xs font-bold text-white">@YeabsiraMesfin9</p>
        <p className="mt-1 text-[10px] text-white/35">Open the newest public posts on X</p>
      </div>
      <span className="rounded-xl bg-emerald-300 px-4 py-2 text-xs font-extrabold text-[#061b15] transition group-hover:bg-emerald-200">
        View latest
      </span>
    </div>
  </motion.a>
);

const Updates = () => {
  const timelineRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [timelineLoaded, setTimelineLoaded] = useState(false);
  const [timelineFailed, setTimelineFailed] = useState(false);
  const [useCompactX, setUseCompactX] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : true,
  );

  useEffect(() => {
    const updateMode = () => setUseCompactX(window.innerWidth < 768);
    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  useEffect(() => {
    if (useCompactX || !timelineRef.current) return undefined;

    let slowTimer;
    let script;
    let existingScript;

    const detectEmbed = () => {
      const iframe = timelineRef.current?.querySelector("iframe");
      if (!iframe) return;

      const markLoaded = () => {
        setTimelineLoaded(true);
        setTimelineFailed(false);
      };

      iframe.addEventListener("load", markLoaded, { once: true });
      slowTimer = window.setTimeout(() => {
        if (!timelineLoaded) setTimelineFailed(true);
      }, 6500);
    };

    const observer = new MutationObserver(detectEmbed);
    observer.observe(timelineRef.current, { childList: true, subtree: true });

    const loadTimeline = () => {
      if (window.twttr?.widgets && timelineRef.current) {
        window.twttr.widgets.load(timelineRef.current);
        window.setTimeout(detectEmbed, 300);
      }
    };

    existingScript = document.getElementById("x-widgets-script");

    if (existingScript) {
      loadTimeline();
      existingScript.addEventListener("load", loadTimeline);
    } else {
      script = document.createElement("script");
      script.id = "x-widgets-script";
      script.src = "https://platform.x.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.addEventListener("load", loadTimeline);
      script.addEventListener("error", () => setTimelineFailed(true));
      document.body.appendChild(script);
    }

    const absoluteTimeout = window.setTimeout(() => {
      if (!timelineRef.current?.querySelector("iframe")) setTimelineFailed(true);
    }, 7000);

    return () => {
      observer.disconnect();
      window.clearTimeout(slowTimer);
      window.clearTimeout(absoluteTimeout);
      existingScript?.removeEventListener("load", loadTimeline);
      script?.removeEventListener("load", loadTimeline);
    };
  }, [useCompactX, timelineLoaded]);

  return (
    <section id="updates" className="relative overflow-hidden bg-[#071f18] px-6 py-24 text-white sm:px-8">
      <div className="absolute left-[-12rem] top-12 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[-8rem] h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
            Security feed
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Networking, infrastructure, and cybersecurity in motion.
          </h2>
          <p className="mt-5 text-base leading-8 text-emerald-50/62">
            Follow what I am learning and sharing about secure systems, network behavior,
            infrastructure reliability, Linux, authentication, and defensive engineering.
          </p>
        </motion.div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <NetworkAnimation reduceMotion={reduceMotion} />

            <motion.a
              href={X_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { y: -3 }}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:bg-white/[0.065]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/8">
                  <FaXTwitter className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold">@YeabsiraMesfin9</p>
                  <p className="mt-0.5 text-xs text-emerald-50/45">Cybersecurity • Networking • Infrastructure</p>
                </div>
              </div>
              <span className="text-emerald-300">↗</span>
            </motion.a>
          </motion.div>

          {useCompactX ? (
            <MobileXCard reduceMotion={reduceMotion} />
          ) : (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#041711] p-2 shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {!timelineLoaded && !timelineFailed && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center rounded-[1.45rem] border border-emerald-200/8 bg-[#061b15] px-6 text-center"
                  >
                    <div className="relative h-20 w-20">
                      {[0, 1, 2].map((ring) => (
                        <motion.div
                          key={ring}
                          className="absolute inset-0 rounded-full border border-emerald-300/25"
                          animate={reduceMotion ? undefined : { scale: [0.45, 1.25], opacity: [0.8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: ring * 0.55, ease: "easeOut" }}
                        />
                      ))}
                      <div className="absolute inset-5 grid place-items-center rounded-full bg-emerald-300 text-[#061b15]">
                        <FaXTwitter className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-5 text-sm font-extrabold">Connecting to the live X feed</p>
                    <p className="mt-2 text-xs text-white/40">Loading public posts</p>
                  </motion.div>
                )}

                {timelineFailed && !timelineLoaded && (
                  <motion.div
                    key="failed"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="min-h-[420px]"
                  >
                    <MobileXCard reduceMotion={reduceMotion} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                ref={timelineRef}
                className={timelineLoaded ? "block min-h-[500px] overflow-hidden rounded-[1.45rem] bg-[#061b15]" : "absolute h-px w-px overflow-hidden opacity-0 pointer-events-none"}
                aria-hidden={!timelineLoaded}
              >
                <a
                  className="twitter-timeline"
                  data-theme="dark"
                  data-height="520"
                  data-chrome="noheader nofooter noborders transparent"
                  data-dnt="true"
                  href={X_PROFILE}
                  tabIndex={timelineLoaded ? 0 : -1}
                  style={{ display: timelineLoaded ? "block" : "none" }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Updates;
