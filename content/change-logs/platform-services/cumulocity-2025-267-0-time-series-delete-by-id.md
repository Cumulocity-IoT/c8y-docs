---
date: '2025-08-21'
title: Support for deleting time series measurements by ID
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
ticket: MTM-63560
version: 2025.267.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Support for deleting measurements by ID when using enhanced time series support has been added. Previously, deleting
by ID was only possible for legacy measurements.

```http request
DELETE /measurement/measurements/{id}
```

{{< c8y-admon-info >}} 
Deleting measurements by ID is not optimal. We recommend deleting measurements by [query](https://{{< domain-c8y >}}/api/core/#operation/deleteMeasurementCollectionResource) 
or by applying retention rules for better performance. 
{{< /c8y-admon-info >}}
