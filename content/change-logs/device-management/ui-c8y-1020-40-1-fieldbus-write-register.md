---
date: ""
title: Behavior of "Set" button in "Fieldbus device" widget has been fixed
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
ticket: DM-4002
version: 1020.40.1
---
In the "Fieldbus device" widget, registers and coils that can be changed are represented by active widgets that allow users to change the corresponding coil or register by sending an operation to the terminal. Changing a value and clicking "Set" creates an operation. This did not work properly and has been fixed now.