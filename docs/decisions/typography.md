# Typography

## Implementation

The font stack, local `@font-face` declarations, scale, and role classes live in `src/styles/global.css`. `src/layouts/SiteLayout.astro` preloads the Latin font. Manrope is self-hosted as variable WOFF2 files (weights 200–800) with Latin and extended Latin coverage and `font-display: swap`; no Google Fonts requests are needed at runtime.

The files in `public/fonts/manrope/` come from Google Fonts' Manrope v20 distribution. They are licensed under the SIL Open Font License 1.1; the complete license and copyright notice are distributed alongside them in `OFL.txt`. Keep that file with the fonts when copying or redistributing them. Sources: [Latin WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSvfedN4.woff2), [extended Latin WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2), and [license](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt).
