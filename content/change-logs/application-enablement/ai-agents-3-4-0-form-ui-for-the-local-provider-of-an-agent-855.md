---
date: ""
title: Form-based UI for the local provider of an agent
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
ticket: MTM-68295
version: 3.4.0
---
The agent's **Local provider** tab accepted only JSON input, which made it hard to see which settings the agent uses. The tab is now called **Model configuration** and provides a form with one row per setting, laid out like the model configuration in the Control panel. Each row has an **Override** switch. When the switch is off, the row shows the value that the agent inherits from the Control panel. Turn on the switch to set an agent-specific value for that setting. You no longer need to edit JSON to configure the local provider, and you can see at a glance which settings the agent overrides and which it inherits. When you configure an existing agent, look for the **Model configuration** tab, because the tab name changed but its purpose stays the same.