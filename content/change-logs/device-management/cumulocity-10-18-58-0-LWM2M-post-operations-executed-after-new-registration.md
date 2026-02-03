---
date: 2023-12-06T16:04:55.242Z
title: LWM2M post-operations executed after new registration
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2100
version: 10.18.58.0
---
Multi-line LWM2M post-operations were not executed right after the LWM2M device's new registration when realtime was disabled for the tenant who owns the device. As a result the device might not receive these operations until the next LWM2M device's registration update. This issue is now resolved and LWM2M post-operations are executed right after the LWM2M device's new registration, no matter whether realtime is enabled or not for this kind of devices.
