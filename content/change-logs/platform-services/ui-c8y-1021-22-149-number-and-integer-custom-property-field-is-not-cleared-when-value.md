---
date: 2026-02-19
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
version: 1021.22.149
---
Custom property fields of type number and integer in the subtenant details view were not cleared when users attempted to remove their values. Previously, when a user tried to set an existing number or integer value to empty, the original value would persist and not be saved as empty. This issue has been fixed, and users can now successfully clear number and integer custom property fields by removing their values. This ensures that custom property data accurately reflects the current state of your subtenant configuration.