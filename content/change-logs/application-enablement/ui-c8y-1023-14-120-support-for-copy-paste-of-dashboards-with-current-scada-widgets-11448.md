---
date: ""
title: Support copy and paste of dashboards with SCADA widgets
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65804
version: 1023.14.120
---
Previously, when you copied and pasted a dashboard that contained SCADA widgets, these widgets kept displaying data from the original device. Now, you can copy and paste dashboards that include SCADA widgets, and the widgets will display data from the new context device. This improvement allows you to more easily duplicate complex dashboards with SCADA widgets without having to manually reconfigure them.