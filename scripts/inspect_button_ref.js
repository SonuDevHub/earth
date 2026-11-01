const fs = require('fs');
const html = fs.readFileSync('_ref/home.html', 'utf8');
const matches = html.match(/<a[^>]*class="[^"]*(?:white-button|green-button)[^"]*"[^>]*>[\s\S]*?<\/a>/g);
if (matches) {
  matches.slice(0, 3).forEach((m, i) => {
    console.log(`Button #${i + 1}:\n${m}\n`);
  });
}

