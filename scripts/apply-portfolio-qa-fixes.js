const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const cinematicPath = path.join(root, "src", "Components", "CinematicPortfolio.jsx");
const robotPath = path.join(root, "src", "Components", "HomeExplorerRobot.jsx");
let source = fs.readFileSync(cinematicPath, "utf8");
let robotSource = fs.readFileSync(robotPath, "utf8");

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
    `  if (project.id === "appsec") {\n    return (\n      <div data-appsec-preview="true" className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-[#52F0B6]/15 bg-[#01080D]">\n        <img src={appsecPreview} alt="AppSec Vulnerability Manager project preview" className="block h-full w-full object-contain p-2" />\n        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.035]" />\n      </div>\n    );\n  }\n\n  if (project.image) {`,
  );
}

if (source.includes('className="block max-h-[330px] w-full object-contain"')) {
  replaceRequired(
    "project image preview sizing",
    /      <div className="relative overflow-hidden rounded-\[1\.25rem\] border border-\[#7CEBDD\]\/10 bg-\[#01080D\]">\n        <img src=\{project\.image\} alt=\{`\$\{project\.title\} preview`\} className="block max-h-\[330px\] w-full object-contain" \/>\n      <\/div>/,
    `      <div data-project-image-preview="true" className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[1.25rem] border border-[#7CEBDD]/10 bg-[#01080D] p-2">\n        <img src={project.image} alt={\`\${project.title} preview\`} className="block h-full w-full object-contain" />\n      </div>`,
  );
}

if (!source.includes('id: "ai-security"')) {
  replaceRequired(
    "new featured projects",
    /\n\];\n\nconst storyCards = \[/,
    `\n  {\n    id: "ai-security",\n    title: "AI Security Testing Lab",\n    lane: "AI Security + AppSec",\n    summary: "A defensive gateway for LLM-enabled applications with input validation, sensitive-data redaction, tool allowlisting, output filtering, and automated security regression tests.",\n    proof: "Python · FastAPI · LLM Security · PII Redaction · Tool Allowlisting · Pytest",\n    repo: "https://github.com/yeabsira-mesfin/ai-security-testing-lab",\n    code: "AI",\n    accent: "#6EE8D7",\n  },\n  {\n    id: "endpoint-posture",\n    title: "SignalDesk Endpoint Posture Advisor",\n    lane: "Endpoint Security + Operations",\n    summary: "A local security-operations lab that turns synthetic multi-customer endpoint data into posture assessments, prioritized cases, SLA tracking, audit events, and scoped reports.",\n    proof: "Python · Endpoint Security · MITRE ATT&CK · Multi-customer Isolation · SLA Tracking · Audit Logging",\n    repo: "https://github.com/yeabsira-mesfin/endpoint-posture-advisor",\n    code: "EDR",\n    accent: "#8AB8FF",\n  },\n];\n\nconst storyCards = [`,
  );
}

// Keep the scene-triggered gear turn restrained but quicker than the ambient drift.
source = source.replace(
  /const rotation = reduceMotion \? scene \* \d+ : wheelTurn \* \d+ \+ scene \* \d+;/,
  'const rotation = reduceMotion ? scene * 8 : wheelTurn * 18 + scene * 12;',
);
source = source.replace(
  /transition=\{reduceMotion \? \{ duration: 0\.1 \} : \{ type: "spring", stiffness: 24, damping: 17, mass: 1\.7, restDelta: 0\.01 \}\}/,
  'transition={reduceMotion ? { duration: 0.1 } : { duration: 2.6, ease: [0.16, 1, 0.3, 1] }}',
);
source = source.replace(
  /transition=\{reduceMotion \? \{ duration: 0\.1 \} : \{ duration: [\d.]+, ease: \[0\.16, 1, 0\.3, 1\] \}\}/,
  'transition={reduceMotion ? { duration: 0.1 } : { duration: 2.6, ease: [0.16, 1, 0.3, 1] }}',
);
source = source.replace('transition={{ duration: 110, repeat: Infinity, ease: "linear" }}', 'transition={{ duration: 180, repeat: Infinity, ease: "linear" }}');
source = source.replace('transition={{ duration: 62, repeat: Infinity, ease: "linear" }}', 'transition={{ duration: 120, repeat: Infinity, ease: "linear" }}');
source = source.replace(/\}, reduceMotion \? 80 : \d+\);/, '}, reduceMotion ? 80 : 420);');

source = source.replace(
  '<Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} compact showSceneNav={false} />',
  '<Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} />',
);

source = source.replace(
  '<div className="order-2 lg:order-1">',
  '<div data-intro-content="true" className="order-2 lg:order-1">',
);
source = source.replace(
  '<div className="max-h-[calc(100dvh-8rem)] overflow-y-auto pr-1 lg:max-h-[76vh]">',
  '<div data-story-content="true" className="max-h-[calc(100dvh-8rem)] overflow-y-auto pr-1 lg:max-h-[76vh]">',
);
source = source.replace(
  '<div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">\n                <div className="min-w-0">',
  '<div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">\n                <div data-project-controls="true" className="min-w-0">',
);
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

robotSource = robotSource.replace(
  /window\.setTimeout\(\(\) => setIdle\(true\), \d+\)/,
  'window.setTimeout(() => setIdle(true), 10000)',
);

const required = [
  'data-intro-content="true"',
  'data-story-content="true"',
  'data-project-controls="true"',
  'data-project-card="true"',
  'data-contact-content="true"',
  'data-project-image-preview="true"',
  'duration: 2.6',
  'duration: 180',
  'duration: 120',
  'wheelTurn * 18',
  'reduceMotion ? 80 : 420',
  'rect.top > window.innerHeight - 140',
  'scrollIntoView',
  'data-appsec-preview="true"',
  'id: "ai-security"',
  'id: "endpoint-posture"',
];
for (const token of required) {
  if (!source.includes(token)) throw new Error(`Portfolio QA patch validation failed: missing ${token}`);
}
if (!robotSource.includes('window.setTimeout(() => setIdle(true), 10000)')) {
  throw new Error("Portfolio QA patch validation failed: journey robot idle message is not set to ten seconds");
}
if (source.includes("rotating project mechanism")) {
  throw new Error("Portfolio QA patch validation failed: stray project mechanism label remains");
}

fs.writeFileSync(cinematicPath, source);
fs.writeFileSync(robotPath, robotSource);
console.log("Portfolio QA fixes applied: matching roller scale, slow ambient motion with a gentle scene speed-up, 10-second robot idle copy, full-fit project previews, two featured security projects, and responsive safe areas");
