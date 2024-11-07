---
date: ""
title: Avoid unnecessary unavailability alarms for LwM2M device GRAFT (#7392)
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3770
version: 1018.503.126
---
A new **Automatic setting of required interval** option has been added to the configuration of LWM2M devices. This setting is configurable so that unavailability alarms will only be triggered when an LWM2M device is truly unavailable, reducing the number of false alarms. For more details see [LWM2M configuration](protocol-integration/lwm2m/#lwm2m-configuration).