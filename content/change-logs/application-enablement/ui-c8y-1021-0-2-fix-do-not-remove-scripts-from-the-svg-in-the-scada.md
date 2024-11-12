---
date: '2024-11-11'
title: Script tags are preserved in SCADA widgets
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
ticket: MTM-61415
version: 1021.0.2
---
The SCADA widget now preserves script tags if the code sanitization option is set to "none".
