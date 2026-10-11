import { getSecret } from "astro:env/server";
import { version } from "../../package.json";

export { version };
export const commit =
	getSecret("CF_PAGES_COMMIT_SHA") ?? getSecret("GITHUB_SHA") ?? "";
export const preview = getSecret("CF_PAGES_BRANCH") !== "prod";
