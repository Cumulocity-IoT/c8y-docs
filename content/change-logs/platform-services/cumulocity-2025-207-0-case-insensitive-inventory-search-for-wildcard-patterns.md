---
date:
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
---

To provide better user experience for searching inventory by particular property the {{< product-c8y-iot >}} platform changes
the behavior of search by filter with wildcards. From now on queries using [query language](https://cumulocity.com/api/core/#tag/Query-language) with wildcards will behave case-insensitive. Previously such queries were processed with case-sensitive strategy. 

Example request: <br/>
`GET /inventory/managedObjects?query=name+eq+'my-device*` <br/>
can return now devices with name equal `'my-device01'` or `'My-Device02'`.

Queries without wildcard character remain unchanged and use exact match for optimal performance. This means that example request: <br/>
`GET /inventory/managedObjects?query=name+eq+'My-device01'` <br/>
will not return device with name equal `'my-device01'`.

