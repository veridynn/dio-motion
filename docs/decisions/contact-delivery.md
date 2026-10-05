# Contact form and delivery

Contact is a persisted Svelte island on the homepage. Email and message are required; name is optional. Bits UI provides labels and the submit button. ArkType trims inputs, rejects extra fields, enforces length limits (name 100, email 254, message 5000), and validates provider responses.

Delivery goes directly to Web3Forms over HTTPS. `PUBLIC_WEB3FORMS_ACCESS_KEY` is a public form identifier included in the built client, rather than a private email API credential.

Invisible hCaptcha loads only when the form key is configured and obtains a fresh token before each send. Mandatory provider-side CAPTCHA is the enforcement boundary; client validation alone cannot prevent requests that bypass the form. Invisible mode has no checkbox but may still present a risk-based challenge.

## Failure and state behavior

Duplicate submissions are disabled while sending. Failed requests and CAPTCHA failures preserve the draft and allow another attempt. Translated submission states provide feedback. If the key is absent or invalid, valid submission shows a development placeholder alert without sending or clearing the draft.

## Implementation

The form lives in `src/components/ContactForm.svelte`; schemas, CAPTCHA token handling, and delivery live in `src/lib/contact.ts`. Delivery uses a 15-second request timeout and checks HTTP and typed response success.

## Related work

- [#12](https://github.com/veridynn/dio-motion/issues/12): PO provider configuration and recipient/CAPTCHA confirmation.
- [#11](https://github.com/veridynn/dio-motion/issues/11): developer activation, fallback behavior, and delivery verification.
- [#10](https://github.com/veridynn/dio-motion/issues/10) → [#23](https://github.com/veridynn/dio-motion/issues/23): PO-approved legal texts and developer publication.
- [#17](https://github.com/veridynn/dio-motion/issues/17): the existing production-release prerequisites.

Environment-variable behavior is described in the [development guide](../development.md#contact-configuration).
