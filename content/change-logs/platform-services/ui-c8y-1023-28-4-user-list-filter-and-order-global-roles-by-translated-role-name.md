---
date: ""
title: User list now filters and sorts global roles by translated name
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
ticket: MTM-59205
version: 1023.28.4
---
In the user management, global roles were previously filtered and sorted by their internal label rather than their displayed name, which made it difficult to find and organize roles in the UI. Now, global roles in the user list are filtered and sorted by their translated name, that is, by the name that is visible to you in the UI. This change makes it more intuitive to search for and organize users by their assigned global roles, as the sorting and filtering behavior now matches what you see on the screen.