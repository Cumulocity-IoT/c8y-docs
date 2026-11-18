---
date: ""
title: Per-agent API and tool selection in AI Workbench
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
ticket: MTM-67777
version: 3.3.0
---
AI Workbench can now give each agent only the APIs and tools it needs, instead of everything available in the tenant. You choose which {{< product-c8y-iot >}} APIs, microservice APIs, and MCP tools an agent can use, and you can rename them. The agent then searches and reads documentation only for what it can use.

An MCP client sends this configuration as JSON in the `ai-workbench-config` request header. Agents without a configuration work as before and see everything. A configuration can also add up to 20 external MCP servers. AI Workbench sends them only the headers you set for them, never tenant credentials, and blocks internal network addresses.

This release also affects agents without a configuration. When two services, tools, or operations have the same name, AI Workbench now keeps both and adds a number to the second one, for example `shiftplan2`. Previously, AI Workbench left one of them out.