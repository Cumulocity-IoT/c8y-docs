---
date: '2024-10-17'
title: Correct error message when deleting an inventory role or a global role
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-53701
version: 1020.26.5
---
In the event of an error while deleting an inventory role or a global role, the message always stated that the role couldn't be deleted because it was assigned to a user. This fix ensures that the error message will now reflect the actual cause of the problem.
