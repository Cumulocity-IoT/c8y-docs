---
date: '2026-10-22'
title: AI chat widget now provides the selected asset as context to the agent
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
ticket: MTM-67463
version: 3.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-22'
---
The AI chat widget can now pass the device or group it is configured for to the selected AI agent, so you can ask questions such as "What is this?" or "Are there any active alarms?" without naming the asset in your prompt.

The widget configuration now includes the standard **Asset selection** section. When you add the widget to a dashboard, it defaults to the dashboard's device or group, and you can select that asset or one of its children. You can still use the widget without an asset.

The context works with any agent and requires no changes to the agent's prompt. In the chat, the selected asset is shown as a chip that you can remove to send messages without context, and add again later. For widgets without a configured asset, including widgets created before this change, the dashboard's device or group is offered as a chip that is switched off by default.
