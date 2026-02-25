---
date: ""
title: data explorer nav node is no longer visible when disabled
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
ticket: MTM-66097
version: 1023.47.2
---
The data explorer navigation item was previously visible in the navigator even when it was disabled via the Cockpit configuration, which could confuse users who expected disabled items to be hidden. The data explorer navigation item is now properly hidden from the navigator when it is disabled, ensuring that only enabled navigation items are displayed to users.