<script lang="ts">
  import { copy, type Locale } from '../lib/i18n';
  import { createContactEmail } from '../lib/contact-email.mjs';

  let { locale }: { locale: Locale } = $props();
  const t = $derived(copy[locale]);
  let name = $state('');
  let email = $state('');
  let message = $state('');

  function submit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault();
    window.location.href = createContactEmail(new FormData(event.currentTarget), t.emailSubject, t.email);
  }
</script>

<form action="mailto:silvo@diomotion.com" method="post" enctype="text/plain" aria-describedby="form-help" onsubmit={submit}>
      <div class="field">
        <label for="name">{t.name}</label>
        <input id="name" name="name" type="text" bind:value={name} autocomplete="name" required>
      </div>
      <div class="field">
        <label for="email">{t.email}</label>
        <input id="email" name="email" type="email" bind:value={email} autocomplete="email" required>
      </div>
      <div class="field">
        <label for="nachricht">{t.message}</label>
        <textarea id="nachricht" name="nachricht" rows="6" bind:value={message} required></textarea>
      </div>
      <button class="btn" type="submit">{t.prepareEmail}</button>
    </form>
<p id="form-help" class="form-help">{t.formHelp}</p>
<style>
form{ margin-top:clamp(3rem,7vh,4.5rem); }
.field + .field{ margin-top:2rem; }
label{
  display:block;
  font-weight:600; text-transform:uppercase; letter-spacing:.2em;
  font-size:.6875rem; color:var(--asche);
  margin-bottom:.75rem;
}
input, textarea{
  width:100%;
  font-family:var(--font); font-size:1rem; font-weight:400; line-height:1.6;
  color:var(--ink); background:transparent;
  border:0; border-bottom:1px solid var(--leinen);
  padding:.625rem 0;
  transition:border-color .3s ease;
}
input:focus, textarea:focus{
  border-bottom-color:var(--sandstein);
}
textarea{ resize:vertical; min-height:8rem; }


.btn { margin-top: 3rem; }
.form-help { margin-top: 1rem; font-size: .8125rem; line-height: 1.6; color: var(--asche); }
</style>
