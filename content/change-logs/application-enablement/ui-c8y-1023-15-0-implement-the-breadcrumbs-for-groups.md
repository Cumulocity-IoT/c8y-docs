---
date: ""
title: Implement the breadcrumbs for groups
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64935
version: 1023.15.0
---
New functionality brings breadcrumbs to groups, devices and assets views in Cockpit.
For root level groups, whole path is always shown. For nested entities whole path is not displayed eagerly but there is an ellipsis button. When clicked, it shows all possible paths (hierarchies) that entity is present, as e.g. device can be a child of multiple groups. It needs extra API calls to find out what are possible paths, therefore explicit user action is needed.