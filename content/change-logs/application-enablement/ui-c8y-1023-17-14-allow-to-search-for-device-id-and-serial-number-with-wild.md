---
date: ""
title: allow to search for device id and serialNumber with wild card search (#10591) [GRAFT][release/cd] (#10723)
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
version: 1023.17.14
---
The new wildcard search did not support searching for IDs like the internal inventory ID or the external `c8y_Hardware.serialNumber`. With this change, support for searching for these IDs has been added. The internal ID uses an exact match, while the serialNumber also supports a partial matching. This helps to find a device faster, even if you only know the external ID. Note that the IDs are not shown in the returned results.