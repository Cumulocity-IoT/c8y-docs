---
date: '2024-12-19'
title: Dashboard template setting now visible for devices without type property
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61669
version: 1021.15.0
---
Previously, when a device had no type property assigned, the dashboard template section in the dashboard settings was hidden. Now, in this case, the section is visible but information is provided that the dashboard template is only enabled when a type is added to the device. Moreover a button is provided which navigates the user to the device view in the Device Management application.
