---
date: 2025-10-03
title: "Alarms raised for common Messaging Service errors"
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Improvement
component:
  - value: component-2Yri1-l3n
    label: Messaging Service
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62614
version: 2025.332.0
---
With this change, the {{< product-c8y-iot >}} platform will raise an alarm when the Messaging Service fails to process a message.
The issues reported in this way are those that need user action to resolve, for example when publishing to a Notifications 2.0 subscription fails because the underlying topic has reached its backlog quota limit.
