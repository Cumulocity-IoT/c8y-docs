---
date: ""
title: Scheduling bulk operations with a precise delay now works properly
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4183
version: 1021.11.1
---
In the {{< product-c8y-iot >}} platform, bulk operations allow performing actions on multiple devices simultaneously. However, scheduling these operations with a delay in milliseconds was not working as expected. This issue has now been resolved. With this fix, bulk operations can now be scheduled with precise delays specified in milliseconds, enhancing the reliability and efficiency of device management tasks.