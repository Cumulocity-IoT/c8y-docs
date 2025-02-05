---
date: 2024-10-01
title: Changes to Notifications 2.0 tenant context subscriptions with no API filter
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
---

Notifications 2.0 subscriptions may specify the {{< product-c8y-iot >}}  APIs to subscribe to, for example `alarms` or `measurements`.
Subscriptions may use a wildcard value (`*`) for the API selector, indicating that the subscription should include all available APIs.
If the API selector is omitted from a subscription request, it is treated as equivalent to using the wildcard value.

A tenant context subscription using the wildcard API selector now includes updates from the `operations` API in addition to those from `events`, `alarms` and `managedobjects`. 
Applications using the wildcard API selector in tenant context subscriptions should be prepared to receive `operations` updates in addition to the other APIs.

See the Notifications 2.0 subscription [REST API documentation](https://cumulocity.com/api/core/#operation/postNotificationSubscriptionResource) for details of tenant context subscriptions.

---