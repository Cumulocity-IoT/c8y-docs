---
date: ""
title: Unit is now added when the data point unit is empty and the measurement has a unit
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
ticket: MTM-66548
version: 1023.14.166
---
When a new measurements is added, the data graph widget tooltip now properly displays the unit of measurement even when the data point itself does not have a unit defined. Previously, if a data point lacked a unit value, the measurement's unit would not be shown, making it unclear what unit the data was measured in. This change improves data clarity and helps you better understand the measurements in your dashboards without having to manually add units to each data point.