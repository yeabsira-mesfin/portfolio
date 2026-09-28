const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const cinematicPath = path.join(root, "src", "Components", "CinematicPortfolio.jsx");
const robotPath = path.join(root, "src", "Components", "HomeExplorerRobot.jsx");

let source = fs.readFileSync(cinematicPath, "utf8");
let robotSource = fs.readFileSync(robotPath, "utf8");

// Keep the build patch deliberately small and idempotent. Do not rewrite scene,
// chatbot, gear, or layout behavior during deployment.
if (!source.includes('id:"ai-security"') && !source.includes('id: "ai-security"')) {
  const projectEnd = /\];\s*const storyCards\s*=\s*\[/;
  if (!projectEnd.test(source)) {
    throw new Error("Portfolio prebuild failed: could not locate projects/storyCards boundary");
  }

  source = source.replace(
    projectEnd,
    `,
{id:"ai-security",title:"AI Security Testing Lab",lane:"AI Security + AppSec",summary:"A defensive gateway for LLM-enabled applications with input validation, sensitive-data redaction, tool allowlisting, output filtering, and automated security regression tests.",proof:"Python · FastAPI · LLM Security · PII Redaction · Tool Allowlisting · Pytest",repo:"https://github.com/yeabsira-mesfin/ai-security-testing-lab",code:"AI",accent:"#6EE8D7"},
{id:"endpoint-posture",title:"SignalDesk Endpoint Posture Advisor",lane:"Endpoint Security + Operations",summary:"A local security-operations lab that turns synthetic multi-customer endpoint data into posture assessments, prioritized cases, SLA tracking, audit events, and scoped reports.",proof:"Python · Endpoint Security · MITRE ATT&CK · Multi-customer Isolation · SLA Tracking · Audit Logging",repo:"https://github.com/yeabsira-mesfin/endpoint-posture-advisor",code:"EDR",accent:"#8AB8FF"}
];
const storyCards=[`
  );
}

robotSource = robotSource.replace(
  /window\.setTimeout\(\(\)\s*=>\s*setIdle\(true\),\s*\d+\)/,
  "window.setTimeout(() => setIdle(true), 10000)"
);

const checks = [
  [/wheelTurn\s*\*\s*18/, "slow gear scene rotation"],
  [/duration\s*:\s*5\.8/, "smooth gear transition"],
  [/duration\s*:\s*180/, "slow outer ring"],
  [/duration\s*:\s*120/, "slow inner ring"],
  [/data-contact-content/, "contact scene marker"],
  [/PortfolioAssistant/, "contact chatbot"],
  [/data-project-card/, "project card marker"],
  [/scrollIntoView/, "project auto reveal"],
  [/ai-security/, "AI Security Testing Lab"],
  [/endpoint-posture/, "Endpoint Posture Advisor"],
];

for (const [pattern, label] of checks) {
  if (!pattern.test(source)) throw new Error(`Portfolio prebuild validation failed: missing ${label}`);
}

if (!/setIdle\(true\)\s*,\s*10000/.test(robotSource)) {
  throw new Error("Portfolio prebuild validation failed: journey robot idle timer is not 10 seconds");
}

fs.writeFileSync(cinematicPath, source);
fs.writeFileSync(robotPath, robotSource);
console.log("Portfolio prebuild passed without rewriting scene or chatbot behavior");
