---
date: ""
title: Fixed data explorer clearing all data when encountering a data point without permissions
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
ticket: MTM-67455
version: 1024.15.14
---
The data explorer previously cleared all displayed data when it encountered a data point that the user did not have permissions to access. This issue has been fixed so that the data explorer now handles permission restrictions gracefully and retains all accessible data in the view.