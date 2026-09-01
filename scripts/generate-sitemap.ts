import fs from 'fs';
import path from 'path';
import sitemap from '../src/sitemap.ts';

function buildSitemapXml() {
  const items = sitemap();

  const xmlEntries = items.map((item) => {
    const dateStr = item.lastModified instanceof Date
      ? item.lastModified.toISOString().split('T')[0]
      : (item.lastModified || new Date().toISOString().split('T')[0]);

    return `  <url>
    <loc>${item.url}</loc>
    <lastmod>${dateStr}</lastmod>
    ${item.changeFrequency ? `<changefreq>${item.changeFrequency}</changefreq>` : ''}
    ${item.priority !== undefined ? `<priority>${item.priority.toFixed(1)}</priority>` : ''}
  </url>`;
  }).join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xmlContent, 'utf-8');
  console.log(`✅ Sitemap successfully generated at: ${sitemapPath}`);
}

buildSitemapXml();
