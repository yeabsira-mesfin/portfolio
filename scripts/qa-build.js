const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const staticJsDir = path.join(buildDir, "static", "js");

if (!fs.existsSync(staticJsDir)) {
  throw new Error("Build QA failed: build/static/js does not exist");
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
const journeyRobotCount = count("data-journey-robot");

if (topMobileCount !== 1) {
  throw new Error(`Build QA failed: expected exactly 1 top mobile project roller, found ${topMobileCount}`);
}

if (lowerMobileCount !== 0) {
  throw new Error(`Build QA failed: expected 0 lower mobile project rollers, found ${lowerMobileCount}`);
}

if (projectSceneCount !== 1) {
  throw new Error(`Build QA failed: expected exactly 1 Projects scene marker, found ${projectSceneCount}`);
}

if (journeyRobotCount !== 1) {
  throw new Error(`Build QA failed: expected exactly 1 journey robot marker, found ${journeyRobotCount}`);
}

if (!bundle.includes("AppSec Vulnerability Manager")) {
  throw new Error("Build QA failed: AppSec Vulnerability Manager is missing from the production bundle");
}

if (!bundle.includes("https://appsec-vulnerability-manager.vercel.app/")) {
  throw new Error("Build QA failed: AppSec live product URL is missing from the production bundle");
}

console.log("Production bundle QA passed: roller count, project scene, robot, and AppSec project are correct");
