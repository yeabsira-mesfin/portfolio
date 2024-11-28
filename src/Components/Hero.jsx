const HeroSection = () => {
  return (
    <section
      id="hero"
      className="h-screen bg-[#243d27] text-white flex items-center justify-center text-center px-4"
    >
      <div className="space-y-6">
        {/* Logo */}
        <img
          src="/your-logo.png"
          alt="Logo"
          className="w-24 h-24 mx-auto sm:w-32 sm:h-32"
        />

        {/* Main Heading */}
        <h1 className="text-4xl font-bold sm:text-5xl">
          Welcome to My Portfolio
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl">
          Crafting beautiful experiences through code and design
        </p>

        {/* Call to Action Button */}
        <a
          href="#about"
          className="mt-6 inline-block bg-white text-[#243d27] px-6 py-3 text-lg font-medium rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Learn More About Me
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
