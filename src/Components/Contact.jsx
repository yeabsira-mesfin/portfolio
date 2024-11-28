const Contact = () => {
    return (
      <section id="contact" className="bg-[#243d27] text-white py-16 px-8">
        <div className="max-w-5xl mx-auto space-y-4 text-center">
          <h2 className="text-3xl font-bold">Contact</h2>
          <p className="text-lg">
            Feel free to reach out to me for collaborations or just to say hi!
          </p>
          <form
            action="#"
            className="mt-6 space-y-4"
            method="POST"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg bg-[#1b2b1f] border border-white focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg bg-[#1b2b1f] border border-white focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded-lg bg-[#1b2b1f] border border-white focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-white text-[#243d27] px-6 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    );
  };
  
  export default Contact;
  