---
date: ""
title: "add withSubAssets parameter when assigning subassets"
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
ticket: "CTM-3204"
version: "1025.12.0"
---
Adds a withSubAssets query parameter to the sub-asset assignment
endpoints so callers can skip expanding the parent’s full sub-asset
collection in the response (avoiding costly multi-page inventory reads
for parents with lots of subAssets or childDevices).