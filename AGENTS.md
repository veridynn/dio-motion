# Agents

Personal trainer website for [Dio Motion](https://diomotion.com). Astro builds
static German and English pages; Svelte islands handle navigation and contact.
Contact delivery uses Web3Forms directly, with no application server or database.

## Before changing the site

- Read the relevant topic in the [documentation index](docs/README.md).
- Before changing routes, translations, or island persistence, read
  [architecture](docs/architecture.md).
- Before changing layout, controls, or motion, read [design](docs/design.md).
- Before starting a server or changing tooling, configuration, or installed skills,
  read [development](docs/development.md). Use its background-server workflow.
- Before changing hosting or promoting a release, read
  [deployment and approvals](docs/deployment.md).

## Shared contracts

- Keep public content in Astro and interactive UI in Svelte; reuse Bits UI controls.
- Keep copy, public URL mappings, and localized section IDs in `src/lib/i18n.ts`.
  Update both languages together.
- Reuse the shared tokens and controls in `src/styles/global.css`; keep
  component-specific styles scoped.
- Keep contact validation and delivery in `src/lib/contact.ts`. Preserve draft
  input on delivery failure and across homepage language changes.
- Preserve keyboard access, visible focus, and reduced-motion behavior when
  changing interactions.

## Verification

Run the checks required by the affected behavior in
[verification guidance](docs/development.md#verification), including browser
checks for visual or interaction changes.
Report what changed, checks performed, and remaining gaps.
