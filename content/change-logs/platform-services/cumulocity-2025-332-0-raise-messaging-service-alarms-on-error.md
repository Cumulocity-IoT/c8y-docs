---
date: 2025-10-03
title: "Raising Messaging Service alarms on common errors"
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-2Yri1-l3n
    label: Messaging Service
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62614
version: 2025.332.0
---
With this change, the {{< product-c8y-iot >}} platform raises a Messaging Service alarm when messages fail to be processed (for example, by the Notification 2.0 feature) due to common issues. These issues initially are about reaching backlog quota or topic limit, so issues were the customer should take the action to resolve it.
