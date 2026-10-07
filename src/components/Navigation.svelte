<script lang="ts">
	import { onMount } from "svelte";
	import { copy, type Locale, type Page, routes } from "../lib/i18n";
	import LanguageSwitch from "./LanguageSwitch.svelte";

	let { locale, page }: { locale: Locale; page: Page } = $props();
	const t = $derived(copy[locale]);
	let scrolled = $state(false);

	onMount(() => {
		let observer: IntersectionObserver | undefined;
		function observeSections() {
			observer?.disconnect();
			const headerHeight = document.querySelector(".nav")?.clientHeight ?? 80;
			const rootMargin = `-${headerHeight}px 0px 0px 0px`;
			const hero = document.querySelector(".hero");
			scrolled = !hero;
			if (hero) {
				observer = new IntersectionObserver(
					([entry]) => {
						scrolled = !entry.isIntersecting;
					},
					{ rootMargin },
				);
				observer.observe(hero);
			}
		}
		observeSections();
		document.addEventListener("astro:page-load", observeSections);
		return () => {
			observer?.disconnect();
			document.removeEventListener("astro:page-load", observeSections);
		};
	});
</script>

<nav
	class="nav"
	class:is-scrolled={page !== "home" || scrolled}
	aria-label={t.navigation}
>
	<a class="wordmark" href={routes.home[locale]}>dio motion.</a>
	<div class="nav__actions">
		{#if page === "home"}
			<a class="btn btn--sm btn--light" href={routes.contact[locale]}
				>{t.cta}</a
			>
		{/if}
		<LanguageSwitch {locale} {page} />
	</div>
</nav>
<style>
	.nav {
		color: var(--ivory);
		background: var(--smoke);
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.875rem var(--gutter);
		transition:
			background-color 0.5s ease,
			border-color 0.5s ease;
		border-bottom: 1px solid transparent;
	}
	.nav.is-scrolled {
		color: var(--ink);
		background: rgba(245, 240, 235, 0.92);
		backdrop-filter: blur(10px);
		border-bottom-color: var(--leinen);
	}
	.wordmark {
		display: inline-flex;
		align-items: center;
		min-height: var(--control-height-sm);
		font-size: var(--fs-base);
		font-weight: 500;
		letter-spacing: 0.01em;
		color: var(--ivory);
		text-decoration: none;
		transition: color 0.5s ease;
	}
	.nav.is-scrolled .wordmark {
		color: var(--ink);
	}
	.nav.is-scrolled :global(.btn--light) {
		color: var(--ink);
		background: color-mix(in srgb, var(--ink) 8%, transparent);
	}
	.nav.is-scrolled :global(.btn--light:hover) {
		background: var(--ink);
		color: var(--ivory);
	}

	.nav .btn {
		display: none;
	}
	@media (min-width: 861px) {
		.nav {
			padding: 1.75rem var(--gutter);
		}
		.nav .btn {
			display: inline-flex;
		}
	}

	.nav__actions {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}
</style>
