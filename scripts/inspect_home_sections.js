const fs = require('fs');
const html = fs.readFileSync('_ref/home.html', 'utf8');

// Match sections
const secRegex = /<section\b[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/section>/g;
let match;
let idx = 0;
while ((match = secRegex.exec(html)) !== null) {
  const cls = match[1];
  const inner = match[2];
  console.log(`\n========================================`);
  console.log(`SECTION ${idx}: .${cls}`);
  console.log(`========================================`);

  // Find headings
  const h = inner.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g);
  if (h) console.log('Headings:', h.map(x => x.replace(/<[^>]+>/g, '').trim()));

  // Find buttons / links with classes
  const btns = inner.match(/<a\b[^>]*class="([^"]*)"[^>]*>/g);
  if (btns) console.log('Action links:', btns.map(b => b.match(/class="([^"]*)"/)[1]).slice(0, 5));

  // Find key child containers
  const divs = inner.match(/<div\b[^>]*class="([^"]*)"[^>]*>/g);
  if (divs) {
    const classList = divs.map(d => d.match(/class="([^"]*)"/)[1]);
    const uniqueClasses = Array.from(new Set(classList));
    console.log('Key container classes:', uniqueClasses.slice(0, 10));
  }
  idx++;
}

