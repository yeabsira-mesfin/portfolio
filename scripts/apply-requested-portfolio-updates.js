const fs = require("fs");
const path = require("path");

const cinematicPath = path.join(__dirname, "..", "src", "Components", "CinematicPortfolio.jsx");
let source = fs.readFileSync(cinematicPath, "utf8");

// Put the Story CTA in a visually distinct footer so the page clearly continues
// through the full story before sending visitors to Projects.
source = source.replace(
  '<button type="button" onClick={() => navigate(2)} className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-[#58E6D1]">See what I build <FaArrowRight className="transition-transform duration-700 group-hover:translate-x-1" /></button>',
  '<div data-story-footer="true" className="mt-12 border-t border-[#7CEBDD]/10 pb-3 pt-7"><button type="button" onClick={() => navigate(2)} className="group inline-flex items-center gap-3 rounded-full bg-[#DFFFFB] px-5 py-3.5 text-sm font-bold text-[#03131A] shadow-[0_10px_34px_rgba(86,230,211,.10)] transition-all duration-700 hover:-translate-y-0.5 hover:bg-white">See what I build <FaArrowRight className="text-xs transition-transform duration-700 group-hover:translate-x-1" /></button></div>',
);

// The BEC project is injected by the main QA patch. Give it its repository link
// so every project shown in the portfolio has a destination visitors can open.
source = source.replace(
  'proof: "React · FastAPI · Microsoft 365 · Entra ID · MITRE ATT&CK · IOC Correlation",\n    image: becPreview,',
  'proof: "React · FastAPI · Microsoft 365 · Entra ID · MITRE ATT&CK · IOC Correlation",\n    repo: "https://github.com/yeabsira-mesfin/bec-incident-investigation-lab",\n    image: becPreview,',
);

// Make the repository action explicit and consistent on every project card.
source = source.replace(
  '>Repository <FaGithub className="text-[10px]" /></a>',
  '>View repository <FaGithub className="text-[10px]" /></a>',
);

if (!source.includes('data-story-footer="true"')) {
  throw new Error("Requested portfolio update failed: Story footer CTA was not applied");
}

const projectBlocks = source.match(/\{\n\s+id: "[^"]+",[\s\S]*?\n\s+\},/g) || [];
const missingDestinations = projectBlocks
  .filter((block) => block.includes('title:'))
  .filter((block) => !block.includes('repo:') && !block.includes('demo:'));

if (missingDestinations.length > 0) {
  throw new Error(`Requested portfolio update failed: ${missingDestinations.length} project(s) are missing a repo or live link`);
}

fs.writeFileSync(cinematicPath, source);
console.log("Requested portfolio updates applied: Story CTA moved into the page footer and every project has a repo or live destination.");
