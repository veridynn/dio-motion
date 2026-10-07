<script module lang="ts">
	import type { CaptchaClient } from "../lib/contact";

	declare global {
		interface Window {
			hcaptcha?: CaptchaClient;
		}
	}
</script>

<script lang="ts">
	import { type } from "arktype";
	import { Button, Label } from "bits-ui";
	import { onMount, tick } from "svelte";
	import {
		accessKeySchema,
		type ContactInput,
		contactSchema,
		getCaptchaToken,
		sendContact,
	} from "../lib/contact";
	import { copy, type Locale } from "../lib/i18n";

	let { locale, accessKey = "" }: { locale: Locale; accessKey?: string } =
		$props();
	const t = $derived(copy[locale]);
	const configured = $derived(accessKeySchema.allows(accessKey));
	let ready = $state(false);
	let name = $state("");
	let email = $state("");
	let message = $state("");
	let busy = $state(false);
	let status = $state<"idle" | "success" | "error" | "captcha">("idle");
	let errors = $state<Partial<Record<keyof ContactInput, boolean>>>({});

	onMount(() => {
		ready = true;
		if (!configured) return;
		const script = document.createElement("script");
		script.src = "https://web3forms.com/client/script.js";
		script.async = true;
		script.onerror = () => {
			status = "captcha";
		};
		document.body.append(script);
		return () => script.remove();
	});

	function shake(element: HTMLElement) {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		for (const animation of element.getAnimations()) {
			if (animation.id === "contact-error") animation.cancel();
		}
		element.animate(
			[0, -5, 5, -3, 3, 0].map((x) => ({ transform: `translateX(${x}px)` })),
			{ duration: 280, easing: "ease-out", id: "contact-error" },
		);
	}

	function checkLimit(
		event: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement },
	) {
		const input = event.currentTarget;
		if (!(event instanceof InputEvent)) return;
		const action = event;
		if (action.isComposing || !action.inputType.startsWith("insert")) return;
		const selected = (input.selectionEnd ?? 0) - (input.selectionStart ?? 0);
		const inserted =
			action.data?.length ??
			action.dataTransfer?.getData("text/plain").length ??
			1;
		if (
			event.type === "input"
				? input.value.length >= input.maxLength
				: input.value.length - selected + inserted > input.maxLength
		) {
			shake(input);
		}
	}

	function validateField(
		field: keyof ContactInput,
		input: HTMLInputElement | HTMLTextAreaElement,
		clearOnly = false,
	) {
		if (clearOnly && !errors[field]) return;
		const result = contactSchema({
			name,
			email,
			message,
			[field]: input.value,
		});
		errors[field] = result instanceof type.errors && !!result.byPath[field];
		if (errors[field] && !clearOnly) shake(input);
	}

	function handleInput(
		field: keyof ContactInput,
		event: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement },
	) {
		validateField(field, event.currentTarget, true);
		checkLimit(event);
	}

	async function submit(
		event: SubmitEvent & { currentTarget: HTMLFormElement },
	) {
		event.preventDefault();
		const form = event.currentTarget;
		if (busy) return;
		status = "idle";
		errors = {};
		const fields = contactSchema({ name, email, message });
		if (fields instanceof type.errors) {
			errors = {
				name: !!fields.byPath.name,
				email: !!fields.byPath.email,
				message: !!fields.byPath.message,
			};
			await tick();
			for (const input of form.querySelectorAll<HTMLElement>(
				'[aria-invalid="true"]',
			))
				shake(input);
			form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
			return;
		}
		if (!configured) {
			window.alert(t.formPreview);
			return;
		}
		busy = true;
		let verified = false;
		try {
			const captcha = await getCaptchaToken(window.hcaptcha);
			verified = true;
			await sendContact(fields, accessKey, t.emailSubject, captcha);
			name = email = message = "";
			status = "success";
		} catch {
			status = verified ? "error" : "captcha";
		} finally {
			busy = false;
			window.hcaptcha?.reset();
		}
	}
</script>

<form
	novalidate={ready}
	action="https://api.web3forms.com/submit"
	method="post"
	aria-busy={busy}
	onsubmit={submit}
>
	<!-- biome-ignore lint/a11y/noAccessKey: accessKey is the form service token, not an HTML keyboard shortcut. -->
	<input type="hidden" name="access_key" value={accessKey}>
	<input type="hidden" name="subject" value={t.emailSubject}>
	<input type="hidden" name="from_name" value="dio motion.">
	<fieldset disabled={busy}>
		<div class="field">
			<Label.Root class="contact-label" for="name">
				<span>{t.name}</span>
				<span class="optional">{t.optional}</span>
			</Label.Root>
			<input
				id="name"
				name="name"
				type="text"
				bind:value={name}
				autocomplete="name"
				maxlength="100"
				onblur={(event) => validateField("name", event.currentTarget)}
				oninput={(event) => handleInput("name", event)}
				onbeforeinput={checkLimit}
				aria-invalid={errors.name || undefined}
			>
			<p class="field-error" id="name-error" aria-live="polite"></p>
		</div>
		<div class="field">
			<Label.Root class="contact-label" for="email">{t.email}</Label.Root>
			<input
				id="email"
				name="email"
				type="email"
				bind:value={email}
				autocomplete="email"
				maxlength="254"
				onblur={(event) => validateField("email", event.currentTarget)}
				oninput={(event) => handleInput("email", event)}
				onbeforeinput={checkLimit}
				required
				aria-invalid={errors.email || undefined}
				aria-describedby={errors.email ? "email-error" : undefined}
			>
			<p class="field-error" id="email-error" aria-live="polite">
				<span class="error-space" aria-hidden="true">{t.emailError}</span>
				<span>{errors.email ? t.emailError : ""}</span>
			</p>
		</div>
		<div class="field">
			<Label.Root class="contact-label" for="nachricht">{t.message}</Label.Root>
			<textarea
				id="nachricht"
				name="message"
				rows="4"
				bind:value={message}
				maxlength="5000"
				placeholder={t.messagePlaceholder}
				onblur={(event) => validateField("message", event.currentTarget)}
				oninput={(event) => handleInput("message", event)}
				onbeforeinput={checkLimit}
				required
				aria-invalid={errors.message || undefined}
				aria-describedby={errors.message ? "message-error" : undefined}
			></textarea>
			<p class="field-error" id="message-error" aria-live="polite">
				<span class="error-space" aria-hidden="true">{t.messageError}</span>
				<span>{errors.message ? t.messageError : ""}</span>
			</p>
		</div>
		{#if configured}
			<div
				class="h-captcha"
				data-captcha="true"
				data-lang={locale}
				data-size="invisible"
			></div>
		{/if}
		<Button.Root class="btn contact-submit" type="submit" disabled={busy}
			>{busy ? t.sending : t.sendMessage}</Button.Root
		>
	</fieldset>
</form>
{#if configured}
	<p class="form-help captcha-notice">
		{t.captchaNotice}
		<a href="https://www.hcaptcha.com/privacy">{t.privacy}</a>
		{t.captchaAnd}
		<a href="https://www.hcaptcha.com/terms">{t.captchaTerms}</a>.
	</p>
{/if}
<div class="form-status" role="status" aria-live="polite" aria-atomic="true">
	{#if status === "success"}
		<p>{t.formSuccess}</p>
	{:else if status === "error"}
		<p>{t.formError}</p>
	{:else if status === "captcha"}
		<p>{t.captchaError}</p>
	{/if}
</div>

<style>
	form {
		--control-gap: 0.25rem;
	}
	.field + .field {
		margin-top: var(--space-xs);
	}
	:global(.contact-label) {
		display: flex;
		justify-content: space-between;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: var(--fs-sm);
		color: var(--asche);
		margin-bottom: var(--control-gap);
	}
	.optional {
		font-weight: 400;
		text-transform: none;
		letter-spacing: normal;
	}
	input,
	textarea {
		--field-padding-block: 0.375em;
		--field-border-width: 1px;
		display: block;
		width: 100%;
		min-height: var(--control-height-sm);
		font-family: var(--font);
		font-size: var(--fs-base);
		font-weight: 400;
		line-height: 1.5;
		color: var(--ink);
		background: var(--bone);
		border: var(--field-border-width) solid var(--sandstein);
		border-radius: var(--squircle-radius);
		corner-shape: squircle;
		padding: var(--field-padding-block) 0.5em;
		transition:
			border-color 0.3s ease,
			background-color 0.3s ease;
	}
	input:focus,
	textarea:focus {
		border-color: var(--sandstein);
		background: var(--bone-kuehl);
	}
	:is(input, textarea)[aria-invalid="true"] {
		border-color: var(--error);
		box-shadow: inset 0 0 0 1px var(--error);
	}
	textarea::placeholder {
		color: var(--asche);
		opacity: 1;
	}
	textarea {
		field-sizing: content;
		resize: none;
		overflow-y: auto;
		min-height: calc(
			4lh +
			2 *
			var(--field-padding-block) +
			2 *
			var(--field-border-width)
		);
		max-height: calc(
			8lh +
			2 *
			var(--field-padding-block) +
			2 *
			var(--field-border-width)
		);
	}

	:global(.contact-submit) {
		display: flex;
		width: 100%;
		min-block-size: var(--control-height-sm);
		padding-block: 0.5rem;
		margin-top: var(--space-xs);
		margin-inline-start: auto;
		background: var(--ink);
		color: var(--ivory);
	}
	:global(.contact-submit:hover) {
		background: var(--graphit);
		color: var(--ivory);
	}
	@media (min-width: 861px) {
		:global(.contact-submit) {
			width: fit-content;
		}
	}
	.form-help {
		margin-top: var(--space-md);
		font-size: var(--fs-sm);
		line-height: 1.6;
		color: var(--asche);
	}
	fieldset {
		border: 0;
		padding: 0;
		margin: 0;
		min-width: 0;
	}
	.captcha-notice a {
		color: inherit;
		text-underline-offset: 0.2em;
	}
	:global(.contact-submit:disabled) {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.field-error,
	.form-status {
		margin-top: var(--control-gap);
		font-size: var(--fs-sm);
		line-height: 1.6;
		color: var(--asche);
	}
	.field-error {
		display: grid;
		min-block-size: 1lh;
		color: var(--error);
	}
	.field-error > span {
		grid-area: 1 / 1;
	}
	.error-space {
		visibility: hidden;
	}
</style>
