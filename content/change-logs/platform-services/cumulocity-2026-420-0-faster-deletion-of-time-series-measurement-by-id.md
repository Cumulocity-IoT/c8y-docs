---
date: 
title: Faster deletion of a single time series measurement by ID
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
ticket: MTM-68691
version: 2026.420.0
---
The request to remove a single measurement by ID, `DELETE /measurement/measurements/{id}`, now accepts the optional query parameters `source` and `time`. On tenants that read measurements from time series, {{< product-c8y-iot >}} uses them to find the measurement through its indexes instead of searching by ID alone, which makes the removal faster.

Send both parameters. Sending only `source` also works and is faster than sending neither. If you send `time`, you must also send `source`; otherwise the request returns a `400` error. If no measurement matches all the parameters, the request returns a `404` error. Tenants that do not read measurements from time series ignore both parameters.

For details, refer to the [remove a specific measurement](https://{{< domain-c8y >}}/api/core/#operation/deleteMeasurementResource) operation in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#tag/Measurements).
