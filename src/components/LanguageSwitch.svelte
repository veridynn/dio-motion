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
  <DropdownMenu.Trigger id="language-trigger" class="language-trigger" aria-label={copy[locale].language} disabled={!ready}>
    <span lang={locale}>{locale === 'de' ? 'Deutsch' : 'English'}</span>
    <span aria-hidden="true">⌄</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="language-menu" sideOffset={8} align="end">
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
    display: inline-flex; align-items: center; justify-content: space-between; gap: .625rem;
    min-height: 44px; padding: .5rem .75rem;
    border: 1px solid currentColor; background: transparent; color: inherit;
    font: inherit; font-size: .8125rem; cursor: pointer;
  }
  :global(.language-trigger:hover) { background: rgba(122,112,104,.12); }
  :global(.language-menu) {
    z-index: 100; min-width: 10rem; padding: .375rem;
    border: 1px solid var(--leinen); background: var(--ivory); color: var(--ink);
    box-shadow: 0 8px 24px rgba(25,23,20,.12);
    font-family: var(--font); font-size: .875rem;
  }
  :global(.language-option) {
    display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
    min-height: 44px; padding: .625rem .875rem; cursor: pointer;
  }
  :global(.language-option[data-highlighted]) { background: var(--bone); outline: 2px solid var(--asche); outline-offset: -2px; }
  :global(.language-option[data-state='checked']) { font-weight: 600; }
  noscript a { color: inherit; }
</style>
