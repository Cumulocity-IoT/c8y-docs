---
date: ""
title: Re-enabled duplication of global smart rules in local contexts
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
An earlier update to smart rule management options accidentally disabled duplication of global smart rules into local contexts. This fix restores that capability, so global smart rules can again be duplicated and applied in the context of specific groups and devices.