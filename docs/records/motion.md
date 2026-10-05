# Motion

Desktop homepage sections use proximity scroll snapping. Intersection-driven reveals expose content entering the viewport; already-visible content remains visible during language changes. The mobile contact shortcut fades near contact and remains visible while focused.

Reduced-motion preferences disable smooth scrolling, transitions, and snapping. Pending reveals remain visible; focus within a reveal also exposes its content. The reduced-motion `transition: none !important` intentionally overrides scoped component transitions.

Implementation: `src/styles/global.css`, `src/components/ScrollReveals.svelte`, and `src/components/ContactShortcut.svelte`.
