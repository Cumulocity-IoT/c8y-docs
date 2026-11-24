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
The audit trail of the AI Agent Manager now records whether the user approved a tool call that [requires approval](/ai/tools-mcp/#user-approval). Before, only denied tool calls were marked. Approved tool calls are now marked as **Approved** on the **Observability** page, and the `c8y_AiToolCall` audit records have a new `approvalDecision` field. For details, see [What is recorded](/ai/observability/#what-is-recorded).
