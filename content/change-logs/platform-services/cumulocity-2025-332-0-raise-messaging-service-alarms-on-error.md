---
date: 
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
Issues reported in this way require user action to be resolved. Currently, this only happens when publishing to a Notifications 2.0 subscription fails because the underlying topic has reached its backlog quota limit. More information about Notification 2.0 backlog quotas can be found in the [documentation](https://cumulocity.com/api/core/#section/Overview/Notification-2.0-Service-Quotas).
