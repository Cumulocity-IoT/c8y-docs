---
date: '2026-05-14'
title: Binding external identifiers when creating managed objects
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-66625
version: 2026.138.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-14'
---

{{< product-c8y-iot >}} now provides the ability to bind external identifiers within managed object
creation operations. Both single managed object creation and bulk creation support creating
external identifier binding within a single request.

For details refer to the [create one or multiple managed objects operation](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) 
in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#tag/Identity-API).
