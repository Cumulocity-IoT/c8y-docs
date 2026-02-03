---
date: "2024-02-06"
title: Fixed issues with outgoing requests to DCP API
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-3003
version: 10.20.4.0
---
The sms-gateway agent sent outgoing requests with the content type "application/xml" which is not recognized by the DCP API. This has been fixed and outgoing requests are now sent with the content type "application/json".
