# AGENTS.md

Personal trainer website for [Dio Motion](https://diomotion.com), built with Astro.

## Project map

- Homepage: `src/components/pages/HomePage.astro` and `src/components/home/`.
- Shared layout: `src/layouts/SiteLayout.astro`; design tokens: `src/styles/global.css`.
- Translations and localized anchors: `src/lib/i18n.ts`; German `/`, English `/en/`.
- Contact form: `src/components/ContactForm.svelte`; validation: `src/lib/contact.ts`.
- Setup and delivery requirements: `README.md`.

## Efficient work

- Search with `rg` first, then read relevant files or sections. Exclude generated output and dependencies from searches.
- Keep tool results focused: summarize successful checks; retain actionable errors. Extract relevant documentation sections rather than whole pages.
- Use `agent-browser` for research and functional checks, with compact snapshots scoped to the affected area. Use a rendering browser for visual checks.
- Load only skills relevant to the task and their needed references. Preserve installed skill files and required skill checks.
- Reuse existing components and tokens. Keep changes within the requested scope.
- At completion, briefly report changes, validation, and remaining blockers so independent tasks can start in a fresh chat.

## Validation

- Astro, Svelte, or TypeScript changes: `pnpm check`.
- Contact validation or submission changes: also `pnpm test`.
- Routes, translations, anchors, or rendered page content: also `pnpm test:pages` (includes a build).
- Other changes affecting the built site: `pnpm build` if not already covered by `test:pages`.
- Visual or interaction changes: check affected desktop/mobile views and interactions.
- Documentation-only changes need no site build. Run applicable checks once after the final edit; repeat only for new changes or failures.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Project records are indexed in [docs/README.md](docs/README.md); read only the relevant topics. Setup and commands are in `README.md`. Bogdan is the sole developer; Dio Motion supplies occasional product, branding, and business input. Keep pending work and proposals in GitHub tickets, then record relevant outcomes when completing the work. Records contain only current, necessary context and constraints; remove temporary notes, outdated information, and duplication.

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
