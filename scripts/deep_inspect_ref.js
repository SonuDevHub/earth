const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function deepInspect() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`file://${__dirname}/../_ref/home.html`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  const analysis = await page.evaluate(() => {
    function getComp(el) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        class: el.className,
        width: Math.round(r.width),
        height: Math.round(r.height),
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
        border: `${cs.borderWidth} ${cs.borderStyle} ${cs.borderColor}`,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow,
        display: cs.display,
        gap: cs.gap,
        position: cs.position,
        zIndex: cs.zIndex
      };
    }

    const components = {};

    // 1. Nav & Buttons
    components.navbar = getComp(document.querySelector(".navbar"));
    components.navWrap = getComp(document.querySelector(".nav-wrap"));
    components.brandLink = getComp(document.querySelector(".brand-link"));
    components.menuItemNav = getComp(document.querySelector(".menu-item-nav"));
    components.menuItem = getComp(document.querySelector(".menu-item"));
    components.navButtonV2 = getComp(document.querySelector(".nav-button-v2"));
    components.whiteButton = getComp(document.querySelector(".white-button"));
    components.greenButton = getComp(document.querySelector(".green-button"));
    components.textButton = getComp(document.querySelector(".text-button"));

    // 2. Sections
    const sections = Array.from(document.querySelectorAll("section, [class*='section']")).map(s => {
      const c = getComp(s);
      c.innerHTMLSnippet = s.innerHTML.substring(0, 300);
      return c;
    });

    // 3. Specific components
    components.campaignFeatured = getComp(document.querySelector(".campaign-featured"));
    components.initiativeCard = getComp(document.querySelector(".initiatives-card, [class*='initiatives-wrap']"));
    components.numberBlock = getComp(document.querySelector(".number-wrap, .number-card, .number-section"));
    components.projectCard = getComp(document.querySelector(".featured-card, .project-card, .collection-item"));
    components.marquee = getComp(document.querySelector(".partnership-wrap, .partnership-marquee, .marquee"));
    components.ctaBox = getComp(document.querySelector(".cta-wrap, .cta-box, .cta-section"));
    components.faqItem = getComp(document.querySelector(".faq-item, .accordion-item, .faq-wrap"));
    components.footer = getComp(document.querySelector(".footer-section, .footer"));

    // 4. Detailed HTML structure of the 12 sections
    const sectionStructures = Array.from(document.body.children).map(c => {
      return {
        tag: c.tagName.toLowerCase(),
        className: c.className,
        html: c.outerHTML.substring(0, 1500)
      };
    });

    return { components, sections, sectionStructures };
  });

  fs.writeFileSync(path.join(__dirname, "../docs/reference/deep-components.json"), JSON.stringify(analysis, null, 2), "utf8");
  console.log("Deep component extraction saved to docs/reference/deep-components.json");

  await browser.close();
}

deepInspect().catch(console.error);

