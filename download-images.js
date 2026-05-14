/**
 * BRENT'S TREE SERVICE — Image Downloader
 * ----------------------------------------
 * Run this script ONCE to download all images
 * from Hibu's CDN to your local /public/images/ folder.
 *
 * Usage:
 *   node download-images.js
 */

import https from 'https';
import fs    from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CDN  = 'https://le-cdn.hibuwebsites.com/130a7746d27544c5bf3ef436c92e3313/dms3rep/multi/opt/';
const DEST = path.join(__dirname, 'public', 'images');

const FILES = [
  'logo-1920w.webp',
  'gallery-05-brents-tree-service-1920w.webp',
  'home-content-01-brents-tree-service-1920w.webp',
  'home-content-02-brents-tree-service-1920w.webp',
  'home-content-03-brents-tree-service-1920w.webp',
  'home-content-04-brents-tree-service-1920w.webp',
  'home-content-03-brents-tree-service-9381d034-1920w.webp',
  'home-content-04-brents-tree-service-3e22e6e8-1920w.webp',
  'home-why-choose-brents-tree-service-1920w.webp',
  'tree-removal-services-hero-brents-tree-service-02-1920w.webp',
  'tree-removal-services-content-03-brents-tree-service-1920w.webp',
  'tree-trimming-and-branch-services-hero-brents-tree-service-02-1920w.webp',
  'tree-trimming-and-branch-services-content-04-brents-tree-service-1920w.webp',
  'emergency-and-storm-clean-up-content-01-brents-tree-service-1920w.webp',
  'brents-tree-service-hero-stump-services-1920w.webp',
  'stump-services-hero-brents-tree-service-ref70739-1920w.webp',
  'property-cleanup-services-hero-brents-tree-service-02-2b88c679-1920w.webp',
  'lot-clearing-hero-brents-tree-service-cust-1920w.webp',
  'brents-tree-service-hero-tree-pruning-assistance-1920w.webp',
  'tree-pruning-services-content-03-brents-tree-service-1920w.webp',
  'brents-tree-service-content-tree-health-and-arborist-services-01-1920w.webp',
  'commercial-tree-service-hero-brents-tree-service-02-1920w.webp',
  'commercial-tree-service-content-03-brents-tree-service-1920w.webp',
  'coupons-brents-tree-service-1920w.webp',
  'specialized-tree-services-hero-brents-tree-service-ref892101-1920w.webp',
];

function download(filename) {
  return new Promise((resolve) => {
    const dest = path.join(DEST, filename);

    // Skip if already downloaded and not empty
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`  ⏭  Already exists: ${filename}`);
      return resolve();
    }

    const file = fs.createWriteStream(dest);

    const request = (url) => {
      https.get(url, (res) => {
        // Follow redirects
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          return request(res.headers.location);
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`  ✅  ${filename}`);
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.log(`  ❌  FAILED: ${filename} — ${err.message}`);
        resolve();
      });
    };

    request(CDN + filename);
  });
}

async function main() {
  // Create folder if it doesn't exist
  if (!fs.existsSync(DEST)) {
    fs.mkdirSync(DEST, { recursive: true });
    console.log(`📁 Created folder: public/images/\n`);
  }

  console.log(`\n📥 Downloading ${FILES.length} images to /public/images/ ...\n`);

  for (const file of FILES) {
    await download(file);
  }

  console.log('\n✅ All done! Images saved to public/images/');
  console.log('   You can now run: npm run dev\n');
}

main();
