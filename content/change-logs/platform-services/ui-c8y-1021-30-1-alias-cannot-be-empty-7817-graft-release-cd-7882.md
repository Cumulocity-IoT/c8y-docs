---
date: ""
title: The login alias cannot be an empty string.
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
version: 1021.30.1
---
The login alias cannot be an empty string, a string consisting only of whitespace, null, or undefined. If a user does not have a login alias, this field should not be included in the user object.