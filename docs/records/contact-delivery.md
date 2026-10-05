# Contact delivery

The persisted homepage form uses Bits UI controls and ArkType validation. Email and message are required; name is optional. Inputs are trimmed, extra fields rejected, and provider responses validated. `src/lib/contact.ts` owns schemas and delivery; `src/components/ContactForm.svelte` owns the form.

Web3Forms receives requests directly over HTTPS, keeping delivery compatible with a static site. `PUBLIC_WEB3FORMS_ACCESS_KEY` is a public form identifier embedded at build time, sourced from `.env` locally or the hosting build environment. Changes require a rebuild; private credentials do not belong in `PUBLIC_` variables.

Invisible hCaptcha obtains a fresh token for each send and may present a challenge. Mandatory provider-side CAPTCHA is the trust boundary; browser validation cannot enforce it. Duplicate sends are disabled while busy, failures preserve the draft, and delivery has a 15-second timeout.
