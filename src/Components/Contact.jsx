import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

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
    "w-full px-4 py-3 rounded-lg border border-[#1B4332] bg-[#1B4332] " +
    "text-white placeholder-white focus:bg-[#234f3b] focus:outline-none " +
    "focus:ring-2 focus:ring-[#2a9d8f] focus:border-[#2a9d8f] transition duration-200";

  return (
    <section id="contact" className="bg-white text-[#1B4332] py-16 px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] to-[#4CAF50] opacity-10 -z-10" />

      <div className="max-w-5xl mx-auto space-y-4 text-center">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>

        <p className="text-lg">
          Feel free to reach out to me for collaborations or just to say hi!
        </p>

        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="mt-6 space-y-4"
        >
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            className={fieldClass}
            required
          />

          <input
            type="email"
            name="reply_to"
            placeholder="Your Email"
            className={fieldClass}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            className={`${fieldClass} min-h-[140px] resize-none`}
            required
          />

          <div className="flex justify-center mt-6">
            <motion.button
              type="submit"
              disabled={isSending}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-2 rounded-lg shadow-lg text-white transition duration-300 ${
                isSending
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#1B4332] hover:bg-[#2a9d8f]"
              }`}
            >
              {isSending ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </form>

        {/* Success / Error message */}
        <div className="flex justify-center mt-6">
          <AnimatePresence mode="wait">
            {isSubmitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="px-4 py-2 text-green-700 bg-green-100 border border-green-200 rounded-lg"
              >
                ✅ Message sent successfully!
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="px-4 py-2 text-red-700 bg-red-100 border border-red-200 rounded-lg"
              >
                ⚠️ {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
