const { chromium } = require("playwright");
const fs = require("fs");

async function inspectHome() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`file://${__dirname}/_ref/home.html`, { waitUntil: "domcontentloaded" });

  const sectionAnalysis = await page.evaluate(() => {
    const results = [];
    // Find navbar
    const nav = document.querySelector(".navbar, nav");
    if (nav) {
      results.push({
        type: "navbar",
        className: nav.className,
        html: nav.outerHTML.substring(0, 500)
      });
    }

    // Find all sections
    const sections = Array.from(document.querySelectorAll("section"));
    sections.forEach((sec, idx) => {
      const h1 = sec.querySelector("h1")?.textContent.trim();
      const h2 = sec.querySelector("h2")?.textContent.trim();
      const h3 = sec.querySelector("h3")?.textContent.trim();
      const p = sec.querySelector("p")?.textContent.trim();
      const buttons = Array.from(sec.querySelectorAll("a, button")).map(b => ({
        text: b.textContent.trim().replace(/\s+/g, " "),
        className: b.className
      }));
      const images = Array.from(sec.querySelectorAll("img")).map(img => ({
        src: img.src,
        className: img.className,
        alt: img.alt
      }));

      // layout info
      const cs = window.getComputedStyle(sec);
      const rect = sec.getBoundingClientRect();

      // inner structure
      const containers = Array.from(sec.children).map(c => ({
        tag: c.tagName.toLowerCase(),
        className: c.className,
        childrenCount: c.children.length
      }));

      results.push({
        index: idx,
        className: sec.className,
        height: Math.round(rect.height),
        bgColor: cs.backgroundColor,
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        headings: { h1, h2, h3 },
        excerpt: p ? p.substring(0, 100) : "",
        buttons: buttons.slice(0, 5),
        images: images.slice(0, 5),
        containers
      });
    });

    return results;
  });

  console.log(JSON.stringify(sectionAnalysis, null, 2));
  fs.writeFileSync("./docs/reference/section-analysis.json", JSON.stringify(sectionAnalysis, null, 2), "utf8");
  await browser.close();
}

inspectHome().catch(console.error);
