---
date: 2024-10-01
title: Advanced notice of changes to Notifications 2.0 tenant context subscriptions with no API filter
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

Currently, a tenant context subscription using the wildcard API selector will deliver updates from a subset of the available APIs.
See the Notifications 2.0 subscription [REST API documentation](https://cumulocity.com/api/core/#operation/postNotificationSubscriptionResource) for details on the current tenant context subscription behaviour.

In future, such subscriptions will also deliver updates from the `operations` API.
This applies to subscriptions that were created before the change is enabled, as well as new subscriptions.
For example, after this change is enabled, an application that `POST`s the following request to the `/notification2/subscriptions` endpoint may receive `operations` updates, regardless of when the subscription was created:

```
{
  "context": "tenant",
  "subscription": "testSubscription",
  "subscriptionFilter": {
    "apis": [
      "*"
    ]
  }
}
```

Applications using the wildcard API selector in tenant context subscriptions should be prepared to receive `operations` updates in addition to the updates they were previously receiving.
To avoid disruption, application developers should either:

- ensure that their applications can handle `operations` updates, or

- include an API selector

before this change is enabled.


The change will be enabled in the {{< product-c8y-iot >}}  CD deployments no earlier than January 15, 2025.
It will also be included in the 2025 yearly release.
A further announcement will be published when the change is enabled.
