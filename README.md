# dio motion.

Personal trainer website for [Dio Motion](https://diomotion.com), built with Astro and Svelte. The site is statically generated, with German at `/` and English at `/en/`.

## Requirements

- Node.js `^26`
- pnpm `^12`

## Setup

```sh
pnpm install
cp .env.example .env
pnpm dev
```

Environment variable configuration is covered in the [contact delivery documentation](docs/development.md#contact-delivery).

## Development commands

- `pnpm dev` — start the local development server
- `pnpm dev --background` — optionally run the server in the background
- `pnpm dev status` — check whether the development server is running
- `pnpm dev logs` — view logs from the background development server
- `pnpm dev stop` — stop the background development server
- `pnpm check` — run Astro, Svelte, and TypeScript checks
- `pnpm test` — check form validation and delivery handling
- `pnpm test:pages` — build and check localized pages
- `pnpm build` — generate the static site in `dist/`
- `pnpm preview` — preview the production build locally

## Documentation

- [Deployment and releases](docs/deployment.md) — Cloudflare Pages, CI, production protection, and Silvo’s review

- [Development documentation](docs/development.md) — project structure, typography, spacing, and contact delivery
- [General todos](docs/todos.md) — remaining content and launch tasks
