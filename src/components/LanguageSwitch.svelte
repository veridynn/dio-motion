<script lang="ts">
	import { navigate } from "astro:transitions/client";
	import { Select } from "bits-ui";
	import { onMount } from "svelte";
	import {
		copy,
		type Locale,
		localizeHash,
		type Page,
		routes,
	} from "../lib/i18n";

	let { locale, page }: { locale: Locale; page: Page } = $props();
	const languages = [
		{ value: "de", label: "Deutsch" },
		{ value: "en", label: "English" },
	];
	let ready = $state(false);
	let open = $state(false);
	onMount(() => {
		ready = true;
	});

	async function switchLanguage(next: string) {
		if (next !== "de" && next !== "en") return;
		if (next === locale) return;
		const { scrollX: left, scrollY: top } = window;
		const restoreScroll = () =>
			window.scrollTo({ left, top, behavior: "instant" });
		document.addEventListener("astro:after-swap", restoreScroll, {
			once: true,
		});
		try {
			await navigate(
				routes[page][next] +
					location.search +
					localizeHash(location.hash, next),
			);
			document
				.getElementById("language-trigger")
				?.focus({ preventScroll: true });
		} finally {
			document.removeEventListener("astro:after-swap", restoreScroll);
		}
	}
</script>

<Select.Root
	type="single"
	bind:open
	value={locale}
	items={languages}
	disabled={!ready}
	onValueChange={switchLanguage}
>
	<Select.Trigger
		id="language-trigger"
		role="combobox"
		aria-expanded={open}
		aria-controls={open ? "language-options" : undefined}
		class={`btn btn--sm language-trigger${page === "home" ? " btn--light" : ""}`}
		aria-label={`${locale === "de" ? "Deutsch" : "English"} — ${copy[locale].language}`}
		aria-describedby="language-selection-status"
	>
		<span class="language-label" lang="de" aria-hidden={locale !== "de"}
			>Deutsch</span
		>
		<span class="language-label" lang="en" aria-hidden={locale !== "en"}
			>English</span
		>
	</Select.Trigger>
	<!-- Keep content inside the persisted navigation island across Astro page swaps. -->
	<Select.Content
		id="language-options"
		class="language-menu"
		aria-label={copy[locale].language}
		sideOffset={8}
		align="end"
		preventScroll={false}
	>
		{#each languages as language (language.value)}
			<Select.Item
				value={language.value}
				label={language.label}
				class="language-option"
			>
				{#snippet children({
					selected,
				})}
					<span lang={language.value}>{language.label}</span>
					<span aria-hidden="true">{selected ? "✓" : ""}</span>
				{/snippet}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
<span id="language-selection-status" class="language-status"
	>{copy[locale].languageSelected}</span
>
<noscript>
	<a
		href={routes[page][locale === "de" ? "en" : "de"]}
		lang={locale === "de" ? "en" : "de"}
	>
		{locale === "de" ? "English" : "Deutsch"}
	</a>
</noscript>

<style>
	:global(.language-trigger) {
		display: inline-grid;
	}
	.language-label {
		grid-area: 1 / 1;
	}
	.language-label[aria-hidden="true"] {
		visibility: hidden;
	}
	:global(.language-menu) {
		z-index: 100;
		min-width: 10rem;
		padding: 0.375rem;
		border: 1px solid var(--leinen);
		background: var(--ivory);
		color: var(--ink);
		border-radius: var(--squircle-radius);
		corner-shape: squircle;
		box-shadow: 0 8px 24px rgba(25, 23, 20, 0.12);
		font-family: var(--font);
		font-size: var(--control-font-size);
		line-height: var(--control-line-height);
	}
	:global(.language-option) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--control-gap);
		min-height: var(--control-height-sm);
		padding: 0.625rem var(--control-padding-x-sm);
		cursor: pointer;
		border-radius: calc(var(--squircle-radius) - 0.375rem);
		corner-shape: squircle;
	}
	:global(.language-option[data-highlighted]) {
		background: var(--bone);
		outline: 2px solid var(--asche);
		outline-offset: -2px;
	}
	:global(.language-option[data-selected]) {
		font-weight: 600;
	}
	.language-status {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}
	noscript a {
		color: inherit;
	}
</style>
