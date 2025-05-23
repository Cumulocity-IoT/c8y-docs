---
date: ""
title: Response interval value removed when user clears the input
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
ticket: DM-4743
version: 1021.22.82
---
In some cases, the response interval was shown even when it was not needed, for example, when there was no response expected from the device. This has now been changed so that the response interval is only shown when it is actually needed based on the operation being performed. This change improves clarity for users by not displaying unnecessary information.