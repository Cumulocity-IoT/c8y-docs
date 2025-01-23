---
date: '2025-01-16'
title: >-
  Preventing execution of operations on resource instance level for LWM2M 1.0
  devices
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Device Management & Connectivity
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4225
version: 1021.0.0
---

The LWM2M resource instance level operations have been introduced in LWM2M 1.1 but are not supported by LWM2M 1.0 devices.
When LWM2M resource instance level operations (Example: `read /5/0/8/0`) against a LWM2M 1.0 device are created, the operation will now directly fail and not be sent to the device.
