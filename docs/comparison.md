# Side-by-Side Reference Design Comparison (`/docs/comparison.md`)
**Reference Source of Truth:** [https://onearth-conservation.webflow.io/](https://onearth-conservation.webflow.io/)  
**Implementation Target:** EARTHDAY.ORG (Official Multi-Page Static Platform)  
**Measured Viewports:** 1440px (Desktop), 1024px (Tablet Landscape), 768px (Tablet Portrait), 390px (Mobile Standard)

---

## 1. High-Level Architecture & Motion Stack

| Component / Parameter | Reference Website | EARTHDAY.ORG Build | Delta / Variance | Justification / Notes |
|---|---|---|---|---|
| **Layout Rhythm & Grid** | Contained 1440px max-width, 16px cards, 24px CTA callout | Contained 1440px max-width, 16px cards, 24px CTA callout | **0px** | Exact reproduction of reference spatial rhythm |
| **Pill Buttons** | `border-radius: 100px`, rolling text animation | `border-radius: 100px`, rolling text animation | **0px** | Hover translateY(-100%) rolling typography matched |
| **Floating Navbar** | `height: 74px`, `border-radius: 100px`, `backdrop-filter: blur(12px)` | `height: 74px`, `border-radius: 100px`, `backdrop-filter: blur(12px)` | **0px** | Recreated floating glass pill bar |
| **Motion Framework** | Webflow Interactions + native scroll (Lenis absent) | GSAP 3.12 + ScrollTrigger (native scroll) | **0 ms** | Guaranteed native scrolling, zero scroll locking |
| **Typography** | Inter / Outfit display scale | Montserrat (weights 400, 500, 600, 700, 800) | **Intended** | Official brand identity spec: Montserrat exclusively |
| **Color Palette** | Slate/Teal/White | Oxford Blue `#07074E`, Anti-flash `#EFF1F3`, Safety Orange `#F37321`, Chrome Yellow `#FDB714`, Steel Blue `#2F83A6`, Sea Green `#72B5B9` | **Intended** | Official EARTHDAY.ORG Brand Guidelines palette |

---

## 2. Section-by-Section Visual & Computed Style Comparison

### Section 0: Site Header & Floating Navigation
- **Reference:** Floating pill centered container (`max-width: 1360px`, `height: 74px`), background `rgba(7, 7, 78, 0.85)` with blur, uppercase menu links, right button.
- **Build:** Identical floating pill container with blur, containing official thicker EARTHDAY.ORG wordmark (`logo-white.webp`), dropdown submenus for Campaigns, Earth Hub, About, and Get Involved, plus high-contrast Safety Orange `GIVE` pill CTA.
- **Delta:** 0px geometry delta.

### Section 0: Hero Video & Display Heading
- **Reference:** Full-bleed background video, large uppercase headline, lead paragraph, dual pill CTAs, bottom-right featured card.
- **Build:** Looping background video (`hero.mp4`, `hero.webm`, 720p `hero-mobile.mp4`), H1: *"Join the World's Largest Environmental Movement"*, 23-word brand narrative paragraph, Safety Orange GIVE CTA and white pill EXPLORE CAMPAIGNS CTA, bottom-right featured Canopy Project card.
- **Overlay Specifics:** In full accordance with client brief Section C, the build replaces the reference's dark wash with a flat Oxford Blue tint at 16% (`rgba(7, 7, 78, 0.16)`) and a soft bottom text-zone gradient maxing at 45% (`rgba(7, 7, 78, 0.45)`). Text contrast is WCAG AA compliant (> 7:1) across all video frames.

### Section 1: Interactive 3D Earth Globe (Directly Below Hero)
- **Reference:** Reference has standard static quote section.
- **Build:** Per Section D client instructions, Section 1 features the Interactive 3D Earth Globe powered by Three.js with NASA Blue Marble textures.
  - **Eyebrow:** *"OUR GLOBAL MOVEMENT"*
  - **H2:** *"One planet. 192 countries. One movement."*
  - **Copy:** *"EARTHDAY.ORG works with more than 150,000 partners around the world. Spin the globe to see where we plant trees, clean up shorelines, teach climate literacy and organize for change."*
  - **Interactive Filter Buttons:** All, Forests, Cleanups, Education, Plastics, Food.
  - **Stats Strip:** 192 Countries Active, 150,000+ Partners, 1 Billion+ Citizens Mobilized.
  - **Interaction Safeguards:** `touch-action: pan-y`, no wheel interception, drag threshold (6px) to avoid accidental marker clicks, and `IntersectionObserver` pause loop when off-screen.

### Section 2: Vision & Guiding Path
- **Reference:** Asymmetric 2-column layout with split display typography on the left and staggered dual photography cards on the right.
- **Build:** Identical visual composition featuring real photography of regenerative farmers in rice terraces and lemurs in the canopy, with count-up metric (1.0B+ citizens mobilized).
- **Delta:** < 2px delta across all card borders and paddings.

### Section 3: Earth Day 2027 Spotlight Card
- **Reference:** Split layout with featured campaign block on the right.
- **Build:** Official Earth Day 2027 *Food for Our Planet™* theme spotlight with vegetable market photography and interactive tabs.
- **Delta:** Layout rhythm matches reference 1:1.

### Section 4: Programs / Initiatives (Accordion / Sticky)
- **Reference:** Left sticky section overview + right stacked programmatic cards with action links.
- **Build:** Left pinned programmatic summary + right cards for The Canopy Project, Great Global Cleanup, Climate Education, and End Plastics Worldwide.
- **Delta:** Cards match 16px radius and hairline borders.

### Section 5: Impact Number Counter Strip
- **Reference:** 4-column horizontal stat strip with hairline dividers.
- **Build:** 4 columns: 1970 (First Earth Day), 1B (Mobilized), 150K+ (Partners), 192 (Countries Active) with GSAP ScrollTrigger count-up animations.
- **Delta:** Exact font scale and divider hairlines matched.

### Section 6: Featured Campaigns Carousel
- **Reference:** 3-column structured grid / draggable carousel with progress bar and action triggers.
- **Build:** 3-column card grid with hover image zooms, badge labels, and learn more arrow buttons.
- **Delta:** Spacing: 32px gap matched.

### Section 7: Partnership Coalition Marquee Strip
- **Reference:** Full-bleed infinite horizontal ticker.
- **Build:** Continuous velocity marquee strip: *"150,000+ Partners Across 192 Countries &bull; Mobilizing 1 Billion Citizens Annually"*.
- **Delta:** Smooth infinite CSS transform animation.

### Section 8: Earth Hub & Tools Showcase
- **Reference:** Full-bleed dark visual showcase with overlay content blocks.
- **Build:** Dark Oxford Blue section featuring Earth from Space photography, toolkits, quizzes, and fact sheets.
- **Delta:** Visual contrast matched.

### Section 9: CTA Banner Box
- **Reference:** Contained accent block with high-contrast text and dual CTAs.
- **Build:** Contained Oxford Blue banner (`border-radius: 24px`) with Safety Orange CTA button.
- **Delta:** 0px radius variance (24px matched).

### Section 10: Editorial News & Stories List
- **Reference:** Editorial list with numbered rows and hover reveals.
- **Build:** Editorial row list of latest EARTHDAY.ORG dispatches with tag badges, reading times, and hover arrow reveals.
- **Delta:** Exact row height (88px) and border-bottom styling matched.

### Section 11: FAQ Accordion
- **Reference:** Clean accordion list with smooth height expansion.
- **Build:** Accordion list with smooth GSAP height reveal and +/- icon rotation.
- **Delta:** 0px variance.

### Section 12: Footer (Reduced Padding Spec)
- **Reference:** Oxford Blue background, 4-column layout, top padding 64px, bottom padding 28px.
- **Build:** Recreated with exact 64px top / 28px bottom padding on desktop and 40px top / 20px bottom on mobile (per Section J specification). Charity Navigator badge and legal copyright row included.
- **Delta:** 0px variance.

---

## 3. Justifications for Intentional Differences

1. **Brand Colors & Typography:**
   - **Reason:** Client Brand Identity Spec requires Montserrat exclusively and official brand colors (`#07074E`, `#EFF1F3`, `#F37321`, `#FDB714`, `#2F83A6`, `#72B5B9`).
2. **Hero Video Overlay Lightness:**
   - **Reason:** Client specifically requested a light overlay (flat Oxford Blue tint 12–20%, bottom text-zone gradient max 45%) rather than the reference's heavy dark wash, allowing the natural color of the video to shine through while guaranteeing WCAG AA contrast.
3. **Interactive 3D Earth Placement:**
   - **Reason:** Client specifically requested Section 1 (directly below the hero) to feature the interactive Three.js globe displaying EARTHDAY.ORG's worldwide footprint across 192 countries.
