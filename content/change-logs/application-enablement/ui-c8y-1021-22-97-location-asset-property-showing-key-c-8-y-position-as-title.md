---
date: ""
title: Asset location property shows proper name as title
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63833
version: 1021.22.97
---
In the Device Management application, the Location asset property previously displayed the internal key "c8y_Position" instead of a user-friendly title. This change improves the usability by now showing a proper title for the Location property. The change is visible for all assets that have the c8y_Position property.