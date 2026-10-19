import assert from "node:assert/strict";
import { setTimeout } from "node:timers/promises";

export async function recordCloudflareDeployment({
	github,
	repo,
	branch,
	sha,
	wait = setTimeout,
}) {
	assert.match(sha, /^[a-f0-9]{40}$/, "Deployment requires a full commit SHA");
	const production = branch === "prod";
	const environment = production ? "Production" : `Preview (${branch})`;
	let check;
	for (let attempt = 0; attempt < 30; attempt++) {
		const { data } = await github.rest.checks.listForRef({
			...repo,
			ref: sha,
			per_page: 100,
		});
		check = data.check_runs.find(
			(run) =>
				run.app?.slug === "cloudflare-workers-and-pages" &&
				run.name === "Cloudflare Pages" &&
				run.details_url?.startsWith("https://dash.cloudflare.com/?to=/") &&
				run.details_url.includes("/pages/view/dio-motion/"),
		);
		if (check?.status === "completed") {
			const { data: suite } = await github.rest.checks.getSuite({
				...repo,
				check_suite_id: check.check_suite.id,
			});
			if (suite.head_branch === branch) break;
			check = undefined;
		}
		if (attempt < 29) await wait(15000);
	}
	assert.equal(
		check?.status,
		"completed",
		"No completed Cloudflare deployment found",
	);
	if (["skipped", "neutral", "cancelled"].includes(check.conclusion)) return;
	const url = check.output?.summary?.match(
		/https:\/\/[a-f0-9]{8}\.dio-motion\.pages\.dev\/?/,
	)?.[0];
	const success = check.conclusion === "success";
	if (success)
		assert.ok(url, "Successful Cloudflare deployment has no immutable URL");
	const { data: head } = await github.rest.repos.getBranch({ ...repo, branch });
	if (head.commit.sha !== sha) return;
	const { data: previous } = await github.rest.repos.listDeployments({
		...repo,
		sha,
		environment,
		task: "cloudflare-pages",
	});
	let deployment = previous.find(
		(item) => item.payload?.check_run_id === check.id,
	);
	if (!deployment) {
		const { data } = await github.rest.repos.createDeployment({
			...repo,
			ref: sha,
			task: "cloudflare-pages",
			environment,
			auto_merge: false,
			required_contexts: [],
			production_environment: production,
			transient_environment: false,
			description: "Cloudflare Pages build result (reporting only)",
			payload: { check_run_id: check.id, branch },
		});
		deployment = data;
	}
	await github.rest.repos.createDeploymentStatus({
		...repo,
		deployment_id: deployment.id,
		state: success ? "success" : "failure",
		environment_url: success ? url : undefined,
		log_url: check.details_url,
		description: `Cloudflare Pages: ${check.conclusion}`,
		auto_inactive: true,
	});
}
