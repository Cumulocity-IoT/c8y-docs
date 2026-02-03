---
date: 2023-12-06T13:45:42.844Z
title: New versioning matrix for blueprints/plugins
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-52340
version: 10.18.63.0
---
A versioning matrix can now be added to the <i>cumulocity.json</i> of a blueprint/plugin. When a blueprint/plugin is installed, its version is validated against the platform version. If the versions are incompatible a warning is shown.
