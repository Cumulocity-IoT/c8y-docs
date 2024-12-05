---
date: ""
title: Bulk operation scheduling delay in milliseconds now works properly
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
In the Cumulocity IoT platform, bulk operations allow performing actions on multiple devices simultaneously. However, the scheduling delay in milliseconds for these operations was not working as expected. This issue has now been resolved. With this fix, bulk operations can be scheduled with a delay specified in milliseconds, providing more precise control over when the operations are executed on the target devices. This improvement ensures that bulk operations are carried out according to the specified delay, enhancing the reliability and efficiency of device management tasks.