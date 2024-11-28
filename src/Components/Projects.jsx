const Projects = () => {
    return (
      <section id="projects" className="bg-[#1b2b1f] text-white py-16 px-8">
        <div className="max-w-5xl mx-auto space-y-4 text-center">
          <h2 className="text-3xl font-bold">Projects</h2>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Replace these cards with your actual projects */}
            <div className="bg-white text-[#243d27] rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-semibold">Project 1</h3>
              <p className="text-sm">
                A brief description of the project goes here.
              </p>
            </div>
            <div className="bg-white text-[#243d27] rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-semibold">Project 2</h3>
              <p className="text-sm">
                A brief description of the project goes here.
              </p>
            </div>
            <div className="bg-white text-[#243d27] rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-semibold">Project 3</h3>
              <p className="text-sm">
                A brief description of the project goes here.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Projects;
  