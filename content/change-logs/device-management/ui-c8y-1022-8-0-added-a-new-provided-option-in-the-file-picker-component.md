---
date: ""
title: Software and firmware repository items can be added without mandatory url.
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4788
version: 1022.8.0
---
The file picker component is commonly used across the application to allow users to select files from various sources. With this change, a new 'provided' option has been added to the file picker component alongside the existing options. This allows users to select files that are already provided or pre-selected by the application based on the current context. The new option streamlines the user workflow by reducing the need to manually locate and select files in certain scenarios.