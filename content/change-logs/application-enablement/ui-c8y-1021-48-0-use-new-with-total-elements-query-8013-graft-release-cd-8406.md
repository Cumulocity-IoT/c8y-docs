---
date: ""
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
---
Many of our queries now use the `withTotalElements` parameter. {{< product-c8y-iot >}} can now reduce the number of queries required to retrieve the total number of items, significantly improving performance—especially when working with large datasets such as the device list.