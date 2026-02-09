---
date: '2026-02-06'
title: Data explorer now displays alert when data is truncated
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65974
version: 1023.28.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-06'
---
The data explorer previously did not inform users when the displayed dataset was truncated due to size limitations, which could lead to incomplete analysis or misinterpretation of results. Now, when data exceeds the display threshold and is truncated, the data explorer displays a clear alert. This ensures you are always aware when you are viewing a subset of the available data rather than the complete dataset, allowing you to take appropriate action, such as applying filters or adjusting your query parameters to work with a more manageable dataset.
