# dio motion.

Personal trainer website for [Dio Motion](https://diomotion.com), built with Astro
and Svelte. German lives at `/`, English at `/en/`.

See [Project rules](RULES.md) for tickets, branches, commits, pull requests,
and documentation conventions.

## Development

Use the Node.js and pnpm versions specified in [package.json](package.json).
On a first checkout, create `.env` from the template; preserve an existing `.env`.

```sh
pnpm install
cp -n .env.example .env
pnpm dev --background
```
