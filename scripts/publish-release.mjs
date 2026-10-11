import assert from "node:assert/strict";
import { setTimeout } from "node:timers/promises";

export function releaseNotes(changelog, version, previousVersion) {
	const sections = [...changelog.matchAll(/^## \[?(\d+\.\d+\.\d+)\b.*$/gm)];
	assert.equal(
		sections[0]?.[1],
		version,
		"Changelog must start with this version",
	);
	const previous = sections.find((section) => section[1] === previousVersion);
	assert.ok(
		!previousVersion || previous,
		"Previous production version is missing",
	);
	return changelog.slice(sections[0].index, previous?.index).trim();
}

export async function publishProductionRelease({
	github,
	repo,
	sha,
	version,
	changelog,
	fetchPage = fetch,
	wait = setTimeout,
}) {
	assert.match(sha, /^[a-f0-9]{40}$/, "Release requires a full commit SHA");
	assert.match(version, /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/);
	const tag = `v${version}`;
	const checkHead = async () => {
		const { data } = await github.rest.repos.getBranch({
			...repo,
			branch: "prod",
		});
		assert.equal(
			data.commit.sha,
			sha,
			"Production has moved; skip this old run",
		);
	};
	await checkHead();

	let tagged = false;
	try {
		const { data } = await github.rest.git.getRef({
			...repo,
			ref: `tags/${tag}`,
		});
		let object = data.object;
		if (object.type === "tag") {
			const annotated = await github.rest.git.getTag({
				...repo,
				tag_sha: object.sha,
			});
			object = annotated.data.object;
		}
		assert.equal(
			object.sha,
			sha,
			"Version already belongs to another commit; bump it",
		);
		tagged = true;
	} catch (error) {
		if (error.status !== 404) throw error;
	}
	if (tagged) {
		try {
			await github.rest.repos.getReleaseByTag({ ...repo, tag });
			console.log(`${tag} is already published for this commit`);
			return;
		} catch (error) {
			if (error.status !== 404) throw error;
		}
	}

	const releases = await github.paginate(github.rest.repos.listReleases, repo);
	const previous = releases.find(
		(release) =>
			!release.draft &&
			!release.prerelease &&
			/^v\d+\.\d+\.\d+$/.test(release.tag_name),
	);
	const body = releaseNotes(changelog, version, previous?.tag_name.slice(1));
	let deployed = false;
	let lastError;
	for (let attempt = 0; attempt < 30; attempt++) {
		try {
			for (const path of ["/", "/en/"]) {
				const response = await fetchPage(
					`https://dio-motion.pages.dev${path}?release=${sha}`,
					{
						cache: "no-store",
						redirect: "error",
						signal: AbortSignal.timeout(10000),
					},
				);
				assert.ok(response.ok, `${path} returned HTTP ${response.status}`);
				const html = await response.text();
				for (const [name, value] of [
					["version", version],
					["commit", sha],
					["environment", "production"],
				]) {
					assert.ok(
						html.includes(
							`<meta name="dio-motion-${name}" content="${value}">`,
						),
						`${path} does not serve the expected ${name}`,
					);
				}
			}
			deployed = true;
			break;
		} catch (error) {
			lastError = error;
			if (attempt < 29) await wait(15000);
		}
	}
	assert.ok(
		deployed,
		`Production verification timed out: ${lastError?.message}`,
	);
	await checkHead();
	if (!tagged) {
		await github.rest.git.createRef({ ...repo, ref: `refs/tags/${tag}`, sha });
	}
	await github.rest.repos.createRelease({
		...repo,
		tag_name: tag,
		target_commitish: sha,
		name: tag,
		body: `${body}\n\nVerified production commit: ${sha}\nSite: https://dio-motion.pages.dev`,
		prerelease: false,
		make_latest: "true",
	});
	console.log(`Published ${tag} after verifying both production homepages`);
}
