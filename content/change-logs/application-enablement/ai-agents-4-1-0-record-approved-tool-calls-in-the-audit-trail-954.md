---
date: ""
title: record approved tool calls in the audit trail (#954)
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-VtytA3d55
    label: AI Agents
build_artifact:
  - value: tc--gWykZ78v
    label: ai-agents
ticket: MTM-67221
version: 4.1.0
---
## Context

[MTM-67221](https://cumulocity.atlassian.net/browse/MTM-67221) asks for
HITL decisions to be logged with full context. #765 already writes an
audit record for a **denied** call. An **approved** call was logged like
any other call, so it looked the same as a call that never needed
approval.

Scope agreed on the ticket: record approvals, including who approved
(gap 1). Gaps 2–4 (manual vs. automatic answer, why approval was
requested, unanswered approvals) are out of scope. Gap 5 needs nothing:
tool arguments already reach OTel spans when content recording is on,
and audit records stay metadata-only.

## What & why

- **`@c8y/ai-types`:** new `ApprovalDecision` type (`'approved' |
'denied'`) and an optional `approvalDecision` on `AgentAuditRecord`.
This is an addition, not a breaking change.
- **Audit records (`ai-agents`):** a call approved with this request
gets `approvalDecision: 'approved'` on its existing `succeeded`/`failed`
record, with the text `Tool "x" approved, succeeded`. Denied records
also get `approvalDecision: 'denied'`, so one field filters every
decision. The field is left empty when the call didn't need approval.
- **Who approved:** the record's existing `user`, i.e. the chat user
whose request carried the decision.
- **`denied-tool-calls.ts` → `tool-approval-decisions.ts`:** returns
every decision with its tool call id, read from the last tool message
only, as before.
- **UI (`ai-plugins`):** the run's tool-call list shows "Approved" next
to approved calls, the same way it shows "Denied".

### Known limit, documented on purpose

The chat's Auto mode, or a remembered "always approve" answer, sends
exactly the same `tool-approval-response` (`{ type, approvalId,
approved: true }`) as a click. I checked this in the browser on a
preprod tenant. So `approved` means "approved in this user's session",
not "this user clicked". The field's docs say so. Telling the two apart
is gap 2, which is out of scope.

## Testing

- `ai-agents` unit tests for the touched areas: 64 passed. Covered
cases: an approved call gets `approved` and another call in the same run
doesn't; a denied call gets `denied`; the approved record's text and
user; the API returns the field.
- `run-tool-calls.component.spec.ts` (Karma, compiles the template with
`strictTemplates`): 8 passed.
- Backend `tsc --noEmit`, ESLint and Prettier: clean.
- Manual: in Auto mode, the test chat sends `tool-approval-response`
with `approved: true` in the follow-up request, nested in
`agent.messages`. `mergedSettings` picks that up, so test-chat approvals
are covered too.
- Not done: seeing the "Approved" label end to end, which needs a
deployment of this branch.

🤖 Generated with [Claude Code](https://claude.com/claude-code)


[MTM-67221]:
https://cumulocity.atlassian.net/browse/MTM-67221?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

---------

Co-authored-by: Claude Opus 5.5 <noreply@anthropic.com>