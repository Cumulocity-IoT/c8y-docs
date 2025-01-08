---
date: ""
title: Device profile now includes software type information
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
ticket: DM-4273
version: 1021.30.0
---
Previously, device profiles did not include software type information for their software items. With this update, newly created device profiles will now include software type information. Additionally, device profile operations for devices that support advanced software management will also include software type information, while operations for devices without advanced software management will continue to exclude it.