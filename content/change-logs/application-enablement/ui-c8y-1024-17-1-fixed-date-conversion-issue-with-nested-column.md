---
date: '2026-09-16'
title: Fixed date conversion issue in the Asset table widget
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
ticket: MTM-67326
version: 1024.17.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-09-16'
  - label: apj.cumulocity.com
    date: '2026-09-17'
  - label: jp.cumulocity.com
    date: '2026-09-17'
  - label: us.cumulocity.com
    date: '2026-09-16'
  - label: cumulocity.com
    date: '2026-09-16'
---
The "Asset table" widget now correctly converts and displays nested timestamp fragments (such as UTC strings) into localized dates when the date display format is selected. Moreover, an issue has been resolved where conditional formatting with the icon display type caused date and time values to vanish, ensuring both the icon and text values render properly.
