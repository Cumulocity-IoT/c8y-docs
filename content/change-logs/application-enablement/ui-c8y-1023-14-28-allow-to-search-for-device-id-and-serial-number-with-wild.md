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
The new wildcard search did not support searching for IDs like the internal inventory ID or the external `c8y_Hardware.serialNumber`. With this change, support for searching for these IDs has been added. The internal ID uses an exact match, while the serialNumber also supports a "partly includes" matching. This helps to find a device faster, even if you only know the external ID. Note that the IDs are not shown in the returned results.