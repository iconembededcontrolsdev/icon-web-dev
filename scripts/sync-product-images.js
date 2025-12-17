const fs = require("fs");
const path = require("path");

const highresDir = path.join(__dirname, "..", "public", "images", "highres");
const productsJsonPath = path.join(
  __dirname,
  "..",
  "public",
  "content",
  "products.json"
);

function listHighresFolders() {
  return fs
    .readdirSync(highresDir)
    .filter((name) => fs.statSync(path.join(highresDir, name)).isDirectory());
}

function pickLatestFile(folderPath) {
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f));
  if (files.length === 0) return null;
  const sorted = files
    .map((f) => ({ f, mtime: fs.statSync(path.join(folderPath, f)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  return sorted[0].f;
}

function allFiles(folderPath) {
  return fs
    .readdirSync(folderPath)
    .filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f));
}

function findBestFolderForTitle(folders, title) {
  const t = title.toLowerCase();
  // exact token match heuristics
  for (const folder of folders) {
    const f = folder.toLowerCase();
    if (t.includes(f.replace(/^[0-9]+\.\s*/, "").replace(/\s+/g, " ")))
      return folder;
  }

  // fallback: token match by words
  const words = t.split(/[^a-z0-9]+/).filter(Boolean);
  let best = null,
    bestScore = 0;
  for (const folder of folders) {
    const f = folder.toLowerCase();
    let score = 0;
    for (const w of words) if (f.includes(w)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      best = folder;
    }
  }
  return best;
}

function updateProducts() {
  const data = JSON.parse(fs.readFileSync(productsJsonPath, "utf8"));
  const folders = listHighresFolders();
  const log = [];

  data.products = data.products.map((product) => {
    const folder = findBestFolderForTitle(
      folders,
      product.title || product.id || ""
    );
    if (!folder) {
      log.push(`No folder found for product ${product.id} (${product.title})`);
      return product;
    }

    const folderPath = path.join(highresDir, folder);
    const latest = pickLatestFile(folderPath);
    const all = allFiles(folderPath).map(
      (f) => `/images/highres/${folder}/${f}`
    );

    if (latest) {
      product.mainImage = `/images/highres/${folder}/${latest}`;
      product.images = all;
      log.push(`Updated ${product.id} -> ${product.mainImage}`);
    } else {
      log.push(`No image files in folder ${folder} for product ${product.id}`);
    }

    // Also update granular product file if exists
    const granularPath = path.join(
      __dirname,
      "..",
      "public",
      "content",
      "products",
      `${product.id}.json`
    );
    try {
      if (fs.existsSync(granularPath)) {
        const g = JSON.parse(fs.readFileSync(granularPath, "utf8"));
        if (latest) {
          g.mainImage = `/images/highres/${folder}/${latest}`;
          g.images = all;
          fs.writeFileSync(granularPath, JSON.stringify(g, null, 2));
          log.push(`Updated granular ${product.id}.json`);
        }
      }
    } catch (err) {
      log.push(`Failed updating granular for ${product.id}: ${String(err)}`);
    }

    return product;
  });

  fs.writeFileSync(productsJsonPath, JSON.stringify(data, null, 2));
  log.forEach((l) => console.log(l));
}

updateProducts();
console.log("Done.");
