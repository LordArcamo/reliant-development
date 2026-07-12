import type { APIRoute } from 'astro';
import { site } from '../data/site';

const routes = ['/', '/about', '/residential', '/commercial', '/contact', '/privacy', '/terms'];

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${site.url}${r === '/' ? '' : r}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
