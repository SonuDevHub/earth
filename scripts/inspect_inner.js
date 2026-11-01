const { chromium } = require("playwright");
const fs = require("fs");

async function inspectInner() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const pages = ["about", "campaign", "campaign-detail", "contact"];

  const results = {};

  for (const p of pages) {
    await page.goto(`file://${__dirname}/_ref/${p}.html`, { waitUntil: "domcontentloaded" });
    const sections = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("section, [class*='section']")).map(s => {
        const h1 = s.querySelector("h1")?.textContent.trim();
        const h2 = s.querySelector("h2")?.textContent.trim();
        const h3 = s.querySelector("h3")?.textContent.trim();
        const pTag = s.querySelector("p")?.textContent.trim();
        const rect = s.getBoundingClientRect();
        return {
          className: s.className,
          height: Math.round(rect.height),
          heading: h1 || h2 || h3 || "",
          excerpt: pTag ? pTag.substring(0, 80) : ""
        };
      });
    });
    results[p] = sections;
  }

  console.log(JSON.stringify(results, null, 2));
  fs.writeFileSync("./docs/reference/inner-pages-analysis.json", JSON.stringify(results, null, 2), "utf8");
  await browser.close();
}

inspectInner().catch(console.error);
