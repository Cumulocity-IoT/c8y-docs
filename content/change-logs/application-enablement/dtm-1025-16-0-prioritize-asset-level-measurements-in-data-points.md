---
date: ""
title: "Prioritize Asset-Level Measurements in Data Points"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3335"
version: "1025.16.0"
---
Previously, the latest measurement was always fetched from the linked
device. Now, asset-level measurements are prioritized when available,
with device-level measurements used as a fallback. For direct
measurements on an asset, no status/type is displayed, unless the
measurement is created by the Data Service, in which case the source
status is retained.