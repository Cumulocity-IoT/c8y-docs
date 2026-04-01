---
date: 2026-04-02
title: Support for copying and pasting dashboards with SCADA widgets
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
version: 1021.22.154
---
Previously, when you copied and pasted a dashboard containing SCADA widgets, those widgets continued to display data from the original device. Now, when you copy and paste dashboards that include SCADA widgets, the widgets will display data from the new context device. This improvement allows you to more easily duplicate complex dashboards with SCADA widgets without having to manually reconfigure them.