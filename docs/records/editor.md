# Editor integration

`.zed/settings.json` selects Biome formatting on save and tabs for the project's Astro, Svelte, JavaScript, TypeScript, CSS, JSON, and JSONC files. `language_servers: ["...", "biome"]` retains framework servers while adding Biome. The extension uses the project-local dependency and requires its configuration.

`.zed/tasks.json` exposes project commands from the worktree root. Setup and the task-picker shortcut are in [README.md](../../README.md#zed).
