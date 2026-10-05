# Spacing and layout scale

Spacing uses shared fluid `--space-*` tokens across the same 400–1280px interval as typography. Component margins, padding, and gaps use the scale. Section padding and page gutters have dedicated tokens, exposed through the layout aliases `--section-y` and `--gutter`.

| Token | Minimum | Maximum |
| --- | --- | --- |
| `--space-xs` | 0.5rem | 0.75rem |
| `--space-sm` | 0.75rem | 1rem |
| `--space-md` | 1rem | 1.5rem |
| `--space-lg` | 1.5rem | 2rem |
| `--space-xl` | 2rem | 3.5rem |
| `--space-2xl` | 2.5rem | 5rem |
| `--space-3xl` | 3.5rem | 7rem |
| `--space-section` | 3.5rem | 9rem |
| `--space-gutter` | 1.25rem | 6rem |

`.wrap` limits content width with `--measure: 62rem`.

Spacing stops growing outside the fluid interval. Grid and visibility breakpoints remain independent of the spacing scale; the shared navigation/layout breakpoint is 861px. The fixed header's height is included in page offsets, anchor scroll margins, and `--usable-height` so content is not obscured by navigation.

## Implementation

Tokens, layout aliases, header offsets, and shared `.section`/`.wrap` classes live in `src/styles/global.css`.
