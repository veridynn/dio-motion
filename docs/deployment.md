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

1. Wait for CI and a successful Pages preview of the latest `dev` head.
2. Open a PR with base `prod`, head `dev`. Include the full head SHA and the matching
   preview's immutable URL and deployment ID.
3. Have `@diomotion` review that preview and approve the PR. New commits require
   green checks, a new preview, updated references, and renewed approval.
4. Merge after the approval gate passes. Prefer a merge commit for repeated
   promotions so branch history stays connected. With automatic production builds
   enabled, verify the resulting deployment's commit and both `/` and `/en/`.

## References

- [Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Preview URLs and aliases](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Build overrides](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
