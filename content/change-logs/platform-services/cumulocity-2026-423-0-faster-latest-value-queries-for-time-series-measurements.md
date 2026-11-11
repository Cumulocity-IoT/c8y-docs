---
date:
title: Faster latest value queries for time series measurements, available as public preview
product_area: Platform services
change_type:
  - value: change-pXAlHAWka
    label: Preview
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68554
version: 2026.423.0
---
A query for the latest value of a measurement series on a time series collection can scan the full range of the series. This happens when the query has no `dateFrom` or a very old one, and it is slow for large collections or for devices that have not reported recently.

With the new feature toggle `core.measurements.bounded-latest-lookup`, such a query first searches only the last day of data. If the last day contains a matching measurement, the platform returns it. Otherwise, the platform runs the original query unchanged. The results do not change, only the time to find them.

A query takes part when it asks for the newest measurement first, returns one measurement, filters by one source and a value fragment, has no `dateTo` or one within the last day, and has no `dateFrom` or one that is older than one year. A query without any time range also needs the tenant default sort for measurements to be enabled and set to `time desc`. All other queries run as before.

The feature toggle is disabled by default. To try the feature, enable it for a tenant.
