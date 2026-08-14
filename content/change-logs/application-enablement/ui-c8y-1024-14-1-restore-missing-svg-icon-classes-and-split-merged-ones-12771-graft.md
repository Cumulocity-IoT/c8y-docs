---
date: ""
title: SVG icon classes restored and merged ones split
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
---
Some Web SDK SVG icons were missing CSS classes or had merged classes, breaking styling. We've restored the missing classes and split the merged ones, so each icon can now be styled and referenced independently.