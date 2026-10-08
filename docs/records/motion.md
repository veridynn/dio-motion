# Motion

Desktop homepage sections use proximity scroll snapping toward section centers. Intersection-driven reveals expose content entering the viewport; already-visible content remains visible during language changes. The mobile contact shortcut fades near contact and remains visible while focused.

Reduced-motion preferences disable smooth scrolling, transitions, and snapping. Pending reveals remain visible; focus within a reveal also exposes its content. The reduced-motion `transition: none !important` intentionally overrides scoped component transitions.

Contact fields briefly shake on validation errors and when reaching or attempting to exceed a native character limit. Repeated feedback restarts the same animation rather than stacking it; reduced-motion preferences suppress the shake. Character limits do not add error text.

Implementation: `src/styles/global.css`, `src/components/ScrollReveals.svelte`, and `src/components/ContactShortcut.svelte`.
