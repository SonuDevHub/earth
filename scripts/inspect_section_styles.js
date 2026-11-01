const fs = require('fs');
const css = fs.readFileSync('_ref/reference.css', 'utf8');

const targets = [
  'container',
  'hero-section',
  'hero-wrap',
  'hero-content',
  'hero-left',
  'campaign-featured',
  'vision-mission-section',
  'about-section',
  'initiatives-section',
  'number-section',
  'featured-section',
  'partnership-section',
  'campaign-section',
  'cta-section',
  'faq-section',
  'footer-section'
];

targets.forEach(t => {
  const regex = new RegExp(`\\.${t}\\s*\\{[^}]*\\}`, 'g');
  const m = css.match(regex);
  console.log(`=== ${t} ===`);
  if (m) {
    m.forEach(x => console.log(x.trim()));
  } else {
    console.log('Not found');
  }
});

