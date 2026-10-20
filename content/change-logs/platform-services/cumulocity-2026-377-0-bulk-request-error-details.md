---
date: '2026-10-19'
title: >-
  Error responses of inventory and measurement bulk requests identify the failed
  element
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
version: 2026.377.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-19'
  - label: apj.cumulocity.com
    date: '2026-10-20'
  - label: jp.cumulocity.com
    date: '2026-10-20'
---

Previously, the error response of a failed bulk request did not tell you which element caused the error,
and a bulk create that failed part way left part of the request created without a way to find out which part.
Now, when the error belongs to one element of a bulk create, bulk update, or bulk measurement create, the error response contains a `bulkRequest` object with the position of that element in `failedIndex`.

Bulk create and bulk update now check all managed objects before writing anything, so an invalid managed object no longer leaves part of the request created or updated.
If a bulk create fails while writing, `bulkRequest.fragmentType` lets you find the managed objects that were created and complete the request without duplicates.
Bulk update now rejects a request that contains the same ID more than once.

A managed object `name` or `type` longer than 1000 characters, or `externalIds` in an update request, is now rejected with the error `undefined/validationError` instead of `inventory/Invalid Data`. The status code stays 422.
The same limit now also applies when you upload a binary.

For details, refer to the [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource), [Update multiple managed objects at once](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectCollectionResource), and [Create a measurement](https://{{< domain-c8y >}}/api/core/#operation/postMeasurementCollectionResource) operations in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/).
