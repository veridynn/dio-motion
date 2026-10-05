# dio motion.

Personal trainer website for [Dio Motion](https://diomotion.com), built with Astro and Svelte. The site is statically generated, with German at `/` and English at `/en/`.

## Requirements

- Node.js 26.x (`^26.0.0`)
- pnpm 12.x, starting at 12.9.1 (`^12.9.1`)

These ranges allow minor and patch updates within each major version. Manage Node.js with pnpm’s Node version manager. `packageManager` in `package.json` pins pnpm to 12.9.1 for reproducible installs.

## Setup

```sh
pnpm install
cp .env.example .env
pnpm exec astro dev --background
```

Environment variable configuration is covered in the [contact delivery documentation](docs/development.md#contact-delivery).

## Development commands

- `pnpm exec astro dev status` / `logs` / `stop` — manage the background server
- `pnpm check` — run Astro, Svelte, and TypeScript checks
- `pnpm test` — check form validation and delivery handling
- `pnpm test:pages` — build and check localized pages
- `pnpm build` — generate the static site in `dist/`
- `pnpm preview` — preview the production build locally

## Documentation

- [Development documentation](docs/development.md) — project structure, typography, spacing, and contact delivery
- [General todos](docs/todos.md) — remaining content and launch tasks
