---
date: ""
title: Restored option to duplicate global smart rules in local contexts
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67052
version: 1023.97.0
---
An earlier update to the smart rule management options removed the option to duplicate global smart rules in local contexts. This fix restores that capability as a **Duplicate as local** option in the smart rule's dropdown menu, so global smart rules can again be duplicated and applied in the context of a specific group or device.