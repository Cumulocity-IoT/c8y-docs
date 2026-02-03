---
date: 2023-12-06T09:58:31.066Z
title: Fields added to inventory POST/PUT templates for simulators
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2853
version: 10.18.497.5
---
Simulators did not use inventory POST/PUT templates properly as they did not specify any ID fields for the object they created/updated. This has now been resolved by adding the corresponding fields ID, External ID and External ID type depending on the SmartREST template used as instruction.
