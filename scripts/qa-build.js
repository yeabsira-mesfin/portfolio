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
const oldMobileGearCount = count("data-project-gear-mobile");
const appsecPreviewCount = count("data-appsec-preview");

if (projectSceneCount !== 1) {
  throw new Error(`Build QA failed: expected 1 Projects scene, found ${projectSceneCount}`);
}

if (projectGearCount !== 1) {
  throw new Error(`Build QA failed: expected exactly 1 Projects roller, found ${projectGearCount}`);
}

if (oldMobileGearCount !== 0) {
  throw new Error(`Build QA failed: legacy duplicate mobile roller markers remain (${oldMobileGearCount})`);
}

if (appsecPreviewCount !== 1) {
  throw new Error(`Build QA failed: expected one stable AppSec preview, found ${appsecPreviewCount}`);
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

if (!css.includes("data-project-gear") || !css.includes("data-appsec-preview")) {
  throw new Error("Build QA failed: Projects layout or AppSec preview CSS was not emitted");
}

console.log("Production bundle QA passed: one Projects roller, Story-style layout CSS, stable AppSec artwork, animated Windows visual, assistants, and project links are present");
