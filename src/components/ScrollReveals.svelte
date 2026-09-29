<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('is-pending');
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -100px 0px' });
    document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => {
      // Already visible content stays visible when switching languages mid-page.
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      const siblings = Array.from(element.parentElement?.children ?? []).filter((sibling) => sibling.classList.contains('reveal'));
      element.style.transitionDelay = `${siblings.indexOf(element) * 120}ms`;
      element.classList.add('is-pending');
      observer.observe(element);
    });
    return () => observer.disconnect();
  });
</script>
