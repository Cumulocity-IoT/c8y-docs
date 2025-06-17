---
date: ""
title: OPC UA partial address scan
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2039
version: 1022.3.0
---
The OPC UA protocol now supports partial address scan which allow scanning only a subset of nodes instead of the full address space. This improves the performance and reduces the memory consumption of the gateway, especially for servers with large address spaces. The partial address scan can be configured using the new OPC UA server configuration properties for partial address scan on node filters.