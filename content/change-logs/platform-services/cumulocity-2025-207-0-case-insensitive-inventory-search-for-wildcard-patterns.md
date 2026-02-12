---
date: '2025-07-03'
title: Inventory search with wildcards becomes case-insensitive
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
ticket: MTM-62622
version: 2025.207.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

To improve the user experience when searching the inventory by a particular property, the {{< product-c8y-iot >}} platform changes
its behavior for searches by filter with wildcards. Queries using the [query language](https://cumulocity.com/api/core/#tag/Query-language) with wildcards now behave case-insensitive. Previously, such queries were processed with a case-sensitive strategy. 

Example request: <br/>
`GET /inventory/managedObjects?query=name+eq+'my-device*` <br/>
can now return devices with names equal `'my-device01'` or `'My-Device02'`.

Queries without a wildcard character remain unchanged and use the exact match for optimal performance. This means that the example request: <br/>
`GET /inventory/managedObjects?query=name+eq+'My-device01'` <br/>
will not return a device with a name equal `'my-device01'`.

