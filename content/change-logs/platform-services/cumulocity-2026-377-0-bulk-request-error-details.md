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
version: 2026.377.0
---

Previously, the error response of a failed bulk request did not tell you which element caused the error.
A server error during a bulk create also left part of the request created, and you could not find out which part.
Now, when the error belongs to one element of a bulk create, bulk update, or bulk measurement create, the error response contains a `bulkRequest` object.
Its `failedIndex` is the position of that element in the request, counted from 0. If several elements are invalid, the lowest position is reported.
An error that belongs to the whole request, for example, more than 50 managed objects or none, has no `bulkRequest` object.

**Bulk create**

Bulk create now validates all managed objects and checks their external identifiers before it creates anything, so an invalid managed object no longer leaves part of the request created.
Part of the request can be created only when a failure occurs while the managed objects are created, for example, when a concurrent request binds the same external identifier, or when the datastore fails.
The `managedObjects` array of the response has the same order as the request.

If part of the request may have been created, `bulkRequest` also contains `fragmentType`.
Each managed object created by the request carries this fragment, with its position in the request, for example, `"c8y_BatchId_7c8e1e0a-3b2f-4f6e-9a51-5d2c7e4b9f10": { "index": 3 }`.
The fragment is not included in the response or in the notifications about the created managed objects, and it is removed when the bulk request succeeds. If this removal fails, the response is still successful and the fragment stays.
Fragments starting with `c8y_BatchId_` are reserved and are dropped from managed objects that you create.

To complete the request without creating duplicates, follow these rules:

1. Look up the created managed objects with `?fragmentType=<fragmentType>&pageSize=<number of managed objects in the request>`.
2. If the lookup fails, retry the lookup, never the bulk request.
3. Re-send only the managed objects the lookup did not return.
4. The lookup is authoritative for which managed objects exist, including the managed object at `failedIndex`.
5. Any managed object the lookup returns may have incomplete external identifiers or group assignment.

The `c8y_BatchId_` fragment of the managed objects found by the lookup stays until you remove it, for example, with a bulk update that sets it to `null`.

**Bulk update**

Bulk update validates all managed objects and checks that they exist before it updates anything.
Each ID can now occur only once in the request. A request with a duplicate ID is rejected with the status code 422 and no `bulkRequest` object.
If the request fails while the managed objects are updated, for example, when the datastore fails, part of them may have been updated. Retrieve the managed objects by their IDs to find out their current state.

**Validation**

A managed object `name` or `type` longer than 1000 characters, or `externalIds` in an update request, is now rejected with the error `undefined/validationError` instead of `inventory/Invalid Data`. The status code stays 422.
The same limit now also applies when you upload a binary, which previously accepted a longer `name` or `type`.

For details, refer to the [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource), [Update multiple managed objects at once](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectCollectionResource), and [Create a measurement](https://{{< domain-c8y >}}/api/core/#operation/postMeasurementCollectionResource) operations in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/).
