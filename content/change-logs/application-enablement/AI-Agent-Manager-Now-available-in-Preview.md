---
date: "2026-03-31"
title: "AI Agent Manager: Now Available in Preview"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-type-preview"
       label: "Preview"
component:
    - value: "component-ai-agent-manager2
      label: "Web SDK"
build_artifact:
    - value: "ai-agents"
      label: "ai-agents"
ticket: ""
version: "0.0.9"
---

{{< c8y-admon-preview >}}
This feature is available in Preview. It is intended for evaluation and testing purposes and may be subject to changes.
{{< /c8y-admon-preview >}}

The AI Agent Manager introduces a new capability to create, configure, and run AI agents directly within a tenant.

With this feature, users can define agents that analyze device data, execute actions based on configurable logic. 

Agents have access to Cumulocity data such as inventory, events, alarms, and measurements, enabling integration with existing IoT applications without additional setup.

Users can select and configure LLM providers using their own API keys, extend agents with custom tools, and validate behavior in a sandbox environment before enabling them in production.

**Important:** The AI Agent Manager requires the *AI Agents* permission to be enabled in the user’s global role.
