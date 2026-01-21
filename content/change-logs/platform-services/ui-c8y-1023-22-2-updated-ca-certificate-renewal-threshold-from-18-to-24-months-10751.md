---
date: ""
title: Updated CA certificate renewal threshold from 18 to 24 months (#10751) [GRAFT][release/cd] (#10809)
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65709
version: 1023.22.2
---
As found out during the review of Cumulocity-IoT/c8y-docs#4076, backend changed the mentioned threshold to 24 months, so UI needs to align + linting fixes.