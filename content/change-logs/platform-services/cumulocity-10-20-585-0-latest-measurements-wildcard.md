---
date:
title: Latest measurement values tenant option now works with wildcard character
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-60761
version: 10.20.585.0
---

Previously, the tenant option which is used to enable [latest measurement values](https://cumulocity.com/docs/standard-tenant/managing-data/#latest-value) was not not working with the wildcard (`*`) character. With this change, the wildcard character can be used to enable latest measurements for all series:

`PUT /tenant/options/measurement.series.latestvalue`
```json
{
  "*":""
}
```