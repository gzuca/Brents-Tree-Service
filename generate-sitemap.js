import fs from 'fs';
import { SERVICES } from './src/data/services.js';
import { CITIES } from './src/data/cities.js';

const BASE_URL = 'https://brentstreeservice.com';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/',        priority: '1.0', changefreq: 'weekly'  },
  { url: '/gallery', priority: '0.7', changefreq: 'monthly' },
  { url: '/locations', priority: '0.9', changefreq: 'monthly' },
  { url: '/faq',     priority: '0.6', changefreq: 'monthly' },
  { url: '/careers', priority: '0.5', changefreq: 'monthly' },
  { url: '/tree-info/disease',  priority: '0.6', changefreq: 'monthly' },
  { url: '/tree-info/insects',  priority: '0.6', changefreq: 'monthly' },
  { url: '/tree-info/trimming', priority: '0.6', changefreq: 'monthly' },
  { url: '/tree-info/types',    priority: '0.6', changefreq: 'monthly' },
];

const servicePages = SERVICES.map(s => ({
  url: `/services/${s.slug}`,
  priority: '0.9',
  changefreq: 'monthly',
}));

const cityPages = CITIES.map(c => ({
  url: `/locations/${c.slug}`,
  priority: '0.8',
  changefreq: 'monthly',
}));

const allPages = [...staticPages, ...servicePages, ...cityPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log(`✅ Sitemap generated with ${allPages.length} URLs!`);