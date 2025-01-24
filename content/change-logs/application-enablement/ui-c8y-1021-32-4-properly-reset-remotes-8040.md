---
date: ""
title: Reset to default functionality for application plugins works properly
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
In certain situations, the `Reset to default` button (available in the Administration app on the list of plugins installed to a certain application) did not work properly which could lead to inconsistencies. This has been adressed so that the application plugins will be loaded like there was never any modification done to them.
