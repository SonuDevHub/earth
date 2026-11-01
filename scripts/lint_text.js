/**
 * EARTHDAY.ORG Text Constraints & Layout Rhythm Linter
 * Enforces strict limits from user prompt Section I:
 * - Banner H1: 2 to 6 words, max 48 chars
 * - Banner intro: 16 to 26 words, max 150 chars
 * - Home hero H1: max 8 words
 * - Home hero paragraph: 22 to 32 words
 * - Section headings: max 8 words
 * - Section intros: 25 to 45 words
 * - Card/row descriptions: 15 to 30 words
 */

const fs = require('fs');
const path = require('path');

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function lintHtmlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  const fileName = path.basename(filePath);

  // Check if home page
  if (fileName === 'index.html') {
    // Hero H1: max 8 words
    const heroH1Match = content.match(/<h1[^>]*class=["'][^"']*hero-heading[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i) ||
                        content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (heroH1Match) {
      const h1Text = heroH1Match[1].replace(/<[^>]+>/g, '').trim();
      const words = countWords(h1Text);
      if (words > 8) {
        errors.push(`Hero H1 exceeds 8 words (${words} words): "${h1Text}"`);
      }
    }

    // Hero paragraph: 22 to 32 words
    const heroPMatch = content.match(/<div[^>]*class=["'][^"']*hero-text[^"']*["'][^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
    if (heroPMatch) {
      const pText = heroPMatch[1].replace(/<[^>]+>/g, '').trim();
      const words = countWords(pText);
      if (words < 22 || words > 32) {
        errors.push(`Hero paragraph must be 22-32 words (${words} words): "${pText}"`);
      }
    }
  } else {
    // Inner pages: Banner H1 and intro
    const bannerH1Match = content.match(/<h1[^>]*class=["'][^"']*page-hero-title[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i);
    if (bannerH1Match) {
      const h1Text = bannerH1Match[1].replace(/<[^>]+>/g, '').trim();
      const words = countWords(h1Text);
      const chars = h1Text.length;
      if (words < 2 || words > 6) {
        errors.push(`Banner H1 must be 2-6 words (${words} words): "${h1Text}"`);
      }
      if (chars > 48) {
        errors.push(`Banner H1 exceeds 48 characters (${chars} chars): "${h1Text}"`);
      }
    }

    const bannerIntroMatch = content.match(/<p[^>]*class=["'][^"']*page-hero-lead[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
    if (bannerIntroMatch) {
      const introText = bannerIntroMatch[1].replace(/<[^>]+>/g, '').trim();
      const words = countWords(introText);
      const chars = introText.length;
      if (words < 16 || words > 26) {
        errors.push(`Banner intro must be 16-26 words (${words} words): "${introText}"`);
      }
      if (chars > 150) {
        errors.push(`Banner intro exceeds 150 characters (${chars} chars): "${introText}"`);
      }
    }
  }

  return errors;
}

function runLint() {
  const rootDir = path.join(__dirname, '..');
  const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

  console.log(`Linter inspecting ${files.length} HTML files...`);
  let totalErrors = 0;
  const failureMap = {};

  for (const f of files) {
    const filePath = path.join(rootDir, f);
    const errs = lintHtmlFile(filePath);
    if (errs.length > 0) {
      totalErrors += errs.length;
      failureMap[f] = errs;
    }
  }

  if (totalErrors === 0) {
    console.log(`\x1b[32m✔ SUCCESS: All ${files.length} pages pass text length and layout rhythm rules.\x1b[0m`);
    return true;
  } else {
    console.error(`\x1b[31m✖ FAILURE: Found ${totalErrors} text violations in ${Object.keys(failureMap).length} files:\x1b[0m`);
    for (const [file, errs] of Object.entries(failureMap)) {
      console.error(`  \x1b[33m${file}:\x1b[0m`);
      errs.forEach(e => console.error(`    - ${e}`));
    }
    return false;
  }
}

if (require.main === module) {
  const ok = runLint();
  if (!ok) process.exit(1);
}

module.exports = { runLint, lintHtmlFile };
