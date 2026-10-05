# Typography

Manrope is self-hosted as variable WOFF2 with Latin and extended Latin coverage and `font-display: swap`. `SiteLayout.astro` preloads the Latin font. Font files and the SIL Open Font License are in `public/fonts/manrope/`; preserve [OFL.txt](../../public/fonts/manrope/OFL.txt) when redistributing.

`src/styles/global.css` defines the font stack, `@font-face` declarations, shared type scale, and text-role classes. The scale grows between 400px and 1280px, with a 16–19px base and ratios of 1.25–1.333 at the default browser root size. `clamp()` caps growth outside that interval.

The root font size stays unchanged so rem bounds respect browser preferences. Text roles control weight, tracking, and unitless line height; headings allow hyphenation and wrapping for long German text.
