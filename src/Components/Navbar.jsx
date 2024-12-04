import React, { useState } from "react";
import logo from '../images/Logo.jpg'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full text-white shadow-lg bg-dark-green">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#hero">
              <img
                src={logo}
                alt="Logo"
                className="h-8 sm:h-10"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden space-x-6 md:flex">
            <a
              href="#about"
              className="transition duration-300 hover:text-gray-300"
            >
              About Me
            </a>
            <a
              href="#projects"
              className="transition duration-300 hover:text-gray-300"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="transition duration-300 hover:text-gray-300"
            >
              Skills
            </a>
            <a
              href="#hobbies"
              className="transition duration-300 hover:text-gray-300"
            >
              Hobbies
            </a>
            <a
              href="#contact"
              className="transition duration-300 hover:text-gray-300"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-dark-green">
          <a
            href="#about"
            className="block px-4 py-2 hover:bg-[#2a9d8f] hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            About Me
          </a>
          <a
            href="#projects"
            className="block px-4 py-2 hover:bg-[#2a9d8f] hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </a>
          <a
            href="#skills"
            className="block px-4 py-2 hover:bg-[#2a9d8f] hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Skills
          </a>
          <a
            href="#hobbies"
            className="block px-4 py-2 hover:bg-[#2a9d8f] hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Hobbies
          </a>
          <a
            href="#contact"
            className="block px-4 py-2 hover:bg-[#2a9d8f] hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
