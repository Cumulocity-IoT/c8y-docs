---
date: '2025-06-19'
title: Improved operations list reload functionality in bulk operations details
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
version: 1021.77.2
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the details section of a bulk operation in the **Bulk operations** page, the list of single operations was reloaded too frequently for bulk operations with a short delay interval between the single operations. This made interaction with the page difficult when single operations were created. To avoid this, a throttling of 30 seconds has been introduced. Bulk operation details are still updated in real-time (when activated), but the operations list is only reloaded every 30 seconds (or rarer if the delay time is higher). Additionally, the operations list has been replaced with a data grid, which improves navigation through large lists of single operations.
