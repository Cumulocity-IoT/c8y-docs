---
date: ""
title: Remove column custom popover and replace with ngx-bootstrap
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
ticket: DM-5058
version: 1023.75.2
---
The device management app previously used a custom popover component for column headers that had limited functionality and required custom maintenance. The popover component has been replaced with ngx-bootstrap, which provides a more robust and standardized popover implementation. This change improves the reliability and consistency of the popover behavior in the device management app, and reduces the maintenance burden by using a well-supported third-party library instead of a custom solution. Existing column popovers in the device management app will now use the ngx-bootstrap implementation without any action required from you.