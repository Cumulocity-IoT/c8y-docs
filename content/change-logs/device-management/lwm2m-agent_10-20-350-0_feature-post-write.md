---
date: 2024-09-19
title: LWM2M write operation using "Partial Update" mode is now fully supported
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-2948
version: 10.20.350.0
---
Previously, the LWM2M agent supported write operations in "Replace" mode only. With this change, write operations can now also be sent in the "Partial Update" mode using the "writep" command.