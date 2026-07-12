import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://reliant-construction.vercel.app',
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
