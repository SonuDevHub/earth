const fs = require("fs");
const cheerio = require("cheerio"); // let's see if cheerio or regex

// Let's use standard node string/DOM parser or regex
const html = fs.readFileSync("./_ref/home.html", "utf8");

// Print navbar structure
const navMatch = html.match(/<div[^>]*class="[^"]*navbar[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i);
if (navMatch) {
  console.log("=== NAVBAR MATCH ===");
  console.log(navMatch[0].substring(0, 800));
}

// Find all section elements
const secRegex = /<(section|div)[^>]*class="([^"]*(?:section|wrap|hero|footer)[^"]*)"[^>]*>/gi;
let m;
console.log("\n=== ALL SECTIONS / WRAPS ===");
while ((m = secRegex.exec(html)) !== null) {
  console.log(m[0]);
}
