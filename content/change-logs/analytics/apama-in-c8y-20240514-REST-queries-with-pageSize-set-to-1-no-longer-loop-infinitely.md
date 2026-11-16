---
date: '2024-06-11'
title: REST queries with pageSize set to 1 no longer loop infinitely
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-34761
version: 25.146.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The {{< product-c8y-iot >}} transport had a regression (introduced in Streaming Analytics 10.16) that could cause REST queries to infinitely loop if `pageSize` was set to 1. This is now fixed.
