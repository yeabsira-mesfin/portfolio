const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "src", "Components");

const cinematicPath = path.join(root, "CinematicPortfolio.jsx");
let cinematic = fs.readFileSync(cinematicPath, "utf8");
const oldCinematicPreview = '{selectedProject.image ? <img src={selectedProject.image} alt={`${selectedProject.title} preview`} className="aspect-[16/10] w-full rounded-[1.25rem] object-cover" /> :';
const newCinematicPreview = '{selectedProject.demo ? <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] border border-[#7CEBDD]/8 bg-[#020A10]"><iframe src={selectedProject.demo} title={`${selectedProject.title} live preview`} className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-[#020A10]" loading="lazy" tabIndex={-1} /></div> : selectedProject.image ? <img src={selectedProject.image} alt={`${selectedProject.title} preview`} className="aspect-[16/10] w-full rounded-[1.25rem] object-cover" /> :';

if (cinematic.includes(oldCinematicPreview)) {
  cinematic = cinematic.replace(oldCinematicPreview, newCinematicPreview);
  fs.writeFileSync(cinematicPath, cinematic);
  console.log("Enabled crisp live AppSec preview in CinematicPortfolio");
} else if (!cinematic.includes("selectedProject.demo ?")) {
  throw new Error("Could not locate CinematicPortfolio project preview block");
}

const projectsPath = path.join(root, "Projects.jsx");
let projects = fs.readFileSync(projectsPath, "utf8");
const visualMarker = 'const VisualPanel = ({ project, reduceMotion }) => {\n  if (project.image) {';
const liveVisual = `const VisualPanel = ({ project, reduceMotion }) => {
  if (project.id === "appsec-vulnerability-manager" && project.demo) {
    return (
      <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#020A10]">
        <iframe src={project.demo} title={\`${'${project.title}'} live preview\`} className="pointer-events-none aspect-[16/10] w-full border-0 bg-[#020A10]" loading="lazy" tabIndex={-1} />
      </div>
    );
  }

  if (project.image) {`;

if (projects.includes(visualMarker)) {
  projects = projects.replace(visualMarker, liveVisual);
  fs.writeFileSync(projectsPath, projects);
  console.log("Enabled crisp live AppSec preview in Projects");
} else if (!projects.includes('project.id === "appsec-vulnerability-manager" && project.demo')) {
  throw new Error("Could not locate Projects VisualPanel block");
}
