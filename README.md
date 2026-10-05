# dio motion.

Personal trainer website for [Dio Motion](https://diomotion.com), built with Astro and Svelte.

## Requirements

- Node.js `^26`
- pnpm `^12`

## Setup

```sh
pnpm install
cp .env.example .env
pnpm dev
```

Contact environment configuration is covered in the [contact delivery record](docs/records/contact-delivery.md).

## Development commands

- `pnpm dev` — start the local development server
- `pnpm dev --background` — optionally run the server in the background
- `pnpm dev status` — check whether the development server is running
- `pnpm dev logs` — view logs from the background development server
- `pnpm dev stop` — stop the background development server
- `pnpm check` — run Biome formatting, lint, and import checks plus Astro, Svelte, and TypeScript diagnostics
- `pnpm format` — format supported project files with Biome
- `pnpm lint` — lint supported project files and apply safe Biome fixes
- `pnpm test` — check form validation and delivery handling
- `pnpm test:pages` — build and check localized pages
- `pnpm build` — generate the static site in `dist/`
- `pnpm preview` — preview the production build locally

## Documentation

- [Deployment and releases](docs/deployment.md) — Cloudflare Pages, CI, production protection, and Silvo’s review
- [Project records](docs/README.md) — index of current design and technical context, rationale, and constraints
- [GitHub kanban board](https://github.com/users/veridynn/projects/4) — work tracking
