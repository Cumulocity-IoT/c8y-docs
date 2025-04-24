---
date: '2025-04-10'
title: Dashboard auto-refresh counter no longer freezes in certain scenarios
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62595
version: 1021.56.5
---
Previously, the auto-refresh counter freezed when a dashboard contained at least two widgets with different refresh mechanisms - one using real-time dashboard contexts and another using auto-refresh dashboard contexts. This combination now works properly for previously failing scenarios.
