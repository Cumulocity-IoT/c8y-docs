---
date: ""
title: "Latest value column prefers the asset's own measurements"
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
The **Latest value** column of the **Data points** tab now shows the latest measurement of the asset itself. Only when the asset has no measurement for a data point yet does it show the latest measurement of the linked source device. The tooltip of the value now shows when it was measured.

For a measurement created directly on the asset, the **Status** column stays empty. For a measurement that the DTM Data Service propagated from the source device, it shows the status of the link, for example **Linked**.
