---
date: ""
title: tools of same name but different MCP overrides (#789)
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
---
fix: [MTM-67607] keep same-named tools from different MCP servers apart (#789)

Tools from all MCP servers went into one map keyed by name, so when two
servers exposed the same tool name, one replaced the other and only one
could run.

- Expose tools from non-default servers as `{server}__{tool}`;
  `cumulocity-default` tools keep their bare names. Fail with 400 if
  names still collide after namespacing.
- Reject creating or renaming an MCP server to a name already in use
  (400 instead of 500).
- Tools tab: match orphaned tools on server and tool name, not just the
  tool name.

The model, the chat stream, and the chat's "Used tool" label now show
namespaced names for third-party tools. Stored agent config keeps the
original names, so existing agents need no migration.