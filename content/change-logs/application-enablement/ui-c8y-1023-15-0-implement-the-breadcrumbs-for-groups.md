---
date: ""
title: Breadcrumbs added for groups, devices and assets in Cockpit
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
To improve navigation in Cockpit, breadcrumbs have been added to the groups, devices and assets views. For root level groups, the whole path is always shown. For nested entities, the whole path is not displayed eagerly but there is an ellipsis button that shows all possible paths (hierarchies) the entity is present in when clicked, as a device can be a child of multiple groups. Extra API calls are needed to find out the possible paths, therefore an explicit user action is required.