---
date: 2025-09-18
title: LWM2M service utilization of Notifications 2.0 tenant-level operation subscription
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
ticket: DM-4867
version: 1021.10.30
---
The LWM2M service is now utilizing {{< product-c8y-iot >}}'s Notifications 2.0 tenant-level operation subscriptions to retrieve device operations in real time. This enhances the service's overall performance.
Note that when this mode is active, device push connections will no longer appear as active in the **Info** tab of the device details.
This is because they are now managed through tenant-level subscriptions rather than device-level subscriptions.