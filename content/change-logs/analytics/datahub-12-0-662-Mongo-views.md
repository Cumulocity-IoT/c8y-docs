---
date: '2025-11-13'
title: Tailored offloading of inventory collection
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-A8vMaVaTg
    label: DataHub
build_artifact:
  - value: tc-H-tuq-8Es
    label: datahub
version: 12.0.662
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
When offloading the inventory collection, not only device-related data is offloaded, but also internal data. In order to confine the offloading to the data you need in your application, {{< product-c8y-iot >}} DataHub now introduces views over the inventory collection. These views let you tailor your offloading configuration so that only the data you are interested in is offloaded to the data lake, for example, only data related to devices or device groups.
