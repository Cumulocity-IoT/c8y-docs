---
date: '2026-10-19'
title: SmartREST template endpoint now returns only SmartREST templates
product_area: Platform services
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68002
version: 2026.374.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-19'
  - label: apj.cumulocity.com
    date: '2026-10-20'
  - label: jp.cumulocity.com
    date: '2026-10-20'
  - label: us.cumulocity.com
    date: '2026-10-21'
  - label: cumulocity.com
    date: '2026-10-21'
---
Strict type filtering has been implemented on the `GET /inventory/templates/{templateId}` endpoint. It now exclusively returns inventory objects of type SmartREST template. For details, see [SmartREST 1.0](/smartrest/smartrest-one/).
