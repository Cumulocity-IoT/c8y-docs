---
date: '2025-04-10'
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
When users do not have the permission to create dashboards, a temporary read-only dashboard is now displayed to enable data visualization and prevent a blank page. This fallback dashboard is an in-memory one and not persisted in the backend.
