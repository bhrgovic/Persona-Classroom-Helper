const fs = require("fs-extra");

async function merge() {
  const p3r = await fs.readJson("p3r.json");
  const p4g = await fs.readJson("p4g.json");
  const p5r = await fs.readJson("p5r.json");

  const merged = [...p3r, ...p4g, ...p5r];

  await fs.writeJson("../webapp/src/data/persona-data.json", merged, {
    spaces: 2
  });

  console.log("Total merged entries:", merged.length);
}

merge();