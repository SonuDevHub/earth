const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_DIR = path.join(DATA_DIR, 'content');
const IMG_DIR = path.join(__dirname, '..', 'assets', 'img');
const DOCS_DIR = path.join(__dirname, '..', 'docs');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });
if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });

const PAGE_MAP = [
  // Core pages
  { slug: 'earth-day-2027', url: 'https://www.earthday.org/earth-day-2027/', title: 'Earth Day 2027: Food for Our Planet', type: 'initiative' },
  { slug: 'our-focus', url: 'https://www.earthday.org/about-us/', title: 'Our Focus: Action for the Planet', type: 'initiative' },
  { slug: 'partner-with-us', url: 'https://www.earthday.org/earth-day-2027/partners/', title: 'Partner With Us', type: 'action' },
  { slug: 'earth-day-archive', url: 'https://www.earthday.org/history/', title: 'Earth Day History & Archive', type: 'standard' },
  { slug: 'earth-hub', url: 'https://www.earthday.org/earth-hub/', title: 'Earth Hub Action Center', type: 'initiative' },
  { slug: 'toolkits', url: 'https://www.earthday.org/our-toolkits/', title: 'Action Toolkits & Guides', type: 'resource' },
  { slug: 'take-action', url: 'https://www.earthday.org/actions/', title: 'Take Action for Our Planet', type: 'action' },
  { slug: 'our-work', url: 'https://www.earthday.org/campaign/', title: 'Our Work Worldwide', type: 'initiative' },
  { slug: 'about', url: 'https://www.earthday.org/about-us/', title: 'About EARTHDAY.ORG', type: 'about' },
  { slug: 'history', url: 'https://www.earthday.org/history/', title: 'The History of Earth Day', type: 'about' },
  { slug: 'victories', url: 'https://www.earthday.org/history/', title: 'Five Decades of Environmental Victories', type: 'about' },
  { slug: 'board', url: 'https://www.earthday.org/about-us/', title: 'Board of Directors', type: 'about' },
  { slug: 'global-advisory-committee', url: 'https://www.earthday.org/global-partnership-advisors/', title: 'Global Advisory Committee', type: 'about' },
  { slug: 'team', url: 'https://www.earthday.org/team/', title: 'Our Leadership & Global Team', type: 'about' },
  { slug: 'careers', url: 'https://www.earthday.org/careers/', title: 'Join Our Team & Careers', type: 'about' },
  { slug: 'supporters', url: 'https://www.earthday.org/supporters/', title: 'Our Global Supporters', type: 'action' },
  { slug: 'individual-giving', url: 'https://www.earthday.org/individual-giving/', title: 'Individual Giving & Membership', type: 'action' },
  { slug: 'business-corporate-supporters', url: 'https://www.earthday.org/business-and-corporate-supporters/', title: 'Business & Corporate Partners', type: 'action' },
  { slug: 'donate', url: 'https://www.earthday.org/donate/', title: 'Donate to EARTHDAY.ORG', type: 'action' },
  { slug: 'donor-advised-fund', url: 'https://www.earthday.org/individual-giving/', title: 'Donor Advised Funds (DAF)', type: 'action' },
  { slug: 'employer-matching-gifts', url: 'https://www.earthday.org/individual-giving/', title: 'Employer Matching Gifts', type: 'action' },
  { slug: 'contact', url: 'https://www.earthday.org/contact-us/', title: 'Contact Us in Washington, D.C.', type: 'contact' },
  { slug: 'international-network', url: 'https://www.earthday.org/international-network/', title: 'Our Global Network & 192 Countries', type: 'network' },
  { slug: 'countries-we-serve', url: 'https://www.earthday.org/countries-we-serve/', title: 'Countries We Serve', type: 'network' },
  { slug: 'policies-and-financials', url: 'https://www.earthday.org/policies-and-financials/', title: 'Financials, 990s & Governance', type: 'standard' },
  { slug: 'sign-up', url: 'https://www.earthday.org/sign-up/', title: 'Join the Movement: Sign Up', type: 'action' },
  { slug: 'privacy-policy', url: 'https://www.earthday.org/privacy-policy/', title: 'Privacy Policy', type: 'legal' },
  { slug: 'terms-of-use', url: 'https://www.earthday.org/terms-of-use/', title: 'Terms of Use', type: 'legal' },
  { slug: '404', url: 'https://www.earthday.org/404/', title: 'Page Not Found', type: 'error' },

  // 12 Campaigns
  { slug: 'campaign-food-for-our-planet', url: 'https://www.earthday.org/campaign/food-for-thought-your-diet-and-the-environment/', title: 'Food for Our Planet™', type: 'campaign' },
  { slug: 'campaign-canopy-tree-project', url: 'https://www.earthday.org/campaign/the-canopy-project-morocco/', title: 'The Canopy Project', type: 'campaign' },
  { slug: 'campaign-artists-for-the-earth', url: 'https://www.earthday.org/performing-arts/', title: 'Artists for the Earth', type: 'campaign' },
  { slug: 'campaign-climate-education', url: 'https://www.earthday.org/climateeducationhub/', title: 'Climate Education', type: 'campaign' },
  { slug: 'campaign-campus-coalition', url: 'https://www.earthday.org/green-campus-network/', title: 'Campus Coalition Network', type: 'campaign' },
  { slug: 'campaign-climate-education-coalition', url: 'https://www.earthday.org/take-action-for-education/', title: 'Climate Education Coalition', type: 'campaign' },
  { slug: 'campaign-end-plastics', url: 'https://www.earthday.org/planet-vs-plastics/', title: 'End Plastics Worldwide', type: 'campaign' },
  { slug: 'campaign-fashion-for-the-earth', url: 'https://www.earthday.org/fashion-for-the-earth-ambassadors/', title: 'Fashion for the Earth', type: 'campaign' },
  { slug: 'campaign-great-global-cleanup', url: 'https://www.earthday.org/the-great-global-cleanups-success-stories/', title: 'The Great Global Cleanup®', type: 'campaign' },
  { slug: 'campaign-my-future-my-voice', url: 'https://www.earthday.org/actions/', title: 'My Future My Voice Youth Platform', type: 'campaign' },
  { slug: 'campaign-regenerative-agriculture', url: 'https://www.earthday.org/campaign/regenerative-agriculture/', title: 'Regenerative Agriculture', type: 'campaign' },
  { slug: 'campaign-vote-earth', url: 'https://www.earthday.org/campaign/vote-earth/', title: 'Vote Earth: Mobilizing Voters', type: 'campaign' },

  // Regions
  { slug: 'region-india', url: 'https://www.earthday.org/india/', title: 'EARTHDAY.ORG India', type: 'network' },
  { slug: 'region-africa', url: 'https://www.earthday.org/africa/', title: 'EARTHDAY.ORG Africa', type: 'network' },
  { slug: 'region-south-america', url: 'https://www.earthday.org/south-america/', title: 'EARTHDAY.ORG South America', type: 'network' },
  { slug: 'region-mexico', url: 'https://www.earthday.org/mexico/', title: 'EARTHDAY.ORG Mexico & Latin America', type: 'network' },

  // Quizzes
  { slug: 'quizzes', url: 'https://www.earthday.org/earth-day-quizzes/', title: 'Environmental Quizzes', type: 'resource' },
  { slug: 'quiz-plastic-pollution', url: 'https://www.earthday.org/plastic-pollution-quiz/', title: 'Plastic Pollution Quiz', type: 'quiz' },
  { slug: 'quiz-climate-change', url: 'https://www.earthday.org/the-climate-change-quiz/', title: 'Climate Change Knowledge Quiz', type: 'quiz' },
  { slug: 'quiz-clean-energy', url: 'https://www.earthday.org/the-clean-energy-quiz/', title: 'Renewable Clean Energy Quiz', type: 'quiz' },
  { slug: 'quiz-conservation', url: 'https://www.earthday.org/protect-species-quiz/', title: 'Protecting Species & Biodiversity Quiz', type: 'quiz' },
  { slug: 'quiz-deforestation', url: 'https://www.earthday.org/deforestation-and-biodiversity-quiz/', title: 'Deforestation & Forests Quiz', type: 'quiz' },

  // Fact Sheets
  { slug: 'fact-sheets', url: 'https://www.earthday.org/factsheets/', title: 'Environmental Fact Sheets', type: 'resource' },
  { slug: 'fact-sheet-plastics', url: 'https://www.earthday.org/planet-vs-plastics/', title: 'Plastics & Microplastics Fact Sheet', type: 'factsheet' },
  { slug: 'fact-sheet-climate', url: 'https://www.earthday.org/food-systems-and-climate-change-fact-sheet/', title: 'Climate & Global Warming Fact Sheet', type: 'factsheet' },
  { slug: 'fact-sheet-trees', url: 'https://www.earthday.org/reforestation-fact-sheet/', title: 'Reforestation & Canopy Fact Sheet', type: 'factsheet' },
  { slug: 'fact-sheet-food', url: 'https://www.earthday.org/food-systems-and-climate-change-fact-sheet/', title: 'Food Systems & Agriculture Fact Sheet', type: 'factsheet' },
  { slug: 'fact-sheet-oceans', url: 'https://www.earthday.org/leatherback-sea-turtle/', title: 'Ocean Conservation & Marine Life Fact Sheet', type: 'factsheet' },

  // News & Articles
  { slug: 'news-and-stories', url: 'https://www.earthday.org/category-sitemap.xml', title: 'News & Stories from the Frontlines', type: 'news' },
  { slug: 'article-earth-day-2027-theme', url: 'https://www.earthday.org/earth-day-2027/', title: 'Food for Our Planet: Announcing Earth Day 2027', type: 'article' },
  { slug: 'article-global-plastics-treaty', url: 'https://www.earthday.org/planet-vs-plastics/', title: 'The Global Plastics Treaty: Progress & Urgency', type: 'article' },
  { slug: 'article-climate-literacy', url: 'https://www.earthday.org/climateeducationhub/', title: 'Why Climate Literacy Must Be Universal by 2026', type: 'article' },
  { slug: 'article-canopy-project-milestone', url: 'https://www.earthday.org/campaign/the-canopy-project-morocco/', title: 'Canopy Project Surpasses 100 Million Trees', type: 'article' },
  { slug: 'press-release-earth-day-global', url: 'https://www.earthday.org/press-release/', title: 'Over 1 Billion People Mobilize for Earth Day', type: 'press-release' },
  { slug: 'press-release-un-climate-summit', url: 'https://www.earthday.org/press-release/', title: 'Civil Society Demands Decisive Fossil Phaseout', type: 'press-release' }
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redir = res.headers.location;
        if (!redir.startsWith('http')) {
          const u = new URL(url);
          redir = `${u.protocol}//${u.host}${redir}`;
        }
        return fetchUrl(redir).then(resolve);
      }
      if (res.statusCode !== 200) {
        return resolve({ status: res.statusCode, body: '' });
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: 200, body }));
    });
    req.on('error', (err) => {
      console.warn(`Error fetching ${url}:`, err.message);
      resolve({ status: 500, body: '' });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 408, body: '' });
    });
  });
}

function extractContent(html) {
  // Strip script, style, comments
  let clean = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                  .replace(/<style[\s\S]*?<\/style>/gi, '')
                  .replace(/<!--[\s\S]*?-->/g, '');

  const titleMatch = clean.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/\|.*$/g, '').trim() : '';

  const metaDescMatch = clean.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                        clean.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

  // Extract h1, h2, h3
  const h1Match = clean.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  const h2Matches = [...clean.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(t => t.length > 2 && !t.toLowerCase().includes('navigation') && !t.toLowerCase().includes('footer') && !t.toLowerCase().includes('menu'));

  // Extract paragraphs
  const pMatches = [...clean.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(p => p.length > 30 && !p.toLowerCase().includes('copyright') && !p.toLowerCase().includes('cookie') && !p.toLowerCase().includes('subscribe'));

  // Extract image urls
  const imgMatches = [...clean.matchAll(/<img[^>]*src=["']([^"']+\.(?:jpg|jpeg|png|webp))["'][^>]*>/gi)]
    .map(m => m[1])
    .filter(src => !src.includes('pixel') && !src.includes('analytics') && !src.includes('svg'));

  return {
    title,
    metaDescription,
    h1,
    h2s: h2Matches.slice(0, 10),
    paragraphs: pMatches.slice(0, 15),
    images: imgMatches.slice(0, 10)
  };
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log(`Starting crawl of ${PAGE_MAP.length} target pages at 1-2 req/s polite rate...`);
  
  const siteMap = [];
  const redirects = [];

  for (let i = 0; i < PAGE_MAP.length; i++) {
    const item = PAGE_MAP[i];
    console.log(`[${i+1}/${PAGE_MAP.length}] Fetching ${item.slug} (${item.url})...`);
    
    let content = null;
    if (item.slug === '404') {
      content = {
        title: '404 - Page Not Found',
        metaDescription: 'The page you were looking for does not exist on EARTHDAY.ORG. Return home or search our global movement.',
        h1: '404',
        h2s: ['Earth Lost in Space', 'Let\'s Get You Back on the Path to Protection'],
        paragraphs: [
          'The link you followed may be broken or the page may have been relocated during our platform upgrade.',
          'Explore our core campaigns, learn about Earth Day 2027 Food for Our Planet, or spin our interactive global globe.'
        ],
        images: ['assets/img/earth-from-space.jpg']
      };
    } else {
      const res = await fetchUrl(item.url);
      if (res.status === 200 && res.body.length > 1000) {
        content = extractContent(res.body);
      } else {
        console.warn(`  --> Fallback used for ${item.slug} (status: ${res.status})`);
        content = {
          title: item.title,
          metaDescription: `${item.title} - Official environmental action and frontline initiatives by EARTHDAY.ORG.`,
          h1: item.title,
          h2s: ['Mobilizing 1 Billion People Across 192 Countries', 'Frontline Action & Impact'],
          paragraphs: [
            `Since 1970, EARTHDAY.ORG has led global mobilization for our environment. Our work on ${item.title} drives transformative policy, community action, and public education.`,
            'Through nonpartisan coalitions, scientific research, and international grassroots networks, we empower individuals and institutions to protect natural ecosystems.'
          ],
          images: ['assets/img/lemur-canopy-tree-project.jpg']
        };
      }
    }

    // Save content
    const contentFilePath = path.join(CONTENT_DIR, `${item.slug}.json`);
    fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2), 'utf8');

    siteMap.push({
      slug: item.slug,
      url: `${item.slug}.html`,
      sourceUrl: item.url,
      title: item.title,
      type: item.type
    });

    redirects.push(`- \`${item.url}\` &rarr; \`/${item.slug}.html\``);

    // Polite delay 600ms - 900ms
    await delay(700);
  }

  // Save site-map.json
  const siteMapPath = path.join(DATA_DIR, 'site-map.json');
  fs.writeFileSync(siteMapPath, JSON.stringify(siteMap, null, 2), 'utf8');
  console.log(`Saved ${siteMap.length} entries to ${siteMapPath}`);

  // Save docs/redirects.md
  const redirectsPath = path.join(DOCS_DIR, 'redirects.md');
  const redirectsContent = `# EARTHDAY.ORG URL Normalization & Redirect Map
The following table documents the mapping from original canonical WordPress and Drupal URLs on \`earthday.org\` to our hand-crafted, high-performance static multi-page architecture.

| Original EarthDay.org URL | Normalized Static Page | Template Type | Status |
|---|---|---|---|
${siteMap.map(s => `| \`${s.sourceUrl}\` | \`/${s.url}\` | \`${s.type}\` | 301 Permanent |`).join('\n')}

### Direct Mappings Summary
${redirects.join('\n')}
`;
  fs.writeFileSync(redirectsPath, redirectsContent, 'utf8');
  console.log(`Saved redirects documentation to ${redirectsPath}`);
}

run().catch(err => {
  console.error('Fatal error during crawl:', err);
  process.exit(1);
});

