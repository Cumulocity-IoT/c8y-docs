---
date: 2024-04-04
title: Root level managed object is now reliably found when querying with the onlyRoots flag
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-56734
version: 10.20.266.0
---
In the inventory, when querying with the `onlyRoots` flag, assets could not be found if the object was removed from the asset hierarchy and became the root object again. This issue has now been fixed and root level managed objects are found when querying with the `onlyRoots` flag.
