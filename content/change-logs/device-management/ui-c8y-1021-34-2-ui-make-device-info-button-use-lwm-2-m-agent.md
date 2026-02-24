---
date: '2026-03-31'
title: Integration of delete button in Info tab for LWM2M devices
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3538
version: 1021.34.2
---
Previously, the **Delete** button on the **Info** tab in the device details was not integrated for LWM2M devices and an additional cleanup operation was required. This button is now integrated for LWM2M devices so that they can be properly deleted. For more details see the [LWM2M user documentation](/device-integration/lwm2m/#device-deletion).