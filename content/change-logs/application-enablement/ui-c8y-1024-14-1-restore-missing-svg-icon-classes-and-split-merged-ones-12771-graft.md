---
date: '2026-08-14'
title: Missing SVG icon classes restored and merged classes split
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
ticket: MTM-67450
version: 1024.14.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-14'
  - label: apj.cumulocity.com
    date: '2026-08-12'
  - label: jp.cumulocity.com
    date: '2026-08-12'
  - label: us.cumulocity.com
    date: '2026-08-14'
  - label: cumulocity.com
    date: '2026-08-14'
---
Some Web SDK SVG icons were missing CSS classes or had merged classes, breaking the styling. The missing classes have been restored and the merged classes have been split, so each icon can now be styled and referenced independently.
