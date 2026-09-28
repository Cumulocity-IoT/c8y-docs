---
date: '2025-10-16'
title: Fixed content security policy issue in SCADA widget
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
ticket: MTM-64731
version: 1022.40.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The SCADA widget had an issue that could trigger a browser warning about suspicious behavior in applications like Cockpit where the widget is used in dashboards. With this fix, users should no longer see browser warnings related to content security policy violations caused by the SCADA widget.
