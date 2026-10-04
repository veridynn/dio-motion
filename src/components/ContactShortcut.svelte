<script lang="ts">
  import { onMount } from 'svelte';
  import { copy, routes, type Locale } from '../lib/i18n';

  let { locale }: { locale: Locale } = $props();
  const t = $derived(copy[locale]);
  let expanded = $state(true);
  let hovered = false;
  let focused = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function reveal() {
    clearTimeout(timer);
    expanded = true;
  }

  function retractLater() {
    clearTimeout(timer);
    if (hovered || focused) return;
    timer = setTimeout(() => { expanded = false; }, 3000);
  }

  onMount(() => {
    retractLater();
    return () => clearTimeout(timer);
  });
</script>

<div class="shortcut-track">
  <div
    class="shortcut-hit-area"
    role="presentation"
    onpointerenter={(event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = true;
      reveal();
    }}
    onpointerleave={() => { hovered = false; retractLater(); }}
  >
  <a
    class="btn contact-shortcut"
    class:is-peeking={!expanded}
    href={routes.contact[locale]}
    aria-label={t.cta}
    title={t.cta}
    data-astro-reload
    onfocus={() => { focused = true; reveal(); }}
    onblur={() => { focused = false; retractLater(); }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  </a>
  </div>
</div>

<style>
  .shortcut-track{
    grid-area:1 / 1;
    align-self:start;
    position:sticky;
    top:var(--header-height);
    height:var(--usable-height);
    z-index:60;
    overflow:clip;
    pointer-events:none;
  }
  .shortcut-hit-area{
    --inset-right:calc(1rem + env(safe-area-inset-right));
    position:absolute;
    right:0;
    bottom:calc(1rem + env(safe-area-inset-bottom));
    width:calc(3.75rem + var(--inset-right));
    height:3.75rem;
    pointer-events:auto;
  }
  .contact-shortcut{
    position:absolute;
    right:var(--inset-right);
    bottom:0;
    width:3.75rem; height:3.75rem; padding:0;
    border-radius:50% 50% 0 50%;
    corner-shape:round;
    border-color:var(--leinen);
    background:var(--ink);
    color:var(--ivory);
    box-shadow:0 2px 16px rgba(25,23,20,.14);
    pointer-events:auto;
    transition:transform .35s ease, background-color .35s ease;
  }
  .contact-shortcut.is-peeking{ transform:translateX(calc(var(--inset-right) + 1rem)); }
  .shortcut-hit-area:hover .contact-shortcut{ background:var(--graphit); color:var(--ivory); }
  .contact-shortcut:focus-visible{ transform:none; }
  @media (min-width:861px){
    .shortcut-track{ display:none; }
  }
</style>
