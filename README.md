# dio motion.

German personal trainer website built with Astro. The supplied prototypes are implemented at `/` and `/kontakt/`.

## Development

- `pnpm install`
- `pnpm exec astro dev --background` — start the local server
- `pnpm exec astro dev status` / `logs` / `stop` — manage the server
- `pnpm build` — generate the static site in `dist/`
- `pnpm test` — check contact email encoding

## Structure

`src/layouts/SiteLayout.astro` shares metadata, navigation, and the footer. Homepage sections live in `src/components/home/`; the contact form lives in `src/components/ContactForm.astro`. Shared design tokens and utilities live in `src/styles/global.css`, with component-specific styles scoped in Astro components.

## Content still needed

- Replace the portrait placeholder in `About.astro` with the final image.
- Supply the hero contour artwork if desired; a CSS glow currently preserves the prototype's background treatment.
- Supply the imprint and privacy copy. Their footer labels are intentionally plain text until real pages exist.
- The contact form prepares a draft in the visitor's email app, with native required-field and email validation. It does not send email automatically or claim delivery. To support direct web submissions, configure a delivery endpoint and update the form, including server-side validation, abuse protection, and explicit success/error states.

## Human Todo

- [ ] add [arktype](https://arktype.io/) or similar for form validation
- [ ] use bitsui from svelte-shadcn-ui
- [ ] use runed from svelte
- [ ] Supply the final portrait image to replace the placeholder in `About.astro`.
- [ ] Decide whether to add hero contour artwork and supply the final asset if desired.
- [ ] Supply final Impressum and Datenschutzerklärung copy so the legal pages and footer links can be added.
- [ ] Choose and configure an email delivery service for direct contact-form submissions, then replace the email-draft fallback with server-side validation, abuse protection, and success/error feedback.
