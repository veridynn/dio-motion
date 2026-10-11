# Architecture

## Routes and locales

Public content is rendered in Astro; Svelte provides the interactive islands.
[HomePage.astro](../src/components/pages/HomePage.astro) is shared by both locales.
[i18n.ts](../src/lib/i18n.ts) owns copy, URL mappings, and translated section IDs;
[route files](../src/pages/) still determine which pages Astro emits.

Contact stays on the homepage. Preserve the legacy redirects in
[astro.config.mjs](../astro.config.mjs) when changing its anchors or routes.
[SiteLayout.astro](../src/layouts/SiteLayout.astro) derives canonical and alternate
URLs from the route table and `Astro.site`, including in preview builds: previews
point to the intended live domain. Legal routes currently contain headings only.

## State across navigation

The navigation and contact form are named `transition:persist` islands. Locale
props change without remounting them. Preserve the form draft, translated anchor,
query string, scroll position, and language-trigger focus when switching languages.

Keep language selection content inside the persisted navigation island so page
swaps retain its markup. Refresh navigation observers on `astro:page-load`,
because persisted islands do not remount. See
[LanguageSwitch.svelte](../src/components/LanguageSwitch.svelte) and
[Navigation.svelte](../src/components/Navigation.svelte).
