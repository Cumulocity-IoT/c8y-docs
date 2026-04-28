---
date: '2026-04-27'
title: Deletion confirmation dialog no longer overlaps relevant content
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
ticket: DM-5058
version: 1023.75.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-27'
  - label: apj.cumulocity.com
    date: '2026-04-28'
  - label: jp.cumulocity.com
    date: '2026-04-28'
---
The confirmation dialog for deleting a custom column in the **Configure columns** dropdown used to appear on top of and obscure the columns dropdown, making it difficult for users to see the underlying content while confirming the deletion. This change adjusts the positioning and behaviour of the deletion confirmation modal so it no longer overlaps relevant content, ensuring the dialog is clearly visible without hiding the configured columns behind it. 
