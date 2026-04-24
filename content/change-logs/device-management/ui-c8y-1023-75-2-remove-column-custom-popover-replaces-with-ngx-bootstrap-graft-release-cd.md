---
date: ""
title: Replace custom column popover with standard popover implementation
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
---
In data-grid, the confirmation dialog for deleting a custom column in the Configure columns dropdown used to appear on top of and obscure the columns dropdown, making it difficult for users to see the underlying content while confirming the deletion. This change adjusts the positioning an behaviour of the deletion confirmation modal so it no longer overlaps the relevant view, ensuring the dialog is clearly visible without hiding the configured columns behind it. 