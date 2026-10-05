# Formatting and linting

Biome handles formatting, recommended lint rules, and import organization with tabs, including embedded scripts/styles. Astro and Svelte diagnostics remain authoritative for framework semantics and TypeScript. Project commands are listed in [README.md](../../README.md#development-commands).

Biome respects `.gitignore`. Additional exclusions protect installed `.agents`/`.codex` skills and `skills-lock.json`. Markdown, YAML, shell/environment files, and binary assets are unsupported and skipped; pnpm owns lockfile formatting.

Astro/Svelte support and SVG formatting use the experimental HTML support. Full framework support and script/style indentation are enabled explicitly in `biome.json`. See [Biome language support](https://biomejs.dev/internals/language-support/).

Local suppressions address confirmed framework false positives: `noAccessKey` mistakes the form token expression/component prop for a keyboard shortcut; `useAnchorContent` rejects the labelled decorative-icon contact link. The reduced-motion exception preserves the override described in [motion](motion.md). No lint rules are disabled globally.

`astro.config.mjs` excludes Astro from Vite prebundling to avoid stale development-toolbar and router chunks.
