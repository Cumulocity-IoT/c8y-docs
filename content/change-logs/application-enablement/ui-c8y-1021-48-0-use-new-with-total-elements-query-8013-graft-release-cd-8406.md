---
date: '2025-03-20'
title: Using withTotalElements parameter in queries
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-44459
version: 1021.48.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Many queries in {{< product-c8y-iot >}} now use the `withTotalElements` parameter. This way, the number of queries required to retrieve the total number of items can be significantly reduced. This change considerably improves the performance, especially when working with large datasets such as the device list.
