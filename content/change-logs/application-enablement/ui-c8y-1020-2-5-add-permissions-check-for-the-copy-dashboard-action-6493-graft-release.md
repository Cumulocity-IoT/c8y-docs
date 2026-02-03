---
date: '2024-07-04'
title: Added a permission check for the copy dashboard action
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
ticket: MTM-59454
version: 1020.2.5
---
A permission check for the copy dashboard action has been added. The platform now verifies that the user has the required permissions before allowing them to copy a dashboard. If the user lacks the required permissions the **Copy** button will be disabled.
