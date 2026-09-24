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

const Updates = () => {
  const timelineRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [timelineLoaded, setTimelineLoaded] = useState(false);
  const [timelineSlow, setTimelineSlow] = useState(false);

  useEffect(() => {
    if (!timelineRef.current) return undefined;

    const detectEmbed = () => {
      if (timelineRef.current?.querySelector("iframe")) {
        setTimelineLoaded(true);
        setTimelineSlow(false);
      }
    };

    const observer = new MutationObserver(detectEmbed);
    observer.observe(timelineRef.current, { childList: true, subtree: true });

    const slowTimer = window.setTimeout(() => {
      if (!timelineRef.current?.querySelector("iframe")) setTimelineSlow(true);
    }, 5000);

    const loadTimeline = () => {
      if (window.twttr?.widgets && timelineRef.current) {
        window.twttr.widgets.load(timelineRef.current);
        window.setTimeout(detectEmbed, 250);
      }
    };

    const existingScript = document.getElementById("x-widgets-script");

    if (existingScript) {
      loadTimeline();
      existingScript.addEventListener("load", loadTimeline);
    } else {
      const script = document.createElement("script");
      script.id = "x-widgets-script";
      script.src = "https://platform.x.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.addEventListener("load", loadTimeline);
      document.body.appendChild(script);
    }

    return () => {
      observer.disconnect();
      window.clearTimeout(slowTimer);
      existingScript?.removeEventListener("load", loadTimeline);
    };
  }, []);

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

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[.85fr_1.15fr]">
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

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="relative min-h-[430px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#041711] p-2 shadow-2xl sm:min-h-[520px]"
          >
            <AnimatePresence>
              {!timelineLoaded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-2 z-10 flex flex-col items-center justify-center overflow-hidden rounded-[1.45rem] border border-emerald-200/8 bg-[#061b15]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(52,211,153,0.13),transparent_38%)]" />

                  {!timelineSlow ? (
                    <div className="relative text-center">
                      <div className="relative mx-auto h-20 w-20">
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
                      <p className="mt-2 text-xs text-white/40">Secure channel • Loading public posts</p>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative max-w-sm px-6 text-center"
                    >
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-emerald-200/10 bg-emerald-300/8">
                        <FaXTwitter className="h-5 w-5 text-emerald-200" />
                      </div>
                      <p className="mt-5 text-lg font-extrabold">The live feed is taking longer than expected.</p>
                      <p className="mt-3 text-sm leading-6 text-white/45">
                        Some mobile browsers or content blockers can prevent the X embed from loading.
                        The rest of this section stays fully functional.
                      </p>
                      <a
                        href={X_PROFILE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex rounded-xl bg-emerald-300 px-5 py-3 text-sm font-extrabold text-[#061b15]"
                      >
                        Open latest posts on X ↗
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div
              ref={timelineRef}
              className={"h-full min-h-[414px] overflow-hidden rounded-[1.45rem] bg-[#061b15] transition-opacity duration-500 sm:min-h-[504px] " + (timelineLoaded ? "opacity-100" : "opacity-0")}
            >
              <a
                className="twitter-timeline"
                data-theme="dark"
                data-height="520"
                data-chrome="noheader nofooter noborders transparent"
                data-dnt="true"
                href={X_PROFILE}
              >
                Yeabsira Mesfin on X
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Updates;
