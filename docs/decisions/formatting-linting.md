# Formatting and linting

Biome 2.5.15 provides formatting, recommended lint rules, and import organization. Indentation uses tabs, including embedded scripts and styles. Astro and Svelte diagnostics remain alongside Biome because they understand framework semantics and provide TypeScript checking.

## Scope

VCS integration respects `.gitignore`, nested ignore files, and local Git exclusions. Generated output and dependencies are already excluded there, so Biome does not duplicate those patterns. Explicit Biome force-ignore patterns cover only installed `.agents`/`.codex` skills and `skills-lock.json`, which are not covered by `.gitignore` and remain available to agents.

Markdown, YAML, shell/environment files, and binary assets are unsupported by Biome and skipped through `files.ignoreUnknown`. Markdown remains manually maintained; pnpm owns lockfile YAML formatting. SVG uses the experimental HTML formatter.

## Experimental framework support

Full Astro/Svelte template, JavaScript/TypeScript, and CSS support is enabled with `html.experimentalFullSupportEnabled` and `html.formatter.enabled`. Svelte script/style indentation is enabled explicitly. [Biome documents this support as experimental](https://biomejs.dev/internals/language-support/); framework diagnostics remain authoritative. Biome currently documents TypeScript syntax support through 5.9, while the project uses TypeScript 6.

## Confirmed false positives

- `a11y/noAccessKey` mistakes `value={accessKey}` for a keyboard shortcut and flags the `ContactForm` component prop in Astro. Narrow suppressions preserve the token binding and prop; the multiline Astro tag uses a range suppression.
- `a11y/useAnchorContent` rejects an icon-only anchor with a literal or dynamic `aria-label` and decorative SVG. A local suppression preserves the contact shortcut's translated accessible name.

No lint rules are disabled globally. Reduced-motion exception: [motion](motion.md).

## Astro development workaround

`astro.config.mjs` excludes `astro` from Vite dependency prebundling to avoid stale development-toolbar and router chunks.
