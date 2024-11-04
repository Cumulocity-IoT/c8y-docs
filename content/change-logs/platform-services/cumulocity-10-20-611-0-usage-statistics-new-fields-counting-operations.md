---
date:
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
Two new properties: `operationsCreatedCount`, `operationsUpdateCount` were added to all REST endpoints returning usage statistics detailed requests counters. 
At the first step of this new feature {{< product-c8y-iot >}} returns those values always equal `0`. 
Implementation of counting logic in reaction to REST requests and MQTT messages creating and updating operations will be added in the following changes to the 10.20 release.  


