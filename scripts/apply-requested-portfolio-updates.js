const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const cinematicPath = path.join(root, "src", "Components", "CinematicPortfolio.jsx");
const timelinePath = path.join(root, "src", "Components", "StoryExperienceTimeline.jsx");

let source = fs.readFileSync(cinematicPath, "utf8");
const timelineSource = fs.readFileSync(timelinePath, "utf8");

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

// The Story timeline is now rendered directly by CinematicPortfolio. Keep exactly
// one Projects CTA, owned by StoryExperienceTimeline, and fail the build if the
// duplicate inline CTA ever comes back.
if (!source.includes('import StoryExperienceTimeline from "./StoryExperienceTimeline";')) {
  throw new Error("Requested portfolio update failed: StoryExperienceTimeline import is missing");
}

if (!source.includes('<StoryExperienceTimeline onViewProjects={() => navigate(2)} />')) {
  throw new Error("Requested portfolio update failed: StoryExperienceTimeline is not rendered inside the Story scene");
}

if (source.includes("See what I build")) {
  throw new Error("Requested portfolio update failed: duplicate Story CTA remains in CinematicPortfolio.jsx");
}

const timelineCtaCount = (timelineSource.match(/See what I build/g) || []).length;
if (timelineCtaCount !== 1) {
  throw new Error(`Requested portfolio update failed: expected exactly one Story CTA, found ${timelineCtaCount}`);
}

const projectBlocks = source.match(/\{\n\s+id: "[^"]+",[\s\S]*?\n\s+\},/g) || [];
const missingDestinations = projectBlocks
  .filter((block) => block.includes('title:'))
  .filter((block) => !block.includes('repo:') && !block.includes('demo:'));

if (missingDestinations.length > 0) {
  throw new Error(`Requested portfolio update failed: ${missingDestinations.length} project(s) are missing a repo or live link`);
}

fs.writeFileSync(cinematicPath, source);
console.log("Requested portfolio updates applied: single Story CTA verified and every project has a repo or live destination.");
