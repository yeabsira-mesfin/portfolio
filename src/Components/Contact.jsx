import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendEmail = (event) => {
    event.preventDefault();
    if (isSending) return;

    const form = event.currentTarget;
    const emailInput = form.reply_to.value;

    setErrorMessage(null);
    setIsSubmitted(false);

    if (!validateEmail(emailInput)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSending(true);

    emailjs
      .sendForm(
        "service_qysizmh",
        "template_s45s82r",
        formRef.current,
        "ZZiHJFeALtd2IPva-",
      )
      .then(() => {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => setIsSubmitted(false), 3500);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setErrorMessage(error?.text || "Something went wrong. Please try again later.");
      })
      .finally(() => setIsSending(false));
  };

  const fieldClass =
    "w-full border-0 border-b border-white/12 bg-transparent px-0 py-3.5 text-base font-semibold text-white outline-none placeholder:text-white/22 focus:border-[#d9ff43]/70 transition";

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0b0c0e] px-5 py-24 text-white sm:px-7 lg:px-10 lg:py-32">
      <div className="signal-grid absolute inset-0 opacity-25" />
      <div className="absolute bottom-[-12rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#d9ff43]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[#d9ff43]">05 / Open channel</p>
            <h2 className="mt-6 max-w-2xl text-[clamp(3.2rem,7vw,6.7rem)] font-black leading-[0.86] tracking-[-0.07em] text-[#f4f1e8]">
              Build something useful <span className="text-white/22">together.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/46 sm:text-lg">
              I am interested in software engineering, infrastructure, security engineering, and technical roles where coding and systems thinking meet.
            </p>

            <a href="mailto:yeabsira.mesfin29@gmail.com" className="group mt-8 inline-flex items-center gap-3 text-lg font-black text-[#d9ff43] sm:text-xl">
              yeabsira.mesfin29@gmail.com
              <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            </a>

            <div className="mt-10 flex flex-wrap gap-2">
              <a href="https://github.com/yeabsira-mesfin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-black text-white/55 transition hover:border-white/22 hover:text-white"><FaGithub /> GitHub</a>
              <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-black text-white/55 transition hover:border-white/22 hover:text-white"><FaLinkedinIn /> LinkedIn</a>
              <a href="https://x.com/YeabsiraMesfin9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-black text-white/55 transition hover:border-white/22 hover:text-white"><FaXTwitter /> X</a>
            </div>

            <div className="mt-16 border-t border-white/8 pt-6">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-white/24">Based</p>
                  <p className="mt-2 text-sm font-black text-white/65">Virginia / DC area</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-white/24">Focus</p>
                  <p className="mt-2 text-sm font-black text-white/65">Software + Systems</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-white/24">Response</p>
                  <p className="mt-2 text-sm font-black text-white/65">Email / LinkedIn</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-[#121417]/88 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-white/8 pb-5">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#d9ff43]">New message</p>
                <p className="mt-1 text-sm text-white/35">Tell me what you are building or hiring for.</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#d9ff43]/10 text-[#d9ff43]"><FaEnvelope /></span>
            </div>

            <form ref={formRef} onSubmit={sendEmail} className="mt-6 space-y-5">
              <div>
                <label htmlFor="from_name" className="font-mono text-[9px] font-black uppercase tracking-[0.17em] text-white/25">Your name</label>
                <input id="from_name" type="text" name="from_name" placeholder="Name" className={fieldClass} required />
              </div>
              <div>
                <label htmlFor="reply_to" className="font-mono text-[9px] font-black uppercase tracking-[0.17em] text-white/25">Your email</label>
                <input id="reply_to" type="email" name="reply_to" placeholder="you@example.com" className={fieldClass} required />
              </div>
              <div>
                <label htmlFor="message" className="font-mono text-[9px] font-black uppercase tracking-[0.17em] text-white/25">Message</label>
                <textarea id="message" name="message" placeholder="Role, project, idea, or technical challenge..." className={`${fieldClass} min-h-[150px] resize-none`} required />
              </div>

              <button type="submit" disabled={isSending} className={`group mt-2 inline-flex w-full items-center justify-between rounded-2xl px-5 py-4 text-sm font-black transition ${isSending ? "cursor-not-allowed bg-white/8 text-white/30" : "bg-[#d9ff43] text-[#0b0c0e] hover:-translate-y-0.5 hover:bg-[#e7ff83]"}`}>
                {isSending ? "Sending..." : "Send message"}
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-5 min-h-12">
              <AnimatePresence mode="wait">
                {isSubmitted && (
                  <motion.div key="success" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} className="rounded-xl border border-[#d9ff43]/20 bg-[#d9ff43]/8 px-4 py-3 text-sm font-bold text-[#d9ff43]">Message sent. I will see it in my inbox.</motion.div>
                )}
                {errorMessage && (
                  <motion.div key="error" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} className="rounded-xl border border-red-300/20 bg-red-300/8 px-4 py-3 text-sm font-bold text-red-200">{errorMessage}</motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Yeabsira Mesfin. Built as a living engineering portfolio.</p>
          <a href="#hero" className="font-mono font-black uppercase tracking-[0.14em] text-white/35 transition hover:text-[#d9ff43]">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
