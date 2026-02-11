---
date: '2023-12-06'
title: Multiple realtime API subscriptions issue resolved
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-QWPx3rFfn
    label: Java SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-55422
version: 10.18.395.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Resolved an issue where multiple realtime API subscriptions in quick succession could cause an invalid subscription state, leading to subscriptions receiving duplicate notifications.
