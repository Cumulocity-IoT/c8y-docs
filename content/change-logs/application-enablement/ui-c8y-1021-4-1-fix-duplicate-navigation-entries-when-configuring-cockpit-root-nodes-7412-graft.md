---
date: '2024-11-28'
title: >-
  Prevented duplicate asset entries in the navigator when configuring top level
  nodes
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Fixed an issue where editing top level nodes in the **Application configuration** page in the Cockpit application created duplicate entries of assets in the navigator. Now the navigator updates properly without creating redundant menu items.
