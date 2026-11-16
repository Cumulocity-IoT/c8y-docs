---
date: '2024-11-21'
title: Device dashboards displayed for all devices
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61691
version: 1021.3.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Retrieving the device context dashboards did not work as expected if the device had a space in its type. As a result, it was impossible to view such devices as the dashboard is by default the initial view for devices in the Cockpit application. This issue has been fixed and the device dashboard is always displayed.
