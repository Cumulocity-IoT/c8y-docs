---
date: 
title: Removed Redundant "LWM2M Device Send" event in VERBOSE logging
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4867
version: 1021.10.30
---
LWM2M Service is now utilizing {{< product-c8y-iot >}}'s Notificationa 2.0 tenant-level operation subscriptions to retrieve the device operations in real-time. This enhances the service's overall performance.
Please note that when this mode is active, device push notifications will no longer appear as active in the Device info widget.
This is because they are now managed through tenant-level subscriptions rather than device-level subscriptions.