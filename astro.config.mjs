import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://koamishin.com',
  output: 'static',
  integrations: [react(), sitemap()],
});
