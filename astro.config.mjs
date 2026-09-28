// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://diomotion.com',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: true },
  },
  redirects: { '/kontakt': '/de/kontakt' },
});
