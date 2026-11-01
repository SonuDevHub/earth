# EARTHDAY.ORG Design Specification & Motion Blueprint
**Visual & Motion Spec Source:** https://onearth-conservation.webflow.io/  
**Brand & Identity Spec:** Official EARTHDAY.ORG Brand Style Guide  
**Captured Viewports & Artifacts:** `/docs/reference/shots/` (1440px, 1024px, 768px, 390px, step scrolls), `/docs/reference/videos/`

---

## 1. Section Inventory (Exact Flow & Architecture)

The site adopts the exact layout rhythm, typography scale, visual proportions, and motion mechanics of the reference site, mapped onto official EARTHDAY.ORG brand identity, colors, typography, and photography.

### Homepage Section Hierarchy
| # | Section Key | Reference Equivalent | Purpose & Content | Layout & Alignment | Background | Height (Desktop) |
|---|-------------|---------------------|-------------------|-------------------|------------|------------------|
| 0 | `header.site-header` | `.navbar` | Logo wordmark, global nav links, submenus, Give CTA, Join Us, search toggle | Contained `1440px`, flex space-between, fixed/floating top | Transparent on hero, solid Oxford Blue `#07074E` on scroll | 88px (top margin 40px initially) |
| 1 | `section.hero-section` | `.hero-section` | H1: "Join the world's largest environmental movement", lead paragraph, CTA "Explore our programs", featured project card ("Canopy Tree Project") | Asymmetric split, full-bleed 100vh with dark overlay, bottom featured card | Oxford Blue `#07074E` overlay on video / poster | 100vh (min 900px) |
| 2 | `section.vision-mission-section` | `.vision-mission-section` | Eyebrow "GUIDING OUR PATH", H2 statement: "BROADEN, EDUCATE, AND ACTIVATE THE ENVIRONMENTAL MOVEMENT WORLDWIDE", dual offset photography | Asymmetric 2-column offset: oversized typography left, dual staggered image collage right | Anti-Flash White `#EFF1F3` | ~620px |
| 3 | `section.about-spotlight-section` | `.about-section` | Eyebrow "EARTH DAY 2027", H2 "Food for Our Planet™", theme transformation text, CTAs "Explore the theme", "Partner with us" | Split narrative left with interactive featured campaign card right | Anti-Flash White `#EFF1F3` | ~750px |
| 4 | `section.initiatives-section` | `.initiatives-section` | Eyebrow "OUR PROGRAMS", H1 "What We Do", Canopy Tree Project, Great Global Cleanup, Climate Education, End Plastics | Left sticky/pinned overview + right stacked full-width programmatic cards with action links | Anti-Flash White `#EFF1F3` | ~760px |
| 5 | `section.impact-number-section` | `.number-section` | Stat numerals: 1970 (First Earth Day), 1B (Mobilized), 150K+ (Partners), 192 (Countries) | 4-column horizontal stat strip with hairline dividers and counting animations | Oxford Blue `#07074E` (Dark contrast container) | ~220px |
| 6 | `section.featured-campaigns-section`| `.featured-section` | Eyebrow "FEATURED CAMPAIGNS", H2 "Highlighted Environmental Action", Project cards with progress & CTAs | 3-column structured grid / draggable carousel with micro-details | Anti-Flash White `#EFF1F3` | ~1220px |
| 7 | `section.partnership-strip` | `.partnership-section` | Global coalition ticker: 150,000+ Partners Across 192 Countries | Full-bleed infinite horizontal marquee strip with velocity scrub | Tinted Anti-Flash `#E4E7EA` | ~90px |
| 8 | `section.earth-hub-section` | `.campaign-section` | Eyebrow "EARTH HUB", H2 "Your Guide to Environmental Action", Earth-from-space feature, toolkits & quizzes | Asymmetric full-bleed visual showcase + overlay content cards | Dark Oxford Blue `#07074E` | ~740px |
| 9 | `section.cta-banner` | `.cta-section` | H2 "Help Us Keep Up the Fight", donate & volunteer buttons | Contained accent block with high-contrast text and dual CTAs | Oxford Blue `#07074E` with Safety Orange `#F37321` CTA | ~500px |
| 10| `section.news-stories-section` | `.team-section` / list | Latest Stories: 6 curated articles from EARTHDAY.ORG, tags, dates, hover row reveals | Numbered / editorial article list with hover image reveals | Anti-Flash White `#EFF1F3` | ~640px |
| 11| `section.faq-accordion-section` | `.faq-section` | Eyebrow "FREQUENTLY ASKED QUESTIONS", H2 "All You Need to Know", 4-5 key questions | Clean accordion list with smooth GSAP height reveal and +/- icon rotation | Anti-Flash White `#EFF1F3` | ~660px |
| 12| `footer.site-footer` | `.footer-section` | Newsletter signup, 3 nav columns (Explore, Connect, Give), Washington D.C. headquarters, Charity Navigator badge, legal | Contained 4-column layout + full-width bottom copyright bar | Oxford Blue `#07074E` | ~450px |

---

## 2. Typography Specification (Montserrat Mapped Scale)

Following the brand specification: **Montserrat exclusively** across all weights, calibrated to match the reference site's exact sizes, letter-spacings, and line-heights.

| Element | Reference Token | Mapped Font | Desktop Size | Desktop Line-Height | Mobile Size (390px) | Mobile Line-Height | Weight | Letter-Spacing | Transform / Style |
|---------|-----------------|-------------|--------------|---------------------|---------------------|--------------------|--------|----------------|-------------------|
| Display / 404 | `--_font-size---display` | Montserrat | 220px – 320px | 1.0 (100%) | 96px | 1.0 | 800 ExtraBold | -0.04em | Uppercase |
| H1 (Hero) | `--_font-size---h1` | Montserrat | 86px | 1.15 (99px) | 38px – 42px | 1.15 (48px) | 800 ExtraBold | +0.035em | Uppercase / Sentence display |
| H2 (Section Title) | `--_font-size---h2` | Montserrat | 52px – 56px | 1.2 (65px) | 28px – 32px | 1.25 (38px) | 700 Bold | +0.03em | Sentence / Uppercase |
| H3 (Card / Block) | `--_font-size---h3` | Montserrat | 30px – 32px | 1.35 (42px) | 22px – 24px | 1.35 (32px) | 600 SemiBold | +0.02em | Sentence case |
| H4 (Subhead) | `--_font-size---h4` | Montserrat | 22px – 24px | 1.4 (32px) | 18px | 1.4 (25px) | 600 SemiBold | +0.02em | Sentence case |
| H5 (Small Head / UI) | `--_font-size---h5` | Montserrat | 18px | 1.4 (25px) | 16px | 1.4 (22px) | 600 SemiBold | +0.02em | Uppercase / Sentence |
| Body P1 (Lead / Main) | `--_font-size---p1` | Montserrat | 16px – 17px | 1.6 (26px) | 15px – 16px | 1.55 (24px) | 400 Regular | 0.0 | Balanced prose |
| Body P2 (Secondary) | `--_font-size---p2` | Montserrat | 14px | 1.5 (21px) | 13px | 1.5 (20px) | 400 Regular | 0.0 | Neutral tint |
| Eyebrow / Label | `--_font-size---label`| Montserrat | 11px – 12px | 1.2 (14px) | 11px | 1.2 (14px) | 700 Bold | +0.12em | Uppercase |
| Nav Link | `.menu-item` | Montserrat | 14px – 15px | 1.2 | 16px | 1.4 | 600 SemiBold | +0.04em | Uppercase |
| Button Text | `.white-button` | Montserrat | 14px – 15px | 1.0 | 14px | 1.0 | 700 Bold | +0.06em | Uppercase |

---

## 3. Spacing System & Grid

- **Container Max-Width:** `1440px`
- **Side Padding:** 
  - Desktop (>1024px): `64px` (`--spacing-5xl`)
  - Tablet (768px–1023px): `32px` (`--spacing-xxl`)
  - Mobile (<768px): `20px` (`--spacing-l`)
- **Vertical Section Spacing:**
  - Section Margin Top/Bottom: `120px` (`--spacing-8xl`) on desktop, `72px` on mobile
  - Compact Section Spacing: `80px` (`--spacing-7xl`)
- **Grid Gaps:** `32px` desktop, `20px` mobile
- **Borders & Dividers:** `1px solid rgba(7, 7, 78, 0.12)` on light sections, `1px solid rgba(239, 241, 243, 0.14)` on dark sections.
- **Border Radii (STRICT ANTI-AI CRAFT RULE):** `0px` to `2px` maximum. **NO 100px pills, NO rounded cards, NO shadows**.

---

## 4. Brand Palette Tokens (CSS Custom Properties)

```css
:root {
  /* Brand Core Spec */
  --oxford-blue: #07074E;
  --anti-flash: #EFF1F3;
  --safety-orange: #F37321;
  --chrome-yellow: #FDB714;
  --steel-blue: #2F83A6;
  --sea-green: #72B5B9;
  --white: #FFFFFF;

  /* Neutrals & Hairlines derived from Oxford Blue */
  --hairline-dark: rgba(7, 7, 78, 0.12);
  --hairline-light: rgba(239, 241, 243, 0.16);
  --oxford-blue-90: rgba(7, 7, 78, 0.92);
  --oxford-blue-70: rgba(7, 7, 78, 0.70);
  --text-muted: rgba(7, 7, 78, 0.65);
  --text-muted-dark: rgba(239, 241, 243, 0.70);

  /* Spacings */
  --spacing-xxs: 4px;
  --spacing-xs: 6px;
  --spacing-s: 8px;
  --spacing-m: 12px;
  --spacing-l: 16px;
  --spacing-xl: 24px;
  --spacing-xxl: 32px;
  --spacing-3xl: 40px;
  --spacing-4xl: 48px;
  --spacing-5xl: 64px;
  --spacing-7xl: 80px;
  --spacing-8xl: 120px;

  /* Typography */
  --font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 5. Navigation & Header Mechanics

- **Initial State:** Floating at top with `margin-top: 32px`, transparent background, white text and white logo.
- **Scroll Down State:** Smooth transition to fixed navbar with background `var(--oxford-blue-90)` backdrop-filter blur(0) or flat opaque, height compressed to 70px.
- **Scroll Direction Intelligence:** Hide on scroll down after 200px threshold, reveal immediately on scroll up with smooth GSAP slide-in (`y: 0`, `duration: 0.35s`, `ease: power3.out`).
- **Dropdowns:** Staggered link reveal on hover/focus with clean hairline border container.
- **Mobile Menu:** Fullscreen overlay in Oxford Blue with staggered vertical text reveals (`yPercent: [100, 0]`, stagger `0.06s`), hamburger morphs to crisp X icon.

---

## 6. Button & Link Styling (Studio Craft)

- **Primary Button (GIVE / Main CTA):** Safety Orange `#F37321` flat fill, Oxford Blue `#07074E` or White `#FFFFFF` bold uppercase text, `2px` radius (NO rounded pill), `14px 28px` padding. Dual-line rolling text animation on hover.
- **Secondary Button:** Hairline border `1px solid var(--oxford-blue)` or `1px solid var(--white)` on dark, transparent background, text color matching border. On hover, flat fill inversion.
- **Text Action Link:** Uppercase bold text with SVG hairline arrow (`→`) that shifts `+5px` to the right on hover with `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 7. Animation Specification & Motion Matrix

All motion is powered by **GSAP 3** + **ScrollTrigger** + **Lenis** smooth scrolling.

| Interaction | Trigger | Target Elements | Initial State | Animated State | Duration | Easing | Stagger |
|-------------|---------|-----------------|---------------|----------------|----------|--------|---------|
| **Page Curtain / Hero Sequence** | Page load (DOM ready) | Hero background video/poster | `opacity: 0.2`, `scale: 1.08` | `opacity: 1`, `scale: 1.0` | 1.4s | `power3.out` | — |
| **Headline Line Split Reveal** | Page load / Scroll enter | H1 / H2 lines | Masked overflow:hidden, `yPercent: 110`, `opacity: 0` | `yPercent: 0`, `opacity: 1` | 1.1s | `power4.out` | 0.08s |
| **Lead Text & CTA Fade Up** | After headline | P, Hero buttons | `y: 40`, `opacity: 0` | `y: 0`, `opacity: 1` | 0.8s | `power3.out` | 0.1s |
| **Scroll Image Clip Reveal** | ScrollTrigger (top 85%) | Section imagery | `clip-path: inset(100% 0 0 0)`, `scale: 1.2` | `clip-path: inset(0 0 0 0)`, `scale: 1.0` | 1.2s | `power3.inOut` | — |
| **Image Parallax** | ScrollTrigger scrub | Big landscape photos | `yPercent: -8` | `yPercent: 8` | Scrub 1s | `none` | — |
| **Impact Counter Count-Up** | ScrollTrigger (top 80%) | Stat numbers (`1970`, `1B`, `150K`, `192`) | `0` | Final value | 1.8s | `power2.out` | 0.15s |
| **Infinite Marquee Ticker** | Continuous RAF + Scroll scrub | Partnership strip | `xPercent: 0` to `-50%` loop | Velocity scrub accelerates ticker on scroll | Continuous | Linear | — |
| **List Row Hover** | Mouseenter / Mouseleave | Story / Program rows | `x: 0`, background transparent | `x: 8px`, border tint accent, arrow rotate/shift | 0.35s | `power3.out` | — |
| **Button Rolling Text** | Mouseenter / Mouseleave | `.btn-roll-text` | `yPercent: 0` | `yPercent: -100%` | 0.4s | `power3.inOut` | — |
| **Accordion Expand** | Click toggle | FAQ answer container | `height: 0`, `opacity: 0` | `height: auto`, `opacity: 1`, plus icon rotate 45deg | 0.45s | `power3.out` | — |
| **Reduced Motion** | `@media (prefers-reduced-motion)` | All elements | No transforms, instant opacity 1, disable parallax/pinning | Full accessibility compliance | — | — | — |

---

## 8. Inner Page Templates Architecture

1. `index.html`: The authoritative flagship home page matching the 12-section reference rhythm.
2. `earth-day-2027.html`: Campaign flagship page for "Food for Our Planet™" (Focus, Partner With Us, Theme Explorer, Archive).
3. `earth-hub.html`: The interactive resource portal with jump anchors (Toolkits, Take Action, Quizzes, News & Stories, Fact Sheets).
4. `campaigns.html`: Master directory of all 12 global environmental initiatives with filtering by theme (Nature, Climate, Plastics, Community).
5. `campaign-detail.html`: Deep-dive template modeled on Canopy Tree Project ($25/$50/$100 donation calculator, trees planted metrics, interactive map locations).
6. `news-and-stories.html`: Editorial hub with tabbed categorization (Diaries, Explainers, Live, 22 Minutes With…, Press Releases, In The News).
7. `article.html`: Clean editorial template with reading progress bar, hero photography, balanced typography, and related stories.
8. `about.html`: Organizational roots, mission, pillars (Broaden, Educate, Activate), global reach.
9. `history.html`: Chronological interactive timeline from April 22, 1970 to present day.
10. `victories.html`: Clean retrospective of monumental environmental policy and conservation wins.
11. `team.html`: Leadership, scientists, grassroots directors, EDN Board banner.
12. `careers.html`: Open roles, working at EARTHDAY.ORG, Washington D.C. headquarters culture.
13. `donate.html`: High-conversion donation landing page with frequency toggle (Once / Monthly), preset tiers, impact descriptions, tax-exempt 501(c)(3) assurance, Charity Navigator verification.
14. `contact.html`: Headquarters location in Washington D.C., direct phone, media press inquiries, inquiry form, and interactive FAQs.

---
*Built with precision to ensure absolute fidelity to the visual rhythm and motion craft of the reference while representing EARTHDAY.ORG with authoritative brand fidelity.*

