---
date: '2024-06-20'
title: Software list in Device data widget now paginated to show all entries properly
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
ticket: DM-3669
version: 1020.0.17
---
In the "Device data" widget, the software list was not displayed correctly if it contained a large number of entries. This issue has now been resolved by paginating the software list, that is, limiting the initial list to 10 items and an option to load more if needed.
