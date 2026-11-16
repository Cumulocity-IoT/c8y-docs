---
date: '2024-10-24'
title: Special character encoding in OPC UA device types is now available
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-2442
version: 10.20.88.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when creating an OPC UA device type with special characters in any of the fields, the gateway was not reading it correctly which caused an error while creating mappings. This issue is now fixed, the gateway encodes and decodes special characters as expected.  
