// Run after pnpm build: node tests/localized-pages.test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

for (const [locale, heading, lead, submit] of [
	[
		"de",
		"Mittelmäßig war nie eine Option.",
		"Schreib mir, worum es geht.",
		"Anfrage senden",
	],
	[
		"en",
		"Mediocre was never an option.",
		"Tell me what you have in mind.",
		"Send enquiry",
	],
]) {
	const home = locale === "de" ? "/" : "/en/";
	const contactId = locale === "de" ? "kontakt" : "contact";
	const html = readFileSync(`dist${home}index.html`, "utf8");
	assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
	const languageTrigger = html.match(
		/<button\b[^>]*id="language-trigger"[^>]*>/,
	)?.[0];
	assert.ok(
		languageTrigger?.includes('aria-haspopup="listbox"'),
		"Language control opens a selection list",
	);
	assert.ok(
		languageTrigger.includes('role="combobox"'),
		"Language selection exposes a combobox role",
	);
	assert.ok(
		languageTrigger.includes(
			`aria-label="${locale === "de" ? "Deutsch — Sprachauswahl" : "English — Language selection"}"`,
		),
		"Language control name includes the visible language",
	);
	assert.ok(
		languageTrigger.includes('aria-describedby="language-selection-status"'),
		"Language control describes the current selection",
	);
	assert.match(
		html,
		new RegExp(
			`id="language-selection-status"[^>]*>${locale === "de" ? "Deutsch ausgewählt" : "English selected"}</span>`,
		),
	);
	assert.ok(html.includes(heading), `${locale} has a translated heading`);
	assert.ok(
		html.includes(`rel="canonical" href="https://diomotion.com${home}"`),
	);
	for (const language of ["de", "en"]) {
		const localizedHome = language === "de" ? "/" : "/en/";
		assert.ok(
			html.includes(
				`hreflang="${language}" href="https://diomotion.com${localizedHome}"`,
			),
		);
	}
	assert.ok(
		html.includes('hreflang="x-default" href="https://diomotion.com/"'),
	);
	const fallback = locale === "de" ? "/en/" : "/";
	assert.ok(
		html
			.match(/<noscript[^>]*>.*?<\/noscript>/s)?.[0]
			.includes(`href="${fallback}"`),
		"Language switching has a no-JS fallback",
	);
	assert.ok(
		/<astro-island[^>]*component-url="[^"]*ContactForm[^"]*"[^>]*client="load"/.test(
			html,
		),
		"Contact form is a hydrated Svelte island",
	);
	const contact = html.match(
		new RegExp(
			`<section\\b[^>]*id="${contactId}"[^>]*>(.*?)<\\/section>\\s*<\\/main>`,
			"s",
		),
	)?.[1];
	assert.ok(contact, "Contact is the last homepage section");
	assert.ok(contact.includes(lead), "Contact introduction is translated");
	assert.ok(contact.includes(submit), "Form button is translated");
	assert.ok(
		contact.includes(
			locale === "de"
				? "Was möchtest du erreichen, und wie trainierst du aktuell?"
				: "What would you like to achieve, and how do you train currently?",
		),
		"Message placeholder is localized",
	);
	for (const field of ["name", "email", "message"]) {
		assert.ok(
			new RegExp(`<p[^>]*id="${field}-error"[^>]*aria-live="polite"`).test(
				contact,
			),
			"Each field keeps a live error slot before validation",
		);
	}
	if (contact.includes('data-captcha="true"')) {
		assert.ok(
			contact.includes('data-size="invisible"'),
			"Configured CAPTCHA has no checkbox",
		);
		assert.ok(contact.includes('href="https://www.hcaptcha.com/privacy"'));
		assert.ok(contact.includes('href="https://www.hcaptcha.com/terms"'));
	}
	assert.ok(
		/<form[^>]*action="https:\/\/api\.web3forms\.com\/submit"[^>]*method="post"/.test(
			contact,
		),
		"Form posts to the email service without leaking fields into URL queries",
	);
	assert.ok(
		/<input[^>]*name="email"[^>]*required/.test(contact),
		"Email is required",
	);
	assert.ok(
		/<textarea[^>]*name="message"[^>]*required/.test(contact),
		"Message is required",
	);
	assert.ok(
		!html.includes("Prepare email") && !html.includes("E-Mail vorbereiten"),
		"Email draft flow is removed",
	);
	assert.equal(
		(html.match(/<form\b/g) || []).length,
		1,
		"One contact form per homepage",
	);
	for (const name of ["name", "email", "message"]) {
		assert.ok(
			contact.includes(`name="${name}"`),
			`Contact form includes ${name}`,
		);
	}
	assert.equal(
		(html.match(new RegExp(`href="${home}#${contactId}"`, "g")) || []).length,
		4,
		"Header, mobile, hero and footer links target the form",
	);
	const footer = html.match(/<footer\b[^>]*>(.*?)<\/footer>/s)?.[1];
	for (const id of locale === "de"
		? ["potenzial", "ansatz", "leistungen", "ueber-mich", "kontakt"]
		: ["potential", "approach", "services", "about", "contact"]) {
		assert.ok(html.includes(`id="${id}"`), `${locale}: section ${id} exists`);
		assert.ok(
			footer?.includes(`href="${home}#${id}"`),
			`${locale}: footer links to ${id}`,
		);
	}
	for (const id of locale === "de"
		? ["ansatz", "leistungen", "ueber-mich"]
		: ["approach", "services", "about"]) {
		assert.ok(html.includes(`id="${id}"`), "Section ID is localized");
		assert.ok(
			html.includes(`href="${home}#${id}"`),
			"Footer targets the localized section",
		);
	}
	assert.ok(
		!/href="\/(?:kontakt\/?|de\/kontakt\/?|en\/contact\/?)"/.test(html),
		"No old internal contact links",
	);
	for (const [, href] of html
		.replace(/<noscript[^>]*>.*?<\/noscript>/gs, "")
		.matchAll(/href="(\/(?!\/)[^"#?]*)/g)) {
		const target = href.replace(/\/$/, "");
		if (/\.[a-z0-9]+$/.test(target)) continue;
		assert.ok(
			locale === "en"
				? target.startsWith("/en")
				: !target.startsWith("/en") && !target.startsWith("/de"),
			`${locale}: ${href} stays in the same language`,
		);
		assert.ok(readFileSync(`dist${target}/index.html`, "utf8").length);
	}
}
for (const [de, en, deHeading, enHeading] of [
	["/impressum/", "/en/legal-notice/", "Impressum", "Legal notice"],
	[
		"/datenschutz/",
		"/en/privacy-policy/",
		"Datenschutzerklärung",
		"Privacy policy",
	],
]) {
	for (const [locale, path, heading, alternate] of [
		["de", de, deHeading, en],
		["en", en, enHeading, de],
	]) {
		const html = readFileSync(`dist${path}index.html`, "utf8");
		const home = readFileSync(
			`dist${locale === "de" ? "/" : "/en/"}index.html`,
			"utf8",
		);
		assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
		assert.match(html, new RegExp(`<h1[^>]*>${heading}</h1>`));
		assert.ok(
			html.includes(`rel="canonical" href="https://diomotion.com${path}"`),
		);
		assert.ok(html.includes(`hreflang="de" href="https://diomotion.com${de}"`));
		assert.ok(html.includes(`hreflang="en" href="https://diomotion.com${en}"`));
		assert.ok(
			html
				.match(/<noscript[^>]*>.*?<\/noscript>/s)?.[0]
				.includes(`href="${alternate}"`),
			"Legal language fallback stays on the corresponding page",
		);
		for (const page of [html, home]) {
			assert.ok(
				page
					.match(/<footer\b[^>]*>(.*?)<\/footer>/s)?.[1]
					.includes(`href="${path}"`),
				"Footer links to the localized legal page",
			);
		}
		assert.match(
			html,
			/<nav\b[^>]*class="[^"]*\bis-scrolled\b[^"]*"/,
			"Legal navigation renders with the light surface before hydration",
		);
		assert.ok(
			!html.includes("<form"),
			"Empty legal pages contain no contact form",
		);
		assert.ok(
			!html
				.match(/<nav\b[^>]*>(.*?)<\/nav>/s)?.[1]
				.includes(`#${locale === "de" ? "kontakt" : "contact"}`),
			"Legal page headers omit the enquiry button",
		);
	}
}
assert.match(readFileSync("dist/de/index.html", "utf8"), /url=\//);
for (const [path, target] of [
	["kontakt", "/#kontakt"],
	["de/kontakt", "/#kontakt"],
	["en/contact", "/en/#contact"],
]) {
	assert.ok(
		readFileSync(`dist/${path}/index.html`, "utf8").includes(`url=${target}`),
		`${path} redirects to the contact section`,
	);
}
console.log(
	"Localized homepages, legal pages, contact forms, anchor links, metadata and redirects passed",
);
