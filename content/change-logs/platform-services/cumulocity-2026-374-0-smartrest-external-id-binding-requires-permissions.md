---
date:
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
version:
---
An authorization check has been implemented on the `POST /inventory/templates/globalId/{globalId}/externalId` endpoint. It now requires the IDENTITY_ADMIN role, ownership of the inventory object, or a MANAGED_OBJECT ADMIN device permission for it. For details, see [SmartREST 1.0](/smartrest/smartrest-one/).