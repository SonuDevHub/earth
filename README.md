# EARTHDAY.ORG — Official Website Platform

A high-fidelity, handcrafted multi-page website for **EARTHDAY.ORG** (Washington, D.C.), built to match the visual language, layout rhythm, component hierarchy, and motion craft of the reference design ([onearth-conservation.webflow.io](https://onearth-conservation.webflow.io/)) as faithfully as possible. Filled with EARTHDAY.ORG's real content harvested from `earthday.org`, official logo, brand colors, and real photography.

---

## 1. Architecture & Design Highlights

- **Reference Design Fidelity (Single Source of Truth):**
  - **Floating Pill Navigation (`.nav-wrap`):** Contained 1440px max-width, height 74px, `border-radius: 100px`, `background: rgba(255, 255, 255, 0.12)`, `backdrop-filter: blur(12px)`, transitioning to solid Oxford Blue on scroll.
  - **Pill Buttons (`.white-button`, `.green-button`, `.hero-give-btn`):** `border-radius: 100px`, inner dual-track rolling text hover animation (`translateY(-100%)`), circular arrow badge with 45-degree hover rotation.
  - **Card Systems:** `border-radius: 16px` across cards, hairline borders (`1px solid var(--navy-14)`), Anti-flash white backgrounds.
  - **Callout Banner:** `border-radius: 24px` on `.cta-wrap` with subtle topographic contour line aesthetics.
  - **Footer Padding Reduction (Section J):** Desktop top 64px, bottom 28px; mobile top 40px, bottom 20px; tighter column gaps, zero margin-bottom stacking.
- **Brand Identity & Spec:**
  - Official CSS Variables:
    - `--oxford-blue: #07074E;` (Primary dark sections, text, footer, solid nav)
    - `--anti-flash: #EFF1F3;` (Page background, light cards)
    - `--safety-orange: #F37321;` (Primary action GIVE CTA, main buttons, hover accents)
    - `--chrome-yellow: #FDB714;` (Stat numerals, dark section highlights)
    - `--steel-blue: #2F83A6;` (Secondary links, interactive accents)
    - `--sea-green: #72B5B9;` (Soft secondary tags, dividers, subtle glows)
  - Typography: **Montserrat exclusively** (weights 400, 500, 600, 700, 800) with tracking +0.035em on display headings.
  - Official Logo: Thicker wordmark with the "e" globe symbol (white on dark/video backgrounds, navy on light backgrounds).
- **Hero Video & Light Overlay (Section C):**
  - High-definition video (`hero.mp4`, `hero.webm`, and 720p mobile `hero-mobile.mp4`) with poster fallback (`hero-poster.jpg`).
  - Light overlay: flat Oxford Blue tint at 16% (`--overlay-tint: rgba(7, 7, 78, 0.16)`) and soft text-zone gradient maxing at 45% (`--overlay-text-zone`), ensuring vivid video visuals with guaranteed WCAG AA contrast (> 7:1).
- **Interactive 3D Earth Globe (Section D - Placed in Section 1):**
  - Positioned directly below the Hero as Section 1.
  - NASA Blue Marble textures (`earth-day.jpg`, `earth-clouds.png`) powered by Three.js (r128).
  - 15 global conservation markers with camera fly-to, tooltip preview, and campaign information drawer.
  - Interactive programme filter buttons: **All**, **Forests**, **Cleanups**, **Education**, **Plastics**, and **Food**.
  - Count-up statistics: 192 countries, 150K+ partners, 1 billion people mobilized.
  - Native scroll protection: `touch-action: pan-y`, no wheel event trapping, drag threshold (6px), and `IntersectionObserver` pause loop when off-screen.
- **Reusable `.page-hero` Component (Section H):**
  - Driven by metadata: high-resolution background image, 16% flat overlay, bottom-aligned typography, and single-line breadcrumbs with automatic `BreadcrumbList` schema.
  - Heights: Desktop 340–420px, Tablet 300–340px, Mobile 240–300px.
- **Text Length & Rhythm Constraints (Section I):**
  - Banner H1: 2–6 words, <= 48 chars.
  - Banner intro: 16–26 words, <= 150 chars.
  - Hero H1: <= 8 words; Hero paragraph: 22–32 words.
  - Validated by automated Node linter script (`scripts/lint_text.js`).

---

## 2. Quick Start & Local Execution

### Prerequisites
- Node.js (v18+ recommended)
- A local HTTP server (such as Apache in XAMPP, or `npx serve`)

### Running the Site
1. **Via Active Local Apache (XAMPP):**
   Navigate to:
   ```
   http://localhost/earth-day/index.html
   ```
2. **Via Built-In Node HTTP Server:**
   ```bash
   npx serve -l 8080 .
   ```
   Open `http://localhost:8080` in any web browser.

---

## 3. Node Build, Crawl & Lint Scripts

All data harvesting, page generation, text linting, and Playwright verification scripts are located in `/scripts`:

```bash
# 1. Harvest real content from earthday.org sitemaps into /data/content/
node scripts/crawl_earthday.js

# 2. Build/regenerate all 64 pages and production sitemap.xml
node scripts/build_all_pages.js

# 3. Lint text lengths and character bounds across all pages
node scripts/lint_text.js

# 4. Run comprehensive Playwright verification across all 9 viewports
node scripts/verify_all_pages.js
```

---

## 4. How to Customize & Extend

### A. Replacing the Hero Video
1. Place your 1080p MP4 and WebM files in `assets/video/hero.mp4` and `assets/video/hero.webm`.
2. Generate the mobile 720p stream:
   ```bash
   ffmpeg -i assets/video/hero.mp4 -vf "scale=720:-2" -c:v libx264 -crf 28 -an assets/video/hero-mobile.mp4 -y
   ```
3. Update the poster frame in `assets/img/hero-poster.jpg`.

### B. Updating Photography & Banner Images
1. Add new high-resolution WebP or JPEG photos to `assets/img/`.
2. Update the `BANNER_MAP` dictionary in `scripts/build_all_pages.js`:
   ```javascript
   'your-page-slug': {
     h1: 'Concise Page Title',        // 2 to 6 words, <= 48 chars
     intro: 'Engaging lead paragraph describing the mission.', // 16 to 26 words, <= 150 chars
     img: 'assets/img/your-photo.jpg',
     pos: 'center center',
     crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Your Page', url: 'your-page.html' }]
   }
   ```
3. Re-run `node scripts/build_all_pages.js` and `node scripts/lint_text.js`.

### C. Updating 3D Globe Markers
1. Open `assets/earth/markers.json`.
2. Add or edit coordinate entries:
   ```json
   {
     "id": "new-project",
     "name": "Project Location Name",
     "lat": 12.3456,
     "lng": -78.9101,
     "type": "Canopy Tree Project",
     "description": "Project description and conservation impact.",
     "stats": "500,000 trees planted"
   }
   ```
3. The Three.js globe automatically parses and renders new glowing coordinate pins on load.

### D. Modifying Brand Colors
All colors are centralized as standard CSS variables in `assets/css/main.css`:
```css
:root {
  --oxford-blue:   #07074E;
  --anti-flash:    #EFF1F3;
  --safety-orange: #F37321;
  --chrome-yellow: #FDB714;
  --steel-blue:    #2F83A6;
  --sea-green:     #72B5B9;
}
```

---

## 5. Complete Page Directory & Template Architectures (64 Pages)

| Page File | Title | Template Type | Focus & Purpose |
|---|---|---|---|
| `index.html` | EARTHDAY.ORG Official Homepage | Homepage | 12 sections matching reference rhythm, hero video, Section 1 3D globe |
| `earth-day-2027.html` | Earth Day 2027: Food for Our Planet | Initiative | Theme launch, Healthy People, Soils, Futures pillars |
| `our-focus.html` | Our Global Focus | Initiative | Scientific education, conservation, grassroots action |
| `partner-with-us.html` | Partner With Us | Action | Coalition onboarding, institutional alliances |
| `earth-day-archive.html` | Earth Day History & Archive | Standard | Historical themes and milestones since 1970 |
| `earth-hub.html` | Earth Hub Action Center | Initiative | Central gateway for tools, data, and 3D globe |
| `toolkits.html` | Action Toolkits & Guides | Resource | Downloadable event playbooks and civic guides |
| `take-action.html` | Take Action for Our Planet | Action | Direct steps, volunteer sign-up, petitions |
| `our-work.html` | Our Work Worldwide | Initiative | Master index of all 12 global conservation campaigns |
| `campaigns.html` | All Campaigns Directory | Initiative | Backward-compatible campaigns hub |
| `about.html` | About EARTHDAY.ORG | About | Organization mission, reach across 192 nations |
| `history.html` | The History of Earth Day | About | Senator Gaylord Nelson, Denis Hayes, 1970 to today |
| `victories.html` | 50+ Years of Environmental Victories | About | Clean Air Act, Clean Water Act, Endangered Species Act |
| `board.html` | Board of Directors | About | Executive fiduciary board members and biographies |
| `global-advisory-committee.html` | Global Advisory Committee | About | International diplomats, scientists, and advisors |
| `team.html` | Our Leadership & Global Team | About | Washington headquarters and regional coordination staff |
| `careers.html` | Join Our Team & Careers | About | Open job positions, internships, and fellowships |
| `supporters.html` | Our Global Supporters | Action | Philanthropic foundations and grassroots allies |
| `individual-giving.html` | Individual Giving & Membership | Action | Monthly and annual donor membership programs |
| `business-corporate-supporters.html` | Corporate Partnerships | Action | Business alliances, circular economy initiatives |
| `donate.html` | Donate to EARTHDAY.ORG | Action | Secure donation calculator, 501(c)(3) tax details |
| `donor-advised-fund.html` | Donor Advised Funds (DAF) | Action | Instructions for grant recommendations via DAF |
| `employer-matching-gifts.html` | Employer Matching Gifts | Action | Workplace giving and corporate match programs |
| `contact.html` | Contact Us in Washington, D.C. | Contact | Headquarters address, media inquiries, contact form |
| `international-network.html` | Our Global Network | Network | 192 countries, 150,000+ partner organizations |
| `countries-we-serve.html` | Countries We Serve | Network | Comprehensive worldwide country directory |
| `policies-and-financials.html` | Policies & Financials | Standard | Audited financials, IRS Form 990s, governance |
| `sign-up.html` | Join the Movement: Sign Up | Action | Action alerts, email subscription, newsletters |
| `privacy-policy.html` | Privacy Policy | Legal | Donor privacy, cookie policies, data security |
| `terms-of-use.html` | Terms of Use | Legal | Platform terms, intellectual property, permissions |
| `404.html` | Page Not Found | Error | Custom 404 with search input and campaign shortcuts |

### 12 Campaign Pages
1. `campaign-food-for-our-planet.html` — Food for Our Planet™ (Earth Day 2027)
2. `campaign-canopy-tree-project.html` — The Canopy Project (Native Reforestation)
3. `campaign-artists-for-the-earth.html` — Artists for the Earth (Arts & Culture)
4. `campaign-climate-education.html` — Climate Education Hub (Universal Literacy)
5. `campaign-campus-coalition.html` — Campus Coalition Network (Universities)
6. `campaign-climate-education-coalition.html` — Climate Education Coalition
7. `campaign-end-plastics.html` — End Plastics Worldwide (Planet vs. Plastics)
8. `campaign-fashion-for-the-earth.html` — Fashion for the Earth (Circular Textiles)
9. `campaign-great-global-cleanup.html` — The Great Global Cleanup® (Marine & Land)
10. `campaign-my-future-my-voice.html` — My Future My Voice (Youth Ambassadors)
11. `campaign-regenerative-agriculture.html` — Regenerative Agriculture (Soil Carbon)
12. `campaign-vote-earth.html` — Vote Earth (Civic Voter Mobilization)

### Regional Pages
- `region-india.html` — EARTHDAY.ORG India (Water, education, state coalitions)
- `region-africa.html` — EARTHDAY.ORG Africa (28 nations, agroforestry, plastic bans)
- `region-south-america.html` — EARTHDAY.ORG South America (Amazon basin, indigenous allies)
- `region-mexico.html` — EARTHDAY.ORG Mexico & Latin America (Marine parks, cleanups)

### Quizzes Collection
- `quizzes.html` — Environmental Quizzes Hub
- `quiz-plastic-pollution.html` — Plastic Pollution Knowledge Quiz
- `quiz-climate-change.html` — Climate Change & Global Warming Quiz
- `quiz-clean-energy.html` — Renewable Clean Energy Quiz
- `quiz-conservation.html` — Species Conservation & Biodiversity Quiz
- `quiz-deforestation.html` — Forests & Deforestation Quiz

### Fact Sheets Collection
- `fact-sheets.html` — Fact Sheets Directory Hub
- `fact-sheet-plastics.html` — Plastics & Microplastics Science Brief
- `fact-sheet-climate.html` — Climate Science & Global Emissions Brief
- `fact-sheet-trees.html` — Reforestation & Canopy Hydrology Brief
- `fact-sheet-food.html` — Food Systems & Agricultural Emissions Brief
- `fact-sheet-oceans.html` — Ocean Acidification & Marine Ecosystems Brief

### Newsroom & Editorial Dispatches
- `news-and-stories.html` — News & Frontline Stories Hub
- `article-earth-day-2027-theme.html` — Earth Day 2027 Theme Announcement
- `article-global-plastics-treaty.html` — UN Global Plastics Treaty Intergovernmental Talks
- `article-climate-literacy.html` — Why Universal Climate Literacy is Essential
- `article-canopy-project-milestone.html` — Canopy Project Celebrates 100M Trees
- `press-release-earth-day-global.html` — Over 1 Billion People Mobilize for Earth Day
- `press-release-un-climate-summit.html` — Civil Society Urges Decisive Fossil Phaseout

---

## 6. Deployment to Netlify / Vercel

The site is 100% static (HTML, CSS, JS, assets) with zero build steps or server dependencies:
- **Netlify:** Drag and drop the workspace folder or connect your Git repository. Publish directory: `./` (root).
- **Vercel:** Run `vercel` from the root directory. Framework preset: `Other`.
