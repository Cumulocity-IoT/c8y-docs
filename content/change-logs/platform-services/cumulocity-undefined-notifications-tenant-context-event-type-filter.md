---
date: 2025-01-10
title: changes to Notifications 2.0 tenant context subscriptions with event API filter
change_type:
  - value: change-3BQrQ6adS
    label: Feature
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-60734
version: 2025.26.0
---

Notifications 2.0 subscriptions may specify the {{< product-c8y-iot >}}  APIs to subscribe to, for example `events` or `measurements`.
If the events API is specifically included as the only API in a Subscription's filter, a typeFilter was also required be set in that filter to make the subscription work.
The restriction requiring a type filter when subscribing to the `events` API in the tenant context has been removed. Tenant context subscriptions to the `events` API can now be created without specifying a type filter.