---
date: 2026-07-29
title: Fixed showConnectSmartphone modal closing issue
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66604
version: 1023.14.191
---
The showConnectSmartphone modal dialog did not close properly when users attempted to close it on the first try. This issue has been fixed so that the modal now closes as expected when you click the close button or take other closing actions. 