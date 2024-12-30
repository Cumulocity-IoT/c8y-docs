---
date:
title: Preventing resource instance level operation execution for LWM2M 1.0 devices
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
version: 2.1.0
---

The LwM2M resource instance level operations are introduced in LwM2M 1.1 and are not supported for LwM2M 1.0 devices.
This is now incorporated in {{< product-c8y-iot >}} platform operations.
When the LwM2M resource instance level operations are created in the {{< product-c8y-iot >}} platform such as read /5/0/8/0 against a LwM2M 1.0 device, the operation will be directly failed by the LWM2M service and will not sent to the device.