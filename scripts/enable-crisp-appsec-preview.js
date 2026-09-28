const fs = require("fs");
const path = require("path");

const cinematicPath = path.join(__dirname, "..", "src", "Components", "CinematicPortfolio.jsx");
let source = fs.readFileSync(cinematicPath, "utf8");

const transformedPreview = 'className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-[#01080D]"';
const crispPreview = 'className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-[#01080D]"';

if (source.includes(transformedPreview)) {
  source = source.replace(transformedPreview, crispPreview);
  fs.writeFileSync(cinematicPath, source);
  console.log("AppSec live preview now renders at native browser resolution");
} else if (source.includes(crispPreview)) {
  console.log("AppSec live preview is already using native browser resolution");
} else {
  console.warn("AppSec live preview class was not found; leaving source unchanged");
}
