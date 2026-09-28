---
date: '2023-12-06'
title: Creating an asset with the Location property adjustments
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-55865
version: 10.18.495
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
After creating an asset with the Location property where the default values for longitude and latitude are set, a map showing a marker is displayed. If one or both of these values is deleted, the map is hidden from the sub-assets view. When editing the Location property and these values are missing, the marker for selecting a location is not shown.
