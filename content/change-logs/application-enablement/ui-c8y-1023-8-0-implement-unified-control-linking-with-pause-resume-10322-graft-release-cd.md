---
date: '2026-03-31'
title: Simplified global context link/unlink behavior
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65223
version: 1023.8.0
---
The control linking functionality has been simplified to provide a more intuitive user experience. Previously, each control (time context, auto-refresh, aggregation) could be linked or unlinked from the global context individually. This granular approach introduced complexity and edge cases that could lead to unexpected behavior. With this change, all controls now link and unlink together as a single unified action. When a widget is linked to the global context, all its controls synchronize with the dashboard. When unlinked, the widget operates independently with its own local controls. This simplification reduces confusion and ensures consistent, predictable behavior across widgets.
