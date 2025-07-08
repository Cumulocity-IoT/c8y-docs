---
date: '2025-07-03'
title: Introducing previous measurements values
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
version: 2025.218.0
---
Automated persistence for measurement values under the `c8y_PreviousMeasurements` fragment has been introduced. This allows for storing and querying the second most recent measurement values based on arrival time.

For details on how to enable the feature and how it works, refer to [Managing data](/standard-tenant/managing-data/#latest-value).

**Breaking change: The Inventory API `c8y_PreviousMeasurements` fragment was added to the restricted properties list.**

The `c8y_Previous Measurements` fragment is reserved for internal system use only and may not be used by external users.

Any request containing restricted properties will have those properties ignored by the platform — they will not be applied or saved.

Example:

If a user sends a request like the following::

```
{
    "name": "testDevice",
    "owner": "device_654321",
    "c8y_IsDevice": {},
    "c8y_PreviousMeasurements": {
        "c8y_Temperature": {
            "value": 25.4,
            "unit": "C"
        }
    }
}
```

With this release, the `c8y_PreviousMeasurements` fragment in the request will be ignored and will not be saved.
