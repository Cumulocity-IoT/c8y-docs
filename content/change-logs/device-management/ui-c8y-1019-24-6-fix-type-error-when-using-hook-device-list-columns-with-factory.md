---
date: '2024-06-06'
title: Fixed type error when using hookDeviceListColumns with factory
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
ticket: DM-3308
version: 1019.24.6
---
In {{< product-c8y-iot >}}, the `hookDeviceListColumns` API allows customizing the columns displayed in the device list. However, when using this API with a factory, a type error occurred, and explicit type casting was needed. This issue has now been resolved.
