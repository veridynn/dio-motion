# Design constraints

[global.css](../src/styles/global.css) owns shared tokens and controls.

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
