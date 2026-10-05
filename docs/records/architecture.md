# Architecture and localization

Astro generates static pages; Svelte islands provide interactive navigation and the contact form. Bits UI supplies interactive controls. Shared layout is in `src/layouts/SiteLayout.astro`; homepage sections are composed in `src/components/pages/HomePage.astro`.

German uses `/`, English `/en/`. Copy, routes, and section IDs are centralized in `src/lib/i18n.ts`. Contact is a homepage section. Legacy routes redirect through `astro.config.mjs`.

Language changes map the current anchor to its translated counterpart and preserve scroll position. Persisted islands retain their state across navigation.
