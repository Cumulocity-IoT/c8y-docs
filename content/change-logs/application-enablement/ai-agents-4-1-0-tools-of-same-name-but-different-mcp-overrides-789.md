---
date: '2026-11-27'
title: Tools with the same name on different MCP servers no longer replace each other
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-VtytA3d55
    label: AI Agents
build_artifact:
  - value: tc--gWykZ78v
    label: ai-agents
ticket: MTM-67607
version: 4.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-27'
---
If two MCP servers provided a tool with the same name, one tool replaced the other and agents could use only one of them. Tools from MCP servers other than `cumulocity-default` now carry the server name as a prefix, in the form `{server}__{tool}`, so both tools stay available. Tools from the `cumulocity-default` server keep their names. If two tool names still collide after the prefix is added, the request fails with HTTP status 400.

The model, the chat stream events, and the **Used tool** label in the chat show the prefixed names. The agent configuration keeps the original tool names, so existing agents work without changes. Applications that read tool names from chat stream events must expect the prefixed names for tools from other servers.

In the **Tools** tab of an agent, a tool that its MCP server no longer provides is now detected by server and tool name. Before, it stayed hidden if another server provided a tool with the same name.

Creating or renaming an MCP server with a name that another server already uses now fails with HTTP status 400 instead of 500.
