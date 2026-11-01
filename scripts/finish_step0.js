const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const VIDEOS_DIR = path.join(__dirname, "docs", "reference", "videos");
if (!fs.existsSync(VIDEOS_DIR)) fs.mkdirSync(VIDEOS_DIR, { recursive: true });

async function finishStep0() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop video
  console.log("Recording desktop slow scroll & interaction video...");
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: { dir: VIDEOS_DIR, size: { width: 1440, height: 900 } }
    });
    const page = await context.newPage();
    await page.goto("https://onearth-conservation.webflow.io/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Hover nav links
    await page.hover(".menu-item", { timeout: 1000 }).catch(() => {});
    await page.waitForTimeout(300);
    await page.hover(".nav-button-v2", { timeout: 1000 }).catch(() => {});
    await page.waitForTimeout(300);

    // Scroll smoothly down
    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= totalHeight; y += 400) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(500);
    await context.close();
  }

  // 2. Mobile video
  console.log("Recording mobile slow scroll & mobile menu video...");
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      recordVideo: { dir: VIDEOS_DIR, size: { width: 390, height: 844 } }
    });
    const page = await context.newPage();
    await page.goto("https://onearth-conservation.webflow.io/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Click burger
    const burger = await page.$(".burger-menu, .w-nav-button");
    if (burger) {
      await burger.click();
      await page.waitForTimeout(600);
      await burger.click();
      await page.waitForTimeout(400);
    }

    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= totalHeight; y += 500) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(500);
    await context.close();
  }

  // 3. Extract styles & motion stack
  console.log("Extracting computed styles and motion stack...");
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto("https://onearth-conservation.webflow.io/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const extracted = await page.evaluate(() => {
      function getElementSpec(selector) {
        const el = document.querySelector(selector);
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
          selector,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          textTransform: cs.textTransform,
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
          margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
          borderRadius: cs.borderRadius,
          border: `${cs.borderWidth} ${cs.borderStyle} ${cs.borderColor}`,
          transition: cs.transition
        };
      }

      const typoTags = [
        "h1", "h2", "h3", "h4", "h5", "h6", "p",
        ".menu-item", ".nav-button-v2", ".hero-heading",
        ".p1-left", ".p2-left", ".h1-left", ".h2-left", ".h3-left", ".h4-left", ".h5-left",
        ".tag", ".label", ".caption", ".hero-wrap", ".container"
      ];
      const typoSpecs = {};
      typoTags.forEach(t => {
        const spec = getElementSpec(t);
        if (spec) typoSpecs[t] = spec;
      });

      const sectionDetails = [];
      document.querySelectorAll("section, [class*='section'], header, footer").forEach((sec, i) => {
        const cs = window.getComputedStyle(sec);
        const rect = sec.getBoundingClientRect();
        const h = sec.querySelector("h1, h2, h3, h4");
        sectionDetails.push({
          index: i,
          tag: sec.tagName.toLowerCase(),
          className: sec.className,
          heading: h ? h.textContent.trim().substring(0, 80) : "",
          height: Math.round(rect.height),
          bgColor: cs.backgroundColor,
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`
        });
      });

      const motionStack = {
        hasGSAP: typeof window.gsap !== "undefined",
        hasScrollTrigger: typeof window.ScrollTrigger !== "undefined",
        hasLenis: typeof window.Lenis !== "undefined",
        hasLocomotive: typeof window.LocomotiveScroll !== "undefined",
        hasWebflowIX2: typeof window.Webflow !== "undefined" && typeof window.Webflow.require === "function" ? !!window.Webflow.require("ix2") : false,
        dataWIdsCount: document.querySelectorAll("[data-w-id]").length,
        keyframesCount: Array.from(document.styleSheets).reduce((acc, sheet) => {
          try {
            return acc + Array.from(sheet.cssRules || []).filter(r => r.type === CSSRule.KEYFRAMES_RULE).length;
          } catch(e) { return acc; }
        }, 0)
      };

      let ix2Data = null;
      try {
        if (window.Webflow && window.Webflow.require) {
          const ix2 = window.Webflow.require("ix2");
          if (ix2 && ix2.store) {
            ix2Data = ix2.store.getState();
          }
        }
      } catch(e) {}

      return {
        title: document.title,
        sectionDetails,
        typoSpecs,
        motionStack,
        ix2Data
      };
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);

    const mobileExtracted = await page.evaluate(() => {
      function getElementSpec(selector) {
        const el = document.querySelector(selector);
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
          selector,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`
        };
      }
      const typoTags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", ".menu-item", ".nav-button-v2", ".hero-heading", ".p1-left", ".p2-left", ".h1-left", ".h2-left", ".h3-left", ".h4-left", ".h5-left"];
      const typoSpecs = {};
      typoTags.forEach(t => {
        const spec = getElementSpec(t);
        if (spec) typoSpecs[t] = spec;
      });
      return typoSpecs;
    });

    const fullData = {
      desktop: extracted,
      mobileTypo: mobileExtracted
    };

    fs.writeFileSync(path.join(__dirname, "docs", "reference", "extracted-data.json"), JSON.stringify(fullData, null, 2), "utf8");
    console.log("Saved extracted data to /docs/reference/extracted-data.json");
    await context.close();
  }

  await browser.close();
  console.log("Finish step 0 complete!");
}

finishStep0().catch(console.error);
