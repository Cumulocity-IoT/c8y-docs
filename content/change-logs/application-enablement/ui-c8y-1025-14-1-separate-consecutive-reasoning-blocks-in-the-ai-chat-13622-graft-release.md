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
OpenAI reasoning summaries in the AI chat no longer run together. Each summary part now starts its own paragraph, so its bold heading renders as a heading.