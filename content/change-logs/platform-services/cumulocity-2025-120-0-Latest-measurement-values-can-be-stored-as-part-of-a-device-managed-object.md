---
date: '2026-03-31'
title: Latest measurement values can be stored as part of a device managed object
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
version: 2025.198.0
---
Support of automated persistence of measurement values under the `c8y_LatestMeasurements` fragment, which has previously been introduced as a preview feature, is now generally available. If a measurement is created with a series that matches the configuration the device managed object is updated with the last series sent to the platform.

For details on how to enable the feature and how it works, refer to [Managing data](/standard-tenant/managing-data/#latest-value).
