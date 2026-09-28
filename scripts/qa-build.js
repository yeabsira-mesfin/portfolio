const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const buildDir = path.join(root, "build");
const staticJsDir = path.join(buildDir, "static", "js");
const staticCssDir = path.join(buildDir, "static", "css");
const cinematicPath = path.join(root, "src", "Components", "CinematicPortfolio.jsx");
const robotPath = path.join(root, "src", "Components", "HomeExplorerRobot.jsx");

if (!fs.existsSync(staticJsDir)) throw new Error("Build QA failed: build/static/js does not exist");
if (!fs.existsSync(staticCssDir)) throw new Error("Build QA failed: build/static/css does not exist");
if (!fs.existsSync(cinematicPath)) throw new Error("Build QA failed: CinematicPortfolio source is missing");
if (!fs.existsSync(robotPath)) throw new Error("Build QA failed: HomeExplorerRobot source is missing");

const source = fs.readFileSync(cinematicPath, "utf8");
const robotSource = fs.readFileSync(robotPath, "utf8");
const bundle = fs
  .readdirSync(staticJsDir)
  .filter((name) => name.endsWith(".js"))
  .map((name) => fs.readFileSync(path.join(staticJsDir, name), "utf8"))
  .join("\n");

const css = fs
  .readdirSync(staticCssDir)
  .filter((name) => name.endsWith(".css"))
  .map((name) => fs.readFileSync(path.join(staticCssDir, name), "utf8"))
  .join("\n");

const count = (value) => bundle.split(value).length - 1;

const projectSceneCount = count("data-project-scene");
const projectGearCount = count("data-project-gear");
const projectControlsCount = count("data-project-controls");
const projectCardCount = count("data-project-card");
const oldMobileGearCount = count("data-project-gear-mobile");
const appsecPreviewCount = count("data-appsec-preview");
const projectImagePreviewCount = count("data-project-image-preview");
const contactContentCount = count("data-contact-content");

if (projectSceneCount !== 1) {
  throw new Error(`Build QA failed: expected 1 Projects scene, found ${projectSceneCount}`);
}
if (projectGearCount !== 1) {
  throw new Error(`Build QA failed: expected exactly 1 Projects roller, found ${projectGearCount}`);
}
if (projectControlsCount !== 1 || projectCardCount < 1) {
  throw new Error(`Build QA failed: project controls/card markers are wrong (${projectControlsCount}/${projectCardCount})`);
}
if (oldMobileGearCount !== 0) {
  throw new Error(`Build QA failed: legacy duplicate mobile roller markers remain (${oldMobileGearCount})`);
}
if (appsecPreviewCount !== 1) {
  throw new Error(`Build QA failed: expected one stable AppSec preview, found ${appsecPreviewCount}`);
}
if (projectImagePreviewCount < 1) {
  throw new Error("Build QA failed: responsive project image preview marker is missing");
}
if (contactContentCount !== 1) {
  throw new Error(`Build QA failed: contact safe-area marker missing or duplicated (${contactContentCount})`);
}

if (source.includes("rotating project mechanism") || bundle.includes("rotating project mechanism")) {
  throw new Error("Build QA failed: stray project mechanism implementation label returned");
}
if (!source.includes("scrollIntoView") || !bundle.includes("scrollIntoView")) {
  throw new Error("Build QA failed: selecting a project no longer auto-reveals the project card");
}
if (!source.includes("wheelTurn * 18") || !source.includes("duration: 5.8")) {
  throw new Error("Build QA failed: shared roller motion is not using the slower smooth setting");
}
if (!source.includes("duration: 180") || !source.includes("duration: 120")) {
  throw new Error("Build QA failed: ambient project roller rings are still rotating too quickly");
}
if (!robotSource.includes("setIdle(true), 10000")) {
  throw new Error("Build QA failed: Bzzz idle message is not armed for about 10 seconds");
}
if (robotSource.includes("setIdle(true), 60000")) {
  throw new Error("Build QA failed: legacy 60 second Bzzz timer remains");
}
if (bundle.includes("AppSec Vulnerability Manager live preview")) {
  throw new Error("Build QA failed: AppSec iframe preview returned; use the local dashboard artwork only");
}
if (bundle.includes("/windows-reliability-preview.html")) {
  throw new Error("Build QA failed: legacy Windows iframe preview returned; use the animated project visual");
}
if (!bundle.includes("Windows Infrastructure Reliability Console")) {
  throw new Error("Build QA failed: Windows project is missing from the production bundle");
}
if (!css.includes('Windows Infrastructure Reliability Console preview')) {
  throw new Error("Build QA failed: animated Windows visual CSS was not emitted");
}
if (!bundle.includes("AppSec Vulnerability Manager") || !bundle.includes("https://appsec-vulnerability-manager.vercel.app/")) {
  throw new Error("Build QA failed: AppSec project content or live-product URL is missing");
}
if (!bundle.includes("AI Security Testing Lab") || !bundle.includes("https://github.com/yeabsira-mesfin/ai-security-testing-lab")) {
  throw new Error("Build QA failed: AI Security Testing Lab was not added to Projects");
}
if (!bundle.includes("SignalDesk Endpoint Posture Advisor") || !bundle.includes("https://github.com/yeabsira-mesfin/endpoint-posture-advisor")) {
  throw new Error("Build QA failed: SignalDesk Endpoint Posture Advisor was not added to Projects");
}
if (!bundle.includes("Click to explore more") || !bundle.includes("Open portfolio assistant")) {
  throw new Error("Build QA failed: portfolio assistant navigation content is incomplete");
}

for (const requiredCss of [
  "data-project-gear",
  "data-project-controls",
  "data-project-card",
  "data-appsec-preview",
  "data-project-image-preview",
  "data-contact-content",
  'button[data-journey-robot="true"]',
]) {
  if (!css.includes(requiredCss)) {
    throw new Error(`Build QA failed: responsive CSS token missing: ${requiredCss}`);
  }
}
if (!css.includes("object-fit:contain") && !css.includes("object-fit: contain")) {
  throw new Error("Build QA failed: project images are not protected by object-fit contain");
}
if (!css.includes("max-height:none") && !css.includes("max-height: none")) {
  throw new Error("Build QA failed: desktop selected-project card can still be height-clipped");
}

console.log("Production bundle QA passed: matched roller and robot sizing hooks, slower roller motion, 10-second Bzzz timer, uncropped previews, two new security projects, and responsive layout rules are present");
