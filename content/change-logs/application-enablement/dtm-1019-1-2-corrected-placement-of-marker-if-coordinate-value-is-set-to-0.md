---
date: 2023-12-14
title:  Corrected placement of marker if coordinate value is set to "0"
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
ticket: CTM-995
version: 1019.1.2
---
The marker is now shown at the center of the map when one or both of the values for latitude and longitude is "0" for the Location property. Previously, the marker was not centrally displayed, requiring users to manually zoom in to locate it.