import { motion } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(); // Create a reference for the form

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qysizmh",
        "template_s45s82r",
        formRef.current, // Correctly access the form element using formRef.current
        "ZZiHJFeALtd2IPva-"
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          // Reset the form after email is sent successfully
          e.target.reset();
        },
        (error) => {
          console.error("Error sending email:", error);
        }
      )
      .catch((error) => {
        console.error("Error sending email:", error);
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
          ref={formRef} // Attach the ref to the form element
          method="POST"
          onSubmit={sendEmail}
          className="mt-6 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-lg bg-[#f0f0f0] border border-[#1B4332] focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-lg bg-[#f0f0f0] border border-[#1B4332] focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded-lg bg-[#f0f0f0] border border-[#1B4332] focus:outline-none"
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
            Thank you! Your message has been sent successfully. The page will refresh shortly.
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;
