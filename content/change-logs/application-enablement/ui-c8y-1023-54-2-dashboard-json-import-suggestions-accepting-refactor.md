---
date: ""
title: Improved dashboard JSON import suggestions handling
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
ticket: MTM-65792
version: 1023.54.2
---
When user was trying to import dashboard from JSON file, bulk accepting was not intuitive and buttons that allowed it were always enabled. Now these buttons are disabled if no suggestion is available. Also, once user click bulk accept button, wigdets with no suggestion are marked as not selected with warning.