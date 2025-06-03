---
date: ""
title: List reload loop in bulk operation details view has been fixed
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
ticket: DM-4720
version: 1021.22.88
---
In the expanded details section of a bulk operation in the **Bulk operations** view, the list of single operations was reloaded too frequently for bulk operations with short delay interval between the single operations which made interaction with the view difficult in the time single operations were created. To avoid this, a throttling of 30 sec. has been introduced. Bulk operation details are still updated in realtime (when activated), the operations list is however is re-loaded only every 30 sec. (or rarely if the delay time is higher). Additionally, the operations list has been replaced by a data grid which makes navigation through large lists of single operations better.