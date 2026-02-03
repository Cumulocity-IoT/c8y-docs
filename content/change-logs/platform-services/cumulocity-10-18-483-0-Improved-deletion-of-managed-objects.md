---
date: 2023-12-06
title: Improved deletion of managed objects
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-49370
version: 10.18.483.0
---
Improved the reliability of deleting a user together with a managed object. When deleting a managed object with the flag "withUser=true", the device user is now deleted if it does not own any other item.
