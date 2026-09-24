---
date: ""
title: AI Workbench microservice now available enabling code-mode MCP
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
ticket: MTM-67405
version: 2.4.0
---
AI Workbench is a new microservice that provides a dedicated runtime environment for code mode. In code mode, an AI agent writes and runs code against the available tools and platform APIs instead of invoking every tool through a separate model call. This significantly reduces the number of round trips to the model and the volume of intermediate data that has to pass through its context, so agents resolve multi-step tasks faster, at lower token cost, and with more consistent results — particularly when working with large datasets or chaining many tools together.

AI Workbench runs as a standalone microservice and can be deployed in your Cumulocity environment alongside your existing applications and services. You can connect to it over MCP from any MCP-capable client, or configure it directly in the AI Agent Manager, where it can be added to your agents without any additional setup.