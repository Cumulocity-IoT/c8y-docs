---
date: 2023-12-06T16:02:04.873Z
title: Fixed issues with LWM2M device registration
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area:
  - value: product_area-m1iHjqikD
    label: Device Management
component:
  - value: component-1KLUzmqfe
    label: LWM2M
technical_component:
  - value: tc-QHwMfWtBk7
    label: cumulocity
jira: DM-2270
version: 10.18.69.0
---
In certain cases, the registration couldn't be associated with a LWM2M 1.1 SEND request, leading to a 4.04 CoAP response. This is now fixed.
