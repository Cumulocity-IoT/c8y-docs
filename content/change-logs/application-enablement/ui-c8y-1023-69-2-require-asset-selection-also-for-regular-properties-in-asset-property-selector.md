---
date: '2026-04-20'
title: Asset selection now mandatory for custom properties in asset property selector
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
ticket: MTM-66612
version: 1023.69.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-20'
---
The asset property selector component previously allowed users to proceed without selecting an asset when working with custom properties, which could lead to incomplete or invalid configurations. The component now requires users to explicitly select an asset before they select a property from one of the three tabs. This change ensures that all asset property selections are complete and valid, preventing configuration errors.
