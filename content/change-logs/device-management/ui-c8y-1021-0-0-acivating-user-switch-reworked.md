---
date: ""
title: Rework user switch activation
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
ticket: DM-3875
version: 1021.0.0
---
To simplify the user experience when switching between users, the user switch activation has been reworked. Previously, the user had to manually activate the user switch in a separate step after selecting the user to switch to. Now, the user switch is automatically activated when selecting the user from the user switch dropdown menu. This change simplifies the user switching process and makes it more intuitive for users.