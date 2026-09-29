// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [svelte()],
  site: 'https://diomotion.com',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: true },
  },
  redirects: { '/kontakt': '/de/kontakt' },
});
