const fs = require('fs');
const html = fs.readFileSync('_ref/home.html', 'utf8');
const lines = html.split('\n');
const navLines = [];
let capture = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('navbar-with-cart') || lines[i].includes('nav-wrap')) {
    capture = true;
  }
  if (capture) {
    navLines.push(lines[i]);
    if (lines[i].includes('hero-section')) {
      break;
    }
  }
}
console.log(navLines.join('\n'));
