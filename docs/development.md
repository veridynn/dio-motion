# Development guide

Requirements, installation, and the command list are in [README.md](../README.md). Design and technical choices are indexed in [the documentation index](README.md).

## Formatting and linting

Apply formatting, safe lint fixes, and import organization together with `pnpm exec biome check --write .`. Review unsafe fixes manually. Tool scope and exceptions: [formatting and linting](decisions/formatting-linting.md).

## Zed

Install the Biome, Astro, and Svelte extensions. Project configuration lives in `.zed/settings.json` and `.zed/tasks.json`.

**Command+Shift+R** opens the task picker on macOS with Zed's default keymap. Tasks run from the project root and include checks, builds, and development server controls. Stop foreground servers with Ctrl+C; background commands are listed in [README.md](../README.md#development-commands). See [Zed tasks](https://zed.dev/docs/tasks).

## Contact configuration

The client uses `PUBLIC_WEB3FORMS_ACCESS_KEY` from `.env` locally and from the hosting build environment for deployed builds. The key is a public form identifier and is included in the built client; a changed value takes effect after a rebuild. Private email API credentials do not belong in a `PUBLIC_` variable. The unconfigured form currently uses a preview alert rather than sending or clearing the draft.

Provider account/form provisioning and recipient/CAPTCHA confirmation are tracked in [#12](https://github.com/veridynn/dio-motion/issues/12). Activation, delivery tests, fallback behavior, and provider operation notes are tracked in [#11](https://github.com/veridynn/dio-motion/issues/11). Privacy text approval is tracked in [#10](https://github.com/veridynn/dio-motion/issues/10), and publication of the approved legal pages in [#23](https://github.com/veridynn/dio-motion/issues/23).

The [contact delivery decision record](decisions/contact-delivery.md) describes validation, persistence, CAPTCHA behavior, and failure states.
