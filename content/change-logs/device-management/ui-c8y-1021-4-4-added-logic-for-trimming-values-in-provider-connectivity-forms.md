---
date: ""
title: Trim values in provider connectivity forms
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
ticket: DM-4076
version: 1021.4.4
---
To improve data quality and consistency, the provider connectivity forms have been enhanced. The entered values are now automatically trimmed, removing any leading or trailing whitespace characters. This change ensures that unintended spaces do not impact the data stored and processed by the system. Users should be aware that any extra spaces they may have previously entered will now be removed automatically when submitting the form.