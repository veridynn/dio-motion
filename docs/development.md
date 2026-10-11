# Development and verification

## Local server

Follow [first-checkout setup](../README.md#development). Run commands from the
repository root. Start the server in background mode with `pnpm dev --background`;
use `pnpm dev status`, `pnpm dev logs`, and `pnpm dev stop` to manage it. Reuse a
running server for this checkout. These are package-script forms of the
[Astro CLI background workflow](https://docs.astro.build/en/reference/cli-reference/#--background).

## Contact configuration

[.env.example](../.env.example) is a manually maintained, copyable template. Set
`PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env` to the UUID form identifier supplied by the
maintainer. This value is embedded in the built site and visible to visitors;
private credentials must not use `PUBLIC_` variables. Local env files are ignored.
Restart the dev server after changing configuration and rebuild deployed output.

Use a separate key and test recipient for previews; the production key belongs to
the production recipient. Enable CAPTCHA enforcement using the
[Web3Forms hCaptcha setup](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha);
requiring a token in browser code alone is insufficient. Before a real submission
check, confirm the test recipient and provider configuration. Hosting variable
placement is described in [deployment](deployment.md#cloudflare-pages).

## Verification

Run applicable checks once after the final edit; repeat for new changes or failures.

| Change | Required checks |
| --- | --- |
| Astro, Svelte, or TypeScript | `pnpm check` |
| Contact validation or submission | Also `pnpm test` |
| Routes, translations, anchors, or rendered content | Also `pnpm test:pages` (includes a build) |
| Other changes affecting the built site, including build configuration or assets | `pnpm build` unless covered by `test:pages` |
| Layout or interaction | Affected desktop and mobile browser views and interactions |
| Documentation only | Relative links and anchors, referenced paths, script names, factual claims, and Markdown formatting; no site build |

[package.json](../package.json) defines commands;
[CI](../.github/workflows/ci.yml) runs `check`, `test`, and `test:pages` independently.

- `pnpm check` runs Biome formatting, lint, and import checks, then Astro and Svelte
  diagnostics with TypeScript. It does not exercise browser behavior.
- `pnpm test` runs [contact assertions](../tests/contact-form.test.mjs) against
  validation and delivery helpers: trimming, limits, unknown fields, response and
  network failures, draft non-mutation, and fresh CAPTCHA tokens. Fetch and CAPTCHA
  clients are mocks; this does not prove script loading, provider enforcement,
  actual email receipt, rendered focus/error behavior, or timeout expiry.
- `pnpm test:pages` builds, then [inspects HTML](../tests/localized-pages.test.mjs)
  for both locales: headings, metadata, links and anchors, legal page shells,
  language fallback, form markup, hydration directives, and static redirects.
  CAPTCHA markup assertions run only when a valid key was present at build time.
  This suite neither hydrates islands nor checks live hosting redirects.

Neither test suite needs a real key or sends email. For interaction changes, use
`agent-browser` for functional checks with compact snapshots; use a rendering
browser for visual checks. Cover affected controls in both languages at desktop
and mobile sizes, including keyboard/focus, reduced motion, and language changes
with a populated contact draft where relevant. Preview built output with
`pnpm preview` after `pnpm build`; there is no automated browser suite here.

## Formatting and editors

`pnpm format` writes formatting; `pnpm lint` applies safe lint fixes. Biome handles
tabs and embedded scripts/styles through experimental Astro/Svelte HTML support;
framework diagnostics remain authoritative for semantics. See
[language support](https://biomejs.dev/introduction/language-support/).

[biome.json](../biome.json) respects Git ignores and excludes installed skills and
their lockfile. Markdown, YAML, environment files, and binaries are skipped, so
`pnpm check` does not validate documentation formatting or links.

Local suppressions cover framework false positives: `noAccessKey` confuses the
form-service token with a keyboard shortcut; `useAnchorContent` rejects the labelled
decorative-icon contact link. The reduced-motion exception is explained in
[design](design.md#motion-and-focus). Keep these exceptions local.
[astro.config.mjs](../astro.config.mjs) excludes Astro from Vite prebundling to avoid
stale toolbar and router chunks.

[Zed settings](../.zed/settings.json) add project-local Biome while retaining
framework language servers; [tasks](../.zed/tasks.json) invoke the package scripts
from the worktree root. VS Code recommendations and launch configuration live in
[.vscode](../.vscode/).

## File and skill ownership

- Astro owns ignored `dist/` build output and `.astro/` types/server metadata;
  change source or configuration and regenerate them.
- pnpm owns `pnpm-lock.yaml`; update dependencies through pnpm, preserving the
  reviewed lockfile. CI installs with `--frozen-lockfile`.
- `.agents/skills/` contains installed upstream skills; `skills-lock.json` records
  their sources and hashes. Use relevant skills and preserve their required checks.
  Keep upstream files unchanged; project overrides belong in the root guide or
  topic documentation and take precedence over defaults. Skill tooling owns the
  lockfile; it is not application configuration.
- `CLAUDE.md` is a symlink to `AGENTS.md`, so edit the root guide once.
- [prod-protection.json](prod-protection.json) is a manually maintained GitHub API
  payload consumed by the deployment procedure, not generated output. Keep it as
  a separate file and verify enforcement after applying it.
