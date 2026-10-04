// Run after pnpm build: node tests/localized-pages.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const [locale, heading, lead, submit] of [
  ['de', 'Mittelmäßig war nie eine Option.', 'Schreib mir, worum es geht.', 'Nachricht senden'],
  ['en', 'Mediocre was never an option.', 'Tell me what you have in mind.', 'Send message'],
]) {
  const home = `/${locale}/`;
  const contactId = 'kontakt';
  const html = readFileSync(`dist${home}index.html`, 'utf8');
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
  assert.ok(html.includes(heading), `${locale} has a translated heading`);
  assert.ok(html.includes(`rel="canonical" href="https://diomotion.com${home}"`));
  for (const language of ['de', 'en']) {
    const localizedHome = `/${language}/`;
    assert.ok(html.includes(`hreflang="${language}" href="https://diomotion.com${localizedHome}"`));
  }
  assert.ok(html.includes('hreflang="x-default" href="https://diomotion.com/de/"'));
  const fallback = locale === 'de' ? '/en/' : '/de/';
  assert.ok(html.match(/<noscript[^>]*>.*?<\/noscript>/s)?.[0].includes(`href="${fallback}"`), 'Language switching has a no-JS fallback');
  assert.ok(/<astro-island[^>]*component-url="[^"]*ContactForm[^"]*"[^>]*client="load"/.test(html), 'Contact form is a hydrated Svelte island');
  const contact = html.match(new RegExp(`<section\\b[^>]*id="${contactId}"[^>]*>(.*?)<\\/section>\\s*<\\/main>`, 's'))?.[1];
  assert.ok(contact, 'Contact is the last homepage section');
  assert.ok(contact.includes(lead), 'Contact introduction is translated');
  assert.ok(contact.includes(submit), 'Form button is translated');
  if (contact.includes('data-captcha="true"')) {
    assert.ok(contact.includes('data-size="invisible"'), 'Configured CAPTCHA has no checkbox');
    assert.ok(contact.includes('href="https://www.hcaptcha.com/privacy"'));
    assert.ok(contact.includes('href="https://www.hcaptcha.com/terms"'));
  }
  assert.ok(/<form[^>]*action="https:\/\/api\.web3forms\.com\/submit"[^>]*method="post"/.test(contact), 'Form posts to the email service without leaking fields into URL queries');
  assert.ok(/<input[^>]*name="email"[^>]*required/.test(contact), 'Email is required');
  assert.ok(/<textarea[^>]*name="message"[^>]*required/.test(contact), 'Message is required');
  assert.ok(!html.includes('Prepare email') && !html.includes('E-Mail vorbereiten'), 'Email draft flow is removed');
  assert.equal((html.match(/<form\b/g) || []).length, 1, 'One contact form per homepage');
  for (const name of ['name', 'email', 'message']) {
    assert.ok(contact.includes(`name="${name}"`), `Contact form includes ${name}`);
  }
  assert.equal((html.match(new RegExp(`href="${home}#${contactId}"`, 'g')) || []).length, 5, 'Header, mobile, hero and both footer links target the form');
  assert.ok(!/href="\/(?:kontakt\/?|de\/kontakt\/?|en\/contact\/?)"/.test(html), 'No old internal contact links');
  for (const [, href] of html.replace(/<noscript[^>]*>.*?<\/noscript>/gs, '').matchAll(/href="(\/(?!\/)[^"#?]*)/g)) {
    const target = href.replace(/\/$/, '');
    if (/\.[a-z]+$/.test(target)) continue;
    assert.ok(target.startsWith(`/${locale}`), `${locale}: ${href} stays in the same language`);
    assert.ok(readFileSync(`dist${target}/index.html`, 'utf8').length);
  }
}
assert.match(readFileSync('dist/index.html', 'utf8'), /url=\/de\//);
for (const [path, target] of [['kontakt', '/de/#kontakt'], ['de/kontakt', '/de/#kontakt'], ['en/contact', '/en/#kontakt']]) {
  assert.ok(readFileSync(`dist/${path}/index.html`, 'utf8').includes(`url=${target}`), `${path} redirects to the contact section`);
}
console.log('Localized homepages, contact forms, anchor links, metadata and redirects passed');
