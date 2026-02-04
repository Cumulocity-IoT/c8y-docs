---
date: ""
title: User list- filter and order global roles by translated role name. [GRAFT][release/cd] (#11003)
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
ticket: MTM-59205
version: 1023.28.4
---
Previously, on users list, global roles were filtered and sorted by label (not visible for user). Currently, they are filtered and sorted by translated name- the one that is visible on the list.