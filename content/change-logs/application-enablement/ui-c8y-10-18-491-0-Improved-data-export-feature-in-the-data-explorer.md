---
date: '2023-12-06'
title: Improved data export feature in the data explorer
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-50586
version: 10.18.491.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The data export feature in the data explorer has been improved. Now only active data points are included. Moreover, the name of the exported file includes the name of the series. This file contains all measurements in which this series is found.
