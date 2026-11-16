---
date: '2026-08-05'
title: Fixed memory leaks when navigating between views
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
ticket: MTM-67019
version: 1023.97.6
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-05'
  - label: apj.cumulocity.com
    date: '2026-08-05'
  - label: jp.cumulocity.com
    date: '2026-08-05'
  - label: us.cumulocity.com
    date: '2026-08-06'
  - label: cumulocity.com
    date: '2026-08-06'
---
Dashboards, widgets, and other view content were not fully released from memory after navigating away, causing memory usage to grow until a full page reload. They are now cleaned up on navigation.
