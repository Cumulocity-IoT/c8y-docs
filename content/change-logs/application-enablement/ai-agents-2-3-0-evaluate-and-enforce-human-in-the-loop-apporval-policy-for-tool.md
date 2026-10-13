---
date: ""
title: evaluate and enforce human-in-the-loop apporval policy for tool calls (#675)
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
ticket: MTM-67219
version: 2.3.0
---
When using AI-powered features that make tool calls (such as API requests or system commands), you need to ensure that sensitive operations receive proper oversight. Previously, there was no mechanism to enforce approval policies for these tool calls, which could allow unintended or risky operations to execute without human review. Now, the system evaluates and enforces human-in-the-loop approval policies for tool calls, ensuring that operations requiring oversight are reviewed and approved by authorized users before execution. This change impacts all users and applications that use AI features with tool calling capabilities, as tool calls will now be subject to configured approval policies, providing better control and security over automated operations in your installation.