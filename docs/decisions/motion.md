# Motion and reduced-motion behavior

Desktop homepage sections use proximity scroll snapping. Reveal animations are activated as content enters the viewport; already-visible content remains visible during language changes. The mobile contact shortcut fades as the contact section approaches and becomes fully visible while focused.

Reduced-motion preferences disable smooth scrolling and transitions. Scroll snapping is enabled only when reduced motion is not requested. Pending reveal content is made visible, and focus within a pending reveal also exposes its content.

The reduced-motion `transition: none !important` intentionally overrides scoped component transitions. A local Biome suppression allows it.

## Implementation

- `src/styles/global.css`: snapping, reveal states, focus visibility, and reduced-motion overrides.
- `src/components/ScrollReveals.svelte`: intersection observation and reveal activation.
- `src/components/ContactShortcut.svelte`: shortcut fade and focus behavior.
