import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";

const X_PROFILE = "https://x.com/YeabsiraMesfin9";

const Updates = () => {
  const timelineRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const loadTimeline = () => {
      if (window.twttr?.widgets && timelineRef.current) {
        window.twttr.widgets.load(timelineRef.current);
      }
    };

    const existingScript = document.getElementById("x-widgets-script");

    if (existingScript) {
      loadTimeline();
      existingScript.addEventListener("load", loadTimeline);
      return () => existingScript.removeEventListener("load", loadTimeline);
    }

    const script = document.createElement("script");
    script.id = "x-widgets-script";
    script.src = "https://platform.x.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.addEventListener("load", loadTimeline);
    document.body.appendChild(script);

    return () => script.removeEventListener("load", loadTimeline);
  }, []);

  return (
    <section
      id="updates"
      className="relative overflow-hidden bg-[#071f18] px-6 py-24 text-white sm:px-8"
    >
      <div className="absolute left-[-12rem] top-12 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[-8rem] h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="lg:sticky lg:top-28"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
            Newsletter
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Security, software, and systems notes as I share them.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-emerald-50/62">
            My latest public posts from X appear here automatically, so the
            portfolio stays connected to what I am learning, building, and
            thinking about in real time.
          </p>

          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/8">
                <FaXTwitter className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold">@YeabsiraMesfin9</p>
                <p className="mt-0.5 text-xs text-emerald-50/45">Live public feed from X</p>
              </div>
            </div>
            <a
              href={X_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-300 transition hover:text-emerald-200"
            >
              View profile on X <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#061b15] p-2 shadow-2xl"
        >
          <div
            ref={timelineRef}
            className="min-h-[580px] overflow-hidden rounded-[1.45rem] bg-[#061b15]"
          >
            <a
              className="twitter-timeline"
              data-theme="dark"
              data-height="580"
              data-chrome="noheader nofooter noborders transparent"
              data-dnt="true"
              href={X_PROFILE}
            >
              Loading Yeabsira's latest posts...
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Updates;
