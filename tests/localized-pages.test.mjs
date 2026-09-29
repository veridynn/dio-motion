// Run after pnpm build: node tests/localized-pages.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const [locale, contact, homeTitle, contactTitle] of [
  ['de', 'kontakt', 'Mittelmäßig war nie eine Option.', 'Erstes Gespräch anfragen.'],
  ['en', 'contact', 'Mediocre was never an option.', 'Arrange a first conversation.'],
]) {
  for (const [path, heading] of [[`${locale}`, homeTitle], [`${locale}/${contact}`, contactTitle]]) {
    const html = readFileSync(`dist/${path}/index.html`, 'utf8');
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
    assert.ok(html.includes(heading), `${path} has a translated heading`);
    const isContact = path.includes('/');
    const canonicalPath = isContact ? `/${path}` : `/${path}/`;
    assert.ok(html.includes(`rel="canonical" href="https://diomotion.com${canonicalPath}"`));
    for (const [language, slug] of [['de', 'kontakt'], ['en', 'contact']]) {
      const alternate = `/${language}/${isContact ? slug : ''}`;
      assert.ok(html.includes(`hreflang="${language}" href="https://diomotion.com${alternate}"`));
    }
    const fallback = isContact ? (locale === 'de' ? '/en/contact' : '/de/kontakt') : (locale === 'de' ? '/en/' : '/de/');
    assert.ok(html.match(/<noscript[^>]*>.*?<\/noscript>/s)?.[0].includes(`href="${fallback}"`), 'Language switching has a no-JS fallback');
    assert.ok(!html.includes('href="/kontakt/"'), 'No legacy internal contact links');
    for (const [, href] of html.replace(/<noscript[^>]*>.*?<\/noscript>/gs, '').matchAll(/href="(\/(?!\/)[^"#?]*)/g)) {
      const target = href.replace(/\/$/, '');
      if (/\.[a-z]+$/.test(target)) continue;
      assert.ok(target.startsWith(`/${locale}`), `${path}: ${href} stays in the same language`);
      assert.ok(readFileSync(`dist${target}/index.html`, 'utf8').length);
    }
  }
}
assert.match(readFileSync('dist/index.html', 'utf8'), /url=\/de\//);
assert.match(readFileSync('dist/kontakt/index.html', 'utf8'), /url=\/de\/kontakt/);
console.log('Localized routes, headings, metadata, links and redirects passed');
