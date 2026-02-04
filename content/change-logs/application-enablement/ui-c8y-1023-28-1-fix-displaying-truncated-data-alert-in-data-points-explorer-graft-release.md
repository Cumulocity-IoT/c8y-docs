---
date: ""
title: Data points explorer now displays alert when data is truncated
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
---
The data points explorer previously did not inform users when the displayed dataset was truncated due to size limitations, which could lead to incomplete analysis or misinterpretation of results. Now, when data exceeds the display threshold and is truncated, the data points explorer displays a clear alert to notify you of this condition. This ensures you are always aware when you are viewing a subset of the available data rather than the complete dataset, allowing you to take appropriate action such as applying filters or adjusting your query parameters to work with a more manageable dataset.