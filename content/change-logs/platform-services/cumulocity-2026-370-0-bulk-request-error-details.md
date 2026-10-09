---
date: 
title: Error responses of inventory and measurement bulk requests identify the failed element
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-67179
version: 2026.370.0
---

Previously, the error response of a failed bulk request did not tell you which element caused the error.
A server error during a bulk create also left part of the request created, and you could not find out which part.
Now, when the error belongs to one element of a bulk create, bulk update, or bulk measurement create, the error response contains a `bulkRequest` object.
Its `failedIndex` is the position of that element in the request.
If part of a bulk create was already created, `bulkRequest` also contains `fragmentType`. Use it to find the created managed objects and re-send only the missing ones, without creating duplicates.

Bulk create now validates all managed objects and checks their external identifiers before it creates anything, so an invalid managed object no longer leaves part of the request created.

For details, refer to the [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource), [Update multiple managed objects at once](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectCollectionResource), and [Create a measurement](https://{{< domain-c8y >}}/api/core/#operation/postMeasurementCollectionResource) operations in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/).
