---
date: '2023-12-06'
title: SmartREST Inventory GET templates issue fixed
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device management & connectivity
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2126
version: 10.18.7.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
SmartREST Inventory GET templates created in the UI did not generate responses when there was no external ID type declared in the template. This issue has been addressed for both existing and newly created templates.
