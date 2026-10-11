# Deployment and approvals

## Cloudflare Pages

The recorded hosting target is project `dio-motion` in the maintainer's Cloudflare account,
connected to `veridynn/dio-motion` through native Git integration. Before changing
hosting or releasing, verify the dashboard settings below; they are the intended
configuration, not proof that production is enabled or a domain is attached.

- Build with `pnpm build`, output `dist`, repository root `/`.
- Match build runtimes to [package.json](../package.json); the setup used build
  image v3 with `NODE_VERSION=26` and `PNPM_VERSION=12.9.1` in both environments.
- Production branch: `prod`. Enable automatic production deployments only after
  verifying the [approval gate](#production-approval-gate).
- Preview branches: all, with pull request comments enabled. Fork PRs do not
  receive native Pages previews.
- Production hostname: `https://dio-motion.pages.dev`; development alias:
  `https://dev.dio-motion.pages.dev`. Verify successful deployment before sharing.

Set `PUBLIC_WEB3FORMS_ACCESS_KEY` separately in Pages Settings → Variables and
Secrets for Preview and Production, then rebuild. Follow
[contact configuration](development.md#contact-configuration) for recipients and
provider-side CAPTCHA enforcement.

Each successful preview has an immutable
`https://<deployment-hash>.dio-motion.pages.dev` URL. Pages assigns this hash; it is
not the Git commit SHA. Branch aliases move on subsequent pushes. Preserve the
preview selected for review.

Attaching `diomotion.com`, changing its DNS, or launching the live domain requires
separate explicit authorization. A release to `pages.dev` does not grant it.

## Production approval gate

[CI](../.github/workflows/ci.yml), [CODEOWNERS](../.github/CODEOWNERS), and
[prod-protection.json](prod-protection.json) define the intended release gate.
Committed files alone do not prove that GitHub enforces it.

Before enabling production deployments or promoting a release:

1. Confirm Silvo controls `@diomotion` and has accepted repository access with
   write, maintain, or admin permission. CODEOWNERS must name this account on the
   PR's **base** branch, `prod`; check that GitHub reports no CODEOWNERS errors.
2. Verify active protection on `prod`: strict, up-to-date required checks matching
   the CI jobs; one approval with required code-owner review; stale approval
   dismissal; enforcement for administrators; resolved conversations; and disabled
   force pushes/deletions. Stop promotion if any required setting is absent.
3. Verify the latest release head has passing CI and a successful Pages preview,
   and obtain Silvo's approval of that exact revision using the release steps below.

For an authorized protection repair, apply the maintained payload from the root,
then inspect the response and read it back with an account that can administer the
repository:

```sh
gh api --method PUT repos/veridynn/dio-motion/branches/prod/protection \
  --input docs/prod-protection.json
gh api repos/veridynn/dio-motion/branches/prod/protection
gh api 'repos/veridynn/dio-motion/codeowners/errors?ref=prod'
```

Applying the file does not enable Pages or authorize a release. Owners can edit
protection settings; administrator enforcement blocks ordinary merge/push bypass
while the rule is active. If GitHub rejects a setting or the caller cannot read it,
verify with an authorized account rather than treating the gate as effective.

## Release: dev → prod

1. Finish changes on `dev` and wait for CI plus its Pages preview build to succeed.
2. Open a PR with **base `prod`, head `dev`**. Record the full release head SHA.
3. Select the successful **Preview** deployment with that exact commit SHA in Pages.
   Put its immutable hash URL and deployment ID in the PR for Silvo. Keep the
   deployment; share this URL rather than the moving development alias.
4. Have `@diomotion` review that preview and approve the PR. New changes require
   passing checks, a new preview, updated SHA/link, and renewed approval.
5. Merge only after the gate passes. Prefer a merge commit for repeated promotions
   so branch history stays connected. With automatic deployments enabled, native
   Git integration builds `prod` and publishes the production hostname. Verify the
   deployed commit and both `/` and `/en/` afterward.

## Dated observations

The 2026-10-05 setup record reported private-repository plan restrictions preventing
protection, no `prod` branch, and disabled production deployment. Those findings
are historical and are not prerequisites to repeat.

On 2026-10-11, GitHub metadata confirmed the repository is public and
[`prod`](https://github.com/veridynn/dio-motion/tree/prod) exists, marked protected
with required checks `check`, `test`, and `test:pages`. The connected GitHub app
could not read the full protection settings (HTTP 403, resource inaccessible to
integration). Review/admin enforcement, Silvo's access, Pages deployment settings,
and domain attachment were not reverified. Check them before promotion; this
observation does not establish release readiness.

## References

- [Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Preview URLs and aliases](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Build version overrides](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [CODEOWNERS permissions and base-branch behavior](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
