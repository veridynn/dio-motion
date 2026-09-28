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
    assert.match(html, /rel="alternate" hreflang="de"/);
    assert.match(html, /rel="alternate" hreflang="en"/);
    assert.match(html, /rel="canonical"/);
    assert.ok(!html.includes('href="/kontakt/"'), 'No legacy internal contact links');
    for (const [, href] of html.matchAll(/href="(\/(?!\/)[^"#?]*)/g)) {
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
