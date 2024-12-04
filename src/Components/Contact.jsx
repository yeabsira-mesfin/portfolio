import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-white text-[#1B4332] py-16 px-8 relative"
    >
      {/* Send-off Animation Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] to-[#4CAF50] opacity-10 -z-10"></div>

      <div className="max-w-5xl mx-auto space-y-4 text-center">
        {/* Title and CV Download button */}
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

        {/* Contact Form */}
        <form
          action="#"
          className="mt-6 space-y-4"
          method="POST"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-lg bg-[#f0f0f0] border border-[#1B4332] focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-lg bg-[#f0f0f0] border border-[#1B4332] focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded-lg bg-[#f0f0f0] border border-[#1B4332] focus:outline-none"
          ></textarea>

          {/* Buttons container */}
          <div className="flex justify-center gap-4 mt-6">
            {/* Send Message Button */}
            <motion.button
              type="submit"
              className="bg-[#1B4332] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#2a9d8f] transition duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Send Message
            </motion.button>

            {/* Download CV Button */}
           
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
