# Editor integration

Project-local Zed settings configure Biome only for the source/configuration languages used here: Astro, Svelte, JavaScript, TypeScript, CSS, JSON, and JSONC.

Biome formats on save with tabs. Each language-server list retains registered servers through `"..."` and adds `"biome"`, preserving Astro and Svelte framework diagnostics. The Biome extension discovers the project-local dependency and requires a configuration file; no machine-specific binary path is stored.

Project commands are available as tasks in `.zed/tasks.json`, including ordinary and background development servers. Tasks run from the worktree root.

## Implementation

- `.zed/settings.json`: per-language formatting and language servers.
- `.zed/tasks.json`: project task definitions.
- [Biome's Zed integration](https://biomejs.dev/reference/zed/) and [Zed language configuration](https://zed.dev/docs/configuring-languages): configuration references.

Editor setup and task-picker usage are in the [development guide](../development.md#zed).
