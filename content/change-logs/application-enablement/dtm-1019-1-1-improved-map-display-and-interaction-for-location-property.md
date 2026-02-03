---
date: 2023-12-14
title:  Improved map display and interaction for Location property in subassets
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
ticket: CTM-898
version: 1019.1.1
---
Users can now view the map on the **Subassets** page only when both values (latitude/longitude) of the Location property are available; if any or both of the values are missing, the map remains hidden. Additionally, the marker is not shown on the map if any one of the values is missing. Clicking anywhere on the map in edit mode will update the corresponding fields automatically.