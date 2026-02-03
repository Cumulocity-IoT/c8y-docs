---
date: '2024-07-04'
title: Pasted dashboards now include linked child additions from source dashboard
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
ticket: MTM-59649
version: 1020.2.6
---
Previously, when a dashboard was copied and pasted, any linked child additions from the source dashboard were not included in the pasted version. This has now been changed so that the linked child additions are also copied over to the pasted dashboard. This improvement ensures that the pasted dashboard includes all relevant information and linked assets from the original, providing a more complete and consistent user experience when duplicating dashboards.
