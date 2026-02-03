---
date: '2025-05-15'
title: Resolved issues in LWM2M composite write and binary data read operations
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4560
version: 1021.10.7
---
The LWM2M composite write operation successfully updated multiple resources on the device, but incorrectly displayed the values as a single consolidated resource object. This issue has been fixed. Additionally, an issue with the incorrect representation of binary data and core link data on logging event texts, shown when logging verbosity is increased for the device, has been fixed.
