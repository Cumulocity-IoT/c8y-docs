---
date: ""
title: Measurement's unit is now displayed even if the data point has no unit defined
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
When a new measurement is added, the "Data graph" widget tooltip now properly displays the measurement's unit, even when the data point itself does not have a unit defined. Previously, if a data point lacked a unit, the measurement's unit would not be shown, making it unclear which unit the data was measured in. This change improves data clarity and helps you better understand the measurements in your dashboards without having to manually add units to each data point.