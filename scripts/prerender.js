import puppeteer from 'puppeteer';
import { createServer } from 'http';
import handler from 'serve-handler';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const dataDir = path.join(rootDir, 'src', 'data');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// ─── 1. Construir la lista completa de rutas a pre-renderizar ──────────

function extractSlugs(fileName) {
  const filePath = path.join(dataDir, fileName);
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = [...content.matchAll(/slug:\s*"([a-z0-9-]+)"/g)];
  return [...new Set(matches.map((m) => m[1]))];
}


const citySlugs = extractSlugs('cities.js');
const serviceSlugs = extractSlugs('services.js');
const blogSlugs = extractSlugs('blogData.js');
const treeInfoSlugs = extractSlugs('treeInfoData.js');

const staticRoutes = [
  '/',
  '/locations',
  '/gallery',
  '/faq',
  '/careers',
  '/tree-info',
  '/thank-you',
  '/blog',
];

const routes = [
  ...staticRoutes,
  ...serviceSlugs.map((s) => `/services/${s}`),
  ...citySlugs.map((s) => `/locations/${s}`),
  ...blogSlugs.map((s) => `/blog/${s}`),
  ...treeInfoSlugs.map((s) => `/tree-info/${s}`),
];

console.log(`Prerender: ${routes.length} rutas encontradas.`);
console.log(`  - ${citySlugs.length} ciudades`);
console.log(`  - ${serviceSlugs.length} servicios`);
console.log(`  - ${blogSlugs.length} posts de blog`);
console.log(`  - ${treeInfoSlugs.length} páginas de tree-info`);
console.log(`  - ${staticRoutes.length} rutas estáticas`);

// ─── 2. Levantar servidor local sirviendo dist/ ─────────────────────────

if (!fs.existsSync(distDir)) {
  console.error('Error: no existe la carpeta dist/. Corre "vite build" primero.');
  process.exit(1);
}

const server = createServer((req, res) =>
  handler(req, res, {
    public: distDir,
    rewrites: [{ source: '**', destination: '/index.html' }],
  })
);
await new Promise((resolve) => server.listen(PORT, resolve));
console.log(`Servidor local corriendo en ${BASE_URL}`);

// ─── 3. Pre-renderizar cada ruta con Puppeteer ──────────────────────────

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

let successCount = 0;
let failCount = 0;
const failedRoutes = [];

for (const route of routes) {
  const page = await browser.newPage();
  try {
    const url = `${BASE_URL}${route}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        return root && root.children.length > 0;
      },
      { timeout: 10000 }
    );

    const html = await page.content();

    const outDir = route === '/' ? distDir : path.join(distDir, route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');

    successCount++;
    console.log(`  ✓ ${route}`);
  } catch (err) {
    failCount++;
    failedRoutes.push(route);
    console.error(`  ✗ ${route} — ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();

console.log('');
console.log(`Prerender completo: ${successCount} exitosas, ${failCount} fallidas.`);

if (failCount > 0) {
  console.error('Rutas fallidas:', failedRoutes.join(', '));
  process.exitCode = 1;
}