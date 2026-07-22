---
date: ""
title: String escaping behavior adjusted for queries performed through @c8y/client package
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
ticket: MTM-67354
version: 1023.14.194
---
Previously, the @c8y/client package wrongly escaped certain characters which lead to unexpected query results.
This change adjusts the escaping logic in order to behave as expected.