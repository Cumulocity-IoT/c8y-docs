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
In some cases, it was possible to create an empty alias for a device, which could lead to unexpected behavior and errors in the system. This issue has now been fixed. Devices can no longer be created with an empty alias. Existing devices with an empty alias will continue to work, but it is recommended to update their aliases to a non-empty value.