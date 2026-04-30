---
date: '2026-04-30'
title: >-
  Cockpit application utilizes the asset navigator and subassets implementations
  from the DTM plugin
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63484
version: 1023.77.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-30'
---
Previously, the Cockpit application utilized the asset navigator and subassets implementations provided by the Web SDK. With this change, the Cockpit application utilizes the corresponding implementations provided by the DTM (Digital Twin Manager) plugin instead.

Functionality-wise, the behavior stays mostly unchanged with only smaller enhancements.
Further enhancements are expected to follow in upcoming releases of the DTM plugin.
