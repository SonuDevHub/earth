const fs = require("fs");

const homeHtml = fs.readFileSync("./_ref/home.html", "utf8");

// Find all sections or primary wrappers
const sections = [];
const secRegex = /<section[^>]*class="([^"]*)"[^>]*>|<div[^>]*class="([^"]*section[^"]*)"[^>]*>/gi;
let match;
while ((match = secRegex.exec(homeHtml)) !== null) {
  sections.push(match[1] || match[2]);
}

console.log("Sections found in home.html:", sections);

// Check headings
const h1s = homeHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
const h2s = homeHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
const h3s = homeHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];

console.log("\nH1s:", h1s.map(h => h.replace(/<[^>]+>/g, "").trim()));
console.log("\nH2s:", h2s.map(h => h.replace(/<[^>]+>/g, "").trim()));
console.log("\nH3s:", h3s.map(h => h.replace(/<[^>]+>/g, "").trim()));

// Check buttons
const buttons = homeHtml.match(/class="[^"]*(?:btn|button)[^"]*"/gi) || [];
console.log("\nButton classes:", [...new Set(buttons)]);

// Check containers
const containers = homeHtml.match(/class="[^"]*container[^"]*"/gi) || [];
console.log("\nContainer classes:", [...new Set(containers)]);
