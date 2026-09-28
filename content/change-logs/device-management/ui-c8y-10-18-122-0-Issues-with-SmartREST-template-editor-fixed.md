---
date: '2023-12-06'
title: Issues with SmartREST template editor fixed
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2093
version: 10.18.122.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the SmartREST template editor, issues with the presentation of the <b>External ID type</b> field for Inventory POST messages have been fixed. Under <b>CSV preview</b> the generated "Template creation CSV" has been adjusted to include the "ID", "externalId" and "externalIdType" values.
