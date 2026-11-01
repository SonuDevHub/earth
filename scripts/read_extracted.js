const fs = require("fs");
const data = JSON.parse(fs.readFileSync("docs/reference/extracted-data.json", "utf8"));

console.log("=== DESKTOP TYPOGRAPHY ===");
console.log(JSON.stringify(data.desktop.typoSpecs, null, 2));

console.log("\n=== MOBILE TYPOGRAPHY ===");
console.log(JSON.stringify(data.mobileTypo, null, 2));

console.log("\n=== MOTION STACK ===");
console.log(JSON.stringify(data.desktop.motionStack, null, 2));

console.log("\n=== SECTIONS ===");
data.desktop.sectionDetails.forEach(s => {
  console.log(`[${s.index}] <${s.tag} class="${s.className}"> H:${s.height}px bg:${s.bgColor} pad:${s.padding} heading:"${s.heading}"`);
});

if (data.desktop.ix2Data) {
  console.log("\n=== WEBFLOW IX2 DATA KEYS ===");
  console.log(Object.keys(data.desktop.ix2Data));
  if (data.desktop.ix2Data.events) {
    console.log("Events count:", Object.keys(data.desktop.ix2Data.events).length);
  }
}
