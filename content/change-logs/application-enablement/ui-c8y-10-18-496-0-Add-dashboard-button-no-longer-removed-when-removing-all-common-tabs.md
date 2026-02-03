---
date: 2023-12-06T15:34:15.146Z
title: Add dashboard button no longer removed when removing all common tabs
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-56025
version: "10.18.496.0\t"
---
If the Cockpit application was configured to remove all common tabs on group or device level, the button to add dashboards was also unintentionally removed. This has been addressed.
