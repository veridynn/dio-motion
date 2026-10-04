<script lang="ts">
  import { onMount } from 'svelte';
  import { copy, routes, type Locale, type Page } from '../lib/i18n';
  import LanguageSwitch from './LanguageSwitch.svelte';

  let { locale, page }: { locale: Locale; page: Page } = $props();
  const t = $derived(copy[locale]);
  let scrolled = $state(false);

  onMount(() => {
    let observer: IntersectionObserver | undefined;
    function observeHero() {
      observer?.disconnect();
      scrolled = false;
      const hero = document.querySelector('.hero');
      if (!hero) return;
      observer = new IntersectionObserver(([entry]) => {
        scrolled = !entry.isIntersecting;
      }, { rootMargin: '-90% 0px 0px 0px' });
      observer.observe(hero);
    }
    observeHero();
    document.addEventListener('astro:page-load', observeHero);
    return () => {
      observer?.disconnect();
      document.removeEventListener('astro:page-load', observeHero);
    };
  });
</script>

<nav class="nav" class:is-scrolled={scrolled} aria-label={t.navigation}>
  <a class="wordmark" href={routes.home[locale]}>dio motion.</a>
  <div class="nav__actions">
    <a class="btn btn--sm btn--light" href={routes.contact[locale]}>{t.cta}</a>
    <LanguageSwitch {locale} {page} />
  </div>
</nav>
<a class="btn btn--sm nav__cta-floating" href={routes.contact[locale]}>{t.cta}</a>
<style>
.nav{
  color:var(--ivory);
  background:var(--smoke);
  position:fixed; inset:0 0 auto 0; z-index:50;
  display:flex; align-items:center; justify-content:space-between;
  padding:1.75rem var(--gutter);
  transition:background-color .5s ease, border-color .5s ease;
  border-bottom:1px solid transparent;
}
.nav.is-scrolled{
  color:var(--ink);
  background:rgba(245,240,235,.92);
  backdrop-filter:blur(10px);
  border-bottom-color:var(--leinen);
}
.wordmark{
  font-size:var(--fs-base); font-weight:500; letter-spacing:.01em;
  color:var(--ivory); text-decoration:none;
  transition:color .5s ease;
}
.nav.is-scrolled .wordmark{ color:var(--ink); }
.nav.is-scrolled :global(.btn--light){
  color:var(--ink);
  background:color-mix(in srgb, var(--ink) 8%, transparent);
}
.nav.is-scrolled :global(.btn--light:hover){ background:var(--ink); color:var(--ivory); }


.nav__cta-floating{ display:none; }
@media (max-width:720px){
  .nav .btn{ display:none; }
  .nav__cta-floating{
    display:inline-flex;
    position:fixed; z-index:60;
    left:50%; transform:translateX(-50%);
    bottom:1.5rem;
    background:var(--ivory);
    color:var(--ink);
    box-shadow:0 2px 24px rgba(25,23,20,.14);
  }
}
@media (max-width: 720px) {
  .nav__cta-floating { max-width: calc(100% - 2rem); width: max-content; bottom: calc(1.5rem + env(safe-area-inset-bottom)); }
}

.nav__actions { display:flex; align-items:center; gap:clamp(.75rem,2vw,1.5rem); }
</style>
