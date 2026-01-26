---
date: 2026-03-31
title: Default y-axis no longer automatically includes 0
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
ticket: MTM-65560
version: 1023.14.35
---
The "Data graph" widget and the data explorer previously defaulted the y-axis to always include 0, which could make visualizations less readable when the data range did not span zero. This behavior was different from the former widget and sometimes required manual adjustments to get a meaningful view. The default y-axis behavior has now been changed so it no longer automatically starts at 0, aligning it with the legacy widget. Users can still choose to force the y-axis to start at 0 using the available option. As a result, charts and graphs now scale more appropriately by default while retaining the flexibility to include 0 when needed. This improves readability for most datasets without requiring manual configuration.