---
date: ""
title: Approved tool calls are recorded in the audit trail
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
The audit trail of the AI Agent Manager now records whether the user approved a tool call that [requires approval](/ai/tools-mcp/#user-approval). Before, an approved tool call looked the same as a tool call that did not need approval, and only denied tool calls were marked.

In the **Tool calls** timeline of a run, approved tool calls are now marked as **Approved**, in the same way as denied tool calls are marked as **Denied**. The audit log text of an approved tool call includes "approved", for example `Tool "x" approved, succeeded`.

The `c8y_AiToolCall` audit records and the `GET /service/ai/observability/tools` endpoint have a new `approvalDecision` field with the value `approved` or `denied`. Use it to find every tool call that a user approved or denied. The field is empty if the tool call did not require approval. The record's `user` is the user whose chat session sent the approval.

An approval given automatically in the chat, by **Auto** mode or by a remembered "always approve" answer, is recorded the same way as an approval that the user clicked. `approved` means that the tool call was approved in the user's session, not that the user approved it manually.
