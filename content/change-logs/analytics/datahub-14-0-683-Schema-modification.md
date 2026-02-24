---
date: '2026-01-29'
title: Advanced configuration of collection schemas
product_area: Analytics
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-A8vMaVaTg
    label: DataHub
build_artifact:
  - value: tc-H-tuq-8Es
    label: datahub
version: 14.0.683
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-05'
  - label: apj.cumulocity.com
    date: '2026-02-11'
  - label: jp.cumulocity.com
    date: '2026-02-11'
  - label: emea.cumulocity.com
    date: '2026-02-23'
  - label: us.cumulocity.com
    date: '2026-02-23'
---
When configuring an offloading pipeline, {{< product-c8y-iot >}} DataHub automatically derives tabular schema information given the data in the operational store. However, the data may not yet contain all columns you want to utilize in your offloading configuration. For example, a new device generation will include an additional pressure sensor whose value you want to offload as soon as the devices become available, without the need to reconfigure the offloading pipeline. For that purpose, {{< product-c8y-iot >}} DataHub now allows you to add such a column with an associated type in the configuration process.
