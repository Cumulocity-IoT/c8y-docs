---
date: '2026-11-09'
title: >-
  Resizable grid panes kept at their minimum width when dragged or when the
  window shrinks
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
ticket: MTM-67319
version: 1024.23.7
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-09'
  - label: apj.cumulocity.com
    date: '2026-11-10'
  - label: jp.cumulocity.com
    date: '2026-11-10'
---
In applications with resizable grid panes using the split view component, a pane now stops at its minimum width when you drag its edge or make the browser window smaller. Before, panes could get too narrow to show their content.
