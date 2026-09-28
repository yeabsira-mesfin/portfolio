const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const staticJsDir = path.join(buildDir, "static", "js");
const windowsPreviewPath = path.join(buildDir, "windows-reliability-preview.html");

if (!fs.existsSync(staticJsDir)) {
  throw new Error("Build QA failed: build/static/js does not exist");
}

if (!fs.existsSync(windowsPreviewPath)) {
  throw new Error("Build QA failed: crisp Windows reliability preview is missing");
}

const bundle = fs
  .readdirSync(staticJsDir)
  .filter((name) => name.endsWith(".js"))
  .map((name) => fs.readFileSync(path.join(staticJsDir, name), "utf8"))
  .join("\n");

const count = (value) => bundle.split(value).length - 1;
const topMobileCount = count("data-project-gear-mobile-top");
const allMobileGearMarkers = count("data-project-gear-mobile");
const lowerMobileCount = allMobileGearMarkers - topMobileCount;
const projectSceneCount = count("data-project-scene");

if (topMobileCount !== 1) {
  throw new Error(`Build QA failed: expected exactly 1 top mobile project roller, found ${topMobileCount}`);
}

if (lowerMobileCount !== 0) {
  throw new Error(`Build QA failed: expected 0 lower mobile project rollers, found ${lowerMobileCount}`);
}

if (projectSceneCount !== 1) {
  throw new Error(`Build QA failed: expected exactly 1 Projects scene marker, found ${projectSceneCount}`);
}

if (!bundle.includes("AppSec Vulnerability Manager")) {
  throw new Error("Build QA failed: AppSec Vulnerability Manager is missing from the production bundle");
}

if (!bundle.includes("https://appsec-vulnerability-manager.vercel.app/")) {
  throw new Error("Build QA failed: AppSec live product URL is missing from the production bundle");
}

if (!bundle.includes("Windows Infrastructure Reliability Console")) {
  throw new Error("Build QA failed: Windows Infrastructure Reliability Console is missing from the production bundle");
}

if (!bundle.includes("/windows-reliability-preview.html")) {
  throw new Error("Build QA failed: Windows project is not using the crisp native preview");
}

if (!bundle.includes("Click to explore more") || !bundle.includes("Open portfolio assistant")) {
  throw new Error("Build QA failed: portfolio assistant navigation content is incomplete");
}

console.log("Production bundle QA passed: rollers, Projects scene, assistants, AppSec, and crisp Windows preview are correct");
