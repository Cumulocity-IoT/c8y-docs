---
date: '2026-03-31'
title: Added operation request counters to usage statistics
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-61325
version: 10.20.611.0
---
Two new properties, `operationsCreatedCount` and `operationsUpdateCount`, have been added to all REST endpoints which will return detailed request counters for usage statistics. 
In a first implementation step, the {{< product-c8y-iot >}} platform returns these properties with `0` values. 
In a future implementation, counting logic in reaction to REST requests and MQTT messages creating and updating operations will be added.  


