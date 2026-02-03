---
date: 2024-12-14
title: Prevention of HTML injection attacks through SmartREST template names
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
ticket: DM-2984
version: 10.18.505.5
---
A security vulnerability in the simulator has been patched to prevent HTML injection attacks through SmartREST template names. Previously, the template name entered in simulator instructions was rendered as raw HTML, enabling scripts to be injected. The issue is now mitigated by displaying the template name as plain text rather than functional HTML.
