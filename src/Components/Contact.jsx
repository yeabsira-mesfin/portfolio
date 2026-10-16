import { FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#0b0c0e] px-5 py-24 text-white">
      <h2 className="text-3xl font-bold">Let’s build something useful together.</h2>
      <p className="mt-4">For roles and project inquiries, connect with me on LinkedIn.</p>
      <a href="https://www.linkedin.com/in/yeabsira-mesfin-76379928a" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2">
        <FaLinkedinIn /> Connect on LinkedIn
      </a>
    </section>
  );
}
