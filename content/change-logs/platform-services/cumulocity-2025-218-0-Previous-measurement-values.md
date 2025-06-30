---
date:
title: Introducing Previous measurements values
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
We've introduced automated persistence for measurement values under the `c8y_PreviousMeasurements` fragment. This feature allows for storing and querying the second most recent measurement values based on arrival time.

For details on how to enable the feature and how it works, refer to [Managing data](/standard-tenant/managing-data/#latest-value).

**Breaking Change: Inventory API – `c8y_PreviousMeasurements` fragment was added to the restricted properties list**

As previously announced, certain properties within the Inventory API are now restricted for internal system use only and cannot be modified by external users.

Any requests containing these restricted properties will be ignored by the platform and will not be applied.

The following property fragments are now restricted:

* c8y_PreviousMeasurements
* c8y_LatestMeasurements
* c8y_LatestEvents
* c8y_LatestAlarms
* c8y_LatestOperations
* c8y_LastAlarm
* c8y_LastEvent
* c8y_LastOperation

Example:

For instance, if a user sends a request like this:

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

With this release, the `c8y_PreviousMeasurements` fragment will be ignored and will not be saved.

