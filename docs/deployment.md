# Deployment and releases

## Cloudflare Pages

Project: `dio-motion` in the Bogdan account (`f0565d00ccf0c68e6cbc4d479a91d3f2`), connected to `veridynn/dio-motion` through native Git integration.

- Build: `pnpm build`; output: `dist`; root: `/`.
- Build image v3, `NODE_VERSION=26`, `PNPM_VERSION=12.9.1` in both environments.
- Production branch: `prod`; production deployments are **disabled** pending the review gate below. No `prod` branch has been created.
- Preview branches: all; pull request comments enabled. `dev` and feature branches deploy automatically on pushes. Fork pull requests do not receive native Pages previews.
- Reserved production address: https://dio-motion.pages.dev (not published yet).
- Development alias: https://dev.dio-motion.pages.dev (available after a successful `dev` deployment).
- Each successful preview has an immutable URL, `https://<deployment-hash>.dio-motion.pages.dev`. The hash is assigned by Pages, not the Git commit SHA. Branch aliases move on subsequent pushes.

No custom domain is attached. Do not attach `diomotion.com`, change its DNS, or launch the live domain without explicit authorization.

## Contact delivery

Set `PUBLIC_WEB3FORMS_ACCESS_KEY` separately in Pages Settings → Variables and Secrets for Preview and Production, then rebuild. Use a verified preview-specific form/key and test recipient for Preview when available; the production key belongs to the production recipient. No key was supplied or configured during setup. Without a key, live delivery is unavailable. See [contact delivery](records/contact-delivery.md) for Web3Forms and CAPTCHA requirements. Do not copy the production key into previews by default.

## Production gate — blocked

On 2026-10-05, GitHub returned HTTP 403 for branch protection and rulesets: “Upgrade to GitHub Pro or make this repository public to enable this feature.” The repository is currently private, which blocks these features on its current plan. The intended final visibility is public; the user will change visibility personally. Prepared CODEOWNERS and CI files alone do not enforce approval or passing checks while protection is unavailable.

The supplied handoff said Silvo's invitation had not been accepted. At setup time, the API instead returned `diomotion` with `write` permission and an empty pending-invitation list. Confirm Silvo controls that account and has accepted access before enabling promotion. Do not treat his review requirement as effective until both access and active protection have been verified.

Keep production deployments disabled and `prod` absent until all of these steps are complete:

1. Wait for the user to make `veridynn/dio-motion` public personally. Do not change visibility on their behalf, upgrade, or purchase a plan. Verify public visibility and that GitHub now permits branch protection before proceeding.
2. Merge the setup PR into `dev` after its `check`, `test`, and `test:pages` jobs pass. Verify its successful Pages preview.
3. Confirm Silvo's acceptance and write access with `gh api repos/veridynn/dio-motion/collaborators/diomotion/permission`. The result must be `write`, `maintain`, or `admin`.
4. With Pages production still disabled, bootstrap `prod` from the agreed baseline containing `.github/CODEOWNERS` (`* @diomotion`) and the CI workflow. CODEOWNERS must exist on the PR's **base** branch to require Silvo's review. This initialization is not authorization to launch the site.
5. Apply the prepared protection from the repository root:

   ```sh
   gh api --method PUT repos/veridynn/dio-motion/branches/prod/protection \
     --input docs/prod-protection.json
   gh api repos/veridynn/dio-motion/branches/prod/protection
   gh api repos/veridynn/dio-motion/codeowners/errors?ref=prod
   ```

   Confirm required checks `check`, `test`, `test:pages`; strict up-to-date checks; one approval; required code-owner review; dismissal of stale approvals; enforcement for administrators; and disabled force pushes/deletions. Check CODEOWNERS has no errors. Do not proceed if GitHub rejects or ignores any required setting.
6. Only after that verification, enable automatic production deployments in Pages Settings → Builds & deployments for `prod`. Keep previews set to All branches. Do not trigger the first production build until the release is approved. The `pages.dev` production hostname is separate from the live-domain launch.

Making the repository public or adding CODEOWNERS does not automatically apply `docs/prod-protection.json`. Owners can still edit protection settings; `enforce_admins` prevents normal merge/push bypass while the rule is active.

## Release: dev → prod

1. Finish changes on `dev` and wait for CI plus its Pages preview build to succeed.
2. Open a PR with **base `prod`, head `dev`**. Record the full release head SHA in the PR description.
3. In Pages deployment details, select the successful **Preview** deployment with that exact commit SHA. Put its immutable hash URL and deployment ID in the release PR description for Silvo. Keep that deployment; do not delete it. Share this URL, rather than the moving `dev` alias.
4. Have `@diomotion` review the exact preview and approve the GitHub PR. Any new changes require a new successful preview, updated SHA/link, and renewed approval. Check all three required CI jobs are green on the latest PR revision.
5. Merge the approved PR. Native Git integration builds `prod` automatically and publishes to the reserved production hostname. Verify the deployment commit and both `/` and `/en/` afterward. Prefer a merge commit for repeated `dev` → `prod` releases so branch history stays connected.
6. A later live-domain launch requires separate explicit authorization. Do not change DNS as part of this release workflow.

## References

- [Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Pages preview URLs and aliases](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Pages build version overrides](https://developers.cloudflare.com/pages/configuration/build-image/)
- [GitHub protected branches and plan requirements](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [CODEOWNERS permissions and base branch behavior](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
