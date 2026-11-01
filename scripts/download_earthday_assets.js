const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const IMG_DIR = path.join(__dirname, "assets", "img");
const VIDEO_DIR = path.join(__dirname, "assets", "video");

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });
if (!fs.existsSync(VIDEO_DIR)) fs.mkdirSync(VIDEO_DIR, { recursive: true });

const assets = [
  { url: "https://www.earthday.org/wp-content/uploads/2026/02/Earth-Day-Logo-Thicker-Navy-Transparent-scaled.png", filename: "logo-navy.png" },
  { url: "https://www.earthday.org/wp-content/uploads/2024/06/logo_blue-1536x912.png", filename: "logo-blue.png" },
  { url: "https://www.earthday.org/wp-content/uploads/2024/11/Earth-Day-Logo-Thicker-White-Transparent-500x300-1.webp", filename: "logo-white.webp" },
  { url: "https://www.earthday.org/wp-content/uploads/2022/02/favicon-300x300.png", filename: "favicon.png" },
  { url: "https://www.earthday.org/wp-content/uploads/2026/10/lemur-canopy-tree-project-scaled-1.jpg", filename: "lemur-canopy-tree-project.jpg" },
  { url: "https://www.earthday.org/wp-content/uploads/2026/10/huong-nguyen-xRE65uhYFv8-unsplash-scaled.jpg", filename: "farmer-rice-field.jpg" },
  { url: "https://www.earthday.org/wp-content/uploads/2026/10/megan-thomas-xMh_ww8HN_Q-unsplash-scaled.jpg", filename: "vegetable-market.jpg" },
  { url: "https://www.earthday.org/wp-content/uploads/2026/10/earth-from-space-scaled-1.jpg", filename: "earth-from-space.jpg" },
  { url: "https://www.earthday.org/wp-content/uploads/2019/12/banner-EDN-board-members-1.png", filename: "banner-EDN-board-members.png" },
  { url: "https://www.earthday.org/wp-content/uploads/2025/05/charity-nav.webp", filename: "charity-nav.webp" },
  { url: "https://www.earthday.org/wp-content/uploads/2020/11/edo.png", filename: "og-image.png" }
];

function download(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith("http")) {
          const u = new URL(url);
          redirectUrl = `${u.protocol}//${u.host}${redirectUrl}`;
        }
        return download(redirectUrl, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.warn(`Failed ${url}: status ${res.statusCode}`);
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve(false);
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${path.basename(dest)}`);
        resolve(true);
      });
    });
    req.on("error", (err) => {
      console.warn(`Error ${url}: ${err.message}`);
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of assets) {
    const dest = path.join(IMG_DIR, item.filename);
    await download(item.url, dest);
  }
}

run();
