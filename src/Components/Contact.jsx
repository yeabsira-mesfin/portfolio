import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef(null);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendEmail = (e) => {
    e.preventDefault();
    if (isSending) return;

    const form = e.currentTarget;
    const emailInput = form.reply_to.value;

    setErrorMessage(null);
    setIsSubmitted(false);

    if (!validateEmail(emailInput)) {
      setErrorMessage(
        "Please enter a valid email address (e.g., example@mail.com)."
      );
      return;
    }

    setIsSending(true);

    emailjs
      .sendForm(
        "service_qysizmh",
        "template_s45s82r",
        formRef.current,
        "ZZiHJFeALtd2IPva-"
      )
      .then(() => {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => setIsSubmitted(false), 3000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setErrorMessage(
          error?.text || "Something went wrong. Please try again later."
        );
      })
      .finally(() => setIsSending(false));
  };

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3.5 " +
    "text-white placeholder:text-emerald-50/35 focus:border-emerald-300/45 " +
    "focus:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-emerald-300/10 transition";

  return (
    <section id="contact" className="relative overflow-hidden bg-[#04130f] px-6 py-24 text-white sm:px-8">
      <div className="absolute left-[-10rem] top-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute bottom-[-12rem] right-[-8rem] h-96 w-96 rounded-full bg-cyan-400/8 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col justify-center"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Have a role, project, or technical challenge in mind?
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-emerald-50/60">
            I am interested in software engineering, infrastructure, security,
            and technical delivery opportunities where I can build, troubleshoot,
            automate, and keep learning.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur">
            <p className="text-sm font-bold text-white">Direct email</p>
            <a
              href="mailto:yeabsira.mesfin29@gmail.com"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
            >
              <FaEnvelope className="h-4 w-4" />
              yeabsira.mesfin29@gmail.com
            </a>

            <div className="mt-5 flex flex-wrap gap-3" aria-label="Contact and social links">
              <a
                href="https://github.com/yeabsira-mesfin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <FaGithub className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yeabsira-mesfin-abera-76379928a/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <FaLinkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://x.com/YeabsiraMesfin9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <FaXTwitter className="h-4 w-4" /> X
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <div className="mb-6">
            <p className="text-lg font-extrabold">Send me a message</p>
            <p className="mt-1 text-sm text-emerald-50/45">
              This form uses the same working email delivery logic already on the site.
            </p>
          </div>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label htmlFor="from_name" className="mb-2 block text-xs font-bold uppercase tracking-wide text-emerald-100/55">
                Name
              </label>
              <input
                id="from_name"
                type="text"
                name="from_name"
                placeholder="Your name"
                className={fieldClass}
                required
              />
            </div>

            <div>
              <label htmlFor="reply_to" className="mb-2 block text-xs font-bold uppercase tracking-wide text-emerald-100/55">
                Email
              </label>
              <input
                id="reply_to"
                type="email"
                name="reply_to"
                placeholder="you@example.com"
                className={fieldClass}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wide text-emerald-100/55">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me what you are working on..."
                className={fieldClass + " min-h-[160px] resize-none"}
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSending}
              whileTap={{ scale: 0.98 }}
              className={
                "mt-2 w-full rounded-xl px-6 py-3.5 text-sm font-extrabold transition " +
                (isSending
                  ? "cursor-not-allowed bg-white/10 text-white/45"
                  : "bg-emerald-300 text-[#061b15] shadow-[0_14px_36px_rgba(110,231,183,0.14)] hover:bg-emerald-200")
              }
            >
              {isSending ? "Sending..." : "Send Message"}
            </motion.button>
          </form>

          <div className="mt-5 min-h-10">
            <AnimatePresence mode="wait">
              {isSubmitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-200"
                >
                  Message sent successfully.
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="rounded-xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm font-semibold text-red-200"
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;