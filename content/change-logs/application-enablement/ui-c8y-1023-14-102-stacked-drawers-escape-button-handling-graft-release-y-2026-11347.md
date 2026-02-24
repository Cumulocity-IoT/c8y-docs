---
date: ""
title: Stacked drawers escape button handling [GRAFT][release/y2026] (#11347)
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
ticket: MTM-65365
version: 1023.14.102
---
Previously, when two or more drawers were shown stacked, pressing escape button was closing all of them. There is a mechanism now implemented that closes only top drawer. Also there is a possibility to disable closing drawer on escape by drawer configuration.