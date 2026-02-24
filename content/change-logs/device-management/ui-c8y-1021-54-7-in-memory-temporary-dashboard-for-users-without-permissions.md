---
date: '2026-03-31'
title: Display read-only dashboard for users without dashboard creation permission
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
When users do not have the permission to create dashboards, a temporary read-only dashboard is now displayed to enable data visualization and prevent a blank page. This fallback dashboard is an in-memory one and not persisted in the backend.
