---
date: ""
title: "DTM Data Service now reports billing metrics"
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
ticket: "CTM-3272"
version: "2.0.0"
---
DTM Data Service now reports measurement metrics to {{< product-c8y-iot >}} billing for every subscribed tenant, providing better visibility into how measurement data is processed. The metrics cover measurements received, created, and reprocessed. Created and reprocessed measurements are further categorized as persistent or transient, helping you distinguish between data that is stored and data that is processed without being stored.