# Contact

## Configuration

[.env.example](../.env.example) is a maintained copyable template. Set
`PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env` to a Web3Forms access-key UUID.
The key is embedded in the built site and public; private credentials must not
use `PUBLIC_` variables. Restart development or rebuild after changes.

Use a separate key and test recipient for previews. Enable
[provider-side hCaptcha enforcement](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha):
a browser token check can be bypassed. Confirm the recipient before testing real
delivery. Before configuring hosted variables, read [hosting](deployment.md#hosting).

## Submission contract

[ContactForm.svelte](../src/components/ContactForm.svelte) submits directly from
the browser using the schemas and delivery helpers in
[contact.ts](../src/lib/contact.ts). Missing or invalid keys disable delivery.

Keep native field limits aligned with schema limits. Validate before submission,
request a fresh CAPTCHA token for each attempt, and clear the draft only after
confirmed success. Failed attempts must retain the draft for retry.
