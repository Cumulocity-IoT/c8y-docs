---
date: '2024-10-17'
title: Data grid deletion no longer redirects to the first page
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
ticket: DM-3901
version: 1020.28.4
---
Previously, when deleting an entry in a data grid that was not on the first page, users were unexpectedly redirected back to the first page of the grid. This behavior has now been changed. After deleting an entry, users will remain on the same page they were on before the deletion. This change affects all data grids throughout the application where deletion is possible.
