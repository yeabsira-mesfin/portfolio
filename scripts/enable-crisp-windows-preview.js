const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "Components", "CinematicPortfolio.jsx");
let source = fs.readFileSync(filePath, "utf8");

source = source.replace('import windowsConsole from "../images/windows-infrastructure-console.svg";\n', "");
source = source.replace('    image: windowsConsole,\n', "");

const marker = `
  if (project.image) {
`;

const windowsBlock = `
  if (project.id === "windows") {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-[#58E6D1]/14 bg-[#05101A]">
        <iframe
          src="/windows-reliability-preview.html"
          title="Windows Infrastructure Reliability Console preview"
          loading="lazy"
          tabIndex="-1"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-[#05101A]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.035]" />
        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-[#58E6D1]/20 bg-[#061B1A]/90 px-2.5 py-1 font-mono text-[7px] font-bold uppercase tracking-[.18em] text-[#8FF7E7] backdrop-blur-md">Crisp console preview</div>
      </div>
    );
  }

  if (project.image) {
`;

if (!source.includes('src="/windows-reliability-preview.html"')) {
  if (!source.includes(marker)) {
    throw new Error("Could not locate ProjectVisual image fallback");
  }
  source = source.replace(marker, windowsBlock);
}

const previewCount = (source.match(/windows-reliability-preview\.html/g) || []).length;
if (previewCount !== 1) {
  throw new Error(`Windows preview QA failed: expected one crisp preview, found ${previewCount}`);
}

if (source.includes("windowsConsole")) {
  throw new Error("Windows preview QA failed: legacy SVG image reference still exists");
}

fs.writeFileSync(filePath, source);
console.log("Windows reliability preview now renders as native HTML/CSS with no raster scaling");
