# Development

## Local commands

Run from the repository root. Reuse an existing background server for this checkout.

| Command | Purpose |
| --- | --- |
| `pnpm dev status` | Find the running background server and its URL |
| `pnpm dev logs` | Read its output |
| `pnpm dev stop` | Stop it |
| `pnpm build` | Generate production output |
| `pnpm preview` | Serve that output; build first |
| `pnpm format` | Write formatting changes |
| `pnpm lint` | Apply safe lint fixes |

## Tooling and file ownership

Biome's Astro/Svelte support is experimental; framework diagnostics remain
necessary. Markdown and YAML are skipped by Biome. Existing lint suppressions
have inline reasons; `corner-shape` may produce a Svelte CSS warning.

- Astro generates ignored `dist/` and `.astro/`; edit source and regenerate.
- pnpm owns `pnpm-lock.yaml`; update it through pnpm. CI uses frozen installs.
- Skill tooling owns `skills-lock.json`; update it through that tooling when
  installed skills change.
- `CLAUDE.md` links to `AGENTS.md`; edit the root guide once.
