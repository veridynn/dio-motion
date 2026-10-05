# Contact delivery

The persisted homepage form uses Bits UI controls and ArkType validation. Email and message are required; name is optional. Inputs are trimmed, extra fields rejected, and provider responses validated. `src/lib/contact.ts` owns schemas and delivery; `src/components/ContactForm.svelte` owns the form.

Web3Forms receives requests directly over HTTPS, keeping delivery compatible with a static site. `PUBLIC_WEB3FORMS_ACCESS_KEY` is a public form identifier embedded at build time, sourced from `.env` locally or the hosting build environment. Changes require a rebuild; private credentials do not belong in `PUBLIC_` variables.

Local development and automated tests need no key or `.env`. Without a valid key, the hydrated form validates input, then shows a test notice without loading CAPTCHA or sending a request. Delivery tests mock the provider and CAPTCHA; this does not verify real email delivery.

To test real delivery locally, run `cp .env.example .env`, set `PUBLIC_WEB3FORMS_ACCESS_KEY` to a verified test form key, and restart the development server. GitHub environment configuration is not automatically loaded locally. Hosted builds need the key in their own build environment; see [deployment](../deployment.md#contact-delivery).

Invisible hCaptcha obtains a fresh token for each send and may present a challenge. Mandatory provider-side CAPTCHA is the trust boundary; browser validation cannot enforce it. Duplicate sends are disabled while busy, failures preserve the draft, and delivery has a 15-second timeout.
