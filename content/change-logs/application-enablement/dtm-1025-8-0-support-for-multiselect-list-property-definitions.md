---
date: '2026-07-08'
title: Multiselect list type for property definitions
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-3009
version: 1025.8.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-07-08'
  - label: apj.cumulocity.com
    date: '2026-07-08'
  - label: jp.cumulocity.com
    date: '2026-07-08'
  - label: us.cumulocity.com
    date: '2026-07-08'
  - label: cumulocity.com
    date: '2026-07-08'
---
When modeling assets, some properties need to hold multiple values in a single field — for example, a list of supported protocols or applicable regions. Digital Twin Manager now supports multiselect list property definitions, which use the array data type to let you capture multiple selections in a single field.

To use this feature, create a new property definition and select the array type. Existing property definitions and assets are not affected.

For details, see [Property definitions](/dtm/asset-types/#property-definition-types).