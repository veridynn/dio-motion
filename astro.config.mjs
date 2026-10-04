// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [svelte()],
  devToolbar: { enabled: true },
  // Keep Astro's dev toolbar and router out of Vite's stale dependency chunks.
  vite: { optimizeDeps: { exclude: ['astro'] } },
  site: 'https://diomotion.com',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: true },
  },
  redirects: {
    '/kontakt': '/de/#kontakt',
    '/de/kontakt': '/de/#kontakt',
    '/en/contact': '/en/#kontakt',
  },
});
