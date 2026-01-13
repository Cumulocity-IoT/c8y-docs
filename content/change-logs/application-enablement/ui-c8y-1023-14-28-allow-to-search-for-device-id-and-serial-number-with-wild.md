---
date: ""
title: wildcard search support for device ID and c8y_Hardware.serialNumber
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65678
version: 1023.14.28
---
The new wildcard search was not supporting to search for IDs like the internal inventory id or the external `c8y_Hardware.serialNumber`. With this change, we introduced also support to search for those IDs. The internal id using an exact match, while the serialNumber also supports a partly includes matching. This will help, to find the right device faster also by only knowing the external id. Note that the IDs are not shown in the returned results.