// App.js
import React, { useState } from "react";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed w-full bg-[#243d27] text-white shadow-md z-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/your-logo.png"
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span className="ml-3 text-xl font-bold">My Portfolio</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden space-x-6 md:flex">
              <a href="#about" className="hover:text-gray-300">
                About Me
              </a>
              <a href="#projects" className="hover:text-gray-300">
                Projects
              </a>
              <a href="#skills" className="hover:text-gray-300">
                Skills
              </a>
              <a href="#hobbies" className="hover:text-gray-300">
                Hobbies
              </a>
              <a href="#contact" className="hover:text-gray-300">
                Contact
              </a>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#243d27]">
            <a
              href="#about"
              className="block px-4 py-2 text-sm hover:bg-gray-800"
            >
              About Me
            </a>
            <a
              href="#projects"
              className="block px-4 py-2 text-sm hover:bg-gray-800"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="block px-4 py-2 text-sm hover:bg-gray-800"
            >
              Skills
            </a>
            <a
              href="#hobbies"
              className="block px-4 py-2 text-sm hover:bg-gray-800"
            >
              Hobbies
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-sm hover:bg-gray-800"
            >
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="h-screen bg-[#243d27] text-white flex items-center justify-center text-center"
      >
        <div className="space-y-6">
          <img
            src="/your-logo.png"
            alt="Logo"
            className="w-24 h-24 mx-auto sm:w-32 sm:h-32"
          />
          <h1 className="text-4xl font-bold sm:text-5xl">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg sm:text-xl">
            Crafting beautiful experiences through code and design
          </p>
          <a
            href="#about"
            className="mt-6 inline-block bg-white text-[#243d27] px-6 py-3 text-lg font-medium rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Learn More About Me
          </a>
        </div>
      </section>

      {/* Sections */}
      <section id="about" className="flex items-center h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">About Me</h2>
          <p className="text-lg">
            I am a front-end developer with a passion for creating interactive
            and visually appealing user interfaces.
          </p>
        </div>
      </section>

      <section id="projects" className="flex items-center h-screen bg-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Projects</h2>
          <p className="text-lg">
            Explore my work, including web applications and frontend projects
            built using React and Tailwind CSS.
          </p>
        </div>
      </section>

      <section id="skills" className="flex items-center h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Skills</h2>
          <p className="text-lg">
            Proficient in React, JavaScript, Tailwind CSS, HTML, and more.
          </p>
        </div>
      </section>

      <section id="hobbies" className="flex items-center h-screen bg-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Hobbies</h2>
          <p className="text-lg">
            Coding, photography, playing video games, and exploring new
            technologies.
          </p>
        </div>
      </section>

      <section id="contact" className="flex items-center h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Contact</h2>
          <p className="text-lg">Feel free to reach out via email or LinkedIn.</p>
        </div>
      </section>
    </div>
  );
};

export default App;
