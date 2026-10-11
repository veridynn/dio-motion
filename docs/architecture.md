# Architecture and contact

## Static pages and locales

[Route files](../src/pages/) pass a locale and page identity to shared Astro
components. [HomePage.astro](../src/components/pages/HomePage.astro) composes the
homepage sections; [SiteLayout.astro](../src/layouts/SiteLayout.astro) supplies
navigation, footer, metadata, font preload, and Astro's client router.
There is no CMS, database, or server endpoint in this repository.

[i18n.ts](../src/lib/i18n.ts) owns copy, routes, and section mappings. German uses
`/`, English `/en/`; legal pages map to their counterparts in the other language.
Canonical and alternate URLs use this route table and `Astro.site`, including on
preview builds. Preview metadata therefore points to the intended live domain.

Contact is the last homepage section, not a separate page. Legacy contact URLs
and `/de` redirect through [astro.config.mjs](../astro.config.mjs). The static build
emits redirect HTML; page tests check those files, not hosting-layer HTTP behavior.

The legal notice and privacy routes currently render only translated headings.
Their existence and passing page tests do not establish completed legal content.

## Client navigation and persistence

Svelte islands hydrate the interactive controls. The navigation and contact form
use named `transition:persist` islands, so homepage language changes retain the
draft and navigation state while updating locale props.

[LanguageSwitch.svelte](../src/components/LanguageSwitch.svelte) maps recognized
anchors to the target language, retains the query string, restores scroll position,
and returns focus to the trigger. Its selection content stays inside the persisted
navigation island so Astro page swaps retain it. A `noscript` link targets the
corresponding page without JavaScript.

[Navigation.svelte](../src/components/Navigation.svelte) refreshes its section
observer on `astro:page-load`; its island is not remounted on every navigation.
Legal page navigation starts with the light surface before hydration.

## Contact flow

[ContactForm.svelte](../src/components/ContactForm.svelte) uses the shared ArkType
schemas and delivery helpers in [contact.ts](../src/lib/contact.ts). Validation
trims fields and rejects unknown keys. Name is optional; email and message are
required. Keep native input limits aligned with schema limits when changing them.

With a valid public form key, the island loads the Web3Forms CAPTCHA script,
requests a fresh invisible hCaptcha token per submission, and posts JSON directly
to Web3Forms. Delivery validates input and response, requires HTTP success and
`success: true`, and attaches a timeout. Only successful delivery clears the draft;
failure keeps it available for retry. Missing or invalid configuration gives a
preview alert in the hydrated form rather than sending.

The rendered form has a native POST action, but the CAPTCHA script is loaded
during hydration. A working form without JavaScript is not verified. Browser
validation cannot enforce anti-spam protection: configure provider-side CAPTCHA
using [contact configuration](development.md#contact-configuration).

Before changing Astro rendering or navigation, consult the applicable official
[component](https://docs.astro.build/en/basics/astro-components/),
[routing](https://docs.astro.build/en/guides/routing/),
[framework island](https://docs.astro.build/en/guides/framework-components/), or
[internationalization](https://docs.astro.build/en/guides/internationalization/) guide.
