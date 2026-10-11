# Changelog

Development milestones are prepared automatically from Conventional Commits.
`dev-v…` tags identify development; `v…` tags identify verified production releases.
The entries below describe source changes, not a claim that they are deployed.

## 0.1.0 (2026-10-11)

Initial documented development baseline, covering work since 2026-09-28.
The scaffold's `0.0.1` was never a tagged release; earlier release numbers have
not been invented.

### Features

- Personal-training homepage with approach, services, trainer profile, and contact sections.
- German at `/` and English at `/en/`, with localized routes and section anchors.
- Language switching with navigation and contact-draft persistence.
- Embedded Web3Forms enquiry form with validation, CAPTCHA integration, and delivery feedback.
- Responsive typography and spacing, scroll reveals, homepage snapping, and contact shortcut.
- Shared footer navigation, legal links, and website credit.
- Version display in both languages, preview build identification, and release automation.

### Improvements

- Keyboard/focus and contrast fixes, localized validation messages, and optional name field.
- Mobile portrait sizing, textarea growth, heading wrapping, and contact spacing refinements.
- Self-hosted Manrope fonts with their redistribution license.
- Contact and rendered-page checks, formatting/lint checks, and CI.
- Documented preview review and approved `dev → prod` promotion.

### Known gaps

- Legal and privacy pages contain headings only.
- Hosting, live delivery, and the first production release still require live verification.
