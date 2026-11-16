---
date: '2023-12-14'
title: Set limit for key length
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: 'CTM-646,CTM-673,CTM-658'
version: 1019.1.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The key for assets, properties and models is set to 254 characters maximum to ensure consistent behavior with other {{< product-c8y-iot >}} applications.
