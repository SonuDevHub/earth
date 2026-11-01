const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./docs/reference/deep-components.json", "utf8"));

data.sectionStructures.forEach((sec, idx) => {
  console.log(`\n=================== [${idx}] ${sec.tag}.${sec.className} ===================`);
  console.log(sec.html);
});

