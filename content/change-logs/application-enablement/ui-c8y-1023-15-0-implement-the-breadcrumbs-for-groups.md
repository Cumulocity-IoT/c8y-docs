---
date: '2026-01-07'
title: 'Breadcrumbs added to group, device, and asset views in the Cockpit application'
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
To improve the navigation in the Cockpit application, breadcrumbs have been added to group, device, and asset views. For root-level groups, the whole path is always shown. For nested entities, the whole path is not displayed eagerly. Instead, users can click an ellipsis button to show all possible paths (hierarchies) the entity is present in, as a device can be a child of multiple groups. Extra API calls are needed to find out the possible paths; therefore, an explicit user action is required.
