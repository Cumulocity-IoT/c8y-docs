---
date: ""
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
Tool approval for human-in-the-loop (HITL) workflows lets users review a tool call before an agent runs it. Previously, tool calls ran without approval unless you configured it. Now, a tool call waits for approval by default. A tool runs without approval only if its MCP tool annotations declare it read-only and closed-world, or if the agent configuration turns approval off for it (sets approval mode to **Never**).

In the **Tools** tab, each selected tool has an approval mode: **Never**, **Ask**, or **Always**. The default mode comes from the tool's MCP annotations. 

- **Never** applies to read-only, closed-world tools. 
- **Always** applies to tools that may delete data or contact external systems. *
- *Ask** applies to all other tools. 

With **Ask**, chat users approve tool calls unless they use auto mode. With **Always**, chat users approve every call, even in auto mode or after approving the tool earlier in the conversation. 

To set the mode yourself, select the **Override** checkbox. Tags show what each tool declares about itself: Read-only, Changes data, Destructive, External systems, or Not declared. A tool without annotations is treated as destructive and as contacting external systems.

In MCP tool entries, the `approval` field accepts NEVER, ASK, or ALWAYS. The `needsApproval` field is deprecated. Use `approval: 'ALWAYS'` instead. The tools API now returns the MCP annotations of each tool.

This update is a breaking change for agents without an approval configuration. These agents now ask for approval for every tool that is not declared read-only and closed-world, including every tool without annotations. To keep the previous behavior for a tool, set its approval to NEVER. If you maintain the MCP server, you can instead declare the tool with `{ readOnlyHint: true, openWorldHint: false }`. API callers must handle tool-approval-request events. If a run waits for approval, a non-streaming plain-text request returns HTTP 409 with the pending approvals. To receive and answer approval requests, send the request with `fullResponse=true`.