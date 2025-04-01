---
date: ""
title: Resolved an issue where the dashboard’s auto-refresh counter would sometimes freeze
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
Fixed an issue where the auto-refresh counter would freeze when a dashboard contained at least two widgets with different refresh mechanisms - one using real-time dashboard contexts and another using auto-refresh dashboard contexts. This combination now works properly for previously failing scenarios.