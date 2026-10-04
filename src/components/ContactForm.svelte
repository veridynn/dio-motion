<script module lang="ts">
  import type { CaptchaClient } from '../lib/contact';
  declare global {
    interface Window {
      hcaptcha?: CaptchaClient;
    }
  }
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { Button, Label } from 'bits-ui';
  import { type } from 'arktype';
  import { copy, type Locale } from '../lib/i18n';
  import { accessKeySchema, contactSchema, getCaptchaToken, sendContact, type ContactInput } from '../lib/contact';

  let { locale, accessKey = '' }: { locale: Locale; accessKey?: string } = $props();
  const t = $derived(copy[locale]);
  const configured = $derived(accessKeySchema.allows(accessKey));
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let busy = $state(false);
  let status = $state<'idle' | 'success' | 'error' | 'captcha'>('idle');
  let errors = $state<Partial<Record<keyof ContactInput, boolean>>>({});

  onMount(() => {
    if (!configured) return;
    const script = document.createElement('script');
    script.src = 'https://web3forms.com/client/script.js';
    script.async = true;
    script.onerror = () => { status = 'captcha'; };
    document.body.append(script);
    return () => script.remove();
  });

  async function submit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault();
    const form = event.currentTarget;
    if (busy) return;
    status = 'idle';
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
      name = email = message = '';
      status = 'success';
    } catch {
      status = verified ? 'error' : 'captcha';
    } finally {
      busy = false;
      window.hcaptcha?.reset();
    }
  }
</script>

<form action="https://api.web3forms.com/submit" method="post" aria-describedby={configured ? 'form-help' : undefined} aria-busy={busy} onsubmit={submit}>
  <input type="hidden" name="access_key" value={accessKey}>
  <input type="hidden" name="subject" value={t.emailSubject}>
  <input type="hidden" name="from_name" value="dio motion.">
  <fieldset disabled={busy}>
    <div class="field">
      <Label.Root class="contact-label" for="name">{t.name}</Label.Root>
      <input id="name" name="name" type="text" bind:value={name} autocomplete="name" maxlength="100" aria-invalid={errors.name || undefined} aria-describedby={errors.name ? 'name-error' : undefined}>
      {#if errors.name}<p class="field-error" id="name-error">{t.nameError}</p>{/if}
    </div>
    <div class="field">
      <Label.Root class="contact-label" for="email">{t.email}</Label.Root>
      <input id="email" name="email" type="email" bind:value={email} autocomplete="email" maxlength="254" required aria-invalid={errors.email || undefined} aria-describedby={errors.email ? 'email-error' : undefined}>
      {#if errors.email}<p class="field-error" id="email-error">{t.emailError}</p>{/if}
    </div>
    <div class="field">
      <Label.Root class="contact-label" for="nachricht">{t.message}</Label.Root>
      <textarea id="nachricht" name="message" rows="4" bind:value={message} maxlength="5000" required aria-invalid={errors.message || undefined} aria-describedby={errors.message ? 'message-error' : undefined}></textarea>
      {#if errors.message}<p class="field-error" id="message-error">{t.messageError}</p>{/if}
    </div>
    {#if configured}<div class="h-captcha" data-captcha="true" data-lang={locale} data-size="invisible"></div>{/if}
    <Button.Root class="btn contact-submit" type="submit" disabled={busy}>{busy ? t.sending : t.sendMessage}</Button.Root>
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
  {#if status === 'success'}<p>{t.formSuccess}</p>
  {:else if status === 'error'}<p>{t.formError}</p>
  {:else if status === 'captcha'}<p>{t.captchaError}</p>{/if}
</div>
<style>
.field + .field{ margin-top:1.5rem; }
:global(.contact-label){
  display:block;
  font-weight:600; text-transform:uppercase; letter-spacing:.2em;
  font-size:.6875rem; color:var(--asche);
  margin-bottom:.75rem;
}
input, textarea{
  width:100%;
  font-family:var(--font); font-size:1rem; font-weight:400; line-height:1.6;
  color:var(--ink); background:var(--bone);
  border:1px solid transparent;
  border-radius:var(--squircle-radius);
  corner-shape:squircle;
  padding:.875rem 1.25rem;
  transition:border-color .3s ease, background-color .3s ease;
}
input:focus, textarea:focus{
  border-color:var(--sandstein);
  background:var(--bone-kuehl);
}
textarea{ field-sizing:content; resize:none; min-height:9rem; }


:global(.contact-submit) {
  display:flex;
  width:fit-content;
  margin-top:2rem;
  margin-inline-start:auto;
  background:var(--ink);
  color:var(--ivory);
}
:global(.contact-submit:hover) { background:var(--graphit); color:var(--ivory); }
.form-help { margin-top: 1rem; font-size: .8125rem; line-height: 1.6; color: var(--asche); }
fieldset{ border:0; padding:0; margin:0; min-width:0; }
.captcha-notice a{ color:inherit; text-underline-offset:.2em; }
:global(.contact-submit:disabled){ opacity:.6; cursor:not-allowed; }
.field-error, .form-status{ margin-top:.75rem; font-size:.875rem; line-height:1.6; color:var(--asche); }
</style>
