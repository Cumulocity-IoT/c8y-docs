---
date: ""
title: Allow to remove plugin from app regardless of version installed. (#8959) [GRAFT][release/y2025] (#9278)
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
ticket: MTM-63479
version: 1021.22.90
---
There was an issue with uninstalling plugin from application on package details view. If plugin was installed in version that was later removed from package (but package is still accessible because of newer version), it could not be uninstalled from package details view. This issue has been fixed now.