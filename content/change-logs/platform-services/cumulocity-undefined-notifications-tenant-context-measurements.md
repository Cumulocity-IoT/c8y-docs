---
date: 
title: Notifications 2.0 tenant context subscriptions now support the measurements API
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
ticket: MTM-67821
version: 
---

Notifications 2.0 subscriptions in the `tenant` context can now explicitly subscribe to the `measurements` API, in addition to the previously supported `alarms`, `events`, `managedobjects`, and `operations` APIs.
To receive measurement notifications, add `measurements` to the subscription's `apis` filter explicitly.
For details, see the [notification subscription API documentation](https://cumulocity.com/api/core/#operation/postNotificationSubscriptionResource).

Note that the wildcard (`*`) API selector for tenant context subscriptions does not currently include measurements.