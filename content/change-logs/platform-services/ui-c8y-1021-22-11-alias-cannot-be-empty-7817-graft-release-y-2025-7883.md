---
date: ""
title: alias cannot be empty (#7817) [GRAFT][release/y2025] (#7883)
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61921
version: 1021.22.11
---
The login alias can no longer be an empty string, that is, a string consisting only of whitespace, null, or undefined. If no login alias is provided for the user, this field must not be included in the user object.