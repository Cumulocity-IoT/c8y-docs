---
date: '2026-03-31'
title: New parameter withSourceAdditions added to Alarms and Events APIs
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
ticket: MTM-63823
version: 2025.302.0
---
The Alarms and Events APIs have been improved with an additional parameter `withSourceAdditions`. When set to `true` alarms and events
for related source additions will also be included in the response. When this parameter is provided a `source` must be specified.
