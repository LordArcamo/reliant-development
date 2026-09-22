import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://reliant-development.vercel.app',
  // Astro 5 static output: every page stays prerendered; only /api/lead
  // (prerender = false) runs on the server via the Vercel adapter
  adapter: vercel(),
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
