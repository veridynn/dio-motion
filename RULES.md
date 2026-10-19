# Project rules

## Tickets

Use [this board](https://github.com/veridynn/dio-motion/issues) to track tickets.
Write titles, descriptions, and comments in British English; preserve customer
quotations and code identifiers. Use `$to-tickets` for ticket breakdowns; follow
its review, publishing, labelling, and dependency rules.

Use a clear, action-oriented title and the skill's issue structure:

- `What to build`: explain the requested outcome in plain language. For bugs,
  include reproduction steps, actual behaviour, and expected behaviour.
- `Acceptance criteria`: a checklist of observable, verifiable outcomes.
- `Implementation notes`: record technical constraints, decisions, and research
  findings needed to carry out the work. Include this section when such details
  exist; link supporting evidence. State unresolved questions and who must answer
  them here.

Use GitHub's native parent/sub-issue and blocking relationships instead of
duplicating them in `Parent` or `Blocked by` sections. Search related tickets and
their comments for dependencies. When work or findings affect another ticket,
update its description, acceptance criteria, implementation notes, and
relationships as affected. Leave parent tickets unchanged, as required by the
skill.

Give independent research and technical-debt work their own tickets. Research
tickets must state the question and the expected deliverable. Before closing
research, put actionable findings and decisions in the affected implementation
tickets' `Implementation notes` and link the research ticket.

Omit story points, time estimates, business-value scores, and user-story formulas.

### Ticket template

Enter the action-oriented title in GitHub's title field. Use this structure for
the body, omitting `Implementation notes` when there are no technical details:

```md
## What to build

<Describe the requested outcome and why it is needed.>

## Acceptance criteria

- [ ] <An observable outcome that can be verified.>
- [ ] <Another outcome required to complete the ticket.>

## Implementation notes

<Technical constraints, decisions, and actionable research findings.>
<Links to supporting evidence and research tickets.>
<Unresolved questions and who must answer them.>
```

## Branches

Name new branches `<issue-number>/<short-description>`, for example
`42/update-website-design`. Use the actual GitHub issue number and a lowercase,
hyphenated British English description. When work has no issue, use
`<short-description>`. This project format overrides the branch naming in
`conventional-git`; existing branches keep their names.

## Commits

Follow the installed [conventional-git skill](.agents/skills/conventional-git/SKILL.md)
for commit messages. Use `<type>: <description>` or
`<type>(<scope>): <description>`. When using a scope, name the affected project
area, such as `contact`, `navigation`, or `docs`. Write the description in British
English.

```text
feat(contact): add enquiry form validation
fix(navigation): correct the language switch
docs: clarify ticket structure
```

## Pull requests

Describe the resulting behaviour, link the relevant issue, and record the checks
run and any remaining gaps. Use issue-closing keywords only when the work fully
resolves the issue.

## Documentation

Update the existing authoritative guide and its references when behaviour changes.
Keep project overrides in project guides and installed skills unchanged. Follow
the documentation verification in [AGENTS.md](AGENTS.md#verification).
