---
date: '2025-02-27'
title: Save button always enabled for number properties in Asset properties widget
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-1723
version: 1021.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, in the "Asset properties" widget, the **Save** button was disabled for device properties of type "number" that were added via the API, as their type defaulted to "string". This update ensures that the **Save button** is enabled and the "number" type is kept.
