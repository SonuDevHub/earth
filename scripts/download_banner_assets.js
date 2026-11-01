const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '..', 'assets', 'img');

const downloadList = [
  { url: 'https://www.earthday.org/wp-content/uploads/2026/10/ffop-pillar-soils.jpg', name: 'banner-soils.jpg' },
  { url: 'https://www.earthday.org/wp-content/uploads/2026/09/260925_article_schools.jpg', name: 'banner-education.jpg' },
  { url: 'https://www.earthday.org/wp-content/uploads/2026/08/260814_article_youth-scaled.jpg', name: 'banner-youth.jpg' },
  { url: 'https://www.earthday.org/wp-content/uploads/2024/02/240212_fashionact_noletters-1-768x432.png', name: 'banner-fashion.png' },
  { url: 'https://earthday.org/wp-content/uploads/2020/01/forest-trees-grass-ray-of-sunshine.jpg', name: 'banner-forest.jpg' },
  { url: 'https://www.earthday.org/wp-content/uploads/2026/02/join-a-cleanup-2.webp', name: 'banner-cleanup.webp' },
  { url: 'https://earthday.org/wp-content/uploads/2019/12/Farms_and_Forest_Martali_village_Eastern_India_2012-1024x693.jpg', name: 'banner-india.jpg' },
  { url: 'https://www.earthday.org/wp-content/uploads/2026/09/reduce-plastic-toolkit-768x764.png', name: 'banner-plastics.png' },
  { url: 'https://www.earthday.org/wp-content/uploads/2026/04/Earth-Day-1970-crowds.jpg', name: 'banner-history.jpg' },
  { url: 'https://www.earthday.org/wp-content/uploads/2020/04/First-Earth-Day-1970-1-1024x683.jpg', name: 'banner-first-earth-day.jpg' },
  { url: 'https://www.earthday.org/wp-content/uploads/2026/08/banner_general.jpg', name: 'banner-general.jpg' },
  { url: 'https://www.earthday.org/wp-content/uploads/2026/01/action_hero.jpg', name: 'banner-action.jpg' },
  { url: 'https://www.earthday.org/wp-content/uploads/2026/03/global_network.jpg', name: 'banner-network.jpg' }
];

function download(url, dest) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redir = res.headers.location;
        if (!redir.startsWith('http')) {
          const u = new URL(url);
          redir = `${u.protocol}//${u.host}${redir}`;
        }
        return download(redir, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.warn(`Failed ${url}: ${res.statusCode}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${path.basename(dest)}`);
        resolve(true);
      });
    });
    req.on('error', (err) => {
      console.warn(`Error ${url}: ${err.message}`);
      resolve(false);
    });
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  for (const item of downloadList) {
    const dest = path.join(IMG_DIR, item.name);
    await download(item.url, dest);
  }
  console.log('Finished downloading banner assets.');
}

main();

