const fs = require('fs');
const css = fs.readFileSync('_ref/reference.css', 'utf8');

function findRules(selector) {
  const regex = new RegExp(`(^|\\})([^{}]*${selector.replace('.', '\\.')}[^{}]*\\{[^{}]*\\})`, 'g');
  let match;
  console.log(`=== Rules for ${selector} ===`);
  while ((match = regex.exec(css)) !== null) {
    console.log(match[2].trim());
  }
}

['.white-button', '.green-button', '.button-arrow', '.nav-wrap', '.menu-item-nav', '.nav-button-v2', '.label', '.dot'].forEach(findRules);

