---
date: ""
title: prevent duplicate property names in Propert… (#10855) [GRAFT][release/cd] (#11005)
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
ticket: MTM-65556
version: 1023.23.1
---
Users could save multiple properties with the same name in the Properties Library (tenant custom properties). Only one would display in the tenant custom properties tab. Duplicate name validation has been added to the name field, showing an error when a property with the same name already exists and disabling the save button until a unique name is provided.