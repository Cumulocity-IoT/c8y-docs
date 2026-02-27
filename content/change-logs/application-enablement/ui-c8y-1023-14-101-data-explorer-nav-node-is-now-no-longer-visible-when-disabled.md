---
date: ""
title: data explorer navigation node is no longer visible when disabled
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
version: 1023.14.101
---
The data explorer navigation node in the Web SDK was previously visible in the navigation menu even when it was disabled, which could confuse users who expected disabled features to be hidden from the interface. The navigation node is now properly hidden from view when its disabled state is set, ensuring that only enabled navigation options are displayed to users. This change improves the clarity of the user interface by removing visual clutter and making it immediately clear which features are available for use.