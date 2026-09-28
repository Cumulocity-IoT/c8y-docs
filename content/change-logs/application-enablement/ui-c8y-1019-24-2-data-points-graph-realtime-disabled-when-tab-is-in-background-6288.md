---
date: '2024-06-05'
title: >-
  Data points graph realtime is kept enabled when the browser tab is in
  background
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-58410
version: 1019.24.2
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The realtime functionality for the data points graph was automatically disabled when the browser tab was in the background. With this fix, realtime is kept enabled and can be disabled only by direct user interaction.
