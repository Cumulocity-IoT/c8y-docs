---
date: 2023-12-06
title: Removed data field from realtime API handshake responses
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-55522
version: 10.18.371.0
---
The <code>data</code> field has been removed from realtime API handshake responses where it was not required and always had a "null" value.
