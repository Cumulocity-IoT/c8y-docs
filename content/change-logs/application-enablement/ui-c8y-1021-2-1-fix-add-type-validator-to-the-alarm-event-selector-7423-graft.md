---
date: '2024-11-21'
title: Alarm and event selector input validation added
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
ticket: MTM-61126
version: 1021.2.1
---
The alarm and event selector in the {{< product-c8y-iot >}} UI previously allowed to enter invalid input. With this fix, input validation has been added to the alarm and event selector to ensure that only valid input is accepted. This change improves the user experience and prevents potential errors or unexpected behavior when using the alarm and event selector.
