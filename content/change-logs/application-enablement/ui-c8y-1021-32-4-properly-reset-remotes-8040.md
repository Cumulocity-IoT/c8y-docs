---
date: ""
title: Remote reset functionality fixed
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
ticket: MTM-62327
version: 1021.32.4
---
In certain situations, the reset of remotes did not work properly which could lead to inconsistencies and synchronization issues between systems. This has been fixed now so that remotes are always properly reset when triggered. The fix ensures reliable remote handling and prevents potential problems caused by incomplete resets.