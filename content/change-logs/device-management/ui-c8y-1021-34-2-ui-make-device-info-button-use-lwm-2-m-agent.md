---
date: ""
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
Previously, the **Delete** button on the **Info** tab in the device details were not integrated for LWM2M devices and an additional cleanup operation was required. Now this button is integrated for LWM2M device and LWM2M devices can now be properly deleted. For more details see [user documentation](/protocol-integration/lwm2m/#device-deletion).