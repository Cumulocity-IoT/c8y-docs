---
date: '2026-03-12'
title: >-
  Select child devices at any level in the device hierarchy in the asset
  selector
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
ticket: MTM-66155
version: 1023.59.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-12'
  - label: apj.cumulocity.com
    date: '2026-03-13'
  - label: jp.cumulocity.com
    date: '2026-03-13'
  - label: emea.cumulocity.com
    date: '2026-03-16'
  - label: us.cumulocity.com
    date: '2026-03-16'
  - label: cumulocity.com
    date: '2026-03-16'
---
The asset selector previously only allowed you to select direct child devices of a parent device, which limited your ability to work with hierarchical device structures. Now you can select child devices at any level in the device hierarchy, including grandchild devices and deeper nested levels. This change applies to all asset selector components throughout the application, so you can now build more complex device relationships and access devices at any depth in your device tree.
