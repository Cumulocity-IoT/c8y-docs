---
date: 2023-12-06T10:14:00.732Z
title: Numeric fields can now be defined using textual representations
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-wWIzHJ12j
    label: Cloud Fieldbus
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2691
version: 10.18.483.0
---
Previously, the CAN bus protocol limited the representation of numeric values in the maximum value field, which posed limitations when dealing with exceptionally large numbers. To address this limitation, we have implemented a transformation mechanism that allows numeric fields to be defined using textual representations.
