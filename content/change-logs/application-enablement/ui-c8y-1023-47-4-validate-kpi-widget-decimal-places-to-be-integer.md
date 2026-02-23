---
date: ""
title: KPI widget decimal places now validated as integer
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
ticket: MTM-66093
version: 1023.47.4
---
KPI widget decimal places property could be provided with decimal number (e.g. 2.5) which was causing value not to be displayed. This property is now validated to be integer (1-10).