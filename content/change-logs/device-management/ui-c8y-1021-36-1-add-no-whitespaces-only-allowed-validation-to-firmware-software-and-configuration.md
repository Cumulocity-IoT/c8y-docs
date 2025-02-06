---
date: ""
title: Add validation to firmware, software and configuration forms to disallow values with only whitespaces
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4325
version: 1021.36.1
---
In Device management, it was possible to enter values (e.g. Description, Version, URL, etc.) consisting only of whitespaces for firmware, software and configuration assets in the corresponding repositories. To prevent this, additional validation has been added to the respective forms which disallows submitting such names. This change improves data quality and consistency for newly created firmware, software and configuration assets.