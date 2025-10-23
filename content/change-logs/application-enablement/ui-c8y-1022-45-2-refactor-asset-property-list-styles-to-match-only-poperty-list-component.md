---
date: ""
title: Refactor asset property list styles to match only PopertyListComponent
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
ticket: MTM-64972
version: 1022.45.2
---
Asset property list component target styles was previously affecting also Device protocol creation modal for OPC UA causing it non-functional. Now this stylesheet is targeted more precisely and Device protocol creation modal is not affected.