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
Previously, when device had no type property assigned, Dashboard template section in dashboard settings was hidden. Now, in this situation, section will be shown but user will be informed that enabling dashboard template will be possible only when type is added to device. To make it easier, there is a button that will navigate user to Device management app device view.
Changes also includes fix for child devices issue- before new approach to dashboard templates has been implemented, it was possible to add type dashboard to child device that had no c8y_IsDevice property. It is now possible again and c8y_IsDevice property is not necessary.