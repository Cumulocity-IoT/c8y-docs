---
date: 2024-09-11
title: "Data broker message forwarding no longer stops after platform network reconfiguration"
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-V6J_FcOT2
    label: Data broker
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-59331
version: 1020.501.0
---
Due to an issue, data broker connectors stopped forwarding messages after platform network reconfiguration. This issue has been fixed along with some robustness changes to ensure message forwarding is more consistent, for example, during platform maintenance.  
