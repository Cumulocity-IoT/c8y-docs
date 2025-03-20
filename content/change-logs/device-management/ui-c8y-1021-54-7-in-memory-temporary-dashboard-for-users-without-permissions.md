---
date: ""
title: Allow users without permissions to see a fallback temporary dashboard
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
ticket: DM-4362
version: 1021.54.7
---
When users lack dashboard creation permissions, a temporary read-only dashboard is displayed to enable data visualization and prevent a blank page. This fallback dashboard is an in-memory one and not persisted in the backend.