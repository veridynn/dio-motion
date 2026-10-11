# Deployment

## Hosting

Verify these required settings in the live Pages dashboard before a hosting
change or release; repository files do not prove they are applied.

| Setting | Required value |
| --- | --- |
| Pages project | `dio-motion`, using native Git integration with `veridynn/dio-motion` |
| Production branch | `prod` |
| Preview branches | All branches; native previews exclude fork PRs |
| Build | `pnpm build` from the repository root; output `dist` |
| Runtimes | Match [package.json](../package.json), using `NODE_VERSION` and `PNPM_VERSION` overrides in Preview and Production |
| Form delivery | Set `PUBLIC_WEB3FORMS_ACCESS_KEY` separately in Preview and Production Variables and Secrets; rebuild after changes |

Before testing delivery, configure the recipient and CAPTCHA using
[contact configuration](contact.md#configuration).

For project `dio-motion`, the production URL is `https://dio-motion.pages.dev`;
the moving development alias is `https://dev.dio-motion.pages.dev`.
Review a successful deployment's immutable
`https://<deployment-hash>.dio-motion.pages.dev` URL. Pages assigns that hash;
it is not the Git SHA. Keep the reviewed deployment available.

Attaching `diomotion.com`, changing DNS, or launching the live domain needs separate
explicit authorization; a `pages.dev` release does not grant it.

## Approval gate

[prod-protection.json](prod-protection.json) is the maintained protection payload,
not generated output. Its checks must match [CI job names](../.github/workflows/ci.yml).
Verify that live `prod` protection enforces the payload's checks, review rules,
administrator enforcement, and force-push/deletion restrictions before promotion.
Committed configuration alone does not enforce them.

[CODEOWNERS](../.github/CODEOWNERS) must exist on the PR's base branch, `prod`,
without GitHub errors. Confirm `@diomotion` has accepted write, maintain, or admin
access. If any gate is absent or cannot be verified, stop promotion
and keep automatic production deployment disabled until it is established.

For an authorized protection repair, run from the root and verify the result:

```sh
gh api --method PUT repos/veridynn/dio-motion/branches/prod/protection \
  --input docs/prod-protection.json
gh api repos/veridynn/dio-motion/branches/prod/protection
gh api 'repos/veridynn/dio-motion/codeowners/errors?ref=prod'
```

## Release: dev → prod

1. Merge the prepared version/changelog PR into `dev` before promotion. Review its
   notes and wait for CI and a successful Pages preview of the latest `dev` head.
2. Open a PR with base `prod`, head `dev`. Include the full head SHA and the matching
   preview's immutable URL and deployment ID.
3. Have `@diomotion` review that preview and approve the PR. New commits require
   green checks, a new preview, updated references, and renewed approval.
4. Merge after the approval gate passes. Prefer a merge commit for repeated
   promotions so branch history stays connected. With automatic production builds
   enabled, verify the resulting deployment's commit and both `/` and `/en/`.

## Versioning and automation

[package.json](../package.json) owns the site version. The initial `0.1.0`
development baseline is recorded in [CHANGELOG.md](../CHANGELOG.md); it is not a
claim that this source has reached production. The earlier scaffold value
`0.0.1` had no tagged release.

[Prepare release](../.github/workflows/prepare-release.yml) runs on `dev`, maintaining
a Release Please PR that updates the package version, changelog, and
[manifest](../.release-please-manifest.json). Merge that PR to record a development
milestone. Its `dev-v…` tag and GitHub prerelease do not deploy production.
Several development milestones may be promoted together.

Use Conventional Commits: `fix:` bumps patch, `feat:` bumps minor, and `!` or a
`BREAKING CHANGE:` footer bumps major (minor while below `1.0.0`). Project override
to the Conventional Git skill: documentation, formatting, and tooling commits
are also visible in the changelog and can prepare a patch release PR. They do not
publish a new milestone until that PR is merged. Use `fix:` for visitor-visible copy or styling corrections;
reserve `style:` for formatting. For an intentional version override, include a
`Release-As: 1.0.0` footer in a commit. Review generated notes before promotion.
The bootstrap SHA in [configuration](../release-please-config.json) excludes the
history already summarized in the baseline; it is ignored after the first
generated milestone is released.

The shared footer renders a compact build label, such as `v0.1.0+b4efbde`.
It includes the short commit ID when available; local builds without one show
only `v0.1.0`. Non-`prod` builds retain a `Vorschau`/`Preview` tooltip.
HTML metadata records the version, full commit, and production/preview status.
Cloudflare supplies `CF_PAGES_BRANCH` and `CF_PAGES_COMMIT_SHA`; do not override
them. Local builds without these variables are labelled previews.

[Publish production release](../.github/workflows/publish-release.yml) runs after
successful push CI on `prod`. It waits for both `https://dio-motion.pages.dev/`
and `/en/` to serve that exact production commit and version, then creates `v…`
and its GitHub release. Notes include all changelog entries since the previous
production release. Stale runs, mismatched pages, failed requests, and reused
version numbers cannot publish. The workflow never promotes or merges code.
Published tags are immutable; bump the version before another promotion.

### One-time activation

1. Merge the implementation into `dev`. In GitHub Actions settings, allow Actions
   to create pull requests. The workflows use `GITHUB_TOKEN`; no new PAT or
   Cloudflare API token is needed. Release PR CI is explicitly dispatched because
   token-authored pushes do not trigger it automatically.
2. Confirm the hosting and approval gate above. The production verifier uses the
   `pages.dev` origin, not the custom domain. If that origin later redirects to the
   custom domain, update the verifier's fixed URL and its tests before promotion.
3. Verify a generated release PR's `check`, `test`, `test:pages`, and `test:release`
   results and matching Pages preview. Then follow the existing approval process.
4. Check the first production workflow's release tag, commit, notes, and both live
   footers. Publication waits up to about 15 minutes including request timeouts.
   On a hosting failure, fix hosting and rerun the successful `prod` push CI run;
   it will trigger publication again. An already-published matching release is a
   no-op. Do not change or delete a published tag to reuse a version.

Neither this setup nor a generated development release authorizes attaching the
live domain or bypassing production review.

## References

- [Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Preview URLs and aliases](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Build overrides](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
