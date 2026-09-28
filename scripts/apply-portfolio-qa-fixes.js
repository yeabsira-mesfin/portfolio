const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "Components", "CinematicPortfolio.jsx");
let source = fs.readFileSync(filePath, "utf8");

const replaceRequired = (label, pattern, replacement) => {
  if (!pattern.test(source)) throw new Error(`Portfolio QA patch failed: ${label}`);
  source = source.replace(pattern, replacement);
};

if (!source.includes('import appsecPreview from "../images/appsec-vulnerability-manager.svg";')) {
  source = source.replace(
    'import windowsConsole from "../images/windows-infrastructure-console.svg";',
    'import windowsConsole from "../images/windows-infrastructure-console.svg";\nimport appsecPreview from "../images/appsec-vulnerability-manager.svg";',
  );
}

if (source.includes('project.id === "appsec" && project.demo')) {
  replaceRequired(
    "AppSec iframe preview",
    /  if \(project\.id === "appsec" && project\.demo\) \{[\s\S]*?\n  \}\n\n  if \(project\.image\) \{/,
    `  if (project.id === "appsec") {\n    return (\n      <div data-appsec-preview="true" className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-[#52F0B6]/15 bg-[#01080D]">\n        <img src={appsecPreview} alt="AppSec Vulnerability Manager project preview" className="block h-full w-full object-contain" />\n        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.035]" />\n      </div>\n    );\n  }\n\n  if (project.image) {`,
  );
}

source = source.replace(
  /const rotation = reduceMotion \? scene \* \d+ : wheelTurn \* \d+ \+ scene \* \d+;/,
  'const rotation = reduceMotion ? scene * 12 : wheelTurn * 34 + scene * 16;',
);
source = source.replace(
  /transition=\{reduceMotion \? \{ duration: 0\.1 \} : \{ type: "spring", stiffness: 24, damping: 17, mass: 1\.7, restDelta: 0\.01 \}\}/,
  'transition={reduceMotion ? { duration: 0.1 } : { duration: 3.4, ease: [0.16, 1, 0.3, 1] }}',
);
source = source.replace(
  /transition=\{reduceMotion \? \{ duration: 0\.1 \} : \{ duration: 1\.9, ease: \[0\.16, 1, 0\.3, 1\] \}\}/,
  'transition={reduceMotion ? { duration: 0.1 } : { duration: 3.4, ease: [0.16, 1, 0.3, 1] }}',
);
source = source.replace(/\}, reduceMotion \? 80 : \d+\);/, '}, reduceMotion ? 80 : 420);');

source = source.replace(
  '<Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} compact showSceneNav={false} />',
  '<Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} />',
);

source = source.replace(
  '<div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">\n                <div className="min-w-0">',
  '<div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">\n                <div data-project-controls="true" className="min-w-0">',
);

// Reveal the selected project automatically only when it is actually outside the
// viewport. This keeps desktop/laptop layouts pinned at the top while phones and
// tablets smoothly move to the selected card with no manual follow-up scroll.
source = source.replace(
  'onClick={() => { setSelectedProject(project); setWheelTurn((value) => value + 1); }}',
  'onClick={() => { setSelectedProject(project); setWheelTurn((value) => value + 1); window.setTimeout(() => { const card = document.querySelector(\'[data-project-card="true"]\'); const rect = card?.getBoundingClientRect(); if (card && rect && (rect.top > window.innerHeight - 140 || rect.bottom < 96)) card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }, 180); }}',
);

source = source.replace(/\s*<p className="mt-4 max-w-\[190px\][^>]*>rotating project mechanism<\/p>/g, "");
source = source.replace(/\s*<p className="mt-2 text-center[^>]*>rotating project mechanism<\/p>/g, "");

source = source.replace(
  '{scene === 3 && (\n            <SceneShell>\n              <div><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div>\n              <div>',
  '{scene === 3 && (\n            <SceneShell>\n              <div data-contact-roller="true"><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div>\n              <div data-contact-content="true">',
);

const required = [
  'data-project-controls="true"',
  'data-project-card="true"',
  'data-contact-content="true"',
  'duration: 3.4',
  'wheelTurn * 34',
  'reduceMotion ? 80 : 420',
  'rect.top > window.innerHeight - 140',
  'scrollIntoView',
  'data-appsec-preview="true"',
];
for (const token of required) {
  if (!source.includes(token)) throw new Error(`Portfolio QA patch validation failed: missing ${token}`);
}
if (source.includes("rotating project mechanism")) {
  throw new Error("Portfolio QA patch validation failed: stray project mechanism label remains");
}

fs.writeFileSync(filePath, source);
console.log("Portfolio QA fixes applied: slow smooth rollers, responsive scenes, smart project reveal, contact safe area, and stable previews");
