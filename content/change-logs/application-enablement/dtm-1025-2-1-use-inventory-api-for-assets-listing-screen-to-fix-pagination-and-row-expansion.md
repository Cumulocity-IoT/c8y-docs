---
date: ""
title: "Use Inventory API for assets listing screen to fix pagination and row expansion."
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2895"
version: "1025.2.1"
---
The Assets screen in Digital Twin Manager experienced pagination and
row-expansion issues when displaying large datasets. The DTM Assets list
API failed when **withSubAssets: true** was set, which caused issues. As
a workaround, the Assets screen now uses the Cumulocity Inventory API
instead of the DTM Assets API for fetching root-level assets and
asset-by-type queries. This provides reliable pagination and correct
row-expansion behavior.