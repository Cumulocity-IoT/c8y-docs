---
date: ""
title: Separate consecutive reasoning blocks in the AI chat
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-68188
version: 1025.14.1
---
OpenAI reasoning models return their reasoning summary in several parts, and each part starts with a bold heading. Previously, these parts ran together in the AI chat, which made the reasoning hard to read. Now, each summary part starts its own paragraph, and its bold heading renders as a heading. This change applies automatically to all users of the AI chat with OpenAI reasoning models, and you do not need to take any action.