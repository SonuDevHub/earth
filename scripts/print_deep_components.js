const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./docs/reference/deep-components.json", "utf8"));

console.log("=== MEASURED COMPONENTS ===");
for (const [name, comp] of Object.entries(data.components)) {
  if (comp) {
    console.log(`\n--- ${name} ---`);
    console.log(`Tag: <${comp.tag} class="${comp.class}">`);
    console.log(`Size: ${comp.width}x${comp.height}px | display: ${comp.display} | gap: ${comp.gap}`);
    console.log(`Font: ${comp.fontFamily} ${comp.fontSize} weight:${comp.fontWeight} lh:${comp.lineHeight}`);
    console.log(`Colors: color:${comp.color} bg:${comp.backgroundColor}`);
    console.log(`Border: ${comp.border} | radius:${comp.borderRadius} | shadow:${comp.boxShadow}`);
    console.log(`Padding: ${comp.padding} | Margin: ${comp.margin}`);
  }
}

