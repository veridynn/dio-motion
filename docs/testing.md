# Testing

[AGENTS.md](../AGENTS.md#verification) specifies required checks by change type.

## Automated coverage

| Command | Coverage |
| --- | --- |
| `pnpm check` | Biome formatting, lint, and imports; Astro/Svelte/TypeScript diagnostics. No browser execution. |
| `pnpm test` | [Contact helpers](../tests/contact-form.test.mjs): validation, fresh CAPTCHA tokens, delivery payloads, and failure handling. Fetch and CAPTCHA are mocked; no email is sent. |
| `pnpm test:pages` | Builds and [inspects localized HTML](../tests/localized-pages.test.mjs): routes, metadata, anchors, form markup, island directives, and redirect files. CAPTCHA markup checks run only with a configured key. |
| `pnpm test:deployments` | [Deployment reporting](../tests/deployments.test.mjs): real build results, preview/production labels, failures, retries, reruns, and rejection of stale or untrusted checks. GitHub is mocked; no deployment is created. |
| `pnpm test:release` | [Release safeguards](../tests/release.test.mjs): version/changelog agreement, cumulative notes, deployment retries, both languages, stale commits, immutable tags, and reruns. GitHub and HTTP are mocked; nothing is published. |

HTML assertions do not prove hydration, language-switch persistence, or hosting
HTTP redirects. Contact mocks do not prove provider enforcement, actual receipt,
or timeout expiry. The CAPTCHA script loads during hydration; no-JavaScript
delivery is unverified.

Page checks also verify build metadata, the compact footer version, and the
translated preview tooltip on every content route. To exercise Cloudflare's
production and preview branches locally,
run `pnpm test:pages` with `CF_PAGES_BRANCH=prod` or `CF_PAGES_BRANCH=dev` and
`CF_PAGES_COMMIT_SHA` set to a full commit SHA. Release mocks do not prove the live
GitHub/Cloudflare integration; verify the first development milestone and approved
production release using the [release guide](deployment.md#versioning-and-automation).

## Browser checks

There is no automated browser suite. Use `agent-browser` with compact snapshots
for functional checks and a rendering browser for visual checks.

After contact or navigation changes, check both languages on desktop and mobile:

- Switch language with a populated contact draft and check the
  [navigation persistence contract](architecture.md#state-across-navigation).
- Submit invalid fields, then correct and retry. Check focus and error announcements.
- Exercise keyboard controls and reduced motion for affected interactions.
- For delivery changes, follow [contact configuration](contact.md#configuration),
  then verify receipt and provider-side CAPTCHA rejection.
