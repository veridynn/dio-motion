# Changelog

Development milestones are prepared automatically from Conventional Commits.
`dev-v…` tags identify development; `v…` tags identify verified production releases.
The entries below describe source changes, not a claim that they are deployed.

## [0.1.1](https://github.com/veridynn/dio-motion/compare/dev-v0.1.0...dev-v0.1.1) (2026-10-19)


### Fixes

* **footer:** align credit and version on a separate row ([839177d](https://github.com/veridynn/dio-motion/commit/839177d06818550655fc9efb760f0cce256f1c8a))
* **footer:** align layout and share accessible link icons ([d500da0](https://github.com/veridynn/dio-motion/commit/d500da0885adaf49351bad66529ea7b614c08425))
* **footer:** compact build label and share responsive grid ([#36](https://github.com/veridynn/dio-motion/issues/36)) ([28cb784](https://github.com/veridynn/dio-motion/commit/28cb7849b6d479c80419e8876274ec045e7e0245))
* **footer:** restore default text-link underlines ([#39](https://github.com/veridynn/dio-motion/issues/39)) ([7183f37](https://github.com/veridynn/dio-motion/commit/7183f376263608f16738c59ba3f643c5dc742703))
* **footer:** share link styling with hover underlines ([eafc97b](https://github.com/veridynn/dio-motion/commit/eafc97b82fff06943205a2d1bcbae18eb151dec1))
* **footer:** unify credit link wording and hover styles ([#38](https://github.com/veridynn/dio-motion/issues/38)) ([5737fde](https://github.com/veridynn/dio-motion/commit/5737fde9489cab00ee714d393353af26151c5172))
* **footer:** use build metadata and stack legal links ([#37](https://github.com/veridynn/dio-motion/issues/37)) ([f837ae6](https://github.com/veridynn/dio-motion/commit/f837ae672669c1b518cb596919da015f423cfe74))
* **motion:** centralize timing and preserve animation units ([f5e21d7](https://github.com/veridynn/dio-motion/commit/f5e21d77070a9f6877da4f695aa2b6fad8a5eba3))
* **styles:** move corner shapes to global CSS ([7af8a9a](https://github.com/veridynn/dio-motion/commit/7af8a9aba8cda4065e3432518f5bb407b56ba7a0))


### Documentation

* define project workflow rules ([17f56d7](https://github.com/veridynn/dio-motion/commit/17f56d711009161545b2c272364aaff0ad23dcbf))


### Maintenance

* **release:** preserve baseline after flattening history ([f140097](https://github.com/veridynn/dio-motion/commit/f14009728a0be657fb09a072113fa4a71bdc7ca0))
* **skills:** install to-tickets ([fa33d91](https://github.com/veridynn/dio-motion/commit/fa33d918fd5aa16cb70b9a959a36e4b335566f63))
* **styles:** extract shared design tokens ([2eeb18f](https://github.com/veridynn/dio-motion/commit/2eeb18f864373f74adac1ddb09fb93ad5e789dc6))


### Automation

* **deployments:** report Cloudflare builds in GitHub ([#40](https://github.com/veridynn/dio-motion/issues/40)) ([b70007b](https://github.com/veridynn/dio-motion/commit/b70007b6e6a3b6705bae5325abe9d1c3349909ac))

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
