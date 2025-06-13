---
date: ""
title: List of asset property definitions for data grid custom columns
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
In the data grid views, where custom columns are used the “Add custom column” dialog shows a searchable list of asset-property definitions when the Digital Twin Manager (DTM) asset API is available. Choosing a property automatically sets the column’s header and path, eliminating manual typing.
If the DTM service cannot be reached, the application transparently falls back to the previous dialog, so existing workflows continue to work.