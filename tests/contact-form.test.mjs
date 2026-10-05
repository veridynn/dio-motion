import assert from "node:assert/strict";
import { type } from "arktype";
import {
	contactSchema,
	getCaptchaToken,
	sendContact,
} from "../src/lib/contact.ts";

const key = "12345678-1234-4234-8234-123456789abc";
const draft = {
	name: " Zoë & Max ",
	email: " zoe+training@example.com ",
	message: " Kraft? Ja!\n&subject=Andere Nachricht ",
};
const valid = contactSchema.assert(draft);
assert.deepEqual(valid, {
	name: "Zoë & Max",
	email: "zoe+training@example.com",
	message: "Kraft? Ja!\n&subject=Andere Nachricht",
});
assert.ok(contactSchema.allows({ ...valid, name: "" }));
for (const bad of [
	{ ...valid, email: "" },
	{ ...valid, email: "not-an-email" },
	{ ...valid, message: " \n " },
	{ ...valid, message: "x".repeat(5001) },
	{ ...valid, name: "x".repeat(101) },
	{ ...valid, webhook: "https://example.com" },
	{ ...valid, message: 123 },
])
	assert.ok(contactSchema(bad) instanceof type.errors);
assert.ok(contactSchema.allows({ ...valid, message: "x".repeat(5000) }));

let calls = 0;
const mock = async (url, options) => {
	calls++;
	assert.equal(url, "https://api.web3forms.com/submit");
	assert.equal(options?.method, "POST");
	assert.ok(options?.signal instanceof AbortSignal);
	assert.deepEqual(JSON.parse(String(options?.body)), {
		...valid,
		access_key: key,
		subject: "First conversation",
		from_name: "dio motion.",
		"h-captcha-response": "captcha-token",
	});
	return Response.json({ success: true });
};
await sendContact(valid, key, "First conversation", "captcha-token", mock);
assert.equal(calls, 1);
await assert.rejects(
	sendContact(
		{ ...valid, message: " " },
		key,
		"First conversation",
		"captcha-token",
		mock,
	),
);
await assert.rejects(
	sendContact(valid, "", "First conversation", "captcha-token", mock),
);
await assert.rejects(sendContact(valid, key, "First conversation", "", mock));
assert.equal(calls, 1, "Invalid inputs cannot reach the service");
for (const response of [
	Response.json({ success: false }),
	Response.json({ success: true }, { status: 429 }),
	Response.json({ success: "true" }),
	Response.json(null),
	new Response("not JSON"),
])
	await assert.rejects(
		sendContact(
			valid,
			key,
			"First conversation",
			"captcha-token",
			async () => response,
		),
	);
await assert.rejects(
	sendContact(valid, key, "First conversation", "captcha-token", async () => {
		throw new Error("Network error");
	}),
);
assert.deepEqual(
	draft.message,
	" Kraft? Ja!\n&subject=Andere Nachricht ",
	"Submission does not mutate the draft",
);
console.log(
	"Required fields, length limits, typed responses and delivery failures passed",
);

let captchaCalls = 0;
const captchaClient = {
	execute: async (widgetId, options) => {
		captchaCalls++;
		assert.equal(widgetId, undefined);
		assert.deepEqual(options, { async: true });
		return { response: `token-${captchaCalls}` };
	},
	reset() {},
};
assert.equal(await getCaptchaToken(captchaClient), "token-1");
assert.equal(
	await getCaptchaToken(captchaClient),
	"token-2",
	"Each submission gets a fresh token",
);
await assert.rejects(getCaptchaToken(undefined));
for (const response of [{ response: "" }, { response: 123 }, {}, null]) {
	await assert.rejects(
		getCaptchaToken({ ...captchaClient, execute: async () => response }),
	);
}
await assert.rejects(
	getCaptchaToken({
		...captchaClient,
		execute: async () => {
			throw new Error("challenge-closed");
		},
	}),
);
console.log(
	"Invisible captcha execution, fresh tokens and failure handling passed",
);
