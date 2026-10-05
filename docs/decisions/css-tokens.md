# CSS tokens and component styling

The visual system is defined through CSS custom properties in `src/styles/global.css`. Shared layout and control styles live there; component-specific styles remain scoped in Astro or Svelte components. `:global` selectors bridge scoped styles to child component markup where needed, including Bits UI controls.

| Token group | Purpose |
| --- | --- |
| `--ink`, `--smoke`, `--graphit` | Dark text and surfaces |
| `--ivory`, `--bone`, `--bone-kuehl` | Light surfaces |
| `--stone`, `--asche` | Muted palette and secondary text |
| `--leinen` | Borders |
| `--sandstein`, `--terrakotta` | Accent palette; sandstone also supplies focus outlines |
| `--font`, `--fs-*` | Shared font stack and type scale |
| `--space-*`, `--section-y`, `--gutter`, `--measure` | Spacing and layout |
| `--control-*` | Control dimensions, type, gaps, and padding |
| `--header-height`, `--usable-height` | Fixed-navigation offsets and viewport sections |

## Controls and shape

Standard controls have a 3rem minimum height; compact controls have a 2.75rem minimum height. They share font, line-height, gap, and padding tokens. Textareas grow with their content and account for padding and borders in their minimum height.

The shared radius is `--squircle-radius: 1.25rem`, paired with `corner-shape: squircle`. The browser retains ordinary rounded corners when it does not implement `corner-shape`. The mobile contact shortcut has its own corner treatment.

See [spacing](spacing.md) and [typography](typography.md). Svelte CSS diagnostics warn about `corner-shape`.
