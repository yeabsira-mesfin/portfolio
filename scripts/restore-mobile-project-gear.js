const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "Components", "CinematicPortfolio.jsx");
let source = fs.readFileSync(filePath, "utf8");

const sceneMarker = `
            <div data-project-scene="true" className="mx-auto min-h-[100dvh] w-full max-w-[1480px] px-5 pb-10 pt-28 sm:px-7 lg:px-8 lg:pt-24">
              <div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">
`;

const topMobileGear = `
            <div data-project-scene="true" className="mx-auto min-h-[100dvh] w-full max-w-[1480px] px-5 pb-10 pt-28 sm:px-7 lg:px-8 lg:pt-24">
              <div data-project-gear-mobile-top="true" className="mb-5 flex flex-col items-center justify-center xl:hidden">
                <div className="w-full max-w-[235px]">
                  <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} compact showSceneNav={false} />
                </div>
                <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[.2em] text-[#A8D8D2]/24">rotating project mechanism</p>
              </div>
              <div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">
`;

const legacyLowerMobileGear = `
                <div data-project-gear-mobile="true" className="flex flex-col items-center justify-center py-2 xl:hidden">
                  <div className="w-full max-w-[210px]">
                    <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} compact showSceneNav={false} />
                  </div>
                  <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[.2em] text-[#A8D8D2]/24">rotating project mechanism</p>
                </div>

`;

// Remove the older second mobile roller if it exists from a previous build transform.
source = source.replaceAll(legacyLowerMobileGear, "");

// Keep exactly one mobile/tablet roller, at the top of the Projects scene.
if (!source.includes('data-project-gear-mobile-top="true"')) {
  if (!source.includes(sceneMarker)) {
    throw new Error("Could not locate the project scene layout");
  }
  source = source.replace(sceneMarker, topMobileGear);
}

const topCount = (source.match(/data-project-gear-mobile-top="true"/g) || []).length;
const lowerCount = (source.match(/data-project-gear-mobile="true"/g) || []).length;

if (topCount !== 1 || lowerCount !== 0) {
  throw new Error(`Project roller QA failed: expected 1 top mobile roller and 0 lower rollers, found ${topCount} top and ${lowerCount} lower`);
}

fs.writeFileSync(filePath, source);
console.log("Project roller QA passed: one mobile/tablet roller at the top, no duplicate lower roller");
