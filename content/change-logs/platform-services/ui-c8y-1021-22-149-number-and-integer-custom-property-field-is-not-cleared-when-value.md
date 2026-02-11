---
date: ""
title: Number and integer custom property field is not cleared when value is removed fix.
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61883
version: 1021.22.149
---
Issue was occurring on Custom properties form in Subtenant details view. If user was trying to set exsiting number value of one of the properties to empty one, this value was not persisted. Issue is fixed now and all the values can be set to empty.