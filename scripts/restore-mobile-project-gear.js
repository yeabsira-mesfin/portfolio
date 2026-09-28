const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "Components", "CinematicPortfolio.jsx");
let source = fs.readFileSync(filePath, "utf8");

const sceneMarker = `
            <div data-project-scene="true" className="mx-auto min-h-[100dvh] w-full max-w-[1480px] px-5 pb-10 pt-28 sm:px-7 lg:px-8 lg:pt-24">
              <div className="grid min-h-[calc(100dvh-8rem)] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_220px_minmax(0,1fr)] xl:gap-6">
`;

const desktopGearMarker = `
                <div data-project-gear="true" className="hidden xl:flex xl:flex-col xl:items-center xl:justify-center xl:self-center">
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

const lowerMobileGear = `
                <div data-project-gear-mobile="true" className="flex flex-col items-center justify-center py-2 xl:hidden">
                  <div className="w-full max-w-[210px]">
                    <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} compact showSceneNav={false} />
                  </div>
                  <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[.2em] text-[#A8D8D2]/24">rotating project mechanism</p>
                </div>

`;

if (!source.includes('data-project-gear-mobile-top="true"')) {
  if (!source.includes(sceneMarker)) {
    throw new Error("Could not locate the project scene layout");
  }
  source = source.replace(sceneMarker, topMobileGear);
}

if (!source.includes('data-project-gear-mobile="true"')) {
  if (!source.includes(desktopGearMarker)) {
    throw new Error("Could not locate the desktop project gear block");
  }
  source = source.replace(desktopGearMarker, lowerMobileGear + desktopGearMarker);
}

fs.writeFileSync(filePath, source);
console.log("Restored the project roller at the top and lower project area on mobile/tablet");
