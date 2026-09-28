const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const staticJsDir = path.join(buildDir, "static", "js");
const staticCssDir = path.join(buildDir, "static", "css");

if (!fs.existsSync(staticJsDir)) throw new Error("Build QA failed: build/static/js does not exist");
if (!fs.existsSync(staticCssDir)) throw new Error("Build QA failed: build/static/css does not exist");

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

if (contactContentCount !== 1) {
  throw new Error(`Build QA failed: contact safe-area marker missing or duplicated (${contactContentCount})`);
}

if (bundle.includes("rotating project mechanism")) {
  throw new Error("Build QA failed: stray project mechanism implementation label returned");
}

if (!bundle.includes("scrollIntoView")) {
  throw new Error("Build QA failed: selecting a project no longer auto-reveals the project card");
}

if (!bundle.includes("wheelTurn*34") && !bundle.includes("wheelTurn * 34")) {
  throw new Error("Build QA failed: shared roller motion distance is not using the smooth setting");
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

if (!bundle.includes("Click to explore more") || !bundle.includes("Open portfolio assistant")) {
  throw new Error("Build QA failed: portfolio assistant navigation content is incomplete");
}

for (const requiredCss of [
  "data-project-gear",
  "data-project-controls",
  "data-project-card",
  "data-appsec-preview",
  "data-contact-content",
  "max-height:calc(100dvh - 23rem)",
]) {
  if (!css.includes(requiredCss)) {
    throw new Error(`Build QA failed: responsive CSS token missing: ${requiredCss}`);
  }
}

console.log("Production bundle QA passed: one roller, smooth motion, immediate project reveal, stable previews, contact assistant safe area, and responsive layout rules are present");
