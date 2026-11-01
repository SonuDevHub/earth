const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const SHOTS_DIR = path.join(__dirname, "docs", "reference", "shots");
const VIDEOS_DIR = path.join(__dirname, "docs", "reference", "videos");

if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });
if (!fs.existsSync(VIDEOS_DIR)) fs.mkdirSync(VIDEOS_DIR, { recursive: true });

async function runStep0() {
  console.log("Launching Chromium...");
  const browser = await chromium.launch({ headless: true });

  // 1. Full-page screenshots at 1440x900, 1024x768, 768x1024, 390x844
  const viewports = [
    { name: "1440", width: 1440, height: 900 },
    { name: "1024", width: 1024, height: 768 },
    { name: "768", width: 768, height: 1024 },
    { name: "390", width: 390, height: 844, isMobile: true }
  ];

  const pagesToCapture = [
    { name: "home", url: "https://onearth-conservation.webflow.io/" },
    { name: "about", url: "https://onearth-conservation.webflow.io/about" },
    { name: "campaign", url: "https://onearth-conservation.webflow.io/campaign" },
    { name: "campaign-detail", url: "https://onearth-conservation.webflow.io/product/coral-reef-revival" },
    { name: "contact", url: "https://onearth-conservation.webflow.io/contact" }
  ];

  for (const vp of viewports) {
    console.log(`Capturing viewports for ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: !!vp.isMobile
    });
    const page = await context.newPage();

    for (const p of pagesToCapture) {
      if (vp.name !== "1440" && p.name !== "home") {
        if (vp.name !== "390") continue;
      }
      console.log(`Navigating to ${p.url} at ${vp.name}...`);
      await page.goto(p.url, { waitUntil: "domcontentloaded", timeout: 15000 }).catch(e => console.warn(e.message));
      await page.waitForTimeout(1500);
      const outPath = path.join(SHOTS_DIR, `${p.name}-full-${vp.name}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Saved screenshot: ${outPath}`);
    }
    await context.close();
  }

  // 2. Viewport-height step scrolling on 1440x900 with 400ms and 1200ms captures
  console.log("Starting viewport-height step scroll capture on desktop (1440x900)...");
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto("https://onearth-conservation.webflow.io/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = 900;
    const steps = Math.ceil(totalHeight / viewportHeight);
    console.log(`Total height: ${totalHeight}px, steps: ${steps}`);

    for (let step = 0; step < steps; step++) {
      const scrollY = step * viewportHeight;
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollY);
      
      // Step immediate
      await page.screenshot({ path: path.join(SHOTS_DIR, `step-${step}-0ms.png`) });
      // Step 400ms
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SHOTS_DIR, `step-${step}-400ms.png`) });
      // Step 1200ms
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(SHOTS_DIR, `step-${step}-1200ms.png`) });
      console.log(`Captured step ${step}/${steps} (y=${scrollY})`);
    }
    await context.close();
  }

  // 3. Record videos: desktop slow scroll + hovers & mobile slow scroll + mobile menu
  console.log("Recording desktop slow scroll & interaction video...");
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: { dir: VIDEOS_DIR, size: { width: 1440, height: 900 } }
    });
    const page = await context.newPage();
    await page.goto("https://onearth-conservation.webflow.io/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);

    // Hover nav links
    const navLinks = await page.$$(".menu-item, .nav-button-v2, .brand-link");
    for (const nl of navLinks) {
      await nl.hover().catch(() => {});
      await page.waitForTimeout(200);
    }

    // Scroll down
    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    const scrollStep = 200;
    for (let y = 0; y <= totalHeight; y += scrollStep) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(80);

      if (y % 800 === 0) {
        const hoverTargets = await page.$$(".button-primary, .button-secondary, .project-card, .collection-item, a");
        for (let i = 0; i < Math.min(2, hoverTargets.length); i++) {
          await hoverTargets[i].hover().catch(() => {});
          await page.waitForTimeout(150);
        }
      }
    }
    await page.waitForTimeout(500);
    await context.close();
  }

  console.log("Recording mobile slow scroll & mobile menu video...");
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      recordVideo: { dir: VIDEOS_DIR, size: { width: 390, height: 844 } }
    });
    const page = await context.newPage();
    await page.goto("https://onearth-conservation.webflow.io/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);

    // Open mobile menu
    const burger = await page.$(".burger-menu, .w-nav-button");
    if (burger) {
      console.log("Clicking burger menu...");
      await burger.click();
      await page.waitForTimeout(500);
      const mobileNavLinks = await page.$$(".nav-menu a");
      for (const mnl of mobileNavLinks) {
        await mnl.hover().catch(() => {});
        await page.waitForTimeout(150);
      }
      await burger.click();
      await page.waitForTimeout(400);
    }

    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= totalHeight; y += 250) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(500);
    await context.close();
  }

  // 4 & 5. Deep Style & Motion Stack Extraction
  console.log("Extracting computed styles and motion stack...");
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto("https://onearth-conservation.webflow.io/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

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

      const elements = Array.from(document.body.children).map((el, idx) => {
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          index: idx,
          tag: el.tagName.toLowerCase(),
          className: el.className,
          id: el.id,
          height: rect.height,
          backgroundColor: cs.backgroundColor,
          paddingTop: cs.paddingTop,
          paddingBottom: cs.paddingBottom,
          paddingLeft: cs.paddingLeft,
          paddingRight: cs.paddingRight,
          display: cs.display,
          position: cs.position
        };
      });

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
        elements,
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
  console.log("Step 0 reference capture complete!");
}

runStep0().catch(console.error);
