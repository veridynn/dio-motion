# Spacing and layout

Shared `--space-*` tokens in `src/styles/global.css` scale between 400px and 1280px, then remain capped. The fluid interval matches [typography](typography.md); layout and visibility breakpoints remain independent.

`--section-y` and `--gutter` alias section spacing and page gutters. `.wrap` constrains content with `--measure`. Component margins, padding, and gaps use the shared scale rather than independent spacing systems.

Fixed-navigation height is included in page offsets, anchor scroll margins, and `--usable-height` so navigation does not obscure content. The shared navigation/layout breakpoint is 861px.
