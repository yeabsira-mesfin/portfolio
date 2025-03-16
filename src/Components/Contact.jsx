import { motion } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const formRef = useRef();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const emailInput = e.target.from_email.value;

    if (!validateEmail(emailInput)) {
      setErrorMessage("Please enter a valid email address (e.g., example@mail.com).");
      return;
    }

    emailjs
      .sendForm(
        "service_qysizmh",
        "template_s45s82r",
        formRef.current,
        "ZZiHJFeALtd2IPva-"
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          setIsSubmitted(true);
          setErrorMessage(null);
          e.target.reset();

          // Auto-refresh success message after 1 seconds
          setTimeout(() => setIsSubmitted(false), 1000);
        },
        (error) => {
          console.error("Error sending email:", error);
          setErrorMessage("Something went wrong. Please try again later.");
        }
      )
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      });
  };

  return (
    <section id="contact" className="bg-white text-[#1B4332] py-16 px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] to-[#4CAF50] opacity-10 -z-10"></div>

      <div className="max-w-5xl mx-auto space-y-4 text-center">
        <motion.h2
          className="text-3xl font-bold text-[#1B4332]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Contact
        </motion.h2>
        <p className="text-lg">
          Feel free to reach out to me for collaborations or just to say hi!
        </p>

        <form
          ref={formRef}
          method="POST"
          onSubmit={sendEmail}
          className="mt-6 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-2 text-[#fff] placeholder-white rounded-lg bg-[#1B4332] border border-[#1B4332] focus:outline-none"
            required
          />
          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            className="w-full px-4 py-2 text-[#fff] placeholder-white rounded-lg bg-[#1B4332] border border-[#1B4332] focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full px-4 py-2 text-[#fff] placeholder-white rounded-lg bg-[#1B4332] border border-[#1B4332] focus:outline-none"
            required
          ></textarea>

          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              type="submit"
              className="bg-[#1B4332] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#2a9d8f] transition duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Send Message
            </motion.button>
          </div>
        </form>

        {isSubmitted && (
          <p className="mt-4 text-green-500">
            Thank you! Your message has been sent successfully.
          </p>
        )}

        {errorMessage && (
          <p className="mt-4 text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;
