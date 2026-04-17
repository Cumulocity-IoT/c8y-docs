---
date: ""
title: Asset selection now required for regular properties in asset property selector
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
---
The asset property selector component previously allowed users to proceed without selecting an asset when working with regular properties, which could lead to incomplete or invalid configurations. The component now requires users to explicitly select an asset before they can confirm their selection, regardless of whether they are working with regular or custom properties. This change ensures that all asset property selections are complete and valid, preventing configuration errors in your applications that use the asset property selector component.