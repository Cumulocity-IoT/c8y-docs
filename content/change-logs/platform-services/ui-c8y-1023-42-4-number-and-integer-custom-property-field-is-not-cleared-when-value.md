---
date: ""
title: Number and integer custom property fields are now properly cleared when values are removed
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
ticket: MTM-61883
version: 1023.42.4
---
Custom property fields of type number and integer in the Subtenant details view were not being cleared when users attempted to remove their values. Previously, when a user tried to set an existing number or integer value to empty, the original value would persist and not be saved as empty. This has been fixed, and users can now successfully clear number and integer custom property fields by removing their values. This ensures that custom property data accurately reflects the current state of your subtenant configuration.