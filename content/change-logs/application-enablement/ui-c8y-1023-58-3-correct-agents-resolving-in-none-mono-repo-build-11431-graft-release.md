---
date: ""
title: AI agents are now properly resolved
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
ticket: MTM-66253
version: 1023.58.3
---
Previously, when the AI Agent Manager was configured and a provider API key was set, the agents were still not resolved correctly, which could cause runtime issues when using the AI Code assistant. This has been fixed so that agents are now properly resolved.