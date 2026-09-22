import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://reliant-development.vercel.app',
  // hybrid: every page stays prerendered/static; only /api/lead runs on the server
  output: 'hybrid',
  adapter: vercel(),
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
