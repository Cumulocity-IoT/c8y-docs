---
date: 2024-03-27
title: Markers correctly displayed in the Map widget
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: IOT-19589
version: 1019.1.8
---
When assets with location were imported in bulk, markers in the "Map" widget were not shown due to an incompatible data type of latitude and longitude values. Aligning the data type to number now correctly displays the markers on the map.
