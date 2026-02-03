---
date: ""
title: Disallow certain application options to be provided via query params
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
ticket: MTM-65991
version: 1023.23.4
---
Application options can be provided via query parameters to Web SDK based UI applications for testing purposes.
We've now excluded some these applicaion options to be providable via query parameters.