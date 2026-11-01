const fs = require('fs');
const html = fs.readFileSync('_ref/home.html', 'utf8');

const secRegex = /<section\b[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/section>/g;
let match;
let i = 0;
while ((match = secRegex.exec(html)) !== null) {
  const cls = match[1];
  const inner = match[2];
  fs.writeFileSync(`_ref/section_${i}_${cls.split(' ')[0]}.html`, inner.trim(), 'utf8');
  console.log(`Saved _ref/section_${i}_${cls.split(' ')[0]}.html (${inner.length} chars)`);
  i++;
}

