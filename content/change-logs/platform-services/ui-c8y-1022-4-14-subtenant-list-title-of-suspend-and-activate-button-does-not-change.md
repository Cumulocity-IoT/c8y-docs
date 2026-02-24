---
date: '2026-03-31'
title: >-
  Suspend and activate button title in the subtenant list now updates correctly
  after toggling
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63842
version: 1022.4.14
---
In the subtenant list, the title of the suspend and activate button did not change after toggling the button, which could lead to confusion about the current state. This issue has been fixed. The button title now correctly updates to reflect the action that will be performed when clicking the button, that is, it shows **Activate** when the subtenant is currently suspended, and vice versa. 
