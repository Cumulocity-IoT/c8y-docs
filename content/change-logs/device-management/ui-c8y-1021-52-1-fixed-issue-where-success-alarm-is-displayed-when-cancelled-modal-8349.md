---
date: ""
title: Success message no longer displayed when canceling the creation of a smart group
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-6235
version: 1021.52.1
---
When a user opened a create smart group dialog and then canceled it, a success message was incorrectly displayed even though no action was actually completed successfully. This has now been fixed. The success alarm will now only be shown when an action is completed as expected.