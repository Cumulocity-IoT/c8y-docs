---
date: '2023-12-06'
title: Improved fragmentType query parameter
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-kxtzZZRqL
    label: 3rd-party libraries
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-51379
version: 10.18.86.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Fixed an issue where deleting enhanced time series measurements did not work with the <code>fragmentType</code> query parameter.
