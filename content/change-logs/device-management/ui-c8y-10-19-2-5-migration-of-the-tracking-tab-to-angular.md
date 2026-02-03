---
date: 2024-03-14
title: Migration of the Tracking tab to Angular
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2996
version: 10.19.2.5
---
The **Tracking** tab in the device details has been migrated to Angular. The obsolete AngularJS module `AssetTrack` has been removed from the imports of the Device Management application (import `@c8y/ng1-modules/devicemanagement-tracking/cumulocity.json`). It is deprecated and will be removed in the future. With this change, an issue with incorrect results of custom date range filters has been fixed. Moreover, position marker popups have been made more informative.
