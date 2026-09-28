---
date: '2025-10-30'
title: Measurement series aggregation improvements
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-64669
version: 2025.356.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
A new query parameter `aggregationFunction` has been added to the measurement series endpoint. This parameter allows to specify
aggregation functions to be calculated on the measurement series data per specified aggregation interval.
The supported aggregation functions are: `min`, `max`, `avg`, `sum`, `count`, `stdDevPop`, and `stdDevSamp`.
If the parameter is not provided, the functions `min` and `max` will be calculated by default.

{{< c8y-admon-info >}}
If you want to calculate multiple functions at once, you must specify the parameter multiple times, for example,
`aggregationFunction=min&aggregationFunction=max&aggregationFunction=avg`.
{{< /c8y-admon-info >}}

{{< c8y-admon-caution >}}
This parameter can only be specified when an aggregation interval is provided using `aggregationType` or `aggregationInterval` parameter.
Providing the `aggregationFunction` parameter without an aggregation interval will result in a bad request error.
This parameter only takes effect for the timeseries persistence of measurements.
For legacy persistence, the `min` and `max` functions are always calculated.
{{< /c8y-admon-caution >}}
