# CSS tokens and styling

`src/styles/global.css` owns the palette, layout tokens, and shared controls. Dark neutrals, ivory surfaces, and earth-tone accents define the visual system. Component-specific styles stay scoped; `:global` selectors reach child markup such as Bits UI controls.

Buttons and form controls share `--control-*` dimensions, type, gaps, and padding. Compact controls retain a 44px minimum height. Textareas grow with content and include padding and borders in their minimum height.

Contact fields show validation errors on blur and on submission. Visible errors clear as soon as the input becomes valid. Error slots reserve the space of their localized message with an invisible, assistive-technology-hidden copy, preventing layout shifts even when messages wrap. Invalid fields use the shared error color and an inset border without changing their dimensions.

`--squircle-radius` is paired with `corner-shape: squircle`; ordinary rounded corners provide the fallback. Svelte's CSS diagnostics warn about `corner-shape`. [Typography](typography.md) and [spacing](spacing.md) describe their respective scales; source CSS holds the exact token values.
