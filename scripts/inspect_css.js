const fs = require("fs");

const css = fs.readFileSync("./_ref/reference.css", "utf8");

function findRule(selector) {
  const regex = new RegExp(`(?:^|[}\\s])${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*{([^}]*)}`, "i");
  const m = css.match(regex);
  return m ? m[1].trim() : null;
}

const selectors = [
  ".container",
  ".navbar",
  ".menu-item",
  ".nav-button-v2",
  ".white-button",
  ".green-button",
  ".text-button",
  ".h1-left",
  ".h2-left",
  ".h3-left",
  ".h4-left",
  ".p1-left",
  ".p2-left",
  ".hero-section",
  ".vision-mission-section",
  ".about-section",
  ".initiatives-section",
  ".number-section",
  ".featured-section",
  ".cta-section",
  ".footer-section"
];

selectors.forEach(sel => {
  console.log(`=== ${sel} ===\n${findRule(sel) || "Not directly found in css"}\n`);
});
