import assert from "node:assert/strict";
import { test } from "node:test";
import { recordCloudflareDeployment } from "../scripts/record-deployment.mjs";

const sha = "a".repeat(40);
function fixture(overrides = {}) {
	const calls = [];
	const check = {
		id: 42,
		check_suite: { id: 99 },
		app: { slug: "cloudflare-workers-and-pages" },
		name: "Cloudflare Pages",
		status: "completed",
		conclusion: "success",
		details_url:
			"https://dash.cloudflare.com/?to=/account/pages/view/dio-motion/build",
		output: {
			summary: "<a href='https://abc12345.dio-motion.pages.dev'>Preview</a>",
		},
		...overrides,
	};
	const github = {
		rest: {
			checks: {
				getSuite: async () => ({ data: { head_branch: "dev" } }),
				listForRef: async () => ({ data: { check_runs: [check] } }),
			},
			repos: {
				getBranch: async () => ({ data: { commit: { sha } } }),
				listDeployments: async () => ({ data: [] }),
				createDeployment: async (args) => {
					calls.push(args);
					return { data: { id: 1 } };
				},
				createDeploymentStatus: async (args) => {
					calls.push(args);
				},
			},
		},
	};
	return { github, calls, check };
}
const repo = { owner: "veridynn", repo: "dio-motion" };
test("records actual preview and production results with immutable links", async () => {
	for (const branch of ["dev", "prod"]) {
		const { github, calls } = fixture();
		github.rest.checks.getSuite = async () => ({
			data: { head_branch: branch },
		});
		await recordCloudflareDeployment({ github, repo, branch, sha });
		assert.equal(
			calls[0].environment,
			branch === "prod" ? "Production" : "Preview (dev)",
		);
		assert.equal(calls[0].production_environment, branch === "prod");
		assert.equal(calls[0].auto_merge, false);
		assert.deepEqual(calls[0].required_contexts, []);
		assert.equal(
			calls[1].environment_url,
			"https://abc12345.dio-motion.pages.dev",
		);
		assert.equal(calls[1].state, "success");
	}
});
test("records failures without claiming a deployed URL", async () => {
	const { github, calls } = fixture({ conclusion: "failure", output: {} });
	await recordCloudflareDeployment({ github, repo, branch: "dev", sha });
	assert.equal(calls[1].state, "failure");
	assert.equal(calls[1].environment_url, undefined);
});
test("retries pending builds and reuses a record on rerun", async () => {
	const { github, calls, check } = fixture({ status: "in_progress" });
	github.rest.repos.listDeployments = async () => ({
		data: [{ id: 7, payload: { check_run_id: 42 } }],
	});
	let waits = 0;
	await recordCloudflareDeployment({
		github,
		repo,
		branch: "dev",
		sha,
		wait: async () => {
			waits++;
			check.status = "completed";
		},
	});
	assert.equal(waits, 1);
	assert.equal(calls.length, 1);
	assert.equal(calls[0].deployment_id, 7);
});
test("never invents successful deployments for missing, untrusted, or stale builds", async () => {
	for (const overrides of [
		{ app: { slug: "other" } },
		{ output: {} },
		{ details_url: "https://other.example/pages/view/dio-motion/build" },
	]) {
		const { github, calls } = fixture(overrides);
		await assert.rejects(
			recordCloudflareDeployment({
				github,
				repo,
				branch: "dev",
				sha,
				wait: async () => {},
			}),
		);
		assert.equal(calls.length, 0);
	}
	const { github, calls } = fixture();
	github.rest.repos.getBranch = async () => ({
		data: { commit: { sha: "b".repeat(40) } },
	});
	await recordCloudflareDeployment({ github, repo, branch: "dev", sha });
	assert.equal(calls.length, 0);
});

test("does not label a preview check as production for the same commit", async () => {
	const { github, calls } = fixture();
	await assert.rejects(
		recordCloudflareDeployment({
			github,
			repo,
			branch: "prod",
			sha,
			wait: async () => {},
		}),
	);
	assert.equal(calls.length, 0);
});
