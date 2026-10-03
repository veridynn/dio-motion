<script lang="ts">
  import { onMount } from 'svelte';
  import { DropdownMenu } from 'bits-ui';
  import { navigate } from 'astro:transitions/client';
  import { copy, routes, type Locale, type Page } from '../lib/i18n';

  let { locale, page }: { locale: Locale; page: Page } = $props();
  let ready = $state(false);
  onMount(() => { ready = true; });

  async function switchLanguage(next: Locale) {
    if (next === locale) return;
    const { scrollX: left, scrollY: top } = window;
    const restoreScroll = () => window.scrollTo({ left, top, behavior: 'instant' });
    document.addEventListener('astro:after-swap', restoreScroll, { once: true });
    try {
      await navigate(routes[page][next] + location.search + location.hash);
      document.getElementById('language-trigger')?.focus({ preventScroll: true });
    } finally {
      document.removeEventListener('astro:after-swap', restoreScroll);
    }
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger id="language-trigger" class={`btn btn--sm language-trigger${page === 'home' ? ' btn--light' : ''}`} aria-label={copy[locale].language} disabled={!ready}>
    <span class="language-label" lang="de" aria-hidden={locale !== 'de'}>Deutsch</span>
    <span class="language-label" lang="en" aria-hidden={locale !== 'en'}>English</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="language-menu" sideOffset={8} align="end" preventScroll={false}>
    <DropdownMenu.RadioGroup value={locale} aria-label={copy[locale].language}>
      {#each ['de', 'en'] as language}
        {@const next = language as Locale}
        <DropdownMenu.RadioItem value={next} class="language-option" textValue={next === 'de' ? 'Deutsch' : 'English'} onSelect={() => switchLanguage(next)}>
          <span lang={next}>{next === 'de' ? 'Deutsch' : 'English'}</span>
          <span aria-hidden="true">{locale === next ? '✓' : ''}</span>
        </DropdownMenu.RadioItem>
      {/each}
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>
<noscript>
  <a href={routes[page][locale === 'de' ? 'en' : 'de']} lang={locale === 'de' ? 'en' : 'de'}>
    {locale === 'de' ? 'English' : 'Deutsch'}
  </a>
</noscript>

<style>
  :global(.language-trigger) {
    display: inline-grid;
  }
  .language-label { grid-area: 1 / 1; }
  .language-label[aria-hidden='true'] { visibility: hidden; }
  :global(.language-menu) {
    z-index: 100; min-width: 10rem; padding: .375rem;
    border: 1px solid var(--leinen); background: var(--ivory); color: var(--ink);
    border-radius: var(--squircle-radius); corner-shape: squircle;
    box-shadow: 0 8px 24px rgba(25,23,20,.12);
    font-family: var(--font); font-size: var(--control-font-size); line-height: var(--control-line-height);
  }
  :global(.language-option) {
    display: flex; align-items: center; justify-content: space-between; gap: var(--control-gap);
    min-height: var(--control-height-sm); padding: .625rem var(--control-padding-x-sm); cursor: pointer;
    border-radius: calc(var(--squircle-radius) - .375rem); corner-shape: squircle;
  }
  :global(.language-option[data-highlighted]) { background: var(--bone); outline: 2px solid var(--asche); outline-offset: -2px; }
  :global(.language-option[data-state='checked']) { font-weight: 600; }
  noscript a { color: inherit; }
</style>
