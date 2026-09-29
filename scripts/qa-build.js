const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const buildDir = path.join(root, "build");
const staticJsDir = path.join(buildDir, "static", "js");
const staticCssDir = path.join(buildDir, "static", "css");
const cinematicPath = path.join(root, "src", "Components", "CinematicPortfolio.jsx");
const assistantPath = path.join(root, "src", "Components", "PortfolioAssistant.jsx");
const packagePath = path.join(root, "package.json");

for (const file of [staticJsDir, staticCssDir, cinematicPath, assistantPath, packagePath]) {
  if (!fs.existsSync(file)) throw new Error(`Build QA failed: missing ${file}`);
}

const source = fs.readFileSync(cinematicPath, "utf8");
const assistant = fs.readFileSync(assistantPath, "utf8");
const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const bundle = fs.readdirSync(staticJsDir).filter((name) => name.endsWith(".js")).map((name) => fs.readFileSync(path.join(staticJsDir, name), "utf8")).join("\n");
const css = fs.readdirSync(staticCssDir).filter((name) => name.endsWith(".css")).map((name) => fs.readFileSync(path.join(staticCssDir, name), "utf8")).join("\n");
const count = (value) => bundle.split(value).length - 1;

if (pkg.scripts?.prebuild) throw new Error("Build QA failed: prebuild source rewriting must stay removed");
if (source.includes("max-h-[calc(100dvh-8rem)] overflow-y-auto")) throw new Error("Build QA failed: nested Story scrolling returned");
if (source.includes("truncate text-sm font-semibold")) throw new Error("Build QA failed: project titles are being hard-truncated again");
if (!source.includes('aria-current={active ? "page" : undefined}')) throw new Error("Build QA failed: active navigation accessibility state is missing");
if (!source.includes("aria-pressed={active}")) throw new Error("Build QA failed: project selection accessibility state is missing");
if (!source.includes('href="mailto:yeabsira.mesfin29@gmail.com"')) throw new Error("Build QA failed: recruiter email action is missing");
if (!source.includes('href="/resume.html"')) throw new Error("Build QA failed: resume entry point is missing");
if (!source.includes("window.history.pushState")) throw new Error("Build QA failed: URL-aware scene navigation is missing");
if (!source.includes("AI Security Testing Lab") || !source.includes("SignalDesk Endpoint Posture Advisor")) throw new Error("Build QA failed: featured security projects are missing");

if (!assistant.includes('role="dialog"') || !assistant.includes("Escape") || !assistant.includes("inputRef")) throw new Error("Build QA failed: assistant dialog accessibility behavior is incomplete");
if (!assistant.includes("Date.now() + 1800") || !assistant.includes("delta > 12") || !assistant.includes("delta < -9")) throw new Error("Build QA failed: smooth mobile hint scroll behavior is missing");
if (!assistant.includes("answers.hobbies") || !assistant.includes("answers.authorization") || !assistant.includes("answers.greeting")) throw new Error("Build QA failed: assistant conversational coverage is incomplete");

if (count("data-project-scene") < 1) throw new Error("Build QA failed: Projects scene marker is missing");
if (count("data-story-content") < 1) throw new Error("Build QA failed: Story content marker is missing");
if (count("data-contact-content") < 1) throw new Error("Build QA failed: Contact content marker is missing");
if (count("data-portfolio-assistant") < 1) throw new Error("Build QA failed: persistent portfolio assistant is missing");

for (const required of [
  "AppSec Vulnerability Manager",
  "Windows Infrastructure Reliability Console",
  "Secure Cloud Infrastructure as Code",
  "TechBoard",
  "Secure Login Analyzer",
  "AI Security Testing Lab",
  "SignalDesk Endpoint Posture Advisor",
  "yeabsira.mesfin29@gmail.com",
  "@yeabsira-mesfin",
  "Curious? Ask me anything.",
]) {
  if (!bundle.includes(required)) throw new Error(`Build QA failed: production bundle missing ${required}`);
}

for (const requiredCss of ["data-project-scene", "data-story-content", "data-contact-content", "data-portfolio-assistant-launcher"]) {
  if (!css.includes(requiredCss)) throw new Error(`Build QA failed: responsive CSS token missing: ${requiredCss}`);
}
if (!css.includes("object-fit:contain") && !css.includes("object-fit: contain")) throw new Error("Build QA failed: project images are not protected by object-fit contain");
if (!css.includes("ym-gear-ambient") || !css.includes("150s")) throw new Error("Build QA failed: slow ambient gear motion is missing");

console.log("Production bundle QA passed: responsive single-scroll scenes, accessible navigation, persistent assistant, recruiter contact paths, URL routing, security projects, and slow cinematic motion are present");
