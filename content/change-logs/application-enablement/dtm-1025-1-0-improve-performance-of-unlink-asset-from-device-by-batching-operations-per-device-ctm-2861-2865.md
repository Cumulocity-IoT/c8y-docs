---
date: ""
title: "Improve performance of unlinkAssetFromDevice by batching operations per device. [CTM-2861] (#2865)"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-2c7RdTdXo4"
      label: "Improvement"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2861"
version: "1025.1.0"
---
Optimized unlinkAssetFromDevice(...) by grouping operations per device,
reducing redundant lookups and ensuring a single update or delete per
device instead of per linked series.