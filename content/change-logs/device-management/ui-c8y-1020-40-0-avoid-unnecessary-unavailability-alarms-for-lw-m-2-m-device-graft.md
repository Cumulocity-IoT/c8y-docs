---
date: ""
title: Avoid unnecessary unavailability alarms for LwM2M devices
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3770
version: 1020.40.0
---
"Automatic setting of required interval" option is added to LwM2M device's LWM2M Configuration UI Device.
This is made configurable so that unavailability alarms will only be triggered when an LwM2M device is truly unavailable, reducing the number of false alarms.
When this setting is enabled, the LWM2M service automatically sets the interval to device's registration lifetime plus 2 minutes.
When this setting is disabled, user can define a required interval for the device from the Device Info dashboard.
When this setting is set to default, it will use the default behavior of LWM2M service.