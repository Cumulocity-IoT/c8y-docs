---
date: 2023-12-06T13:50:41.045Z
title: Improved filter by software type
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Device management & connectivity
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2809
version: 10.18.497.0
---
In the <b>Software</b> tab in the device details, currently the <b>Filter by software type</b> dropdown in the <b>Installed software</b> list and the <b>Install software</b> modal shows types based on existing types in the software repository. This has been changed to show only the supported software types announced by the device in its <code>c8y_SupportedSoftwareTypes</code> fragment. If a device has not announced supported software types, then again all available existing software types are listed.
