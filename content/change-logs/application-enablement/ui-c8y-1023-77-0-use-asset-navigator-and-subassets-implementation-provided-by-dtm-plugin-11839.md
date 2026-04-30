---
date: ""
title: Cockpit application utilizes the Asset navigator and subassets implementations from the Digital Twin Manager plugin
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
---
Previously the Cockpit application utilized the asset navigator and subassets implementations provided by the Web SDK. With this change the Cockpit application utilizes the corresponding implementations provided by the DTM plugin instead.

Functionality wise the behavior stays mostly unchanged with only smaller enhancements.
Further enhancements are expected to follow in upcoming releases of the DTM plugin.