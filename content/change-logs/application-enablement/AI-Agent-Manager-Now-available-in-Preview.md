---
date: "2026-03-31"
title: "AI Agent Manager: Now Available in Preview"
product_area: "Application enablement & solutions"
change_type:
  - value: "change-type-preview"
    label: "Preview"
component:
  - value: "component-ai-agent-manager"
    label: "Web SDK"
build_artifact:
  - value: "ai-agents"
    label: "ai-agents"
ticket: ""
version: "0.0.9"
---
{{< c8y-admon-preview >}}
This feature is available in Preview. It is intended for evaluation and testing purposes and may be subject to change.
{{< /c8y-admon-preview >}}

The AI Agent Manager introduces a new capability to create, configure, and run AI-powered agents directly within a tenant through an intuitive user interface.

Agents can analyze device data and execute actions based on configurable logic. They can be granted access to Cumulocity data such as inventory, events, alarms, and measurements, enabling seamless integration with existing IoT applications without additional setup. Agents can be extended with custom tools or MCP servers, and their behavior can be validated in a sandbox environment before being enabled for real-time automation and complex operational workflows.

Important: Administrators must enable the AI Agents permission in the user’s global role and configure LLM providers using their own API keys to use this application.
