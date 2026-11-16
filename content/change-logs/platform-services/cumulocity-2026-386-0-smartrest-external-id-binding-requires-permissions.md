---
date: '2026-10-26'
title: Binding a SmartREST external ID now requires permissions for the target object
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
ticket: MTM-68003
version: 2026.386.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-26'
  - label: apj.cumulocity.com
    date: '2026-10-27'
  - label: jp.cumulocity.com
    date: '2026-10-27'
  - label: us.cumulocity.com
    date: '2026-10-28'
  - label: cumulocity.com
    date: '2026-10-28'
---
An authorization check has been implemented on the `POST /inventory/templates/globalId/{globalId}/externalId` endpoint. It now requires the IDENTITY_ADMIN permission, ownership of the managed object identified by `{globalId}`, or a MANAGED_OBJECT ADMIN device permission for that managed object. For details, see [SmartREST 1.0](/smartrest/smartrest-one/).
