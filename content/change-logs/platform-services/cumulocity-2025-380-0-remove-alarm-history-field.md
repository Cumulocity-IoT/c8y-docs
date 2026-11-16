---
date: '2025-12-04'
title: History field removed from the Alarm API
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-57209
version: 2025.380.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The deprecated `history` field has been removed from the Alarm API. Previously, this field always returned 
an empty list. The field is no longer returned by the API, allowing it to be used as a custom fragment.
