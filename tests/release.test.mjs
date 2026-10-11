import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
	publishProductionRelease,
	releaseNotes,
} from "../scripts/publish-release.mjs";

const sha = "a".repeat(40);
const otherSha = "b".repeat(40);
const changelog =
	"# Changelog\n\n## [0.3.0](link) (2026-10-11)\nNew feature\n\n## 0.2.0\nFix\n\n## 0.1.0\nBaseline\n";
const notFound = () => {
	throw Object.assign(new Error("Not found"), { status: 404 });
};

function setup() {
	const calls = [];
	const github = {
		rest: {
			repos: {
				getBranch: async () => ({ data: { commit: { sha } } }),
				getReleaseByTag: notFound,
				listReleases: () => {},
				createRelease: async (release) => calls.push(release),
			},
			git: {
				getRef: notFound,
				createRef: async (ref) => calls.push(ref),
			},
		},
		paginate: async () => [
			{ tag_name: "dev-v0.3.0", prerelease: true },
			{ tag_name: "v0.1.0", prerelease: false },
		],
	};
	const pages = [];
	return {
		calls,
		pages,
		options: {
			github,
			repo: { owner: "veridynn", repo: "dio-motion" },
			sha,
			version: "0.3.0",
			changelog,
			wait: async () => {},
			fetchPage: async (url) => {
				pages.push(url);
				return new Response(
					`<meta name="dio-motion-version" content="0.3.0"><meta name="dio-motion-commit" content="${sha}"><meta name="dio-motion-environment" content="production">`,
				);
			},
		},
	};
}

test("baseline package, manifest and changelog agree", () => {
	const { version } = JSON.parse(readFileSync("package.json", "utf8"));
	const manifest = JSON.parse(
		readFileSync(".release-please-manifest.json", "utf8"),
	);
	assert.equal(manifest["."], version);
	assert.ok(releaseNotes(readFileSync("CHANGELOG.md", "utf8"), version));
});

test("production notes include development milestones since the previous production release", () => {
	const notes = releaseNotes(changelog, "0.3.0", "0.1.0");
	assert.match(notes, /New feature/);
	assert.match(notes, /Fix/);
	assert.doesNotMatch(notes, /Baseline/);
	assert.throws(() => releaseNotes(changelog, "0.4.0"));
	assert.throws(() => releaseNotes(changelog, "0.3.0", "0.0.1"));
});

test("only the verified production commit is tagged and released", async () => {
	const { calls, pages, options } = setup();
	await publishProductionRelease(options);
	assert.equal(pages.length, 2);
	assert.ok(pages[1].startsWith("https://dio-motion.pages.dev/en/"));
	assert.equal(calls[0].sha, sha);
	assert.equal(calls[0].ref, "refs/tags/v0.3.0");
	assert.equal(calls[1].target_commitish, sha);
	assert.equal(calls[1].prerelease, false);
	assert.doesNotMatch(calls[1].body, /Baseline/);
});

test("stale runs and an already-used version cannot publish", async () => {
	for (const cause of ["stale", "tag"]) {
		const { calls, options } = setup();
		if (cause === "stale") {
			options.github.rest.repos.getBranch = async () => ({
				data: { commit: { sha: otherSha } },
			});
		} else {
			options.github.rest.git.getRef = async () => ({
				data: { object: { type: "commit", sha: otherSha } },
			});
		}
		await assert.rejects(publishProductionRelease(options));
		assert.equal(calls.length, 0);
	}
});

test("production moving during verification prevents publication", async () => {
	const { calls, options } = setup();
	let reads = 0;
	options.github.rest.repos.getBranch = async () => ({
		data: { commit: { sha: reads++ ? otherSha : sha } },
	});
	await assert.rejects(
		publishProductionRelease(options),
		/Production has moved/,
	);
	assert.equal(calls.length, 0);
});

test("preview, wrong-version, stale-English and failed responses never produce a release", async () => {
	for (const html of [
		`<meta name="dio-motion-version" content="0.3.0"><meta name="dio-motion-commit" content="${sha}"><meta name="dio-motion-environment" content="preview">`,
		`<meta name="dio-motion-version" content="0.2.0"><meta name="dio-motion-commit" content="${sha}"><meta name="dio-motion-environment" content="production">`,
		`<meta name="dio-motion-version" content="0.3.0"><meta name="dio-motion-commit" content="${otherSha}"><meta name="dio-motion-environment" content="production">`,
	]) {
		const { calls, options } = setup();
		const correctPage = options.fetchPage;
		options.fetchPage = async (url) =>
			url.includes("/en/") ? new Response(html) : correctPage(url);
		await assert.rejects(publishProductionRelease(options), /timed out/);
		assert.equal(calls.length, 0);
	}
	const { calls, options } = setup();
	options.fetchPage = async () => new Response("Unavailable", { status: 503 });
	await assert.rejects(publishProductionRelease(options), /HTTP 503/);
	assert.equal(calls.length, 0);
});

test("a deployment that becomes available is retried", async () => {
	const { calls, options } = setup();
	const correctPage = options.fetchPage;
	let attempts = 0;
	options.fetchPage = async (url) =>
		attempts++ ? correctPage(url) : new Response("Old deployment");
	await publishProductionRelease(options);
	assert.equal(attempts, 3);
	assert.equal(calls.length, 2);
});

test("reruns preserve an existing tag and recover a missing release", async () => {
	for (const published of [false, true]) {
		const { calls, options } = setup();
		options.github.rest.git.getRef = async () => ({
			data: { object: { type: "commit", sha } },
		});
		if (published)
			options.github.rest.repos.getReleaseByTag = async () => ({ data: {} });
		await publishProductionRelease(options);
		assert.equal(calls.length, published ? 0 : 1);
		if (!published) assert.equal(calls[0].tag_name, "v0.3.0");
	}
});
