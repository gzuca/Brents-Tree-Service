import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, 'public', 'images');

async function convertAll() {
  const files = fs.readdirSync(IMAGES_DIR);
  const toConvert = files.filter(f =>
    f.endsWith('.jpg') || f.endsWith('.jpeg') ||
    f.endsWith('.png') || f.endsWith('.webp')
  );

  console.log(`\n🔄 Resizing and optimizing ${toConvert.length} images...\n`);

  for (const file of toConvert) {
    const input  = path.join(IMAGES_DIR, file);
    const output = path.join(IMAGES_DIR, file.replace(/\.(jpg|jpeg|png|webp)$/i, '.webp'));

    await sharp(input)
      .resize(1200, null, { 
        withoutEnlargement: true  // no agranda si ya es pequeña
      })
      .webp({ quality: 80 })
      .toFile(output + '.tmp');

    fs.renameSync(output + '.tmp', output);
    console.log(`  ✅ ${file}`);
  }

  console.log('\n✅ Done!\n');
}

convertAll();