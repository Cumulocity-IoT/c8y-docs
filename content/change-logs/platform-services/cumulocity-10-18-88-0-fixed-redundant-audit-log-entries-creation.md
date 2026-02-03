---
date: 2023-12-06T16:24:32.165Z
title: Fixed redundant audit log entries creation
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-51919
version: 10.18.88.0
---
Updating a custom alarm property no longer creates a redundant audit log entry with misleading information about alarm clearance.
