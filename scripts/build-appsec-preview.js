const fs = require("fs");
const path = require("path");

const chunkFiles = [
  "appsecPreviewChunk0.js",
  "appsecPreviewChunk1.js",
  "appsecPreviewChunk2.js",
  "appsecPreviewChunk3.js",
  "appsecPreviewChunk4.js",
];

const imageDir = path.join(__dirname, "..", "src", "images");
const base64 = chunkFiles
  .map((file) => {
    const source = fs.readFileSync(path.join(imageDir, file), "utf8");
    const match = source.match(/const chunk = "([^"]*)";/);
    if (!match) throw new Error(`Could not read screenshot data from ${file}`);
    return match[1];
  })
  .join("");

const output = Buffer.from(base64, "base64");
if (output[0] !== 0xff || output[1] !== 0xd8) {
  throw new Error("Generated AppSec preview is not a valid JPEG");
}

fs.writeFileSync(path.join(imageDir, "appsec-vulnerability-manager.jpg"), output);
console.log(`Generated AppSec portfolio preview (${output.length} bytes)`);
