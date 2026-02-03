---
date: ""
title: Disallow certain application options to be provided via query params
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
ticket: MTM-65991
version: 1023.23.4
---
For testing purposes, application options can be provided via query parameters to Web SDK-based UI applications.
Some of these application options have now been excluded from being provided via query parameters.