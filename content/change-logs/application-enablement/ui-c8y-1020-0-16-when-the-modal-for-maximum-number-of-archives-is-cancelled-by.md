---
date: '2024-06-20'
title: >-
  Canceling the dialog on reaching the maximum number of archives no longer
  displays an error message
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
ticket: MTM-58926
version: 1020.0.16
---
In the past, when a user reached the maximum number of archives and the corresponding dialog was shown, canceling the dialog would incorrectly display an error message. This has been fixed. Now, when a user cancels the maximum number of archives dialog, no error message is shown any longer and the application behaves as expected. 
