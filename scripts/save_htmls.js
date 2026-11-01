const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function saveHtmls() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  if (!fs.existsSync("./_ref")) fs.mkdirSync("./_ref");
  
  const urls = [
    { name: "home.html", url: "https://onearth-conservation.webflow.io/" },
    { name: "about.html", url: "https://onearth-conservation.webflow.io/about" },
    { name: "campaign.html", url: "https://onearth-conservation.webflow.io/campaign" },
    { name: "campaign-detail.html", url: "https://onearth-conservation.webflow.io/product/coral-reef-revival" },
    { name: "contact.html", url: "https://onearth-conservation.webflow.io/contact" }
  ];
  
  for (const item of urls) {
    await page.goto(item.url, { waitUntil: "domcontentloaded" });
    const content = await page.content();
    fs.writeFileSync(path.join("./_ref", item.name), content, "utf8");
    console.log(`Saved ${item.name} (${content.length} bytes)`);
  }
  
  await browser.close();
}

saveHtmls().catch(console.error);
