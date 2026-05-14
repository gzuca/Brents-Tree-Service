// ─────────────────────────────────────────────────────────────
// update-reviews.js  —  PREBUILD SCRIPT
// Corre automáticamente antes de cada "npm run build"
// Llama a SerpApi → actualiza reviewsLive.js + index.html
// ─────────────────────────────────────────────────────────────

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Leer variables de entorno del .env manualmente ──────────
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return {};
  return Object.fromEntries(
    fs.readFileSync(envPath, 'utf8')
      .split('\n')
      .filter(l => l.includes('=') && !l.startsWith('#'))
      .map(l => {
        const [key, ...rest] = l.split('=');
        return [key.trim(), rest.join('=').trim()];
      })
  );
}

const env      = loadEnv();
const API_KEY  = env.VITE_SERPAPI_KEY;

// ── Fallback si no hay API key ───────────────────────────────
const FALLBACK = { rating: 4.8, total: 337 };

// ── Paths ────────────────────────────────────────────────────
const DATA_FILE  = path.join(__dirname, 'src/data/reviewsLive.js');
const INDEX_HTML = path.join(__dirname, 'index.html');

// ── Función principal ────────────────────────────────────────
async function updateReviews() {
  let reviews = FALLBACK;

  if (!API_KEY || API_KEY === 'YOUR_SERPAPI_KEY_HERE') {
    console.log('⚠️  Sin SerpApi key configurada — usando fallback:', FALLBACK);
  } else {
    try {
      const query = encodeURIComponent('Brents Tree Service Pflugerville TX');
      const url   = `https://serpapi.com/search.json?engine=google_maps&q=${query}&api_key=${API_KEY}`;

      const res  = await fetch(url);
      const json = await res.json();

      // SerpApi devuelve local_results con el negocio
      const place = json.place_results;

      if (place?.rating && place?.reviews) {
        reviews = {
          rating: place.rating,
          total:  place.reviews,
        };
        console.log(`✅ SerpApi → ${reviews.rating} ⭐ (${reviews.total} reviews)`);
      } else {
        console.warn('⚠️  SerpApi no devolvió resultados, usando fallback');
        console.warn('    Response:', JSON.stringify(json).slice(0, 200));
      }
    } catch (err) {
      console.warn('⚠️  Error llamando SerpApi, usando fallback:', err.message);
    }
  }

  // ── 1. Actualizar src/data/reviewsLive.js ─────────────────
  const dataContent =
`// AUTO-GENERADO por update-reviews.js — NO editar manualmente
// Última actualización: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST
export const LIVE_REVIEWS = {
  rating: ${reviews.rating},
  total:  ${reviews.total},
};
`;
  fs.writeFileSync(DATA_FILE, dataContent, 'utf8');
  console.log('📝 Actualizado: src/data/reviewsLive.js');

  // ── 2. Actualizar schema en index.html ────────────────────
  if (fs.existsSync(INDEX_HTML)) {
    let html = fs.readFileSync(INDEX_HTML, 'utf8');

    html = html
      .replace(/"ratingValue":\s*"[\d.]+"/,  `"ratingValue": "${reviews.rating}"`)
      .replace(/"reviewCount":\s*"\d+"/,       `"reviewCount": "${reviews.total}"`);

    fs.writeFileSync(INDEX_HTML, html, 'utf8');
    console.log('📝 Actualizado: index.html (schema ratingValue + reviewCount)');
  }

  console.log(`\n🌳 Brents Tree Service — reviews listos para el build:`);
  console.log(`   Rating:  ${reviews.rating} ⭐`);
  console.log(`   Total:   ${reviews.total} reviews\n`);
}

updateReviews();