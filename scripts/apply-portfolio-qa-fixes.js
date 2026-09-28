const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "Components", "CinematicPortfolio.jsx");
let source = fs.readFileSync(filePath, "utf8");

const replaceRequired = (label, pattern, replacement) => {
  if (!pattern.test(source)) throw new Error(`Portfolio QA patch failed: ${label}`);
  source = source.replace(pattern, replacement);
};

// AppSec preview: never render the live site inside a tiny iframe. Use the local,
// high-resolution dashboard artwork so the project preview stays sharp and predictable.
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

// Rollers should feel mechanical and deliberate, not snap. Every scene and every
// project selection uses the same smaller rotation distance and long ease-out.
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
source = source.replace(/\}, reduceMotion \? 80 : \d+\);/, '}, reduceMotion ? 80 : 1250);');

// Projects uses the exact same full interactive roller as Story and Contact.
source = source.replace(
  '<Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} compact showSceneNav={false} />',
  '<Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} />',
);

// Mark the project controls so responsive layout QA can target them precisely.
source = source.replace(
  '<div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">\n                <div className="min-w-0">',
  '<div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">\n                <div data-project-controls="true" className="min-w-0">',
);

// When a project is chosen, make the selected project visible immediately instead
// of forcing the user to manually scroll down to discover the result.
source = source.replace(
  'onClick={() => { setSelectedProject(project); setWheelTurn((value) => value + 1); }}',
  'onClick={() => { setSelectedProject(project); setWheelTurn((value) => value + 1); window.setTimeout(() => document.querySelector(\'[data-project-card="true"]\')?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" }), 120); }}',
);

// Remove the stray implementation label that was showing by itself on narrow layouts.
source = source.replace(/\s*<p className="mt-4 max-w-\[190px\][^>]*>rotating project mechanism<\/p>/g, "");
source = source.replace(/\s*<p className="mt-2 text-center[^>]*>rotating project mechanism<\/p>/g, "");

// Add contact markers so the assistant can reserve a safe area instead of covering
// the location/contact cards at tablet and desktop sizes.
source = source.replace(
  '{scene === 3 && (\n            <SceneShell>\n              <div><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div>\n              <div>',
  '{scene === 3 && (\n            <SceneShell>\n              <div data-contact-roller="true"><Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} /></div>\n              <div data-contact-content="true">',
);

// Production assertions for the transformations above.
const required = [
  'data-project-controls="true"',
  'data-project-card="true"',
  'data-contact-content="true"',
  'duration: 3.4',
  'wheelTurn * 34',
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
console.log("Portfolio QA fixes applied: smooth rollers, immediate project reveal, safe contact assistant, and stable previews");
