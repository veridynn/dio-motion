# Development documentation

## Structure

`src/layouts/SiteLayout.astro` shares metadata, navigation, and the footer. Homepage sections live in `src/components/home/`; the contact form lives in `src/components/ContactForm.svelte`. Shared design tokens and utilities live in `src/styles/global.css`, with component-specific styles scoped in Astro components.

German is the default language at `/`; English lives at `/en/`. Section anchors are localized, including `/#kontakt` and `/en/#contact`. The language switch maps the current anchor to the corresponding section in the selected language.

## Typography

The Manrope type scale lives in `src/styles/global.css` as `--fs-sm` through `--fs-xxxl`. It grows fluidly between 400px and 1280px, with a 16px/1.25 mobile base and a 19px/1.333 desktop base. Sizes remain capped outside that range. Use the shared tokens in component styles; keep weights, tracking, and unitless line heights appropriate to each role. Rem bounds respect browser font preferences without changing the root font size.

## Spacing

Fluid `--space-*` tokens in `src/styles/global.css` use the same 400–1280px range as typography. The `xs` through `3xl` steps cover component margins, padding, and gaps. `--space-section` grows from 56px to 144px, and `--space-gutter` from 20px to 96px. `--section-y` and `--gutter` remain the shared layout aliases. Spacing is capped beyond those widths; grid and visibility breakpoints remain independent.

## Contact delivery

The homepage contains a persisted Svelte island with Bits UI labels and button. Email and message are required; name is optional. ArkType trims and validates the inputs, limits their lengths, and checks the provider response. Submission states are translated, duplicate clicks are disabled while sending, and failed requests preserve the draft.

1. [Create a free Web3Forms form](https://app.web3forms.com/onboarding/create) for `silvo@diomotion.com` and verify the recipient inbox.
2. Enable **hCaptcha** in that form’s spam protection settings. This makes verification mandatory at the service, including requests that bypass our client validation.
3. Copy `.env.example` to `.env` and set `PUBLIC_WEB3FORMS_ACCESS_KEY` to the form’s key. Set the same variable in the hosting build environment and rebuild.
4. Submit a real test message and confirm it arrives in the recipient inbox before publishing.

The form key is public by design; do not put a private email API credential here. Delivery runs through Web3Forms’ HTTPS API, so the site needs no server adapter. The free plan currently includes 250 submissions per month. If the key is absent or invalid, the button remains active and valid submissions show a browser alert as a development placeholder without sending or clearing the draft.

Invisible hCaptcha loads only when the key is configured. It has no checkbox and executes when the visitor submits valid form inputs, obtaining a fresh token before each send. A risk-based challenge may still appear on the free plan; invisible does not mean fully passive. CAPTCHA failures preserve the draft and allow another attempt. Client-side ArkType validation improves input quality; the provider’s mandatory CAPTCHA and service-side checks enforce the remote trust boundary. Live delivery and CAPTCHA enforcement require the verified form configuration above.

Add Web3Forms and hCaptcha data processing details to the site’s privacy policy before publishing.
