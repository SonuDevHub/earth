const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

// Common Nav Header
function getHeader(activePage = "home") {
  return `
  <header class="navbar-with-cart" role="banner">
    <div class="container">
      <div class="nav-wrap">
        <a href="index.html" class="brand-link" aria-label="EARTHDAY.ORG home">
          <img src="assets/img/logo-white.webp" alt="EARTHDAY.ORG" class="nav-logo" />
        </a>
        <div class="navbar-menu-item">
          <nav role="navigation" class="center-nav-menu">
            <div class="menu-item-nav">
              <a href="index.html" class="menu-item ${activePage === 'home' ? 'active' : ''}">Home</a>
              <a href="about.html" class="menu-item ${activePage === 'about' ? 'active' : ''}">About</a>
              <a href="campaigns.html" class="menu-item ${activePage === 'campaigns' ? 'active' : ''}">Campaigns</a>
              <a href="earth-hub.html" class="menu-item ${activePage === 'earth-hub' ? 'active' : ''}">Earth Hub</a>
              <a href="earth-day-2027.html" class="menu-item ${activePage === 'earth-day-2027' ? 'active' : ''}">Earth Day 2027</a>
              <a href="news-and-stories.html" class="menu-item ${activePage === 'news' ? 'active' : ''}">News</a>
              <a href="contact.html" class="menu-item ${activePage === 'contact' ? 'active' : ''}">Contact</a>
            </div>
          </nav>
          <div class="right-nav-menu">
            <a href="donate.html" class="nav-button-v2">GIVE</a>
          </div>
        </div>
        <button class="mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
    <div class="mobile-drawer-header">
      <img src="assets/img/logo-white.webp" alt="EARTHDAY.ORG" class="nav-logo" style="height:32px;" />
      <button class="mobile-drawer-close" aria-label="Close menu" style="color:#fff;font-size:32px;line-height:1;">&times;</button>
    </div>
    <nav class="mobile-drawer-links">
      <a href="index.html">Home</a>
      <a href="about.html">About Us</a>
      <a href="campaigns.html">Campaigns</a>
      <a href="earth-day-2027.html">Earth Day 2027</a>
      <a href="earth-hub.html">Earth Hub &amp; Globe</a>
      <a href="news-and-stories.html">News &amp; Stories</a>
      <a href="history.html">History &amp; 1970</a>
      <a href="victories.html">Environmental Victories</a>
      <a href="team.html">Leadership &amp; Team</a>
      <a href="careers.html">Careers</a>
      <a href="contact.html">Contact Us</a>
    </nav>
    <div style="margin-top: 32px;">
      <a href="donate.html" class="green-button" style="width: 100%; justify-content: center;">
        <span class="text"><span class="p1-left semibold-white">GIVE TO THE EARTH</span></span>
        <span class="button-arrow white">
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </a>
    </div>
  </div>
  `;
}

// Common Footer
function getFooter() {
  return `
  <section class="footer-section" role="contentinfo">
    <div class="container">
      <div class="footer-wrap">
        <div class="footer-top">
          <div class="footer-top-left">
            <a href="index.html">
              <img src="assets/img/logo-white.webp" alt="EARTHDAY.ORG" class="logo-brand" />
            </a>
            <div class="footer-newsletter">
              <p class="p1-left light-white">Subscribe to get the latest updates, toolkits, and frontline stories from EARTHDAY.ORG to stay connected and informed.</p>
              <div class="newsletter-form">
                <form class="form-content" onsubmit="event.preventDefault(); alert('Thank you for subscribing to EARTHDAY.ORG updates!');">
                  <input class="form-field" type="email" placeholder="Enter your email" required aria-label="Email address" />
                  <button type="submit" class="form-button">Submit</button>
                </form>
              </div>
              <div style="margin-top: 16px; opacity: 0.85; font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.5;">
                <strong>Washington, D.C. HQ:</strong> 1616 P St NW, Suite 340, Washington, DC 20036<br>
                Tel: +1 (202) 518-0044 &bull; 501(c)(3) Tax ID: 13-3798288
              </div>
              <div style="margin-top: 12px;">
                <img src="assets/img/charity-nav.webp" alt="Charity Navigator 4-Star Charity Rating Badge" style="height: 38px; width: auto; opacity: 0.9;" />
              </div>
            </div>
          </div>
          <div class="footer-right">
            <div class="footer-menu">
              <h5 class="h5-left semibold-white">Explore</h5>
              <div class="footer-menu-item">
                <a href="index.html" class="footer-link">Home</a>
                <a href="about.html" class="footer-link">About Us</a>
                <a href="campaigns.html" class="footer-link">Campaigns</a>
                <a href="earth-hub.html" class="footer-link">Earth Hub</a>
                <a href="earth-day-2027.html" class="footer-link">Earth Day 2027</a>
              </div>
            </div>
            <div class="footer-menu">
              <h5 class="h5-left semibold-white">Organization</h5>
              <div class="footer-menu-item">
                <a href="history.html" class="footer-link">1970 History</a>
                <a href="victories.html" class="footer-link">Victories</a>
                <a href="team.html" class="footer-link">Board &amp; Leadership</a>
                <a href="careers.html" class="footer-link">Careers</a>
                <a href="news-and-stories.html" class="footer-link">News &amp; Stories</a>
              </div>
            </div>
            <div class="footer-menu">
              <h5 class="h5-left semibold-white">Connect</h5>
              <div class="footer-menu-item">
                <div class="email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 5.25L12 13.5L3 5.25M3 5.25H21V18C21 18.4 20.6 18.75 20.25 18.75H3.75C3.35 18.75 3 18.4 3 18V5.25Z" stroke="#EFF1F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <a href="mailto:info@earthday.org" class="footer-link">info@earthday.org</a>
                </div>
                <div class="email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.1 13.9L15 9M21 3.9C21 3.5 20.5 3 20 3L2 8.5C1.6 8.6 1.5 9 1.5 9.4C1.5 9.8 1.8 10 2 10.1L10.1 13.9L14.1 22.1C14.3 22.4 14.7 22.5 15 22.5C15.3 22.5 15.6 22.2 15.7 21.9L21 3.9Z" stroke="#EFF1F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span class="footer-link">+1 (202) 518-0044</span>
                </div>
                <div class="footer-socmed">
                  <a href="https://instagram.com/earthdaynetwork" class="socmed-fill" aria-label="Instagram" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                  <a href="https://facebook.com/EarthDayNetwork" class="socmed-fill" aria-label="Facebook" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                  <a href="https://youtube.com/@EarthDayNetwork" class="socmed-fill" aria-label="YouTube" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
                  <a href="https://x.com/earthday" class="socmed-fill" aria-label="X / Twitter" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="p1-left" style="color:rgba(255,255,255,0.6);font-size:13px;">&copy; 2026 EARTHDAY.ORG. All rights reserved. A 501(c)(3) environmental nonprofit organization.</p>
          <div style="display:flex;gap:20px;">
            <a href="contact.html" style="color:rgba(255,255,255,0.6);font-size:13px;">Privacy Policy</a>
            <a href="contact.html" style="color:rgba(255,255,255,0.6);font-size:13px;">Terms of Use</a>
            <a href="donate.html" style="color:rgba(255,255,255,0.6);font-size:13px;">Charity Navigator 4-Star</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

// Master Page Template
function renderPage({ title, description, bodyContent, activeNav = "home", extraHead = "" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | EARTHDAY.ORG</title>
  <meta name="description" content="${description}">
  <link rel="icon" type="image/png" href="assets/img/favicon.png">
  <link rel="canonical" href="https://www.earthday.org/${activeNav === 'home' ? '' : activeNav + '.html'}">
  <meta property="og:title" content="${title} | EARTHDAY.ORG">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="assets/img/og-image.png">
  <meta property="og:type" content="website">
  <link rel="stylesheet" href="assets/css/main.css">
  ${extraHead}
</head>
<body>
  ${getHeader(activeNav)}
  <main id="main-content">
    ${bodyContent}
  </main>
  ${getFooter()}

  <!-- Libraries: GSAP 3 & Three.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="assets/js/three.min.js"></script>
  <script type="module" src="assets/js/app.js"></script>
</body>
</html>`;
}

// -------------------------------------------------------------
// 1. INDEX.HTML — COMPLETE 12-SECTION RECREATION
// -------------------------------------------------------------
const indexBody = `
  <!-- SECTION 0: HERO (FULL SCREEN VIDEO + DISPLAY SPEC) -->
  <section class="hero-section">
    <video class="hero-video-bg" autoplay muted loop playsinline poster="assets/img/hero-poster.jpg">
      <source src="assets/video/hero.webm" type="video/webm">
      <source src="assets/video/hero.mp4" type="video/mp4">
    </video>
    <div class="overlay-img"></div>
    <div class="container">
      <div class="hero-wrap">
        <div class="hero-content">
          <div class="hero-left">
            <div class="hero-heading">
              <h1 class="h1-left">Protect Nature, Preserve Our Future</h1>
            </div>
            <div class="hero-subheading">
              <div class="hero-text">
                <p class="p1-left">
                  Join hands with EARTHDAY.ORG to safeguard forests, oceans, and climate for generations to come. From the first spark in 1970 to over 1 billion people mobilized across 192 countries, every action creates lasting impact.
                </p>
              </div>
              <div class="hero-actions">
                <a href="donate.html" class="hero-give-btn">
                  <div class="text">
                    <p class="p1-left semibold-white">GIVE NOW</p>
                    <p class="p1-left semibold-white hover">GIVE NOW</p>
                  </div>
                  <div class="button-arrow white">
                    <svg viewBox="0 0 20 20" fill="none" class="icon-20px"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </a>
                <a href="campaigns.html" class="white-button">
                  <div class="text">
                    <p class="p1-left semibold-green">EXPLORE CAMPAIGNS</p>
                    <p class="p1-left semibold-green hover">EXPLORE CAMPAIGNS</p>
                  </div>
                  <div class="button-arrow">
                    <svg viewBox="0 0 20 20" fill="none" class="icon-20px"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <!-- Hero Right Featured Card -->
          <div class="hero-right-card">
            <a href="campaign-detail.html" class="campaign-featured">
              <div class="label"><div class="dot"></div><p class="p1-left semibold-green">FEATURED INITIATIVE</p></div>
              <div>
                <h3 class="h4-left semibold-black">The Canopy Project</h3>
                <p class="p2-left light-grey">Reforesting bio-corridors to protect endangered wildlife and heal watersheds.</p>
              </div>
              <div class="text-button-decor">
                <span>LEARN MORE</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M5.5 4H12V10.5" stroke="#F37321" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 1: VISION & MISSION -->
  <section class="vision-mission-section">
    <div class="container">
      <div class="vision-mission-wrap">
        <div class="vision-top">
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">GUIDING OUR PATH</p></div>
          <div class="vision-text">
            <div class="vision-text-image">
              <h2 class="h3-left">Conserve ecosystems through impactful projects <span class="expand-text">empower</span></h2>
              <div class="vision-image">
                <img src="assets/img/farmer-rice-field.jpg" alt="Regenerative farmer in lush green rice terrace" />
              </div>
            </div>
            <h3 class="h3-left">local communities with <span class="medium-grey">sustainable solutions, and inspire individuals to take action for the planet.</span></h3>
          </div>
        </div>
        <div class="vision-bottom">
          <div class="vision-card-number">
            <div class="card-number-title">
              <h4>GLOBAL CITIZEN ENGAGEMENT</h4>
            </div>
            <div class="number-card-text">
              <h2>1.0B+</h2>
              <p class="p2-left">Citizens mobilized annually across 192 countries to demand climate action and restore nature.</p>
            </div>
          </div>
          <div class="vision-card-img" style="background-image: url('assets/img/lemur-canopy-tree-project.jpg');">
            <div class="vision-icon-block">
              <div class="label-white"><div class="dot"></div><p>CANOPY PROJECT</p></div>
            </div>
            <div class="vision-text-detail">
              <h3 class="h4-left semibold-white">BIODIVERSITY RECOVERY</h3>
              <p class="p2-left light-white">Protecting vulnerable species by restoring native forest canopies across Madagascar, Uganda, and the Philippines.</p>
            </div>
            <div class="black-overlay"></div>
          </div>
          <div class="vision-card-green">
            <div class="vision-tag">
              <p>Protect, Restore, Sustain</p>
            </div>
            <h4 class="h4-left medium-white" style="margin-top: 16px;">BUILDING A FUTURE WITH NATURE</h4>
            <div class="vision-description">
              <div class="vision-img-icon">
                <img src="assets/img/vegetable-market.jpg" alt="Community market fresh produce" />
              </div>
              <p class="p2-left light-white">For people, biodiversity, and the planet's shared climate resilience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 2: ABOUT SECTION -->
  <section class="about-section">
    <div class="container">
      <div class="about-wrap">
        <div class="about-title">
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">ABOUT US</p></div>
          <div class="about-heading"><h2 class="h2-left semibold-green">Rooted in Conservation</h2></div>
        </div>
        <div class="about-content">
          <div class="about-content-top">
            <div class="about-tag">
              <div class="about-tag-item"><p>Canopy Reforestation</p></div>
              <div class="about-tag-item"><p>Great Global Cleanup</p></div>
              <div class="about-tag-item"><p>Climate Literacy</p></div>
              <div class="about-tag-item"><p>End Plastics</p></div>
              <div class="about-tag-item"><p>Food for Our Planet</p></div>
              <div class="about-tag-item"><p>Policy Advocacy</p></div>
            </div>
            <div class="about-text">
              <p class="p1-left light-grey">
                Founded on April 22, 1970, EARTHDAY.ORG gave birth to the modern environmental movement. Today, we work with over 150,000 partner organizations in 192 countries to solve the environmental crises of our time through grassroots mobilization, science-based curricula, and frontline ecological restoration.
              </p>
            </div>
          </div>
          <div class="about-content-image">
            <a href="campaign-detail.html" class="campaign-featured">
              <div class="label"><div class="dot"></div><p class="p1-left semibold-green">COMMUNITY IMPACT</p></div>
              <div class="about-campaign">
                <h3 class="h4-left semibold-black">Madagascar Lemur Habitat Recovery</h3>
                <p class="p2-left light-grey">Over 12 million native trees planted to restore vital wildlife corridors and stabilize soil.</p>
              </div>
              <div class="text-button-decor">
                <span>DONATE TO THIS PROJECT</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M5.5 4H12V10.5" stroke="#F37321" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3: INITIATIVES (2-COLUMN GRID) -->
  <section class="initiatives-section">
    <div class="container">
      <div class="initiatives-wrap">
        <div class="initiatives-title">
          <div class="initiatives-heading">
            <div class="label"><div class="dot"></div><p class="p1-left semibold-green">INITIATIVES</p></div>
            <h2 class="h2-left semibold-green">Building Nature’s Future</h2>
          </div>
          <div class="initiatives-subheading">
            <p class="p1-left light-grey">From forests to oceans, we act where nature needs us most — protecting life in every ecosystem.</p>
          </div>
        </div>
        <div class="initiatives-content">
          <div class="initiatives-image">
            <img src="assets/img/lemur-canopy-tree-project.jpg" alt="Black and white ruffed lemur in lush canopy tree" />
          </div>
          <div class="initiatives-items">
            <div class="initiatives-card">
              <div class="initiatives-icon">
                <svg viewBox="0 0 32 32" fill="none"><path d="M16 15C16 15 27.25 3 16 3C4.75 3 16 15 16 15ZM16 15C16 15 4 3.75 4 15C4 26.25 16 15 16 15ZM16 15C16 15 4.75 27 16 27C27.25 27 16 15 16 15ZM16 15C16 15 28 26.25 28 15C28 3.75 16 15 16 15Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="initiatives-text">
                <h3 class="h4-left semibold-black">The Canopy Project</h3>
                <p class="p1-left light-grey">Planting tens of millions of native trees in communities most vulnerable to climate change.</p>
              </div>
            </div>
            <div class="initiatives-card">
              <div class="initiatives-icon">
                <svg viewBox="0 0 32 32" fill="none"><path d="M5 23.2C14 15.7 18 30.3 27 22.8M5 16.2C14 8.7 18 23.3 27 15.8M5 9.2C14 1.7 18 16.3 27 8.8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="initiatives-text">
                <h3 class="h4-left semibold-black">Great Global Cleanup®</h3>
                <p class="p1-left light-grey">The world's largest coordinated campaign removing billions of pieces of trash and marine plastics.</p>
              </div>
            </div>
            <div class="initiatives-card">
              <div class="initiatives-icon">
                <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="white" stroke-width="2"/><path d="M16 8V16L22 20" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
              <div class="initiatives-text">
                <h3 class="h4-left semibold-black">Food for Our Planet™</h3>
                <p class="p1-left light-grey">Reimagining agricultural systems, reducing food waste, and championing climate-friendly diets.</p>
              </div>
            </div>
            <div class="initiatives-card">
              <div class="initiatives-icon">
                <svg viewBox="0 0 32 32" fill="none"><path d="M12 4H20M16 4V28M8 28H24" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
              <div class="initiatives-text">
                <h3 class="h4-left semibold-black">Climate Literacy</h3>
                <p class="p1-left light-grey">Advocating for compulsory, assessed climate education in every primary and secondary school worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: IMPACT NUMBERS (CONTOUR GRAPHICS) -->
  <section class="number-section">
    <div class="container">
      <div class="number-wrap">
        <div class="number-description">
          <div class="number-icon">
            <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/><path d="M2 12H22M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z" stroke="white" stroke-width="2"/></svg>
          </div>
          <div class="number-text">
            <p class="p1-left">We mobilize communities and governments worldwide to achieve measurable, verifiable conservation outcomes.</p>
          </div>
        </div>
        <div class="number-items">
          <div class="number-item">
            <div class="number"><h2 class="h2-left">1B+</h2></div>
            <p class="p1-left">Citizens Mobilized Annually</p>
          </div>
          <div class="number-item">
            <div class="number"><h2 class="h2-left">192+</h2></div>
            <p class="p1-left">Countries and Sovereign Territories</p>
          </div>
          <div class="number-item">
            <div class="number"><h2 class="h2-left">15M+</h2></div>
            <p class="p1-left">Trees Planted Globally</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 5: FEATURED PROJECTS -->
  <section class="featured-section">
    <div class="container">
      <div class="featured-wrap">
        <div class="featured-title">
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">FEATURED PROJECTS</p></div>
          <div class="featured-heading">
            <h2 class="h2-left semibold-green">Highlighted Nature Projects</h2>
            <a href="campaigns.html" class="green-button">
              <div class="text">
                <p class="p1-left semibold-white">VIEW ALL PROJECTS</p>
                <p class="p1-left semibold-white hover">VIEW ALL PROJECTS</p>
              </div>
              <div class="button-arrow white">
                <svg viewBox="0 0 20 20" fill="none" class="icon-20px"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </a>
          </div>
        </div>
        <div class="featured-content">
          <!-- Row 1 -->
          <div class="featured-listing">
            <div class="fetaured-left">
              <div class="project-location">
                <div class="project-loc">
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 21C16 17 20 13 20 8.5C20 4.36 16.42 1 12 1C7.58 1 4 4.36 4 8.5C4 13 8 17 12 21Z" stroke="#07074E" stroke-width="1.8"/><circle cx="12" cy="8.5" r="3.5" fill="#F37321"/></svg>
                  <p class="p1-left light-black">Madagascar &bull; Ranomafana</p>
                </div>
                <h3 class="h4-left semibold-black">Canopy Lemur Habitat Corridor</h3>
              </div>
              <a href="campaign-detail.html" class="text-button">
                <p class="p1-left semibold-green">READ MORE</p>
                <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M4 12L12 4M5.5 4H12V10.5" stroke="#07074E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
            <div class="featured-detail">
              <div class="featured-center">
                <img src="assets/img/lemur-canopy-tree-project.jpg" alt="Lemur in rainforest tree canopy" />
              </div>
              <div class="featured-right">
                <p class="p1-left light-black">
                  An intensive agroforestry and native tree planting program designed to bridge fragmented primary forests, protect critically endangered lemurs, and preserve native floral biodiversity.
                </p>
                <div class="project-information">
                  <div class="project-info">
                    <p>DONATIONS DEPLOYED</p>
                    <p>$1.2M USD</p>
                  </div>
                  <div class="project-info">
                    <p>CANOPY EXPANSION</p>
                    <p>12M+ Seedlings</p>
                  </div>
                  <div class="project-info">
                    <p>HABITAT IMPACT</p>
                    <p>4,800 Hectares</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="featured-listing">
            <div class="fetaured-left">
              <div class="project-location">
                <div class="project-loc">
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 21C16 17 20 13 20 8.5C20 4.36 16.42 1 12 1C7.58 1 4 4.36 4 8.5C4 13 8 17 12 21Z" stroke="#07074E" stroke-width="1.8"/><circle cx="12" cy="8.5" r="3.5" fill="#F37321"/></svg>
                  <p class="p1-left light-black">Southeast Asia &bull; Mekong Basin</p>
                </div>
                <h3 class="h4-left semibold-black">Food for Our Planet™ Showcase</h3>
              </div>
              <a href="earth-day-2027.html" class="text-button">
                <p class="p1-left semibold-green">READ MORE</p>
                <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M4 12L12 4M5.5 4H12V10.5" stroke="#07074E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
            <div class="featured-detail">
              <div class="featured-center">
                <img src="assets/img/farmer-rice-field.jpg" alt="Farmer tending sustainable crops" />
              </div>
              <div class="featured-right">
                <p class="p1-left light-black">
                  Collaborating with family farms to transition toward regenerative no-till soil stewardship, drought resilience, and reducing supply chain food waste ahead of Earth Day 2027.
                </p>
                <div class="project-information">
                  <div class="project-info">
                    <p>FARMS ENROLLED</p>
                    <p>12,400+ Farms</p>
                  </div>
                  <div class="project-info">
                    <p>WATER CONSERVED</p>
                    <p>35% Reduction</p>
                  </div>
                  <div class="project-info">
                    <p>THEME YEAR</p>
                    <p>Earth Day 2027</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 6: PARTNERSHIP MARQUEE -->
  <section class="partnership-section">
    <div class="container">
      <div class="partnership-wrap">
        <div class="partnership-text">
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">GLOBAL ALLIANCE</p></div>
          <p class="p1-left light-grey">United with over 150,000 partner organizations across 192 countries.</p>
        </div>
        <div class="div-block-4">
          <div class="partnership-logo">
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">UNITED NATIONS ENVIRONMENT</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">&bull;</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">NASA CLIMATE DATA</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">&bull;</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">GLOBAL PLASTICS TREATY COALITION</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">&bull;</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">CHARITY NAVIGATOR 4-STAR</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">&bull;</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">WORLD AGROFORESTRY CENTER</span>
          </div>
          <div class="partnership-logo" aria-hidden="true">
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">UNITED NATIONS ENVIRONMENT</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">&bull;</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">NASA CLIMATE DATA</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">&bull;</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">GLOBAL PLASTICS TREATY COALITION</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">&bull;</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">CHARITY NAVIGATOR 4-STAR</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">&bull;</span>
            <span style="font-size: 20px; font-weight: 700; color: #52566E; letter-spacing: 0.05em;">WORLD AGROFORESTRY CENTER</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 7: CAMPAIGN HUB + 3D INTERACTIVE EARTH GLOBE -->
  <section class="campaign-section">
    <div class="container">
      <div class="campaign-wrap">
        <div class="campaign-title">
          <div class="initiatives-heading">
            <div class="label"><div class="dot"></div><p class="p1-left semibold-green">CAMPAIGNS &amp; ACTION</p></div>
            <h2 class="h2-left semibold-green">Protecting Nature Together</h2>
          </div>
          <div class="initiatives-subheading">
            <p class="p1-left light-grey">Join a movement that empowers communities and creates verifiable environmental impact worldwide.</p>
          </div>
        </div>

        <!-- 3 Campaign Cards Grid -->
        <div class="campaign-content">
          <div class="campaign-slider-list">
            <a href="campaign-detail.html" class="campaign-card">
              <div class="campaign-top">
                <div class="campaign-image">
                  <img src="assets/img/lemur-canopy-tree-project.jpg" alt="Reforestation canopy" />
                </div>
                <div class="campaign-label-block">
                  <div class="campaign-label"><p>Reforestation</p></div>
                </div>
              </div>
              <div class="campaign-bottom">
                <div class="campaign-name">
                  <h3 class="h4-left semibold-black">The Canopy Project</h3>
                  <p class="p1-left light-grey">Restoring forests and vital wildlife corridors around the globe.</p>
                </div>
                <div class="campaign-detail">
                  <div class="campaign-date">
                    <p class="p1-left light-grey">TARGET:</p>
                    <h4 class="h5-left semibold-black">20M Trees by 2028</h4>
                  </div>
                  <div class="text-button">
                    <p class="p1-left semibold-green">LEARN MORE</p>
                    <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M4 12L12 4M5.5 4H12V10.5" stroke="#07074E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </a>

            <a href="campaigns.html#cleanup" class="campaign-card">
              <div class="campaign-top">
                <div class="campaign-image">
                  <img src="assets/img/placeholder-cleanup.jpg" alt="Coastal marine cleanup" />
                </div>
                <div class="campaign-label-block">
                  <div class="campaign-label"><p>Cleanup</p></div>
                </div>
              </div>
              <div class="campaign-bottom">
                <div class="campaign-name">
                  <h3 class="h4-left semibold-black">Great Global Cleanup®</h3>
                  <p class="p1-left light-grey">Intercepting plastic waste and marine debris in thousands of communities.</p>
                </div>
                <div class="campaign-detail">
                  <div class="campaign-date">
                    <p class="p1-left light-grey">ACTIVE SITES:</p>
                    <h4 class="h5-left semibold-black">5,000+ Cleanups</h4>
                  </div>
                  <div class="text-button">
                    <p class="p1-left semibold-green">LEARN MORE</p>
                    <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M4 12L12 4M5.5 4H12V10.5" stroke="#07074E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </a>

            <a href="earth-day-2027.html" class="campaign-card">
              <div class="campaign-top">
                <div class="campaign-image">
                  <img src="assets/img/vegetable-market.jpg" alt="Sustainable regenerative crops" />
                </div>
                <div class="campaign-label-block">
                  <div class="campaign-label"><p>Food Systems</p></div>
                </div>
              </div>
              <div class="campaign-bottom">
                <div class="campaign-name">
                  <h3 class="h4-left semibold-black">Food for Our Planet™</h3>
                  <p class="p1-left light-grey">Empowering climate-friendly agriculture and reducing food waste.</p>
                </div>
                <div class="campaign-detail">
                  <div class="campaign-date">
                    <p class="p1-left light-grey">GLOBAL THEME:</p>
                    <h4 class="h5-left semibold-black">Earth Day 2027</h4>
                  </div>
                  <div class="text-button">
                    <p class="p1-left semibold-green">LEARN MORE</p>
                    <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M4 12L12 4M5.5 4H12V10.5" stroke="#07074E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- 3D INTERACTIVE EARTH GLOBE CONTAINER -->
        <div class="earth-explorer-container">
          <div class="earth-explorer-header">
            <div>
              <div class="label-white"><div class="dot"></div><p>LIVE 3D EXPLORER</p></div>
              <h3 class="h3-left">Explore Global Initiatives on the 3D Earth</h3>
            </div>
            <p class="p1-left light-white" style="max-width: 420px; font-size: 14px;">
              Drag to rotate the globe with smooth inertia. Click any glowing marker pin to fly to that frontline conservation hub.
            </p>
          </div>
          <div class="earth-canvas-wrapper" id="earth-canvas-container">
            <!-- Three.js Canvas injected via assets/js/modules/earth.js -->
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 8: HIGH-IMPACT CALL TO ACTION (CTA BOX) -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-wrap">
        <div class="cta-text">
          <div class="cta-heading">
            <h2 class="h2-left semibold-white">Together, We Can Make a Difference</h2>
            <div class="cta-subheading">
              <p class="p2-left light-white">
                Your support directly funds frontline tree planting, policy advocacy, plastic removal, and climate literacy for over 1 billion people worldwide.
              </p>
            </div>
          </div>
          <a href="donate.html" class="white-button">
            <div class="text">
              <p class="p1-left semibold-green">GIVE TO THE EARTH</p>
              <p class="p1-left semibold-green hover">GIVE TO THE EARTH</p>
            </div>
            <div class="button-arrow">
              <svg viewBox="0 0 20 20" fill="none" class="icon-20px"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 9: TEAM & VOICES OF IMPACT -->
  <section class="team-section">
    <div class="container">
      <div class="team-section-wrap">
        <div class="team-title">
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">LEADERSHIP &amp; VOICES</p></div>
          <h2 class="h2-left semibold-green">Guiding Global Climate Action</h2>
        </div>
        <div class="team-content">
          <div class="team-card">
            <div class="team-image">
              <img src="assets/img/banner-EDN-board-members.png" alt="Kathleen Rogers, President" />
            </div>
            <div class="team-text">
              <h4>Kathleen Rogers</h4>
              <p>President &bull; EARTHDAY.ORG</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-image">
              <img src="assets/img/banner-EDN-board-members.png" alt="Denis Hayes, 1970 Organizer" />
            </div>
            <div class="team-text">
              <h4>Denis Hayes</h4>
              <p>National Coordinator &bull; Earth Day 1970</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-image">
              <img src="assets/img/farmer-rice-field.jpg" alt="Karuna Singh, India Director" />
            </div>
            <div class="team-text">
              <h4>Karuna Singh</h4>
              <p>Regional Director &bull; Asia &amp; India</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-image">
              <img src="assets/img/vegetable-market.jpg" alt="Derrick Mugisha, Africa Coordinator" />
            </div>
            <div class="team-text">
              <h4>Derrick Mugisha</h4>
              <p>Regional Coordinator &bull; Africa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 10: FAQS -->
  <section class="faq-section">
    <div class="container">
      <div class="faq-wrap">
        <div class="faq-heading">
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">FREQUENTLY ASKED QUESTIONS</p></div>
          <h2 class="h2-left semibold-green">All You Need to Know</h2>
        </div>
        <div class="faq-list">
          <div class="faq-content">
            <div class="faq-item">
              <div class="faq-title">
                <div class="faq-icon">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2.5 8H13.5M8 2.5V13.5" stroke="#07074E" stroke-width="1.8" stroke-linecap="round"/></svg>
                </div>
                <div class="faq-question"><h3 class="h5-left">How do my donations directly help the planet?</h3></div>
              </div>
              <div class="faq-answer">
                <p class="p1-left light-grey">Your contributions fund frontline tree plantings with the Canopy Project, support community beach and river cleanups, provide climate literacy materials to underfunded schools, and drive legal policy advocacy across the globe.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-title">
                <div class="faq-icon">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2.5 8H13.5M8 2.5V13.5" stroke="#07074E" stroke-width="1.8" stroke-linecap="round"/></svg>
                </div>
                <div class="faq-question"><h3 class="h5-left">Is EARTHDAY.ORG a registered 501(c)(3) nonprofit?</h3></div>
              </div>
              <div class="faq-answer">
                <p class="p1-left light-grey">Yes. EARTHDAY.ORG (Earth Day Network) is a registered 501(c)(3) nonprofit charity in the United States. Contributions are tax-deductible to the fullest extent permitted by law, and we maintain a 4-star Charity Navigator rating.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-title">
                <div class="faq-icon">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2.5 8H13.5M8 2.5V13.5" stroke="#07074E" stroke-width="1.8" stroke-linecap="round"/></svg>
                </div>
                <div class="faq-question"><h3 class="h5-left">What is the theme for Earth Day 2027?</h3></div>
              </div>
              <div class="faq-answer">
                <p class="p1-left light-grey">The official global theme for Earth Day 2027 is <strong>Food for Our Planet™</strong>, focusing on transforming agriculture, supporting regenerative farming practices, eliminating food waste, and fostering global food security.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-title">
                <div class="faq-icon">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2.5 8H13.5M8 2.5V13.5" stroke="#07074E" stroke-width="1.8" stroke-linecap="round"/></svg>
                </div>
                <div class="faq-question"><h3 class="h5-left">How can schools and organizations get involved?</h3></div>
              </div>
              <div class="faq-answer">
                <p class="p1-left light-grey">Visit our Earth Hub to download free educational toolkits, register a Great Global Cleanup event, or join our global network of over 150,000 schools and community organizers.</p>
              </div>
            </div>
          </div>

          <div class="faq-contact">
            <div class="faq-text">
              <h3 class="h5-left semibold-black">HAVE ANY QUESTIONS?</h3>
              <p class="p2-left light-grey">Our team in Washington, D.C. and across 6 regional hubs is ready to assist your organization or campaign.</p>
            </div>
            <a href="contact.html" class="green-button">
              <div class="text">
                <p class="p1-left semibold-white">REACH OUT TO US</p>
                <p class="p1-left semibold-white hover">REACH OUT TO US</p>
              </div>
              <div class="button-arrow white">
                <svg viewBox="0 0 20 20" fill="none" class="icon-20px"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "index.html"), renderPage({
  title: "Official Site | Global Environmental Movement",
  description: "EARTHDAY.ORG mobilizes over 1 billion people annually across 192 countries for frontline conservation, tree planting, climate literacy, and plastic pollution elimination.",
  bodyContent: indexBody,
  activeNav: "home"
}), "utf8");
console.log("Built index.html");

// -------------------------------------------------------------
// 2. EARTH-DAY-2027.HTML
// -------------------------------------------------------------
const earthDay2027Body = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>GLOBAL THEME</p></div>
        <h1 class="page-hero-title">Earth Day 2027: Food for Our Planet™</h1>
        <p class="page-hero-lead">Transforming our global food and agricultural systems to regenerate soil, protect biodiversity, slash greenhouse gas emissions, and ensure equitable nutrition for all.</p>
        <div>
          <a href="#partner" class="green-button">
            <span class="text"><span class="p1-left semibold-white">JOIN AS A 2027 PARTNER</span></span>
            <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="initiatives-section">
    <div class="container">
      <div class="about-wrap">
        <div class="about-title">
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">WHY FOOD?</p></div>
          <h2 class="h2-left semibold-green">The Agriculture-Climate Nexus</h2>
        </div>
        <div class="about-content">
          <div class="about-text">
            <p class="p1-left light-grey">Food systems account for over one-third of all global anthropogenic greenhouse gas emissions, drive 80% of terrestrial biodiversity loss, and use 70% of freshwater withdrawals. By shifting towards regenerative agriculture, eliminating food waste, and supporting plant-rich diets, we can turn agriculture from a driver of crisis into humanity's greatest climate solution.</p>
          </div>
          <div class="initiatives-image" style="height:320px;">
            <img src="assets/img/vegetable-market.jpg" alt="Local farmers market vegetables" />
          </div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "earth-day-2027.html"), renderPage({
  title: "Earth Day 2027: Food for Our Planet™",
  description: "Earth Day 2027 focuses on Food for Our Planet™: transforming agriculture, cutting food waste, and restoring soils globally.",
  bodyContent: earthDay2027Body,
  activeNav: "earth-day-2027"
}), "utf8");
console.log("Built earth-day-2027.html");

// -------------------------------------------------------------
// 3. EARTH-HUB.HTML (INTERACTIVE 3D GLOBE HUB)
// -------------------------------------------------------------
const earthHubBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>INTERACTIVE ACTION CENTER</p></div>
        <h1 class="page-hero-title">Earth Hub &amp; Global Explorer</h1>
        <p class="page-hero-lead">Discover 15+ frontline conservation projects, community toolkits, climate fact sheets, and interactive environmental action resources worldwide.</p>
      </div>
    </div>
  </section>

  <section class="campaign-section" style="padding-top: var(--spacing-4xl);">
    <div class="container">
      <div class="earth-explorer-container">
        <div class="earth-explorer-header">
          <div>
            <div class="label-white"><div class="dot"></div><p>NASA TEXTURED GLOBE</p></div>
            <h2 class="h3-left" style="color:var(--white);">Interactive 3D Earth Initiatives</h2>
          </div>
          <p class="p1-left light-white" style="max-width: 440px; font-size:14px;">
            Drag to rotate with natural inertia. Click any pulsing coordinate pin to view campaign metrics, photos, and project stories.
          </p>
        </div>
        <div class="earth-canvas-wrapper" id="earth-canvas-container">
          <!-- Three.js Canvas -->
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "earth-hub.html"), renderPage({
  title: "Earth Hub & Global 3D Explorer",
  description: "Explore EARTHDAY.ORG's global network and action toolkits on an interactive 3D Earth globe powered by NASA Blue Marble imagery.",
  bodyContent: earthHubBody,
  activeNav: "earth-hub"
}), "utf8");
console.log("Built earth-hub.html");

// -------------------------------------------------------------
// 4. CAMPAIGNS.HTML
// -------------------------------------------------------------
const campaignsBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>OUR FRONTLINE WORK</p></div>
        <h1 class="page-hero-title">Global Environmental Campaigns</h1>
        <p class="page-hero-lead">From reforestation and plastic eradication to compulsory climate literacy, explore EARTHDAY.ORG's core initiatives active in 192 nations.</p>
      </div>
    </div>
  </section>

  <section class="featured-section">
    <div class="container">
      <div class="featured-content">
        <!-- Campaign 1 -->
        <div class="featured-listing">
          <div class="fetaured-left">
            <h3 class="h4-left semibold-black">The Canopy Project</h3>
            <a href="campaign-detail.html" class="green-button">
              <span class="text"><span class="p1-left semibold-white">VIEW PROJECT</span></span>
              <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </a>
          </div>
          <div class="featured-detail">
            <div class="featured-center">
              <img src="assets/img/lemur-canopy-tree-project.jpg" alt="Canopy Project reforestation" />
            </div>
            <div class="featured-right">
              <p class="p1-left light-black">Planting native trees to restore critical bio-corridors for endangered species and build climate resilience in vulnerable rural communities.</p>
              <div class="project-information">
                <div class="project-info"><p>TREES PLANTED</p><p>15M+</p></div>
                <div class="project-info"><p>LOCATIONS</p><p>Madagascar, Uganda, Philippines</p></div>
                <div class="project-info"><p>SURVIVAL RATE</p><p>85%+</p></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign 2 -->
        <div class="featured-listing" id="cleanup">
          <div class="fetaured-left">
            <h3 class="h4-left semibold-black">The Great Global Cleanup®</h3>
            <a href="contact.html" class="green-button">
              <span class="text"><span class="p1-left semibold-white">JOIN CLEANUP</span></span>
              <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </a>
          </div>
          <div class="featured-detail">
            <div class="featured-center">
              <img src="assets/img/placeholder-cleanup.jpg" alt="Coastal community cleanup" />
            </div>
            <div class="featured-right">
              <p class="p1-left light-black">Mobilizing millions of volunteers to clear toxic plastic waste and marine debris from beaches, waterways, and urban communities worldwide.</p>
              <div class="project-information">
                <div class="project-info"><p>POUNDS COLLECTED</p><p>100M+ lbs</p></div>
                <div class="project-info"><p>VOLUNTEERS</p><p>5M+ Global</p></div>
                <div class="project-info"><p>PARTNER SITES</p><p>190+ Countries</p></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign 3 -->
        <div class="featured-listing" id="end-plastics">
          <div class="fetaured-left">
            <h3 class="h4-left semibold-black">End Plastics &bull; Planet vs. Plastics</h3>
            <a href="contact.html" class="green-button">
              <span class="text"><span class="p1-left semibold-white">PETITION NOW</span></span>
              <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </a>
          </div>
          <div class="featured-detail">
            <div class="featured-center">
              <img src="assets/img/placeholder-plastics.jpg" alt="Plastic free oceans advocacy" />
            </div>
            <div class="featured-right">
              <p class="p1-left light-black">Demanding a 60% reduction in all plastic production by 2040 and a legally binding UN Global Plastics Treaty with mandatory caps on virgin polymers.</p>
              <div class="project-information">
                <div class="project-info"><p>GOAL</p><p>60% Cut by 2040</p></div>
                <div class="project-info"><p>SIGNATURES</p><p>2.5M+ Citizens</p></div>
                <div class="project-info"><p>TREATY PHASE</p><p>INC-5 Negotiations</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "campaigns.html"), renderPage({
  title: "Environmental Campaigns | EARTHDAY.ORG",
  description: "Discover all 12 official environmental campaigns by EARTHDAY.ORG, including the Canopy Project, Great Global Cleanup, and Planet vs. Plastics.",
  bodyContent: campaignsBody,
  activeNav: "campaigns"
}), "utf8");
console.log("Built campaigns.html");

// -------------------------------------------------------------
// 5. CAMPAIGN-DETAIL.HTML (THE CANOPY PROJECT DEEP DIVE)
// -------------------------------------------------------------
const campaignDetailBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>CANOPY PROJECT DEEP DIVE</p></div>
        <h1 class="page-hero-title">Reforesting Our Living Planet</h1>
        <p class="page-hero-lead">How planting over 15 million native trees restores biodiversity corridors, stabilizes rural watersheds, and combats planetary warming from the roots up.</p>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="container">
      <div class="about-content">
        <div class="initiatives-image" style="height:440px;">
          <img src="assets/img/lemur-canopy-tree-project.jpg" alt="Black and white ruffed lemur in restored canopy" />
        </div>
        <div class="about-text">
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">MADAGASCAR SPOTLIGHT</p></div>
          <h2 class="h2-left semibold-green">Ranomafana Bio-Corridors</h2>
          <p class="p1-left light-grey" style="margin-top:16px;">In eastern Madagascar, primary rainforest fragmentation threatens rare endemic species like the golden bamboo lemur. Through the Canopy Project, EARTHDAY.ORG works hand-in-hand with local village associations to propagate native seedlings, regenerate degraded buffer zones, and train community forest guardians.</p>
          <div style="margin-top:24px;">
            <a href="donate.html" class="green-button">
              <span class="text"><span class="p1-left semibold-white">PLANT A TREE ($1 = 1 TREE)</span></span>
              <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "campaign-detail.html"), renderPage({
  title: "The Canopy Project | Reforestation Deep Dive",
  description: "Learn about the Canopy Project by EARTHDAY.ORG: planting millions of native trees to protect endangered lemurs and restore global watersheds.",
  bodyContent: campaignDetailBody,
  activeNav: "campaigns"
}), "utf8");
console.log("Built campaign-detail.html");

// -------------------------------------------------------------
// 6. NEWS-AND-STORIES.HTML
// -------------------------------------------------------------
const newsBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>NEWSROOM &amp; VOICES</p></div>
        <h1 class="page-hero-title">News &amp; Stories</h1>
        <p class="page-hero-lead">The latest environmental journalism, frontline field dispatches, policy analysis, and press statements from EARTHDAY.ORG worldwide.</p>
      </div>
    </div>
  </section>

  <section class="featured-section">
    <div class="container">
      <div class="campaign-slider-list">
        <a href="article.html" class="campaign-card">
          <div class="campaign-top">
            <div class="campaign-image"><img src="assets/img/lemur-canopy-tree-project.jpg" alt="Story photo" /></div>
            <div class="campaign-label-block"><div class="campaign-label"><p>Field Dispatch</p></div></div>
          </div>
          <div class="campaign-bottom">
            <h3 class="h4-left semibold-black">Madagascar’s Last Canopy: Restoring the Lemur Corridors</h3>
            <p class="p1-left light-grey">A field report on how 12 million native trees are reconnecting divided primary rainforests.</p>
            <div class="campaign-detail">
              <span style="font-size:13px;color:var(--text-muted);">October 24, 2026</span>
              <div class="text-button"><p class="p1-left semibold-green">READ STORY &rarr;</p></div>
            </div>
          </div>
        </a>

        <a href="article.html" class="campaign-card">
          <div class="campaign-top">
            <div class="campaign-image"><img src="assets/img/placeholder-plastics.jpg" alt="Plastics story photo" /></div>
            <div class="campaign-label-block"><div class="campaign-label"><p>Policy Analysis</p></div></div>
          </div>
          <div class="campaign-bottom">
            <h3 class="h4-left semibold-black">The Turning Point: Global Treaty Caps on Virgin Plastics</h3>
            <p class="p1-left light-grey">Why recycling alone failed and how international legally-binding production limits can succeed.</p>
            <div class="campaign-detail">
              <span style="font-size:13px;color:var(--text-muted);">October 18, 2026</span>
              <div class="text-button"><p class="p1-left semibold-green">READ STORY &rarr;</p></div>
            </div>
          </div>
        </a>

        <a href="article.html" class="campaign-card">
          <div class="campaign-top">
            <div class="campaign-image"><img src="assets/img/farmer-rice-field.jpg" alt="Regenerative food photo" /></div>
            <div class="campaign-label-block"><div class="campaign-label"><p>Earth Day 2027</p></div></div>
          </div>
          <div class="campaign-bottom">
            <h3 class="h4-left semibold-black">Food for Our Planet™: Soil as the Great Carbon Sink</h3>
            <p class="p1-left light-grey">How regenerative agroforestry techniques are restoring drought-hit farmland across Asia and Africa.</p>
            <div class="campaign-detail">
              <span style="font-size:13px;color:var(--text-muted);">October 12, 2026</span>
              <div class="text-button"><p class="p1-left semibold-green">READ STORY &rarr;</p></div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "news-and-stories.html"), renderPage({
  title: "News & Stories | EARTHDAY.ORG",
  description: "Read the latest news, frontline dispatches, climate policy briefings, and environmental journalism from EARTHDAY.ORG.",
  bodyContent: newsBody,
  activeNav: "news"
}), "utf8");
console.log("Built news-and-stories.html");

// -------------------------------------------------------------
// 7. ARTICLE.HTML
// -------------------------------------------------------------
const articleBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>FIELD DISPATCH &bull; MADAGASCAR</p></div>
        <h1 class="page-hero-title">Madagascar’s Last Canopy: Restoring the Lemur Corridors</h1>
        <p class="page-hero-lead">By Kathleen Rogers and the EARTHDAY.ORG Field Forestry Team &bull; Ranomafana National Park Buffer Zone</p>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="container">
      <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
        <p class="p1-left light-black" style="font-size: 19px; line-height: 1.8;">
          High in the misty rain-forested ridges of eastern Madagascar, the canopy hums with life found nowhere else on Earth. Yet decades of slash-and-burn farming and illegal logging fragmented these ancient forests into isolated islands, trapping endangered lemur populations.
        </p>
        <div class="initiatives-image" style="height: 380px;">
          <img src="assets/img/lemur-canopy-tree-project.jpg" alt="Lemur in the canopy" />
        </div>
        <blockquote style="border-left: 4px solid var(--safety-orange); padding-left: 24px; font-size: 20px; font-style: italic; color: var(--oxford-blue); margin: 16px 0;">
          "When you plant a native tree in Ranomafana, you aren’t just sequestering carbon—you are building a highway in the sky for creatures that cannot survive on the forest floor."
        </blockquote>
        <p class="p1-left light-black" style="font-size: 17px; line-height: 1.8;">
          Through the Canopy Project, over 12 million native trees have been planted across Madagascar, restoring crucial bio-corridors and giving communities alternative, sustainable livelihoods through agroforestry.
        </p>
        <div style="margin-top: 32px; border-top: 1px solid var(--navy-14); padding-top: 24px;">
          <a href="donate.html" class="green-button">
            <span class="text"><span class="p1-left semibold-white">SUPPORT THIS CAMPAIGN</span></span>
            <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          </a>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "article.html"), renderPage({
  title: "Madagascar’s Last Canopy | Featured Article",
  description: "Field report from Ranomafana, Madagascar: How EARTHDAY.ORG’s Canopy Project is planting native trees to reconnect fragmented rainforests.",
  bodyContent: articleBody,
  activeNav: "news"
}), "utf8");
console.log("Built article.html");

// -------------------------------------------------------------
// 8. ABOUT.HTML
// -------------------------------------------------------------
const aboutBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>OUR STORY &amp; MISSION</p></div>
        <h1 class="page-hero-title">About EARTHDAY.ORG</h1>
        <p class="page-hero-lead">From a teach-in on April 22, 1970 that mobilized 20 million Americans to a global network of over 1 billion citizens in 192 nations, our mission is to diversify, educate, and activate the environmental movement worldwide.</p>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">CORE MISSION</p></div>
          <h2 class="h2-left semibold-green">Civic Action for Our Planet</h2>
          <p class="p1-left light-grey" style="margin-top:16px;">EARTHDAY.ORG’s mission is to diversify, educate, and activate the environmental movement worldwide. Growing out of the first Earth Day in 1970, EARTHDAY.ORG is the world’s largest recruiter to the environmental movement, working year-round with more than 150,000 partners in 192 countries to drive positive action for our planet.</p>
        </div>
        <div class="initiatives-image" style="height:380px;">
          <img src="assets/img/banner-EDN-board-members.png" alt="EARTHDAY.ORG leadership team" />
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "about.html"), renderPage({
  title: "About Us | EARTHDAY.ORG",
  description: "Learn about EARTHDAY.ORG, founded in 1970, coordinating the global environmental movement across 192 countries.",
  bodyContent: aboutBody,
  activeNav: "about"
}), "utf8");
console.log("Built about.html");

// -------------------------------------------------------------
// 9. HISTORY.HTML
// -------------------------------------------------------------
const historyBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>1970 ORIGINS</p></div>
        <h1 class="page-hero-title">History of Earth Day: 1970 to Today</h1>
        <p class="page-hero-lead">How Senator Gaylord Nelson and 25-year-old Denis Hayes catalyzed the world's largest civic movement and established the modern environmental legal framework.</p>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="container">
      <div style="max-width: 840px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px;">
        <h2 class="h2-left semibold-green">April 22, 1970: A Continental Awakening</h2>
        <p class="p1-left light-black" style="font-size:18px; line-height:1.8;">
          In 1969, witnessing the aftermath of the massive Santa Barbara oil spill and galvanized by the anti-war movement, Senator Gaylord Nelson of Wisconsin recruited young activist Denis Hayes to organize a national environmental "teach-in." On April 22, 1970, 20 million Americans—10% of the entire U.S. population at the time—took to streets, parks, and auditoriums to demonstrate against the deterioration of the environment.
        </p>
        <p class="p1-left light-black" style="font-size:18px; line-height:1.8;">
          Groups that had been fighting separately against oil spills, polluting factories and power plants, raw sewage, toxic dumps, pesticides, freeways, the loss of wilderness, and the extinction of wildlife suddenly united around these shared common values on Earth Day.
        </p>
        <div style="background-color: var(--white); padding: 32px; border-radius: var(--radius-card); border: 1px solid var(--navy-14);">
          <h3 class="h4-left semibold-black">The Landmark Laws Born from Earth Day 1970:</h3>
          <ul style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px; font-size: 16px; color: var(--oxford-blue);">
            <li>&bull; <strong>1970:</strong> Creation of the U.S. Environmental Protection Agency (EPA)</li>
            <li>&bull; <strong>1970:</strong> Passage of the Clean Air Act</li>
            <li>&bull; <strong>1972:</strong> Passage of the Clean Water Act</li>
            <li>&bull; <strong>1973:</strong> Passage of the Endangered Species Act</li>
            <li>&bull; <strong>1990:</strong> Earth Day goes globally international, mobilizing 200 million people in 141 countries</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "history.html"), renderPage({
  title: "History of Earth Day | 1970 Origins",
  description: "Explore the origin story of Earth Day on April 22, 1970, which mobilized 20 million Americans and founded modern environmental law.",
  bodyContent: historyBody,
  activeNav: "about"
}), "utf8");
console.log("Built history.html");

// -------------------------------------------------------------
// 10. VICTORIES.HTML
// -------------------------------------------------------------
const victoriesBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>PROVEN RECORD</p></div>
        <h1 class="page-hero-title">Five Decades of Environmental Victories</h1>
        <p class="page-hero-lead">From the Clean Air and Clean Water Acts to the Paris Climate Agreement and the Global Plastics Treaty negotiations.</p>
      </div>
    </div>
  </section>

  <section class="featured-section">
    <div class="container">
      <div class="featured-content">
        <div class="featured-listing">
          <div class="fetaured-left">
            <h3 class="h4-left semibold-black">The UN Global Plastics Treaty (INC Mandate)</h3>
            <span class="about-tag-item"><p>2022 &ndash; Present</p></span>
          </div>
          <p class="p1-left light-black">EARTHDAY.ORG was an early architect demanding a legally-binding global treaty addressing the full lifecycle of plastics. Today, 175 nations are negotiating binding caps on plastic production.</p>
        </div>

        <div class="featured-listing">
          <div class="fetaured-left">
            <h3 class="h4-left semibold-black">Paris Climate Agreement Signing (Earth Day 2016)</h3>
            <span class="about-tag-item"><p>April 22, 2016</p></span>
          </div>
          <p class="p1-left light-black">The historic Paris Climate Agreement was officially opened for signature by the United Nations on Earth Day 2016, with 175 world leaders signing simultaneously in New York.</p>
        </div>

        <div class="featured-listing">
          <div class="fetaured-left">
            <h3 class="h4-left semibold-black">15 Million Native Trees Planted via Canopy Project</h3>
            <span class="about-tag-item"><p>2010 &ndash; Present</p></span>
          </div>
          <p class="p1-left light-black">Restored over 50,000 hectares of degraded watersheds and endangered wildlife corridors across Africa, Asia, and Latin America.</p>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "victories.html"), renderPage({
  title: "Environmental Victories | EARTHDAY.ORG",
  description: "Discover major environmental policy victories catalyzed by Earth Day from 1970 to the present day.",
  bodyContent: victoriesBody,
  activeNav: "about"
}), "utf8");
console.log("Built victories.html");

// -------------------------------------------------------------
// 11. TEAM.HTML
// -------------------------------------------------------------
const teamBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>LEADERSHIP</p></div>
        <h1 class="page-hero-title">Board of Directors &amp; Global Team</h1>
        <p class="page-hero-lead">The scientists, organizers, legal advocates, and educators guiding EARTHDAY.ORG’s international campaigns.</p>
      </div>
    </div>
  </section>

  <section class="team-section">
    <div class="container">
      <div class="team-content">
        <div class="team-card">
          <div class="team-image"><img src="assets/img/banner-EDN-board-members.png" alt="Kathleen Rogers" /></div>
          <div class="team-text"><h4>Kathleen Rogers</h4><p>President</p></div>
        </div>
        <div class="team-card">
          <div class="team-image"><img src="assets/img/banner-EDN-board-members.png" alt="Denis Hayes" /></div>
          <div class="team-text"><h4>Denis Hayes</h4><p>Board Chair Emeritus &bull; 1970 Organizer</p></div>
        </div>
        <div class="team-card">
          <div class="team-image"><img src="assets/img/farmer-rice-field.jpg" alt="Karuna Singh" /></div>
          <div class="team-text"><h4>Karuna Singh</h4><p>Regional Director &bull; Asia</p></div>
        </div>
        <div class="team-card">
          <div class="team-image"><img src="assets/img/vegetable-market.jpg" alt="Derrick Mugisha" /></div>
          <div class="team-text"><h4>Derrick Mugisha</h4><p>Regional Lead &bull; Sub-Saharan Africa</p></div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "team.html"), renderPage({
  title: "Board & Team | EARTHDAY.ORG",
  description: "Meet the leadership, board of directors, and global regional coordinators of EARTHDAY.ORG.",
  bodyContent: teamBody,
  activeNav: "about"
}), "utf8");
console.log("Built team.html");

// -------------------------------------------------------------
// 12. CAREERS.HTML
// -------------------------------------------------------------
const careersBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>JOIN OUR MISSION</p></div>
        <h1 class="page-hero-title">Careers at EARTHDAY.ORG</h1>
        <p class="page-hero-lead">Work alongside passionate climate advocates in Washington, D.C. and across our worldwide regional offices.</p>
      </div>
    </div>
  </section>

  <section class="featured-section">
    <div class="container">
      <div class="featured-content">
        <div class="featured-listing">
          <div class="fetaured-left">
            <div>
              <h3 class="h4-left semibold-black">Senior Climate Policy Counsel</h3>
              <p class="p2-left light-grey">Washington, D.C. Headquarters &bull; Full-time</p>
            </div>
            <a href="contact.html" class="green-button">
              <span class="text"><span class="p1-left semibold-white">APPLY NOW</span></span>
              <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </a>
          </div>
          <p class="p1-left light-black">Lead our international environmental policy team in multilateral treaties, UN COP representations, and virgin plastic phaseout advocacy.</p>
        </div>

        <div class="featured-listing">
          <div class="fetaured-left">
            <div>
              <h3 class="h4-left semibold-black">Global Cleanup Operations Manager</h3>
              <p class="p2-left light-grey">Washington, D.C. or Remote &bull; Full-time</p>
            </div>
            <a href="contact.html" class="green-button">
              <span class="text"><span class="p1-left semibold-white">APPLY NOW</span></span>
              <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </a>
          </div>
          <p class="p1-left light-black">Coordinate volunteer logistics, cleanup site registries, data collection, and NGO partnerships across 190+ countries for the Great Global Cleanup®.</p>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "careers.html"), renderPage({
  title: "Careers | Join the Movement at EARTHDAY.ORG",
  description: "Explore career opportunities, internships, and fellowships with EARTHDAY.ORG in Washington, D.C. and global offices.",
  bodyContent: careersBody,
  activeNav: "about"
}), "utf8");
console.log("Built careers.html");

// -------------------------------------------------------------
// 13. DONATE.HTML (INTERACTIVE GIVING CALCULATOR)
// -------------------------------------------------------------
const donateBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>INVEST IN OUR PLANET</p></div>
        <h1 class="page-hero-title">Give to EARTHDAY.ORG</h1>
        <p class="page-hero-lead">Your tax-deductible gift directly funds frontline tree planting, international policy treaties, plastic eradication, and climate education.</p>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="container">
      <div style="max-width: 640px; margin: 0 auto;">
        <div class="donation-box">
          <div class="frequency-toggle">
            <button class="frequency-btn active" data-freq="once">Give Once</button>
            <button class="frequency-btn" data-freq="monthly">Give Monthly</button>
          </div>

          <div class="amount-grid">
            <button class="amount-btn" data-amount="25">$25</button>
            <button class="amount-btn active" data-amount="50">$50</button>
            <button class="amount-btn" data-amount="100">$100</button>
            <button class="amount-btn" data-amount="250">$250</button>
            <button class="amount-btn" data-amount="500">$500</button>
            <button class="amount-btn" data-amount="custom">Custom</button>
          </div>

          <div id="donation-impact-msg" style="padding: 16px; border-radius: 12px; background-color: var(--anti-flash); margin-bottom: 24px; font-size: 15px; color: var(--oxford-blue); font-weight: 500;">
            A gift of <strong>$50</strong> plants <strong>50 native trees</strong> with the Canopy Project to reconnect fragmented lemur rainforests.
          </div>

          <button class="green-button" style="width: 100%; justify-content: center; height: 56px;" onclick="alert('Thank you for choosing to support EARTHDAY.ORG! In production, this forwards directly to our secure Stripe / PayPal checkout gateway.');">
            <span class="text"><span class="p1-left semibold-white">PROCEED TO SECURE DONATION</span></span>
            <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          </button>

          <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 24px;">
            <img src="assets/img/charity-nav.webp" alt="Charity Navigator 4 Stars" style="height: 38px; width: auto;" />
            <span style="font-size: 13px; color: var(--text-muted);">4-Star Rating &bull; 94% Efficiency &bull; 501(c)(3) Tax Deductible</span>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "donate.html"), renderPage({
  title: "Donate & Support Our Planet | EARTHDAY.ORG",
  description: "Make a tax-deductible donation to EARTHDAY.ORG. Support tree planting, plastic pollution bans, and global climate education.",
  bodyContent: donateBody,
  activeNav: "donate"
}), "utf8");
console.log("Built donate.html");

// -------------------------------------------------------------
// 14. CONTACT.HTML
// -------------------------------------------------------------
const contactBody = `
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-wrap">
        <div class="label-white"><div class="dot"></div><p>GET IN TOUCH</p></div>
        <h1 class="page-hero-title">Contact EARTHDAY.ORG</h1>
        <p class="page-hero-lead">Connect with our headquarters team in Washington, D.C. or reach out to our regional hubs across Africa, Asia, Europe, and South America.</p>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="container">
      <div class="about-content">
        <div>
          <div class="label"><div class="dot"></div><p class="p1-left semibold-green">HEADQUARTERS</p></div>
          <h2 class="h2-left semibold-green" style="margin-bottom: 24px;">Washington, D.C.</h2>
          <div style="display:flex;flex-direction:column;gap:16px;font-size:16px;color:var(--oxford-blue);">
            <p><strong>Address:</strong> 1616 P Street NW, Suite 340, Washington, DC 20036</p>
            <p><strong>Telephone:</strong> +1 (202) 518-0044</p>
            <p><strong>General Inquiries:</strong> <a href="mailto:info@earthday.org" style="color:var(--steel-blue);text-decoration:underline;">info@earthday.org</a></p>
            <p><strong>Press &amp; Media:</strong> <a href="mailto:press@earthday.org" style="color:var(--steel-blue);text-decoration:underline;">press@earthday.org</a></p>
            <p><strong>Partnerships:</strong> <a href="mailto:partnerships@earthday.org" style="color:var(--steel-blue);text-decoration:underline;">partnerships@earthday.org</a></p>
          </div>
        </div>

        <div class="donation-box" style="padding: 32px;">
          <h3 class="h4-left semibold-black" style="margin-bottom: 20px;">Send a Message</h3>
          <form onsubmit="event.preventDefault(); alert('Thank you for contacting EARTHDAY.ORG. Our team will respond shortly.');" style="display:flex;flex-direction:column;gap:16px;">
            <input class="form-volunteer-field" type="text" placeholder="Your Name" required />
            <input class="form-volunteer-field" type="email" placeholder="Your Email Address" required />
            <select class="form-volunteer-field" style="background:#fff;">
              <option value="general">General Inquiry</option>
              <option value="press">Press &amp; Media</option>
              <option value="partnership">Corporate or NGO Partnership</option>
              <option value="volunteer">Volunteer &amp; Cleanups</option>
            </select>
            <textarea class="form-volunteer-field" style="height:120px;padding:16px;border-radius:16px;resize:none;" placeholder="Your message..." required></textarea>
            <button type="submit" class="green-button" style="justify-content:center;">
              <span class="text"><span class="p1-left semibold-white">SEND MESSAGE</span></span>
              <span class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync(path.join(rootDir, "contact.html"), renderPage({
  title: "Contact Us | Washington, D.C. Headquarters",
  description: "Contact EARTHDAY.ORG headquarters in Washington, D.C. for press, partnerships, campaign participation, and general questions.",
  bodyContent: contactBody,
  activeNav: "contact"
}), "utf8");
console.log("Built contact.html");

// -------------------------------------------------------------
// SITEMAP & ROBOTS.TXT
// -------------------------------------------------------------
const sitemapPages = [
  "", "about.html", "campaigns.html", "campaign-detail.html",
  "earth-day-2027.html", "earth-hub.html", "news-and-stories.html",
  "article.html", "history.html", "victories.html", "team.html",
  "careers.html", "donate.html", "contact.html"
];

const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPages.map(p => `  <url>
    <loc>https://www.earthday.org/${p}</loc>
    <lastmod>2026-11-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === '' ? '1.0' : '0.8'}</priority>
  </url>`).join("\n")}
</urlset>`;

fs.writeFileSync(path.join(rootDir, "sitemap.xml"), sitemapXML, "utf8");
console.log("Built sitemap.xml");

const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://www.earthday.org/sitemap.xml
`;
fs.writeFileSync(path.join(rootDir, "robots.txt"), robotsTxt, "utf8");
console.log("Built robots.txt");

console.log("\nAll 14 pages successfully built matching the reference design!");
