# dio motion.

Personal trainer website for [Dio Motion](https://diomotion.com), built with Astro
and Svelte. German lives at `/`, English at `/en/`.

## Development

Requires Node.js 26 and pnpm 12.9.1, as specified in [package.json](package.json).
On a first checkout, create `.env` from the template; preserve an existing `.env`.

```sh
pnpm install
cp -n .env.example .env
pnpm dev --background
```

Open the URL reported by Astro. Configure contact delivery using
[environment guidance](docs/development.md#contact-configuration).
See [server management and checks](docs/development.md) for the remaining commands.

## Project guidance

- [Documentation index](docs/README.md) — Read the topic matching your task.
- [Agent guide](AGENTS.md) — Shared contracts and verification requirements.
- [Work board](https://github.com/users/veridynn/projects/4) — Pending work and approvals.
