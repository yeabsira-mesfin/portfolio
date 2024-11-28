const Skills = () => {
    return (
      <section id="skills" className="bg-[#243d27] text-white py-16 px-8">
        <div className="max-w-5xl mx-auto space-y-4 text-center">
          <h2 className="text-3xl font-bold">Skills</h2>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <span className="bg-white text-[#243d27] rounded-full px-6 py-2">
              React.js
            </span>
            <span className="bg-white text-[#243d27] rounded-full px-6 py-2">
              Tailwind CSS
            </span>
            <span className="bg-white text-[#243d27] rounded-full px-6 py-2">
              JavaScript
            </span>
            <span className="bg-white text-[#243d27] rounded-full px-6 py-2">
              HTML/CSS
            </span>
            <span className="bg-white text-[#243d27] rounded-full px-6 py-2">
              TypeScript
            </span>
          </div>
        </div>
      </section>
    );
  };
  
  export default Skills;
  