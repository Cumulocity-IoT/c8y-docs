---
date: '2023-12-06'
title: Reliable processing of OPC UA device protocols exceeding 1000 items
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2634
version: 10.18.253.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The application of OPC UA device protocols was unreliable when there were more than 1000 protocols. This is now fixed.
