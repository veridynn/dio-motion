# Ticket writing

Write tickets in English for one developer, with occasional content, business input, and approvals from Dio Motion. Use a concrete title and include only what someone needs to understand, complete, and verify the work.

## Default structure

```md
## Task
Brief context and the specific change needed.

## Done when
- Verifiable outcome.
- Additional condition only if needed.
```

Small tickets can use a few sentences without headings. Do not require an “As a user…” format.

| Type | Necessary content |
| --- | --- |
| Bug | Affected location, reproduction steps, actual and expected behavior, and how to verify the fix. |
| Feature or improvement | Desired change, brief reason, scope, and verifiable completion criteria. |
| Technical task | Problem to solve, work required, and how to verify the result. |
| Content or approval | Text, image, or decision needed; relevant draft or reference; and exactly what must be supplied or approved. |

Include links, screenshots, or technical constraints only when they help complete the task. Avoid lengthy implementation instructions and duplicate task lists.

Keep assignees, priority, status, and blocking relationships in the UI fields, not the description. Retain any substantive requirement behind a dependency, such as the exact content needed.

## References

- [GitHub: Creating an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue)
- [Atlassian: User stories and acceptance criteria](https://www.atlassian.com/agile/project-management/user-stories)
