# Development commands

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the development server |
| `pnpm dev --background` | Start it in the background |
| `pnpm dev status` | Check background server status |
| `pnpm dev logs` | Read background server logs |
| `pnpm dev stop` | Stop the background server |
| `pnpm check` | Biome formatting, lint, and imports; Astro, Svelte, and TypeScript diagnostics |
| `pnpm format` | Format supported files |
| `pnpm lint` | Apply safe lint fixes |
| `pnpm test` | Contact validation, mocked delivery, and CAPTCHA handling |
| `pnpm test:pages` | Build and check localized pages, metadata, links, forms, and redirects |
| `pnpm build` | Build the static site into `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm astro --help` | List Astro CLI commands |

Contact tests run without a build; page tests inspect built HTML. Both use Node assertions and need no real form key or email delivery.
