# Design and interaction

## Shared styles

[global.css](../src/styles/global.css) owns the palette, type and spacing scales,
layout offsets, text roles, and shared buttons. Exact values belong there.
Component styles stay scoped; `:global` reaches child markup such as Bits UI
controls. Consult [Astro styling](https://docs.astro.build/en/guides/styling/)
before changing style scoping.

Typography and spacing share a capped fluid interval; layout breakpoints are
independent. Preserve the browser's root font size so rem bounds respect user
preferences. Text roles set weight, tracking, and unitless leading; headings keep
emergency wrapping for long German words, while section headings avoid automatic
hyphenation.

Manrope is self-hosted in Latin and extended Latin subsets with `font-display: swap`;
the layout preloads Latin. Preserve the font's
[SIL Open Font License](../public/fonts/manrope/OFL.txt) when redistributing assets.

The fixed navigation height feeds page offsets, anchor scroll margins, and usable
viewport height. Keep its CSS breakpoint and height calculation aligned with
[Navigation.svelte](../src/components/Navigation.svelte) when changing controls or
padding; otherwise headings can land behind the header.

## Controls and feedback

Buttons and fields share `--control-*` dimensions, type, gaps, and padding. Compact
controls retain a 44px minimum height at the default browser font size. Textareas
grow with content and include padding and borders in their minimum height.

Contact validation errors appear on blur and submission and clear when corrected.
Email and message error slots reserve their localized text with an invisible,
assistive-technology-hidden copy, preventing layout shifts when messages wrap.
Invalid styling uses an inset border without changing field dimensions.

`--squircle-radius` pairs with `corner-shape: squircle`; rounded corners provide the
fallback. Svelte CSS diagnostics may warn about `corner-shape`.

## Motion and focus

Desktop sections use proximity snapping toward section centers. Intersection
reveals leave already-visible content exposed during language changes. The mobile
contact shortcut fades near contact but remains visible while focused.

Reduced-motion preferences disable smooth scrolling, snapping, transitions, and
field shakes. Pending reveals stay visible, and focus within a reveal exposes its
content. The reduced-motion `transition: none !important` override is intentional:
it must beat scoped component transitions.

Invalid fields and native character-limit feedback restart the same shake rather
than stacking animations; reaching a limit adds no error text. Before changing
these behaviors, use the browser checks in
[verification](development.md#verification).
