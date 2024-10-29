---
date: ""
title: Field now updated when selecting an item from a typeahead list
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
ticket: DM-3877
version: 1020.35.1
---
The typeahead component allows users to quickly find and select an item from a list as they type. Previously, when a user selected an item from the typeahead list, the associated field would not update with the selected value. Now, when a user selects an item from the list, the associated field will immediately be updated with the selected value.