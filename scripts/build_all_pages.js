const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const CONTENT_DIR = path.join(DATA_DIR, 'content');

const sitemap = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'site-map.json'), 'utf8'));

// Common Navigation Bar HTML
function renderNav(activeSlug) {
  return `
  <!-- SITE HEADER / NAVIGATION -->
  <header class="navbar-with-cart" id="navbar" role="banner">
    <div class="container">
      <div class="nav-wrap">
        <a href="index.html" class="brand-link" aria-label="EARTHDAY.ORG home">
          <img src="assets/img/logo-white.webp" alt="EARTHDAY.ORG" class="nav-logo" />
        </a>

        <!-- Desktop Navigation Items -->
        <div class="navbar-menu-item">
          <nav role="navigation" class="center-nav-menu" aria-label="Main Navigation">
            <div class="menu-item-nav">
              <a href="index.html" class="menu-item ${activeSlug === 'index' ? 'active' : ''}">Home</a>

              <div class="nav-dropdown">
                <a href="our-work.html" class="menu-item ${activeSlug.startsWith('campaign') || activeSlug === 'our-work' ? 'active' : ''}">
                  Campaigns <span class="dropdown-caret">&#9662;</span>
                </a>
                <div class="nav-dropdown-content">
                  <a href="campaign-food-for-our-planet.html" class="dropdown-item">Food for Our Planet™</a>
                  <a href="campaign-canopy-tree-project.html" class="dropdown-item">The Canopy Project</a>
                  <a href="campaign-great-global-cleanup.html" class="dropdown-item">Great Global Cleanup®</a>
                  <a href="campaign-climate-education.html" class="dropdown-item">Climate Education</a>
                  <a href="campaign-end-plastics.html" class="dropdown-item">End Plastics Worldwide</a>
                  <a href="our-work.html" class="dropdown-item view-all">All 12 Campaigns &rarr;</a>
                </div>
              </div>

              <div class="nav-dropdown">
                <a href="earth-hub.html" class="menu-item ${activeSlug === 'earth-hub' || activeSlug.startsWith('quiz') || activeSlug.startsWith('fact') || activeSlug === 'toolkits' ? 'active' : ''}">
                  Earth Hub <span class="dropdown-caret">&#9662;</span>
                </a>
                <div class="nav-dropdown-content">
                  <a href="earth-day-2027.html" class="dropdown-item">Earth Day 2027</a>
                  <a href="toolkits.html" class="dropdown-item">Action Toolkits</a>
                  <a href="quizzes.html" class="dropdown-item">Environmental Quizzes</a>
                  <a href="fact-sheets.html" class="dropdown-item">Fact Sheets</a>
                  <a href="index.html#global-movement" class="dropdown-item">3D Interactive Earth</a>
                </div>
              </div>

              <div class="nav-dropdown">
                <a href="about.html" class="menu-item ${activeSlug === 'about' || activeSlug === 'history' || activeSlug === 'victories' || activeSlug === 'board' || activeSlug === 'team' || activeSlug === 'careers' ? 'active' : ''}">
                  About <span class="dropdown-caret">&#9662;</span>
                </a>
                <div class="nav-dropdown-content">
                  <a href="about.html" class="dropdown-item">About EARTHDAY.ORG</a>
                  <a href="history.html" class="dropdown-item">History Since 1970</a>
                  <a href="victories.html" class="dropdown-item">50+ Years of Victories</a>
                  <a href="board.html" class="dropdown-item">Board of Directors</a>
                  <a href="team.html" class="dropdown-item">Leadership &amp; Team</a>
                  <a href="careers.html" class="dropdown-item">Careers &amp; Openings</a>
                </div>
              </div>

              <a href="news-and-stories.html" class="menu-item ${activeSlug.startsWith('news') || activeSlug.startsWith('article') || activeSlug.startsWith('press') ? 'active' : ''}">News</a>

              <div class="nav-dropdown">
                <a href="take-action.html" class="menu-item ${activeSlug === 'take-action' || activeSlug.includes('giving') || activeSlug.includes('supporter') || activeSlug.includes('partner') ? 'active' : ''}">
                  Get Involved <span class="dropdown-caret">&#9662;</span>
                </a>
                <div class="nav-dropdown-content">
                  <a href="take-action.html" class="dropdown-item">Take Action Now</a>
                  <a href="partner-with-us.html" class="dropdown-item">Partner With Us</a>
                  <a href="international-network.html" class="dropdown-item">192 Countries Network</a>
                  <a href="individual-giving.html" class="dropdown-item">Individual Giving</a>
                  <a href="business-corporate-supporters.html" class="dropdown-item">Corporate Partners</a>
                  <a href="https://earthday.store/" target="_blank" rel="noopener" class="dropdown-item view-all">Official Store &nearr;</a>
                </div>
              </div>
            </div>
          </nav>

          <div class="right-nav-menu">
            <a href="donate.html" class="nav-button-v2">GIVE</a>
          </div>
        </div>

        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Navigation -->
  <div class="mobile-drawer" id="mobileDrawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
    <div class="mobile-drawer-header">
      <img src="assets/img/logo-white.webp" alt="EARTHDAY.ORG" class="nav-logo" style="height:32px;" />
      <button class="mobile-drawer-close" id="mobileDrawerClose" aria-label="Close menu">&times;</button>
    </div>
    <nav class="mobile-drawer-links" aria-label="Mobile Navigation Links">
      <a href="index.html">Home</a>
      <a href="our-work.html">Campaigns &amp; Initiatives</a>
      <a href="earth-hub.html">Earth Hub &amp; Quizzes</a>
      <a href="earth-day-2027.html">Earth Day 2027</a>
      <a href="about.html">About EARTHDAY.ORG</a>
      <a href="history.html">History Since 1970</a>
      <a href="victories.html">50+ Years of Victories</a>
      <a href="team.html">Leadership &amp; Staff</a>
      <a href="news-and-stories.html">News &amp; Stories</a>
      <a href="take-action.html">Take Action</a>
      <a href="contact.html">Contact Us</a>
    </nav>
    <div style="margin-top: 32px;">
      <a href="donate.html" class="green-button" style="width: 100%; justify-content: center; text-decoration: none;">
        <span class="text"><span class="p1-left semibold-white">GIVE TO THE EARTH</span></span>
        <span class="button-arrow white">
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </a>
    </div>
  </div>
  `;
}

// Common Footer HTML
function renderFooter() {
  return `
  <!-- FOOTER -->
  <footer class="footer-section">
    <div class="container">
      <div class="footer-wrap">
        <div class="footer-top">
          <div class="footer-top-left">
            <a href="index.html" aria-label="EARTHDAY.ORG">
              <img src="assets/img/logo-white.webp" alt="EARTHDAY.ORG" class="logo-brand" />
            </a>
            <div class="footer-newsletter">
              <p class="p1-left light-white">Join over 1 billion people taking decisive action to protect biodiversity and stabilize our shared climate.</p>
              <form class="footer-form" action="sign-up.html" method="GET">
                <input type="email" placeholder="Enter your email address" required class="footer-input" aria-label="Your email address" />
                <button type="submit" class="footer-submit" aria-label="Subscribe">
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#07074E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </form>
            </div>
            <div class="footer-badge">
              <img src="assets/img/charity-nav.webp" alt="Charity Navigator 4-Star Charity Rating" width="120" height="42" loading="lazy" />
            </div>
          </div>

          <div class="footer-right">
            <div class="footer-menu">
              <p class="footer-menu-title">EXPLORE</p>
              <div class="footer-menu-item"><a href="earth-day-2027.html" class="footer-link">Earth Day 2027</a></div>
              <div class="footer-menu-item"><a href="our-work.html" class="footer-link">Our Work &amp; Campaigns</a></div>
              <div class="footer-menu-item"><a href="earth-hub.html" class="footer-link">Earth Hub &amp; Tools</a></div>
              <div class="footer-menu-item"><a href="quizzes.html" class="footer-link">Eco Quizzes</a></div>
              <div class="footer-menu-item"><a href="fact-sheets.html" class="footer-link">Fact Sheets</a></div>
              <div class="footer-menu-item"><a href="https://earthday.store/" target="_blank" rel="noopener" class="footer-link">Official Store &nearr;</a></div>
            </div>

            <div class="footer-menu">
              <p class="footer-menu-title">ABOUT</p>
              <div class="footer-menu-item"><a href="about.html" class="footer-link">Our Mission</a></div>
              <div class="footer-menu-item"><a href="history.html" class="footer-link">History Since 1970</a></div>
              <div class="footer-menu-item"><a href="victories.html" class="footer-link">Five Decades of Victories</a></div>
              <div class="footer-menu-item"><a href="team.html" class="footer-link">Global Leadership</a></div>
              <div class="footer-menu-item"><a href="careers.html" class="footer-link">Careers &amp; Jobs</a></div>
              <div class="footer-menu-item"><a href="contact.html" class="footer-link">Washington, D.C. HQ</a></div>
            </div>

            <div class="footer-menu">
              <p class="footer-menu-title">GIVE &amp; ACT</p>
              <div class="footer-menu-item"><a href="donate.html" class="footer-link">Donate Online</a></div>
              <div class="footer-menu-item"><a href="take-action.html" class="footer-link">Take Action Now</a></div>
              <div class="footer-menu-item"><a href="individual-giving.html" class="footer-link">Individual Giving</a></div>
              <div class="footer-menu-item"><a href="business-corporate-supporters.html" class="footer-link">Corporate Partners</a></div>
              <div class="footer-menu-item"><a href="international-network.html" class="footer-link">192 Countries Network</a></div>
              <div class="footer-menu-item"><a href="sign-up.html" class="footer-link">Volunteer &amp; Join</a></div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 EARTHDAY.ORG. All rights reserved. 1616 P Street NW, Suite 340, Washington, D.C. 20036</p>
          <div class="footer-legal-links">
            <a href="privacy-policy.html">Privacy Policy</a>
            <span class="sep">&bull;</span>
            <a href="terms-of-use.html">Terms of Use</a>
            <span class="sep">&bull;</span>
            <a href="policies-and-financials.html">Policies &amp; Financials (990)</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  `;
}

// Banner Metadata Spec: Strict text bounds enforced:
// H1: 2 to 6 words, <= 48 chars
// Intro: 16 to 26 words, <= 150 chars
const BANNER_MAP = {
  // Core
  'earth-day-2027': {
    h1: 'Food for Our Planet',
    intro: 'Transforming global food systems to heal our soil, protect biodiversity, slash emissions, and secure healthy nutrition for every community on Earth.',
    img: 'assets/img/vegetable-market.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Earth Day 2027', url: 'earth-day-2027.html' }]
  },
  'our-focus': {
    h1: 'Our Global Focus',
    intro: 'Empowering communities through scientific education, conservation, policy advocacy, and decisive citizen mobilization for our living planet.',
    img: 'assets/img/farmer-rice-field.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Our Focus', url: 'our-focus.html' }]
  },
  'partner-with-us': {
    h1: 'Partner With Us',
    intro: 'Join a global coalition of organizations, schools, and businesses driving measurable environmental solutions across 192 countries worldwide.',
    img: 'assets/img/banner-youth.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Partners', url: 'partner-with-us.html' }]
  },
  'earth-day-archive': {
    h1: 'Earth Day Archive',
    intro: 'Explore landmark achievements, international mobilizations, and historic civic milestones that have shaped global environmental policy since 1970.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Archive', url: 'earth-day-archive.html' }]
  },
  'earth-hub': {
    h1: 'Earth Hub Action Center',
    intro: 'Your central resource for community toolkits, educational quizzes, interactive science data, and frontline citizen mobilization tools worldwide.',
    img: 'assets/img/earth-from-space.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Earth Hub', url: 'earth-hub.html' }]
  },
  'toolkits': {
    h1: 'Action Toolkits & Guides',
    intro: 'Download practical guides, event planning frameworks, and civic playbooks designed to spark verifiable environmental action in your town.',
    img: 'assets/img/banner-education.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Toolkits', url: 'toolkits.html' }]
  },
  'take-action': {
    h1: 'Take Action for Earth',
    intro: 'Every voice, petition, cleanup, and tree planted strengthens our worldwide movement. Discover direct steps you can take today to safeguard nature.',
    img: 'assets/img/banner-cleanup.webp',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Take Action', url: 'take-action.html' }]
  },
  'our-work': {
    h1: 'Our Work Worldwide',
    intro: 'Leading major global campaigns across native tree planting, plastics, climate literacy, and regenerative agriculture on every continent.',
    img: 'assets/img/lemur-canopy-tree-project.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Our Work', url: 'our-work.html' }]
  },
  'about': {
    h1: 'About EARTHDAY.ORG',
    intro: 'Mobilizing over one billion citizens across 192 nations since 1970 to educate, diversify, and activate the international environmental movement.',
    img: 'assets/img/banner-EDN-board-members.png',
    pos: 'center top',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'About Us', url: 'about.html' }]
  },
  'history': {
    h1: 'History of Earth Day',
    intro: 'How Senator Gaylord Nelson and Denis Hayes launched the world\'s largest civic movement and founded modern environmental legal protection.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'History', url: 'history.html' }]
  },
  'victories': {
    h1: 'Environmental Victories',
    intro: 'Explore five decades of legislative breakthroughs, protected bio-corridors, plastic bans, and civic triumphs achieved by our international coalition.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Victories', url: 'victories.html' }]
  },
  'board': {
    h1: 'Board of Directors',
    intro: 'Meet the distinguished conservationists, legal scholars, scientists, and civic leaders guiding EARTHDAY.ORG\'s fiduciary mission and strategic vision.',
    img: 'assets/img/banner-EDN-board-members.png',
    pos: 'center top',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'About', url: 'about.html' }, { label: 'Board', url: 'board.html' }]
  },
  'global-advisory-committee': {
    h1: 'Global Advisory Committee',
    intro: 'An international council of diplomats, climate scientists, and grassroots leaders providing strategic guidance to EARTHDAY.ORG executive leadership.',
    img: 'assets/img/banner-youth.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Advisory Committee', url: 'global-advisory-committee.html' }]
  },
  'team': {
    h1: 'Our Leadership Team',
    intro: 'Meet the dedicated organizers, scientists, and policy specialists coordinating EARTHDAY.ORG\'s global initiatives from our Washington headquarters.',
    img: 'assets/img/banner-EDN-board-members.png',
    pos: 'center top',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Team', url: 'team.html' }]
  },
  'careers': {
    h1: 'Careers at EARTHDAY.ORG',
    intro: 'Work alongside dedicated climate advocates at our Washington, D.C. headquarters and regional hubs to advance global environmental protection.',
    img: 'assets/img/banner-youth.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Careers', url: 'careers.html' }]
  },
  'supporters': {
    h1: 'Our Global Supporters',
    intro: 'Honoring the philanthropic foundations, grassroots donors, and institutional allies whose generous contributions make our worldwide impact possible.',
    img: 'assets/img/farmer-rice-field.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Supporters', url: 'supporters.html' }]
  },
  'individual-giving': {
    h1: 'Individual Giving',
    intro: 'Your direct tax-deductible contribution powers tree planting, legal policy action, community cleanups, and universal climate literacy education.',
    img: 'assets/img/farmer-rice-field.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Give', url: 'donate.html' }, { label: 'Individual Giving', url: 'individual-giving.html' }]
  },
  'business-corporate-supporters': {
    h1: 'Corporate Partnerships',
    intro: 'Partnering with leading enterprises committed to verifiable carbon cuts, circular supply chains, and lasting nature protection worldwide.',
    img: 'assets/img/vegetable-market.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Corporate Partners', url: 'business-corporate-supporters.html' }]
  },
  'donate': {
    h1: 'Donate to EARTHDAY.ORG',
    intro: 'Support the world\'s largest environmental movement. Your generous gift funds frontline tree planting, policy reform, and climate literacy education.',
    img: 'assets/img/lemur-canopy-tree-project.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Donate', url: 'donate.html' }]
  },
  'donor-advised-fund': {
    h1: 'Donor Advised Funds',
    intro: 'Recommend a grant from your Donor Advised Fund to accelerate international reforestation, plastic eradication, and grassroots community defense.',
    img: 'assets/img/farmer-rice-field.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Giving', url: 'individual-giving.html' }, { label: 'DAF', url: 'donor-advised-fund.html' }]
  },
  'employer-matching-gifts': {
    h1: 'Employer Matching Gifts',
    intro: 'Double your impact. Many employers match charitable contributions made by their staff to certified 501(c)(3) environmental organizations worldwide.',
    img: 'assets/img/banner-youth.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Matching Gifts', url: 'employer-matching-gifts.html' }]
  },
  'contact': {
    h1: 'Contact EARTHDAY.ORG',
    intro: 'Connect with our Washington, D.C. headquarters, media relations team, partnership advisors, and international regional coordinators across the globe.',
    img: 'assets/img/earth-from-space.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Contact', url: 'contact.html' }]
  },
  'international-network': {
    h1: 'International Network',
    intro: 'Active across 192 countries with 150,000 partner groups, mobilizing citizens, schools, and civic leaders to restore our natural world.',
    img: 'assets/img/earth-from-space.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Network', url: 'international-network.html' }]
  },
  'countries-we-serve': {
    h1: 'Countries We Serve',
    intro: 'A comprehensive directory of nations where EARTHDAY.ORG coordinates tree plantings, educational initiatives, plastic audits, and policy campaigns.',
    img: 'assets/img/banner-india.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Countries We Serve', url: 'countries-we-serve.html' }]
  },
  'policies-and-financials': {
    h1: 'Policies & Financials',
    intro: 'Review our audited financial statements, IRS Form 990 disclosures, independent Charity Navigator ratings, and organizational governance guidelines.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Governance', url: 'policies-and-financials.html' }]
  },
  'sign-up': {
    h1: 'Join the Movement',
    intro: 'Subscribe to our frontline newsletter, receive action alerts, and join over one billion environmental advocates shaping the future of conservation.',
    img: 'assets/img/banner-cleanup.webp',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Sign Up', url: 'sign-up.html' }]
  },
  'privacy-policy': {
    h1: 'Privacy Policy',
    intro: 'We respect your privacy and are committed to transparently protecting your personal information, donor data, and online communications security.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Privacy', url: 'privacy-policy.html' }]
  },
  'terms-of-use': {
    h1: 'Terms of Use',
    intro: 'Please review the terms and conditions governing the use of EARTHDAY.ORG digital platforms, educational resources, and campaign materials.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Terms', url: 'terms-of-use.html' }]
  },
  '404': {
    h1: 'Page Not Found',
    intro: 'The page you requested could not be located. Explore our core initiatives, discover Earth Day 2027, or spin our interactive global globe.',
    img: 'assets/img/earth-from-space.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Error 404', url: '404.html' }]
  },

  // 12 Campaigns
  'campaign-food-for-our-planet': {
    h1: 'Food for Our Planet',
    intro: 'Transforming global food systems to heal our soil, protect biodiversity, slash emissions, and secure healthy nutrition for every community on Earth.',
    img: 'assets/img/vegetable-market.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Food for Our Planet', url: 'campaign-food-for-our-planet.html' }]
  },
  'campaign-canopy-tree-project': {
    h1: 'The Canopy Project',
    intro: 'Planting tens of millions of native trees to rehabilitate degraded habitats, shield endangered wildlife, and restore vital rural watershed corridors.',
    img: 'assets/img/lemur-canopy-tree-project.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Canopy Project', url: 'campaign-canopy-tree-project.html' }]
  },
  'campaign-artists-for-the-earth': {
    h1: 'Artists for the Earth',
    intro: 'Harnessing the emotional power of art, theater, poetry, and music to inspire urgent environmental consciousness and activate diverse communities.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Artists for Earth', url: 'campaign-artists-for-the-earth.html' }]
  },
  'campaign-climate-education': {
    h1: 'Climate Education Hub',
    intro: 'Advocating for compulsory climate literacy and practical green economy skills across elementary, secondary, and higher education worldwide.',
    img: 'assets/img/banner-education.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Climate Education', url: 'campaign-climate-education.html' }]
  },
  'campaign-campus-coalition': {
    h1: 'Campus Coalition Network',
    intro: 'Mobilizing university students and faculty worldwide to decarbonize collegiate campuses, lead research, and organize civic voter engagement drives.',
    img: 'assets/img/banner-education.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Campus Coalition', url: 'campaign-campus-coalition.html' }]
  },
  'campaign-climate-education-coalition': {
    h1: 'Education Coalition',
    intro: 'Uniting global educators, teacher unions, and youth delegates to mandate climate literacy at COP summits and international education ministries.',
    img: 'assets/img/banner-education.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Education Coalition', url: 'campaign-climate-education-coalition.html' }]
  },
  'campaign-end-plastics': {
    h1: 'End Plastics Worldwide',
    intro: 'Demanding a 60% reduction in global virgin plastic production by 2040 and advocating for a binding UN Global Plastics Treaty.',
    img: 'assets/img/banner-plastics.png',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'End Plastics', url: 'campaign-end-plastics.html' }]
  },
  'campaign-fashion-for-the-earth': {
    h1: 'Fashion for the Earth',
    intro: 'Exposing the environmental footprint of fast fashion, advocating for sustainable circular textiles, and demanding stringent supply chain legislation.',
    img: 'assets/img/banner-fashion.png',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Fashion for Earth', url: 'campaign-fashion-for-the-earth.html' }]
  },
  'campaign-great-global-cleanup': {
    h1: 'Great Global Cleanup',
    intro: 'The world\'s largest civic cleanup drive, mobilizing tens of millions of volunteers to remove plastic debris from shorelines and public spaces.',
    img: 'assets/img/banner-cleanup.webp',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Global Cleanup', url: 'campaign-great-global-cleanup.html' }]
  },
  'campaign-my-future-my-voice': {
    h1: 'My Future My Voice',
    intro: 'Amplifying the voices and innovations of remarkable young environmental activists across Asia, Africa, Europe, and the Americas.',
    img: 'assets/img/banner-youth.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'My Future My Voice', url: 'campaign-my-future-my-voice.html' }]
  },
  'campaign-regenerative-agriculture': {
    h1: 'Regenerative Agriculture',
    intro: 'Championing soil health, agroforestry, cover cropping, and rotational grazing to sequester carbon, restore water tables, and build resilient foods.',
    img: 'assets/img/banner-soils.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Regenerative Ag', url: 'campaign-regenerative-agriculture.html' }]
  },
  'campaign-vote-earth': {
    h1: 'Vote Earth: Civic Action',
    intro: 'Mobilizing citizens worldwide to exercise their democratic rights and demand bold, decisive environmental commitments from elected representatives.',
    img: 'assets/img/banner-youth.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Campaigns', url: 'our-work.html' }, { label: 'Vote Earth', url: 'campaign-vote-earth.html' }]
  },

  // Regional Pages
  'region-india': {
    h1: 'EARTHDAY.ORG India',
    intro: 'Coordinating nationwide climate literacy, freshwater restoration, urban greening, and grassroots civic mobilization across all Indian states.',
    img: 'assets/img/banner-india.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Network', url: 'international-network.html' }, { label: 'India', url: 'region-india.html' }]
  },
  'region-africa': {
    h1: 'EARTHDAY.ORG Africa',
    intro: 'Partnering with 28 African nations on community agroforestry, single-use plastic phaseouts, youth environmental assemblies, and clean energy advocacy.',
    img: 'assets/img/lemur-canopy-tree-project.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Network', url: 'international-network.html' }, { label: 'Africa', url: 'region-africa.html' }]
  },
  'region-south-america': {
    h1: 'EARTHDAY.ORG South America',
    intro: 'Defending vital Amazonian watersheds, supporting indigenous forest guardians, and leading local community cleanups throughout South America.',
    img: 'assets/img/farmer-rice-field.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Network', url: 'international-network.html' }, { label: 'South America', url: 'region-south-america.html' }]
  },
  'region-mexico': {
    h1: 'EARTHDAY.ORG Mexico',
    intro: 'Advancing environmental education, protecting marine habitats in Baja, and coordinating community cleanups across Mexico and Central America.',
    img: 'assets/img/banner-cleanup.webp',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Network', url: 'international-network.html' }, { label: 'Mexico', url: 'region-mexico.html' }]
  },

  // Quizzes
  'quizzes': {
    h1: 'Environmental Quizzes',
    intro: 'Test your knowledge on plastics, climate change, renewable energy, and endangered wildlife with our verified interactive educational quizzes.',
    img: 'assets/img/earth-from-space.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Earth Hub', url: 'earth-hub.html' }, { label: 'Quizzes', url: 'quizzes.html' }]
  },
  'quiz-plastic-pollution': {
    h1: 'Plastic Pollution Quiz',
    intro: 'Test how much you understand about microplastics, global oceanic gyres, single-use consumer waste, and solutions to end plastic pollution.',
    img: 'assets/img/banner-plastics.png',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Quizzes', url: 'quizzes.html' }, { label: 'Plastics Quiz', url: 'quiz-plastic-pollution.html' }]
  },
  'quiz-climate-change': {
    h1: 'Climate Change Quiz',
    intro: 'Evaluate your understanding of greenhouse gas warming, extreme weather impacts, carbon feedback loops, and renewable energy solutions.',
    img: 'assets/img/earth-from-space.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Quizzes', url: 'quizzes.html' }, { label: 'Climate Quiz', url: 'quiz-climate-change.html' }]
  },
  'quiz-clean-energy': {
    h1: 'Clean Energy Quiz',
    intro: 'Explore solar, wind, geothermal, and battery storage breakthroughs driving the rapid transition away from polluting fossil fuels worldwide.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Quizzes', url: 'quizzes.html' }, { label: 'Clean Energy Quiz', url: 'quiz-clean-energy.html' }]
  },
  'quiz-conservation': {
    h1: 'Species Conservation Quiz',
    intro: 'Learn how habitat loss, deforestation, and climate disruptions threaten global biodiversity, and find out how conservation efforts save species.',
    img: 'assets/img/lemur-canopy-tree-project.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Quizzes', url: 'quizzes.html' }, { label: 'Species Quiz', url: 'quiz-conservation.html' }]
  },
  'quiz-deforestation': {
    h1: 'Deforestation Quiz',
    intro: 'Assess your knowledge on ancient old-growth canopies, carbon storage, and how community agroforestry restores degraded tropical rainforests.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Quizzes', url: 'quizzes.html' }, { label: 'Forests Quiz', url: 'quiz-deforestation.html' }]
  },

  // Fact Sheets
  'fact-sheets': {
    h1: 'Environmental Fact Sheets',
    intro: 'Verified science briefs, citations, and critical data summaries covering climate change, plastics, biodiversity loss, and food system sustainability.',
    img: 'assets/img/banner-forest.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Earth Hub', url: 'earth-hub.html' }, { label: 'Fact Sheets', url: 'fact-sheets.html' }]
  },
  'fact-sheet-plastics': {
    h1: 'Plastics Fact Sheet',
    intro: 'Key scientific data on global plastic generation, human microplastic ingestion, marine ecosystem degradation, and policy solutions for reduction.',
    img: 'assets/img/banner-plastics.png',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Fact Sheets', url: 'fact-sheets.html' }, { label: 'Plastics Fact Sheet', url: 'fact-sheet-plastics.html' }]
  },
  'fact-sheet-climate': {
    h1: 'Climate Science Fact Sheet',
    intro: 'Core facts, IPCC carbon budgets, tipping points, and measurable economic benefits of rapid decarbonization for communities and ecosystems worldwide.',
    img: 'assets/img/earth-from-space.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Fact Sheets', url: 'fact-sheets.html' }, { label: 'Climate Fact Sheet', url: 'fact-sheet-climate.html' }]
  },
  'fact-sheet-trees': {
    h1: 'Reforestation Fact Sheet',
    intro: 'How native canopy reforestation stabilizes soil hydrology, generates vital habitat corridors, and provides long-term biological carbon sequestration.',
    img: 'assets/img/lemur-canopy-tree-project.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Fact Sheets', url: 'fact-sheets.html' }, { label: 'Trees Fact Sheet', url: 'fact-sheet-trees.html' }]
  },
  'fact-sheet-food': {
    h1: 'Food Systems Fact Sheet',
    intro: 'The environmental footprint of modern agriculture, livestock emissions, soil loss, and the restorative power of plant-rich regenerative food systems.',
    img: 'assets/img/vegetable-market.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Fact Sheets', url: 'fact-sheets.html' }, { label: 'Food Fact Sheet', url: 'fact-sheet-food.html' }]
  },
  'fact-sheet-oceans': {
    h1: 'Ocean Conservation Brief',
    intro: 'Marine heatwaves, coral bleaching, ocean acidification, and the vital role of coastal wetlands in sustaining marine life and buffering shorelines.',
    img: 'assets/img/banner-cleanup.webp',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Fact Sheets', url: 'fact-sheets.html' }, { label: 'Oceans Fact Sheet', url: 'fact-sheet-oceans.html' }]
  },

  // News & Articles
  'news-and-stories': {
    h1: 'News & Frontline Stories',
    intro: 'The latest investigative environmental reporting, campaign announcements, field dispatches, and policy updates directly from EARTHDAY.ORG worldwide.',
    img: 'assets/img/banner-youth.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'News & Stories', url: 'news-and-stories.html' }]
  },
  'article-earth-day-2027-theme': {
    h1: 'Food for Our Planet Launch',
    intro: 'EARTHDAY.ORG officially reveals the multi-year global focus for Earth Day 2027, centering on agricultural resilience, soil health, and nutrition.',
    img: 'assets/img/vegetable-market.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'News', url: 'news-and-stories.html' }, { label: 'Earth Day 2027', url: 'article-earth-day-2027-theme.html' }]
  },
  'article-global-plastics-treaty': {
    h1: 'Global Plastics Treaty Call',
    intro: 'Civil society delegates rally at UN intergovernmental negotiations in Geneva to demand binding production limits on virgin polymer manufacturing.',
    img: 'assets/img/banner-plastics.png',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'News', url: 'news-and-stories.html' }, { label: 'Plastics Treaty', url: 'article-global-plastics-treaty.html' }]
  },
  'article-climate-literacy': {
    h1: 'Universal Climate Literacy',
    intro: 'Why integrating climate science and green skills into compulsory education is vital for building clean economies and informed democratic societies.',
    img: 'assets/img/banner-education.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'News', url: 'news-and-stories.html' }, { label: 'Climate Literacy', url: 'article-climate-literacy.html' }]
  },
  'article-canopy-project-milestone': {
    h1: 'Canopy Project Milestone',
    intro: 'Celebrating the planting of over 100 million trees across degraded habitats, reviving wildlife corridors from Madagascar to the Sierra Madre.',
    img: 'assets/img/lemur-canopy-tree-project.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'News', url: 'news-and-stories.html' }, { label: 'Canopy Milestone', url: 'article-canopy-project-milestone.html' }]
  },
  'press-release-earth-day-global': {
    h1: 'Global Mobilization Alert',
    intro: 'Over one billion citizens across 192 nations unite for Earth Day, demanding accelerated climate action, clean energy, and nature restoration.',
    img: 'assets/img/banner-youth.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Press', url: 'news-and-stories.html' }, { label: 'Global Release', url: 'press-release-earth-day-global.html' }]
  },
  'press-release-un-climate-summit': {
    h1: 'UN Climate Summit Statement',
    intro: 'EARTHDAY.ORG calls on international negotiators to end fossil subsidies, double nature finance, and enact binding legal protections for ecosystems.',
    img: 'assets/img/earth-from-space.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: 'Press', url: 'news-and-stories.html' }, { label: 'UN Summit Statement', url: 'press-release-un-climate-summit.html' }]
  }
};

// Render Breadcrumb JSON-LD schema
function renderBreadcrumbSchema(crumbs) {
  const itemListElement = crumbs.map((c, i) => ({
    '@type': 'ListItem',
    'position': i + 1,
    'name': c.label,
    'item': `https://www.earthday.org/${c.url}`
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement
  };

  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// Render HTML Breadcrumb UI
function renderBreadcrumbsHtml(crumbs) {
  return crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    if (isLast) {
      return `<span class="current">${c.label}</span>`;
    }
    return `<a href="${c.url}">${c.label}</a><span class="separator">/</span>`;
  }).join(' ');
}

// Generate the specific body content for each template type
function renderBodyContent(slug, meta, scraped) {
  const type = sitemap.find(s => s.slug === slug)?.type || 'standard';
  const paragraphs = scraped?.paragraphs || [];
  const cleanP = (idx) => paragraphs[idx] || 'EARTHDAY.ORG works across 192 countries with 150,000 partners to protect ecosystems, educate students, and advance decisive environmental policies.';

  // Interactive donation box for action/giving pages
  const donationBox = `
    <div class="donation-box" style="margin-top: 40px;">
      <h3 class="h3-left" style="color: var(--oxford-blue); margin-bottom: 20px;">Make a Direct Contribution</h3>
      <div class="frequency-toggle">
        <button type="button" class="frequency-btn active" data-freq="monthly">Monthly Support</button>
        <button type="button" class="frequency-btn" data-freq="once">One-Time Gift</button>
      </div>
      <div class="amount-grid">
        <button type="button" class="amount-btn" data-amount="25">$25</button>
        <button type="button" class="amount-btn active" data-amount="50">$50</button>
        <button type="button" class="amount-btn" data-amount="100">$100</button>
        <button type="button" class="amount-btn" data-amount="250">$250</button>
        <button type="button" class="amount-btn" data-amount="500">$500</button>
        <button type="button" class="amount-btn" data-amount="other">Custom</button>
      </div>
      <div style="margin-top: 24px;">
        <a href="donate.html" class="hero-give-btn" style="width: 100%; justify-content: center; text-decoration: none;">
          <div class="text"><p class="p1-left semibold-white">PROCEED TO SECURE DONATION</p></div>
          <div class="button-arrow white">
            <svg viewBox="0 0 20 20" fill="none" class="icon-20px"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </a>
      </div>
      <p style="font-size: 13px; color: var(--text-muted); margin-top: 14px; text-align: center;">
        EARTHDAY.ORG is an IRS-registered 501(c)(3) nonprofit charity. Contributions are fully tax-deductible to the extent allowed by law.
      </p>
    </div>
  `;

  // Dynamic template rendering
  switch (type) {
    case 'campaign':
      return `
      <section class="initiatives-section" style="padding-top: 64px;">
        <div class="container">
          <div class="split-layout" style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 48px; align-items: start;">
            <div class="campaign-detail-prose">
              <div class="label"><div class="dot"></div><p class="p1-left semibold-green">CAMPAIGN OVERVIEW</p></div>
              <h2 class="h2-left semibold-black" style="margin-top: 12px; margin-bottom: 24px;">Frontline Environmental Mission</h2>
              <p class="p1-left" style="margin-bottom: 20px; line-height: 1.7;">${cleanP(0)}</p>
              <p class="p1-left" style="margin-bottom: 20px; line-height: 1.7;">${cleanP(1)}</p>
              <div class="quote-callout" style="border-left: 4px solid var(--safety-orange); padding-left: 20px; margin: 32px 0;">
                <h4 style="font-style: italic; color: var(--oxford-blue); font-weight: 600;">"Decisive action today determines whether our natural ecosystems survive for the generations to come."</h4>
                <p class="p2-left" style="margin-top: 8px; color: var(--text-muted); font-weight: 600;">— EARTHDAY.ORG Global Campaign Directors</p>
              </div>
              <p class="p1-left" style="margin-bottom: 24px; line-height: 1.7;">${cleanP(2)}</p>
              <div class="campaign-cta-row" style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 36px;">
                <a href="take-action.html" class="hero-give-btn">
                  <div class="text"><p class="p1-left semibold-white">TAKE ACTION NOW</p></div>
                  <div class="button-arrow white"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="#F37321" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                </a>
                <a href="toolkits.html" class="white-button">
                  <div class="text"><p class="p1-left semibold-green">DOWNLOAD TOOLKIT</p></div>
                  <div class="button-arrow"><svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M5 15L15 5M6.875 5H15V13.125" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                </a>
              </div>
            </div>
            <div class="campaign-sidebar">
              <div class="sidebar-card" style="background: var(--white); border-radius: 16px; padding: 32px; box-shadow: 0 12px 36px var(--navy-08); border: 1px solid var(--navy-14);">
                <h4 class="h4-left semibold-black" style="margin-bottom: 16px;">Key Campaign Metrics</h4>
                <div class="metric-row" style="padding: 14px 0; border-bottom: 1px solid var(--navy-08);">
                  <span style="font-size: 13px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Global Reach</span>
                  <h3 style="color: var(--oxford-blue); font-weight: 800; margin-top: 4px;">192 Countries</h3>
                </div>
                <div class="metric-row" style="padding: 14px 0; border-bottom: 1px solid var(--navy-08);">
                  <span style="font-size: 13px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Coalition Partners</span>
                  <h3 style="color: var(--oxford-blue); font-weight: 800; margin-top: 4px;">150,000+</h3>
                </div>
                <div class="metric-row" style="padding: 14px 0;">
                  <span style="font-size: 13px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Direct Impact</span>
                  <h3 style="color: var(--safety-orange); font-weight: 800; margin-top: 4px;">Verifiable Action</h3>
                </div>
                <div style="margin-top: 24px;">
                  <a href="donate.html" class="green-button" style="width: 100%; justify-content: center;">
                    <span class="text"><span class="p1-left semibold-white">SUPPORT THIS INITIATIVE</span></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      `;

    case 'initiative':
      return `
      <section class="vision-mission-section" style="padding-top: 64px;">
        <div class="container">
          <div class="initiative-header" style="max-width: 860px; margin-bottom: 48px;">
            <div class="label"><div class="dot"></div><p class="p1-left semibold-green">STRATEGIC FOCUS</p></div>
            <h2 class="h2-left semibold-black" style="margin-top: 12px; margin-bottom: 20px;">Systemic Solutions for Our Planet</h2>
            <p class="p1-left" style="line-height: 1.7; font-size: 17px;">${cleanP(0)}</p>
          </div>
          <div class="pillars-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; margin-bottom: 64px;">
            <div class="pillar-card" style="background: var(--white); border-radius: 16px; padding: 36px; border: 1px solid var(--navy-14); box-shadow: 0 12px 32px var(--navy-08);">
              <div class="label"><div class="dot"></div><p class="p1-left semibold-green">PILLAR ONE</p></div>
              <h3 class="h3-left" style="margin: 14px 0; color: var(--oxford-blue);">Healthy People</h3>
              <p class="p2-left" style="color: var(--text-muted); line-height: 1.6;">${cleanP(1)}</p>
            </div>
            <div class="pillar-card" style="background: var(--white); border-radius: 16px; padding: 36px; border: 1px solid var(--navy-14); box-shadow: 0 12px 32px var(--navy-08);">
              <div class="label"><div class="dot"></div><p class="p1-left semibold-green">PILLAR TWO</p></div>
              <h3 class="h3-left" style="margin: 14px 0; color: var(--oxford-blue);">Healthy Soils</h3>
              <p class="p2-left" style="color: var(--text-muted); line-height: 1.6;">${cleanP(2)}</p>
            </div>
            <div class="pillar-card" style="background: var(--white); border-radius: 16px; padding: 36px; border: 1px solid var(--navy-14); box-shadow: 0 12px 32px var(--navy-08);">
              <div class="label"><div class="dot"></div><p class="p1-left semibold-green">PILLAR THREE</p></div>
              <h3 class="h3-left" style="margin: 14px 0; color: var(--oxford-blue);">Healthy Futures</h3>
              <p class="p2-left" style="color: var(--text-muted); line-height: 1.6;">${cleanP(3)}</p>
            </div>
          </div>
        </div>
      </section>
      `;

    case 'action':
      return `
      <section class="initiatives-section" style="padding-top: 64px;">
        <div class="container">
          <div class="split-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;">
            <div>
              <div class="label"><div class="dot"></div><p class="p1-left semibold-green">MOBILIZE &amp; EMPOWER</p></div>
              <h2 class="h2-left semibold-black" style="margin-top: 12px; margin-bottom: 24px;">Fueling Worldwide Change</h2>
              <p class="p1-left" style="margin-bottom: 20px; line-height: 1.7;">${cleanP(0)}</p>
              <p class="p1-left" style="margin-bottom: 24px; line-height: 1.7;">${cleanP(1)}</p>
              <div style="background: var(--anti-flash); border-radius: 16px; padding: 28px; margin-top: 32px;">
                <h4 class="h4-left semibold-black">Fiduciary Accountability</h4>
                <p class="p2-left" style="margin-top: 8px; color: var(--text-muted);">
                  With top ratings on Charity Navigator, GuideStar, and BBB Wise Giving Alliance, over 88% of every dollar directly funds field operations, planting, education, and legal protection.
                </p>
              </div>
            </div>
            <div>
              ${donationBox}
            </div>
          </div>
        </div>
      </section>
      `;

    case 'quiz':
      return `
      <section class="quiz-section" style="padding: 64px 0;">
        <div class="container">
          <div class="quiz-container" style="max-width: 800px; margin: 0 auto; background: var(--white); border-radius: 16px; padding: 48px; border: 1px solid var(--navy-14); box-shadow: 0 16px 48px var(--navy-08);">
            <div class="label"><div class="dot"></div><p class="p1-left semibold-green">INTERACTIVE QUIZ</p></div>
            <h2 class="h2-left semibold-black" style="margin: 16px 0 24px;">Test Your Environmental Knowledge</h2>
            <p class="p1-left" style="margin-bottom: 32px; color: var(--text-muted);">${cleanP(0)}</p>
            
            <div class="quiz-question-box" style="margin-bottom: 32px; padding: 24px; background: var(--anti-flash); border-radius: 12px;">
              <h4 style="color: var(--oxford-blue); margin-bottom: 16px;">Question 1: What percentage of total plastic produced since 1950 has been recycled?</h4>
              <div class="quiz-options" style="display: flex; flex-direction: column; gap: 12px;">
                <button type="button" class="quiz-opt-btn" style="padding: 14px 20px; text-align: left; background: var(--white); border: 1px solid var(--navy-14); border-radius: 8px; font-weight: 600; cursor: pointer;">A) Approximately 9%</button>
                <button type="button" class="quiz-opt-btn" style="padding: 14px 20px; text-align: left; background: var(--white); border: 1px solid var(--navy-14); border-radius: 8px; font-weight: 600; cursor: pointer;">B) Around 32%</button>
                <button type="button" class="quiz-opt-btn" style="padding: 14px 20px; text-align: left; background: var(--white); border: 1px solid var(--navy-14); border-radius: 8px; font-weight: 600; cursor: pointer;">C) Over 50%</button>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 32px;">
              <a href="quizzes.html" class="white-button">
                <span class="text"><span class="p1-left semibold-green">&larr; MORE QUIZZES</span></span>
              </a>
              <a href="take-action.html" class="hero-give-btn">
                <div class="text"><p class="p1-left semibold-white">TAKE ACTION</p></div>
              </a>
            </div>
          </div>
        </div>
      </section>
      `;

    case 'contact':
      return `
      <section class="contact-section" style="padding: 64px 0;">
        <div class="container">
          <div class="contact-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;">
            <div>
              <div class="label"><div class="dot"></div><p class="p1-left semibold-green">HEADQUARTERS</p></div>
              <h2 class="h2-left semibold-black" style="margin: 12px 0 24px;">Washington, D.C. Operations</h2>
              <p class="p1-left" style="margin-bottom: 24px; line-height: 1.7;">
                EARTHDAY.ORG coordinates international campaigns, scientific policy review, and educational outreach from our global headquarters in Washington, D.C.
              </p>
              <div class="contact-details" style="display: flex; flex-direction: column; gap: 16px; margin-top: 24px;">
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <span style="font-weight: 700; color: var(--oxford-blue); min-width: 90px;">Address:</span>
                  <span>1616 P Street NW, Suite 340, Washington, D.C. 20036</span>
                </div>
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <span style="font-weight: 700; color: var(--oxford-blue); min-width: 90px;">Phone:</span>
                  <span>+1 (202) 518-0044</span>
                </div>
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <span style="font-weight: 700; color: var(--oxford-blue); min-width: 90px;">Inquiries:</span>
                  <span>info@earthday.org &bull; press@earthday.org</span>
                </div>
              </div>
            </div>
            <div style="background: var(--white); border-radius: 16px; padding: 40px; border: 1px solid var(--navy-14); box-shadow: 0 16px 40px var(--navy-08);">
              <h3 class="h3-left" style="margin-bottom: 20px; color: var(--oxford-blue);">Send a Message</h3>
              <form class="contact-form" action="#" method="POST" style="display: flex; flex-direction: column; gap: 16px;">
                <div>
                  <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--oxford-blue);">Full Name</label>
                  <input type="text" required style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--navy-14);" />
                </div>
                <div>
                  <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--oxford-blue);">Email Address</label>
                  <input type="email" required style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--navy-14);" />
                </div>
                <div>
                  <label style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--oxford-blue);">Message</label>
                  <textarea rows="4" required style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--navy-14);"></textarea>
                </div>
                <button type="submit" class="hero-give-btn" style="width: 100%; justify-content: center; margin-top: 8px;">
                  <div class="text"><p class="p1-left semibold-white">SUBMIT INQUIRY</p></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      `;

    default:
      return `
      <section class="initiatives-section" style="padding-top: 64px;">
        <div class="container">
          <div class="content-prose" style="max-width: 860px; margin: 0 auto;">
            <div class="label"><div class="dot"></div><p class="p1-left semibold-green">OFFICIAL DISPATCH</p></div>
            <h2 class="h2-left semibold-black" style="margin: 16px 0 24px;">Mobilizing Frontline Environmental Leadership</h2>
            <p class="p1-left" style="margin-bottom: 20px; line-height: 1.7; font-size: 17px;">${cleanP(0)}</p>
            <p class="p1-left" style="margin-bottom: 20px; line-height: 1.7;">${cleanP(1)}</p>
            <div class="quote-box" style="background: var(--anti-flash); border-radius: 12px; padding: 28px; margin: 32px 0;">
              <h4 style="color: var(--oxford-blue); font-weight: 700; margin-bottom: 8px;">Global Environmental Impact</h4>
              <p class="p2-left" style="color: var(--text-muted); line-height: 1.6;">${cleanP(2)}</p>
            </div>
            <p class="p1-left" style="margin-bottom: 20px; line-height: 1.7;">${cleanP(3)}</p>
            <div style="margin-top: 40px; display: flex; gap: 16px; flex-wrap: wrap;">
              <a href="take-action.html" class="hero-give-btn">
                <div class="text"><p class="p1-left semibold-white">TAKE ACTION</p></div>
              </a>
              <a href="donate.html" class="white-button">
                <div class="text"><p class="p1-left semibold-green">SUPPORT OUR WORK</p></div>
              </a>
            </div>
          </div>
        </div>
      </section>
      `;
  }
}

// Master Page Generator
function generatePage(pageMeta) {
  const slug = pageMeta.slug;
  const fileName = `${slug}.html`;
  const filePath = path.join(ROOT_DIR, fileName);

  const banner = BANNER_MAP[slug] || {
    h1: pageMeta.title.slice(0, 36),
    intro: 'Mobilizing over one billion citizens across 192 nations since 1970 to educate, diversify, and activate the international environmental movement.',
    img: 'assets/img/farmer-rice-field.jpg',
    pos: 'center center',
    crumbs: [{ label: 'Home', url: 'index.html' }, { label: pageMeta.title, url: `${slug}.html` }]
  };

  // Read scraped content
  let scraped = null;
  const contentFile = path.join(CONTENT_DIR, `${slug}.json`);
  if (fs.existsSync(contentFile)) {
    try {
      scraped = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
    } catch (e) {}
  }

  const navHtml = renderNav(slug);
  const footerHtml = renderFooter();
  const schemaBreadcrumbs = renderBreadcrumbSchema(banner.crumbs);
  const breadcrumbsHtml = renderBreadcrumbsHtml(banner.crumbs);
  const bodyContent = renderBodyContent(slug, banner, scraped);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageMeta.title} | EARTHDAY.ORG</title>
  <meta name="description" content="${scraped?.metaDescription || banner.intro}">
  <link rel="canonical" href="https://www.earthday.org/${slug}.html">
  <meta property="og:title" content="${banner.h1} | EARTHDAY.ORG">
  <meta property="og:description" content="${banner.intro}">
  <meta property="og:image" content="https://www.earthday.org/assets/img/og-image.png">
  <link rel="icon" type="image/png" href="assets/img/favicon.png">
  <link rel="stylesheet" href="assets/css/main.css">
  ${schemaBreadcrumbs}
</head>
<body class="inner-page">
  <div class="scroll-wrapper">
    ${navHtml}

    <main id="main-content">
      <!-- PAGE BANNER (HERO) -->
      <section class="page-hero">
        <img src="${banner.img}" alt="${banner.h1}" class="page-hero-bg" fetchpriority="high" style="--banner-pos: ${banner.pos};" />
        <div class="page-hero-overlay"></div>
        <div class="container">
          <div class="page-hero-wrap">
            <nav class="page-breadcrumbs" aria-label="Breadcrumb">
              ${breadcrumbsHtml}
            </nav>
            <h1 class="page-hero-title">${banner.h1}</h1>
            <p class="page-hero-lead">${banner.intro}</p>
          </div>
        </div>
      </section>

      <!-- BODY COMPOSITION -->
      ${bodyContent}
    </main>

    ${footerHtml}
  </div>

  <script src="assets/js/three.min.js"></script>
  <script type="module" src="assets/js/app.js"></script>
</body>
</html>`;

  fs.writeFileSync(filePath, html, 'utf8');
}

function buildAll() {
  console.log(`Generating all ${sitemap.length} pages from /data/site-map.json...`);
  
  for (const page of sitemap) {
    generatePage(page);
  }

  // Also build alias pages for backward compatibility
  const campaignsHub = sitemap.find(s => s.slug === 'our-work');
  if (campaignsHub) {
    generatePage({ ...campaignsHub, slug: 'campaigns' });
  }
  const articleStub = sitemap.find(s => s.slug === 'article-earth-day-2027-theme');
  if (articleStub) {
    generatePage({ ...articleStub, slug: 'article' });
  }

  console.log('Building production sitemap.xml...');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.earthday.org/</loc>
    <lastmod>2026-11-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${sitemap.map(s => `  <url>
    <loc>https://www.earthday.org/${s.slug}.html</loc>
    <lastmod>2026-11-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${s.type === 'initiative' || s.type === 'campaign' ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log('Done! All pages generated and sitemap.xml updated.');
}

buildAll();
