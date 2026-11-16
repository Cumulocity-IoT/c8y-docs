---
date: ""
title: configure tool approval per tool in the UI, required by default (#793)
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
ticket: MTM-67779
version: 4.0.0
---
Tool approval (HITL) is now opt-out: a tool call waits for user approval
unless the tool declares itself read-only and closed-world, or the agent
configuration turns approval off.

- Add `approval: 'NEVER' | 'ASK' | 'ALWAYS'` to MCP tool entries;
  deprecate `needsApproval` in favor of `approval: 'ALWAYS'`.
- Return MCP tool annotations from the tools API.
- Plain-text responses return 409 with the pending approvals when a run
  waits for approval.
- Tools tab: per-tool approval switch (Never / Ask / Always) with an
  Override checkbox; the default comes from the tool's annotations,
  which are shown as tags.

BREAKING CHANGE: Agents without an approval configuration now ask for
approval for every tool that isn't declared read-only and closed-world.
API callers must handle `tool-approval-request`.