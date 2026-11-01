const fs = require("fs");
const css = fs.readFileSync("./_ref/reference.css", "utf8");

const rootMatch = css.match(/:root\s*{([^}]*)}/i);
if (rootMatch) {
  console.log("=== :root VARIABLES ===");
  const vars = rootMatch[1].split(";").map(v => v.trim()).filter(Boolean);
  vars.forEach(v => console.log(v));
} else {
  console.log("No :root found, searching for -- variables...");
  const varMatches = css.match(/--[a-zA-Z0-9_-]+:\s*[^;]+/g) || [];
  [...new Set(varMatches)].slice(0, 50).forEach(v => console.log(v));
}
