import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    let stat;
    try {
      stat = fs.statSync(filePath);
    } catch (err) {
      // If the file was removed while scanning, skip it
      continue;
    }

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      // Skip temp files
      if (file.endsWith('.tmp')) continue;

      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        try {
          const buffer = fs.readFileSync(filePath);

          let pipeline = sharp(buffer);
          const metadata = await pipeline.metadata();

          // Resize if wider than 1920px
          if (metadata.width > 1920) {
            pipeline = pipeline.resize(1920, null, { withoutEnlargement: true });
          }

          if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: 70, progressive: true, mozjpeg: true });
          } else if (ext === '.png') {
            pipeline = pipeline.png({ quality: 75, compressionLevel: 9, palette: true });
          }

          // Compute destination path inside public/images/lowres
          const rel = path.relative(publicDir, filePath).replace(/\\/g, '/');
          let destRel;
          if (rel.startsWith('images/highres/')) {
            destRel = rel.replace('images/highres/', 'images/lowres/');
          } else if (rel.startsWith('images/lowres/')) {
            // If it's already a lowres image, overwrite it
            destRel = rel;
          } else if (rel.startsWith('images/')) {
            // Place under lowres mirror of the same path
            destRel = rel.replace('images/', 'images/lowres/');
          } else {
            // For files outside images folder, skip
            console.log(`Skipping (not in images): ${filePath}`);
            continue;
          }

          const destPath = path.join(publicDir, destRel);
          const destDir = path.dirname(destPath);
          fs.mkdirSync(destDir, { recursive: true });

          await pipeline.toFile(destPath);
          console.log(`Wrote low-res: ${destPath}`);
        } catch (error) {
          console.error(`Error processing ${filePath}:`, error.message);
        }
      }
    }
  }
}

async function main() {
  console.log('Starting image optimization...');
  await processDirectory(publicDir);
  console.log('Image optimization complete!');
}

main();
