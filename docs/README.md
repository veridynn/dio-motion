# Project documentation

Current design and technical decisions. Setup and commands: [development guide](development.md).

| Area | Decision record |
| --- | --- |
| Site composition, static rendering, locales, and anchors | [Architecture and localization](decisions/architecture.md) |
| Font, fluid type scale, and text roles | [Typography](decisions/typography.md) |
| Fluid spacing, gutters, section padding, and header offsets | [Spacing](decisions/spacing.md) |
| Palette, shared controls, corner shape, and scoped styling | [CSS tokens](decisions/css-tokens.md) |
| Reveals, snapping, shortcut fade, and reduced motion | [Motion](decisions/motion.md) |
| Validation, delivery provider, CAPTCHA, and failure behavior | [Contact delivery](decisions/contact-delivery.md) |
| Biome scope, framework limitations, and lint exceptions | [Formatting and linting](decisions/formatting-linting.md) |
| Zed language servers, formatting, and project tasks | [Editor integration](decisions/editor.md) |

The source remains the authority for current values.

## Ownership and work tracking

Bogdan (`@veridynn`) maintains technical decisions. Dio Motion / Silvo supplies product, branding, and business input; implemented visual choices still require PO confirmation in [#14](https://github.com/veridynn/dio-motion/issues/14).

Keep records concise: current behavior, necessary rationale, constraints, and source locations. Omit implementation history, repeated facts, and explanations implied by the chosen approach.

Track outstanding work in [GitHub issues](https://github.com/veridynn/dio-motion/issues) and the [project board](https://github.com/users/veridynn/projects/4). Link tickets instead of copying checklists. Business context: [#15](https://github.com/veridynn/dio-motion/issues/15); visual documentation: [#13](https://github.com/veridynn/dio-motion/issues/13).
