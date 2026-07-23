---
date: ""
title: Custom columns using Digital Twin Manager properties now work correctly in data grids
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
ticket: MTM-66948
version: 1024.7.1
---
Custom columns based on Digital Twin Manager properties that were added to a data grid were silently dropped and never appeared. The selected columns now display as expected.