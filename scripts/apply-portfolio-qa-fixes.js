const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "Components", "CinematicPortfolio.jsx");
let source = fs.readFileSync(filePath, "utf8");

const ensureReplace = (label, pattern, replacement) => {
  const before = source;
  source = source.replace(pattern, replacement);
  if (source === before) throw new Error(`Portfolio QA patch failed: ${label}`);
};

// AppSec preview: never render the live site inside a tiny iframe. Use the local,
// high-resolution dashboard artwork so the card cannot show a cropped hero or blurry text.
if (!source.includes('import appsecPreview from "../images/appsec-vulnerability-manager.svg";')) {
  ensureReplace(
    "AppSec preview import",
    'import windowsConsole from "../images/windows-infrastructure-console.svg";',
    'import windowsConsole from "../images/windows-infrastructure-console.svg";\nimport appsecPreview from "../images/appsec-vulnerability-manager.svg";',
  );
}

ensureReplace(
  "AppSec iframe preview",
  /  if \(project\.id === "appsec" && project\.demo\) \{[\s\S]*?\n  \}\n\n  if \(project\.image\) \{/,
  `  if (project.id === "appsec") {\n    return (\n      <div data-appsec-preview="true" className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-[#52F0B6]/15 bg-[#01080D]">\n        <img src={appsecPreview} alt="AppSec Vulnerability Manager project preview" className="block h-full w-full object-contain" />\n        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.035]" />\n      </div>\n    );\n  }\n\n  if (project.image) {`,
);

// All rollers use a slower, deliberate rotation with the same easing.
ensureReplace(
  "gear rotation distance",
  /const rotation = reduceMotion \? scene \* 35 : wheelTurn \* 118 \+ scene \* 44;/,
  'const rotation = reduceMotion ? scene * 18 : wheelTurn * 52 + scene * 22;',
);

ensureReplace(
  "gear motion transition",
  /transition=\{reduceMotion \? \{ duration: 0\.1 \} : \{ type: "spring", stiffness: 24, damping: 17, mass: 1\.7, restDelta: 0\.01 \}\}/,
  'transition={reduceMotion ? { duration: 0.1 } : { duration: 1.9, ease: [0.16, 1, 0.3, 1] }}',
);

ensureReplace(
  "scene transition timing",
  /\}, reduceMotion \? 80 : 760\);/,
  '}, reduceMotion ? 80 : 1050);',
);

// Projects should use the same full-size interactive roller as Story/Contact.
ensureReplace(
  "project gear mode",
  '<Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} compact showSceneNav={false} />',
  '<Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} />',
);

fs.writeFileSync(filePath, source);
console.log("Portfolio QA fixes applied: AppSec local preview, full project roller, and slower shared roller motion");
