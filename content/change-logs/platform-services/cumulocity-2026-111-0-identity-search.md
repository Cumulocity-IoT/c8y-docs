---
date: ''
title: New REST endpoint for looking up global identifiers
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
ticket: MTM-66381
version: 2026.111.0
---

{{< product-c8y-iot >}} now provides a new REST API endpoint for looking up global identifiers
given a list of external identifiers. This endpoint allows to prepare batch inventory requests in situations
where external identifiers are known and global identifiers need to be looked up first.

This is useful in scenarios where recently added bulk inventory operations are needed. Those bulk inventory operations
require global identifiers, but in some customer systems only external identifiers are available. With old API customer
needed to retrieve global identifiers one request per identifier. This new endpoint allows to prepare a bulk update request
for managed objects with much less HTTP overhead.

For details, refer to the [identity search operation](https://{{< domain-c8y >}}/api/core/#operation/postIdentitySearch) 
in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#tag/Identity-API).
