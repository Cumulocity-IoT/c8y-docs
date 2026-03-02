---
date: '2026-02-26'
title: Stacked drawers now close only the top drawer when pressing escape
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
ticket: MTM-65365
version: 1023.48.3
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-26'
  - label: apj.cumulocity.com
    date: '2026-02-27'
  - label: jp.cumulocity.com
    date: '2026-02-27'
---
When multiple drawers were displayed in a stacked manner, pressing the escape key closed all open drawers at once, which could disrupt the user's workflow. Now, pressing escape will close only the topmost drawer, allowing users to navigate back through multiple drawer levels one at a time. Additionally, you can now configure individual drawers to prevent them from closing when the escape key is pressed, giving you more control over the user experience in your applications.
