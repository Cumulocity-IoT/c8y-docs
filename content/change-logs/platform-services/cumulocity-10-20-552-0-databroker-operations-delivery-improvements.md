---
date: 2024-09-11
title: "Data broker operations delivery improvements"
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-V6J_FcOT2
    label: Data broker
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-60479
version: 10.20.552.0
---
Data broker operations created on the destination tenant were not reliably forwarded to the source tenant during network interruptions. With this change, a robust retry mechanism has been introduced that ensures operations are delivered reliably, regardless of network stability. Users can now expect consistent data synchronization and improved reliability in data broker operations.
