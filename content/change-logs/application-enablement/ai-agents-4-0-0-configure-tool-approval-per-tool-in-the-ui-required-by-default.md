---
date: "2026-11-16"
title: Tool approval is configurable per tool in the UI and approval is required by default
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
Tool calls of AI agents now wait for user approval by default. A tool runs without approval only if its MCP tool annotations declare it read-only and closed-world, or if you set its approval mode to **Never**.

In the **Tools** tab of an agent, each selected tool has an approval mode: **Never**, **Ask**, or **Always**. The default mode comes from the tool's MCP annotations, which the tab shows as tags. To set the mode yourself, select **Override**. If you configure agents through the REST API, set the mode with the `approval` field of each tool entry instead of the deprecated `needsApproval` field.

This update is a breaking change for agents without an approval configuration, and for applications that call agents through the REST API. These applications must handle `tool-approval-request` events. For details, see [Requiring user approval](/ai/tools-mcp/#user-approval).