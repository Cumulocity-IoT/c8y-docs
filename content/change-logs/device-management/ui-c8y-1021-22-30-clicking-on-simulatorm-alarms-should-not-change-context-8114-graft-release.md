---
date: ""
title: Clicking on simulator alarms no longer changes context
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62195
version: 1021.22.30
---
In the Cumulocity IoT simulator page, clicking on alarms previously caused the application context to change unexpectedly. Users were redirected to the alarms page instead of showing the alarms in the simulator alarms tab. This behavior has now been corrected. This fix ensures a more consistent user experience within the simulator tool. This change improves the usability and predictability of the simulator for users working with alarms in their simulated IoT scenarios.