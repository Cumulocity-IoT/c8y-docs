---
date: '2025-10-30'
title: Enhanced granularity of measurement series aggregation interval
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
ticket: MTM-64802
version: 2025.357.0
---
The measurement series endpoint has been enhanced. Note that there is no impact on the behaviour of applications
currently using this endpoint. 

We have introduced a new query parameter `aggregationInterval` which allows users to specify
the aggregation interval for the returned measurement series data in a more flexible manner compared with
the existing `aggregationType` parameter. The new parameter allows the specification of custom time intervals
like `300s`, `25m`, `12h`, `7d`, and so on. The format of the parameter is an integer followed by a time unit,
where the supported time units are: `s` (seconds), `m` (minutes), `h` (hours), `d` (days), `w` (weeks), `M` (months),
`q` (quarters) and `y` (years). The integer value must be a positive number without leading zeros.

The new `aggregationInterval` parameter is preferred over the existing `aggregationType` parameter. When both are provided in a request
only the `aggregationInterval` parameter will be considered and the `aggregationType` parameter will be ignored.

{{< c8y-admon-caution >}}
The full range of values for the `aggregationInterval` parameter is only supported for the timeseries persistence of measurements.
For legacy persistence only intervals of `1d`, `1h`, `1m` are supported, directly corresponding to the existing
`aggregationType` parameter values. When using other interval values with legacy persistence, the system will default to
the closest supported aggregation type, which may lead to unexpected results.
{{< /c8y-admon-caution >}}
