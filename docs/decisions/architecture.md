# Site architecture and localization

The site is statically generated with Astro. Shared page metadata, navigation, and footer live in `src/layouts/SiteLayout.astro`; homepage sections are separate Astro components. Svelte islands provide browser interactions, including the contact form and language switch, with Bits UI supplying interactive controls.

German is served at `/` and English at `/en/`. Translation copy, routes, and localized section IDs are centralized in `src/lib/i18n.ts`. Contact is a homepage section, reached through `/#kontakt` or `/en/#contact`. `/kontakt`, `/de/kontakt`, `/en/contact`, and `/de` redirect to the homepage or contact section.

The language switch maps section anchors to the target language and preserves scroll position; persisted islands retain their state across language navigation.

## Implementation

- `astro.config.mjs`: static site configuration, locales, and redirects.
- `src/layouts/SiteLayout.astro`: shared layout and localized metadata.
- `src/components/pages/HomePage.astro` and `src/components/home/`: homepage composition.
- `src/lib/i18n.ts`: translated copy, routes, and anchor mapping.
