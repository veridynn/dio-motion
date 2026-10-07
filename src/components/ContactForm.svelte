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
	aria-describedby={configured ? "form-help" : undefined}
	aria-busy={busy}
	onsubmit={submit}
>
	<!-- biome-ignore lint/a11y/noAccessKey: accessKey is the form service token, not an HTML keyboard shortcut. -->
	<input type="hidden" name="access_key" value={accessKey}>
	<input type="hidden" name="subject" value={t.emailSubject}>
	<input type="hidden" name="from_name" value="dio motion.">
	<fieldset disabled={busy}>
		<div class="field">
			<Label.Root class="contact-label" for="name">{t.name}</Label.Root>
			<input
				id="name"
				name="name"
				type="text"
				bind:value={name}
				autocomplete="name"
				maxlength="100"
				aria-invalid={errors.name || undefined}
				aria-describedby={errors.name ? "name-error" : undefined}
			>
			{#if errors.name}
				<p class="field-error" id="name-error">
					{t.nameError}
				</p>
			{/if}
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
				required
				aria-invalid={errors.email || undefined}
				aria-describedby={errors.email ? "email-error" : undefined}
			>
			{#if errors.email}
				<p class="field-error" id="email-error">
					{t.emailError}
				</p>
			{/if}
		</div>
		<div class="field">
			<Label.Root class="contact-label" for="nachricht">{t.message}</Label.Root>
			<textarea
				id="nachricht"
				name="message"
				rows="4"
				bind:value={message}
				maxlength="5000"
				required
				aria-invalid={errors.message || undefined}
				aria-describedby={errors.message ? "message-error" : undefined}
			></textarea>
			{#if errors.message}
				<p class="field-error" id="message-error">
					{t.messageError}
				</p>
			{/if}
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
	<p id="form-help" class="form-help">{t.formHelp}</p>
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
	.field + .field {
		margin-top: var(--space-lg);
	}
	:global(.contact-label) {
		display: block;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: var(--fs-sm);
		color: var(--asche);
		margin-bottom: var(--control-gap);
	}
	input,
	textarea {
		--field-padding-block: 0.625em;
		--field-border-width: 1px;
		display: block;
		width: 100%;
		min-height: var(--control-height);
		font-family: var(--font);
		font-size: var(--fs-base);
		font-weight: 400;
		line-height: 1.6;
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
	textarea {
		field-sizing: content;
		resize: none;
		min-height: calc(
			4lh +
			2 *
			var(--field-padding-block) +
			2 *
			var(--field-border-width)
		);
	}

	:global(.contact-submit) {
		display: flex;
		width: 100%;
		margin-top: var(--space-xl);
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
</style>
