---
date: ""
title: Subtenant list: suspend and activate button title now updates correctly after toggling
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
In the subtenant list, the title of the suspend and activate button did not change after toggling the button, which could lead to confusion about the current state. This has been fixed so that the button title now correctly updates to reflect the action that will be performed when clicking the button, i.e. it shows "Activate" when the subtenant is currently suspended, and vice versa. This change improves the user experience and makes the subtenant list easier to use.