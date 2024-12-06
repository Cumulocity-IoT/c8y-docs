---
date: ""
title: Enhance dashboard template assignment for untyped devices
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
Changes also includes fix for child devices issue- before new approach to dashboard templates has been implemented, it was possible to add type dashboard to child device that had no c8y_IsDevice property. It is now possible again and c8y_IsDevice property is not necessary.