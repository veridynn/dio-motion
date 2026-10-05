# Typography

Manrope is the primary typeface, with system sans-serif fallbacks. The type scale is defined by `--fs-sm` through `--fs-xxxl` in `src/styles/global.css`.

The scale grows fluidly from 400px to 1280px. At the default browser root size, the base grows from 16px to 19px and the modular ratio grows from 1.25 to 1.333. `clamp()` caps sizes outside that range. The root font size remains unchanged so rem-based bounds respect browser font preferences.

## Text roles

| Role | Token | Weight | Line height |
| --- | --- | --- | --- |
| Display heading | `--fs-xxxl` | 200 | 1.1 |
| Section heading | `--fs-xl` | 300 | 1.22 |
| Subheading | `--fs-md` | 500 | 1.35 |
| Lead | `--fs-md` | 400 | 1.65 |
| Body | `--fs-base` | 400 | 1.7 |
| Metadata | `--fs-sm` | 400 | Inherited |

Tracking is assigned by text role. Headings allow hyphenation and wrapping to accommodate long German text.

## Implementation

The font stack, local `@font-face` declarations, scale, and role classes live in `src/styles/global.css`. `src/layouts/SiteLayout.astro` preloads the Latin font. Manrope is self-hosted as variable WOFF2 files (weights 200–800) with Latin and extended Latin coverage and `font-display: swap`.

Font files: `public/fonts/manrope/`, Google Fonts Manrope v20. Preserve the copyright notice and SIL Open Font License 1.1 in `OFL.txt` when redistributing. Sources: [Latin WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSvfedN4.woff2), [extended Latin WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2), [license](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt).
