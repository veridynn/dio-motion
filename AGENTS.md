# AGENTS.md

Dio Motion's German/English personal-training site uses static Astro pages,
Svelte islands, and direct Web3Forms delivery; there is no application server.
Use pnpm package scripts. [README](README.md) covers setup.

When changing public copy, routes, or anchors, update German and English together.
Installed `.agents/skills/` files stay upstream originals; preserve their required
checks and record project overrides in the relevant guide.

## Before changing a boundary

- Routes, translations, or persisted islands: read [architecture](docs/architecture.md).
- Contact configuration or submission: read [contact](docs/contact.md).
- Layout, controls, or motion: read [design constraints](docs/design.md).
- Local servers, tooling, or generated files: read [development](docs/development.md).
- Hosting or releases: read [deployment](docs/deployment.md).

## Verification

| Changed behavior | Required verification |
| --- | --- |
| Astro, Svelte, or TypeScript | `pnpm check` |
| Contact validation or delivery | Also `pnpm test` |
| Routes, translations, anchors, or rendered content | Also `pnpm test:pages` (build included) |
| Other built-site changes | `pnpm build` unless covered above |
| Visuals or interactions | Affected desktop/mobile views; keyboard, focus, and reduced motion for changed controls |
| Documentation only | Links, anchors, paths, commands, and Markdown; no site build |

Run applicable checks once after the final edit; repeat for changes or failures.
For coverage gaps and browser checks, read [testing](docs/testing.md).
