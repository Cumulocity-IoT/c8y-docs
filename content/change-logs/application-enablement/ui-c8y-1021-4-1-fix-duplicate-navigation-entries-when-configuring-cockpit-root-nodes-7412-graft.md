---
date: ""
title: Prevent duplicate entries in navigation when configuring top level nodes
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
ticket: MTM-61026
version: 1021.4.1
---
Fixed an issue where editing top level nodes in the "Application configuration" would create duplicate entries of assets in the main navigation menu. The navigator now properly updates without creating redundant menu items.