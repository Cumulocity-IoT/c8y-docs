---
date: '2025-06-26'
title: List of asset properties available when creating custom columns
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4563
version: 1021.80.0
---
In data grid views, when adding a custom column, you can now search through a list of asset property definitions when the Digital Twin Manager (DTM) asset API is available. The column header and path are filled in automatically. If the DTM service cannot be reached, the application falls back to the previous dialog, so existing workflows continue to work.
