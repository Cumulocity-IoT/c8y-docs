---
date: '2026-10-13'
title: SmartREST template endpoint now returns only SmartREST templates
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68002
version: 2026.374.0
---
Implemented strict type filtering on the `GET /inventory/templates/{templateId}` endpoint. It now exclusively returns inventory objects of type SmartREST template. For details, see [SmartREST 1.0](/smartrest/smartrest-one/).
