---
date: '2026-11-XX'
title: >-
  Java SDK supports bulk create and update of managed objects
product_area: Application enablement & solutions
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: QWPx3rFfn
    label: Java SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68529
version: 2026.60.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

The REST API accepts bulk requests for inventory managed objects (from version 2026.377.0 of {{< product-c8y-iot >}} Core), but the Java SDK had no methods for them. The `InventoryApi` of the Java SDK now provides `createBulk()` and `updateBulk()`, which create or update up to 50 managed objects with a single request.

When a bulk request fails for one element, the SDK throws the new `BulkRequestException`. It extends `SDKException`, so existing `catch (SDKException e)` blocks keep working. The exception provides `getFailedIndex()`, the position of the failed element in the request, and `getFragmentType()`. After a bulk create that failed while writing, `getFragmentType()` identifies the created managed objects, so you can complete the request without duplicates. `MeasurementApi.createBulk()` now throws the same exception, with `getFragmentType()` always `null`.

The `InventoryApi` interface has two new abstract methods `createBulk` and `updateBulk`, and the `RestOperations` interface has a new `put` method with a response class parameter. 

{{< c8y-admon-caution >}}
Classes that implement or decorate the `InventoryApi` or `RestOperations` interface, for example caching wrappers or test fakes, do not compile with this SDK version until you implement the new methods.
{{< /c8y-admon-caution >}}


For details, see [Error responses of inventory and measurement bulk requests identify the failed element](/change-logs/#cumulocity-2026-377-0-bulk-request-error-details).
