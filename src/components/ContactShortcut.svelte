<script lang="ts">
	import { onMount } from "svelte";
	import { copy, type Locale, routes } from "../lib/i18n";

	let { locale }: { locale: Locale } = $props();
	const t = $derived(copy[locale]);
	let opacity = $state(1);
	let focused = $state(false);
	const visibleOpacity = $derived(focused ? 1 : opacity);
	let contact: HTMLElement | null = null;
	let frame = 0;

	function updateOpacity() {
		frame = 0;
		// Fade over the last 240px before contact enters the viewport.
		opacity = contact
			? Math.max(
					0,
					Math.min(
						1,
						(contact.getBoundingClientRect().top - window.innerHeight) / 240,
					),
				)
			: 1;
	}

	function queueUpdate() {
		if (!frame) frame = requestAnimationFrame(updateOpacity);
	}

	onMount(() => {
		contact = document.querySelector<HTMLElement>(".contact");
		updateOpacity();
		const observer = new ResizeObserver(queueUpdate);
		observer.observe(document.body);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	});
</script>

<svelte:window onscroll={queueUpdate} onresize={queueUpdate} />

<!-- biome-ignore lint/a11y/useAnchorContent: The icon link has a translated aria-label; its SVG is decorative. -->
<a
	class="btn contact-shortcut"
	class:is-hidden={visibleOpacity === 0}
	style:--shortcut-opacity={visibleOpacity}
	href={routes.contact[locale]}
	aria-label={t.cta}
	title={t.cta}
	aria-hidden={visibleOpacity === 0 ? true : undefined}
	tabindex={visibleOpacity === 0 ? -1 : 0}
	data-astro-reload
	onfocus={() => {
		focused = true;
	}}
	onblur={() => {
		focused = false;
	}}
>
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.75"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="4" />
		<path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
	</svg>
</a>

<style>
	.contact-shortcut {
		position: fixed;
		z-index: 60;
		right: calc(1rem + env(safe-area-inset-right));
		bottom: calc(1rem + env(safe-area-inset-bottom));
		width: 3.75rem;
		height: 3.75rem;
		padding: 0;
		border-radius: 50% 50% 0 50%;
		corner-shape: round;
		border-color: var(--leinen);
		background: var(--ink);
		color: var(--ivory);
		box-shadow: 0 2px 16px rgba(25, 23, 20, 0.14);
		opacity: var(--shortcut-opacity, 1);
		transition: background-color 0.2s ease;
	}
	.contact-shortcut.is-hidden {
		pointer-events: none;
	}
	@media (min-width: 861px) {
		.contact-shortcut {
			display: none;
		}
	}
</style>
