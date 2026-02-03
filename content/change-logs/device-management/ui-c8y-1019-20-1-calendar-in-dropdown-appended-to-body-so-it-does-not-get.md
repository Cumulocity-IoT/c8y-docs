---
date: 2024-04-25
title: Calendar dropdown is no longer being cut off
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3504
version: 1019.20.1
---
Previously, the calendar dropdown in forms could sometimes be partially hidden or cut off, making it difficult for users to select dates. This issue has been resolved by appending the calendar dropdown to the document body instead of the form. Users will now see the full calendar dropdown when selecting dates in forms, allowing them to easily choose the desired date without any visual obstructions.
