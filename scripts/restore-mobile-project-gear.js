const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "Components", "CinematicPortfolio.jsx");
let source = fs.readFileSync(filePath, "utf8");

const marker = `
                <div data-project-gear="true" className="hidden xl:flex xl:flex-col xl:items-center xl:justify-center xl:self-center">
`;

const mobileGear = `
                <div data-project-gear-mobile="true" className="flex flex-col items-center justify-center py-2 xl:hidden">
                  <div className="w-full max-w-[210px]">
                    <Gear scene={scene} wheelTurn={wheelTurn} reduceMotion={reduceMotion} onNavigate={navigate} compact showSceneNav={false} />
                  </div>
                  <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[.2em] text-[#A8D8D2]/24">rotating project mechanism</p>
                </div>

`;

if (!source.includes('data-project-gear-mobile="true"')) {
  if (!source.includes(marker)) {
    throw new Error("Could not locate the desktop project gear block");
  }
  source = source.replace(marker, mobileGear + marker);
  fs.writeFileSync(filePath, source);
  console.log("Restored the compact project gear on mobile and tablet layouts");
} else {
  console.log("Mobile project gear is already present");
}
