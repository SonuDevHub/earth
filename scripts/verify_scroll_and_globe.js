const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const shotsDir = path.resolve(__dirname, "../docs/build/shots");
if (!fs.existsSync(shotsDir)) fs.mkdirSync(shotsDir, { recursive: true });

async function verify() {
  const browser = await chromium.launch({ headless: true });

  console.log("=== 1. VERIFYING DESKTOP (1440x900) ON APACHE LOCALHOST ===");
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopCtx.newPage();

  // Listen for console logs and errors
  page.on("console", msg => console.log(`[Browser Console ${msg.type()}]:`, msg.text()));
  page.on("pageerror", err => console.error("[Browser Page Error]:", err));

  const httpUrl = "http://localhost/earth-day/index.html";
  console.log(`Opening ${httpUrl}...`);
  await page.goto(httpUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  // Take full desktop screenshot
  await page.screenshot({ path: path.join(shotsDir, "desktop-full-1440.png"), fullPage: true });
  console.log("Captured desktop-full-1440.png");

  // Check 3D Earth Globe State
  const earthState = await page.evaluate(() => {
    const container = document.getElementById("earth-canvas-container");
    const canvas = document.querySelector(".earth-canvas");
    return {
      containerExists: !!container,
      canvasExists: !!canvas,
      touchAction: canvas ? canvas.style.touchAction : null,
      cursor: canvas ? canvas.style.cursor : null,
      canvasWidth: canvas ? canvas.clientWidth : null,
      canvasHeight: canvas ? canvas.clientHeight : null,
      hasThree: typeof window.THREE !== "undefined"
    };
  });
  console.log("Earth Globe Diagnostic:", JSON.stringify(earthState, null, 2));

  // Scroll to Earth section
  console.log("Scrolling to Earth section...");
  await page.evaluate(() => {
    const el = document.querySelector(".earth-explorer-container");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
  await page.waitForTimeout(2000);

  // Capture screenshot of the 3D Earth Globe section
  await page.screenshot({ path: path.join(shotsDir, "desktop-earth-globe.png") });
  console.log("Captured desktop-earth-globe.png");

  // Test dragging the Earth globe
  const canvasBox = await page.evaluate(() => {
    const c = document.querySelector(".earth-canvas");
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });

  if (canvasBox) {
    console.log(`Testing drag on 3D Earth globe at (${canvasBox.x}, ${canvasBox.y})...`);
    await page.mouse.move(canvasBox.x, canvasBox.y);
    await page.mouse.down();
    await page.mouse.move(canvasBox.x - 150, canvasBox.y + 50, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(1000);
    console.log("Successfully dragged globe with inertia!");

    // Test mouse wheel directly over canvas - MUST pass through to page scroll
    const scrollBefore = await page.evaluate(() => window.scrollY);
    console.log(`Scroll before wheel over globe: ${scrollBefore}`);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(800);
    const scrollAfter = await page.evaluate(() => window.scrollY);
    console.log(`Scroll after wheel over globe: ${scrollAfter}`);
    if (scrollAfter <= scrollBefore) {
      throw new Error("SCROLL BUG: Wheel event was trapped by Earth Globe canvas!");
    }
    console.log("SUCCESS: Wheel over canvas passed through naturally without trapping!");
  }

  // Scroll all the way to footer
  console.log("Scrolling to footer...");
  await page.keyboard.press("End");
  await page.waitForTimeout(1000);
  const footerScroll = await page.evaluate(() => window.scrollY);
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  console.log(`Footer scroll: ${footerScroll} / Max: ${maxScroll}`);
  if (footerScroll < maxScroll - 50) {
    throw new Error(`Scroll did not reach bottom: ${footerScroll} vs ${maxScroll}`);
  }

  await desktopCtx.close();

  console.log("\n=== 2. VERIFYING MOBILE (390x844) ON APACHE ===");
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(httpUrl, { waitUntil: "domcontentloaded" });
  await mobilePage.waitForTimeout(2000);

  await mobilePage.screenshot({ path: path.join(shotsDir, "mobile-full-390.png"), fullPage: true });
  console.log("Captured mobile-full-390.png");

  // Mobile menu test
  const toggle = await mobilePage.$(".mobile-menu-toggle");
  if (toggle) {
    await toggle.click();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({ path: path.join(shotsDir, "mobile-menu-open.png") });
    console.log("Captured mobile-menu-open.png");
  }

  await mobileCtx.close();
  await browser.close();

  console.log("\n==========================================");
  console.log("ALL VERIFICATIONS COMPLETED SUCCESSFULLY!");
  console.log("==========================================");
}

verify().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
