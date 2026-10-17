# Design constraints

[global.css](../src/styles/global.css) owns shared tokens and controls.

Use [Icon.astro](../src/components/Icon.astro) for icons, with `name="github"`
or `name="external-link"`. Add `inline` when an icon sits in text: the shared
`.icon--inline` style sets a `1.1em` size, `vertical-align: middle`, and a
`0.25em` margin on both inline sides (a typical word-space width). SVG artwork
stays in [src/assets/icons](../src/assets/icons/).

[Link.astro](../src/components/Link.astro) uses `text-decoration: underline`
with a `0.2em` offset directly on the link.

Adjust motion centrally with its `--motion-duration-*`, `--motion-ease*`, and
`--motion-distance-*` and `--motion-scale-icon` tokens. Contact-error feedback
converts the computed normal duration from seconds or milliseconds to the
milliseconds required by the Web Animations API. External-link icons fade and grow from a slightly smaller size
on desktop hover or keyboard focus; mobile and tablet keep them static. Reduced
motion removes transitions and displacement.

- Fixed-navigation height feeds page offsets, anchor margins, and usable viewport
  height. Keep its calculation and breakpoint aligned with
  [Navigation.svelte](../src/components/Navigation.svelte), or anchors land behind it.
- Compact controls retain a 44px minimum height at the default browser font size.
  Error styling must not change field dimensions. Email/message error slots reserve
  localized text so wrapping does not shift the form; retain their `aria-hidden`
  sizing copies and separate live messages.
- Preserve the ordinary rounded-corner fallback for `corner-shape: squircle`.
- Focus must expose pending reveals and keep the fading contact shortcut visible.
  Reduced motion disables snapping, smooth scrolling, transitions, and field shakes;
  the global transition override must continue to beat scoped component styles.
- Preserve the self-hosted Manrope [SIL Open Font License](../public/fonts/manrope/OFL.txt)
  when redistributing fonts.
