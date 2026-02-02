---
date: ""
title: Home dashboard should translate widget titles by default. [GRAFT][release/cd] (#10984)
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65811
version: 1023.22.16
---
Home dashboards (e.g. in Cockpit or Device Management) by default will have 'Translate widget titles' set to true by default. This change will affect only new dashboards, it won't change existing ones. Also won't affect other dashboards like Cockpit asset dashboards.