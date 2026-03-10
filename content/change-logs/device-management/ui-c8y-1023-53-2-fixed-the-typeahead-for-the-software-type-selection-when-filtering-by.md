---
date: '2026-03-06'
title: Software type filter now maintains selected value
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-5654
version: 1023.53.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-06'
  - label: apj.cumulocity.com
    date: '2026-03-09'
  - label: jp.cumulocity.com
    date: '2026-03-09'
---
When filtering software by type, the typeahead field did not consistently preserve or display the selected software type. In some cases, the selection state became inconsistent, making filtering behavior confusing. This issue has been resolved. The typeahead field now correctly maintains the selected value and reliably filters results based on the chosen software type.
