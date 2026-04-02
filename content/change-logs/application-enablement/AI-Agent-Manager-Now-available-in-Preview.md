---
date: "2026-03-31"
title: "AI Agent Manager now available in Public Preview"
product_area: "Application enablement & solutions"
change_type:
  - value: "change-2c7RdTdXo4"
    label: "Preview"
component:
  - value: "component-YbYJ3gLU_"
    label: "Web SDK"
build_artifact:
  - value: "tc--gWykZ78v"
    label: "ai-agents"
ticket: ""
version: "0.0.9"
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

The AI Agent Manager introduces a new capability to create, configure, and run AI-powered agents directly within a tenant through an intuitive user interface.

Agents can analyze device data and execute actions based on configurable logic. They can be granted access to {{< product-c8y-iot >}} data such as inventory, events, alarms, and measurements, enabling seamless integration with existing IoT applications without additional setup. Agents can be extended with custom tools or MCP servers, and their behavior can be validated before being enabled for real-time automation and complex operational workflows.

Important: Administrators must enable the AI Agents permission in the user’s global role and configure LLM providers using their own API keys to use this application.
