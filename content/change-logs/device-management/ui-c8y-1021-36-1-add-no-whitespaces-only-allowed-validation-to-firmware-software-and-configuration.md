---
date: '2025-02-27'
title: >-
  Submitting values with only whitespaces in firmware, software and
  configuration forms no longer allowed
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
In the Device management application, it previously was possible to enter values (for example, in the **Description**, **Version**, **URL** fields) consisting only of whitespaces for firmware, software and configuration items in the corresponding repositories. To prevent this, additional validation has been added to the respective forms which disallows submitting such names. This change improves data quality and consistency for newly created firmware, software and configuration items.
