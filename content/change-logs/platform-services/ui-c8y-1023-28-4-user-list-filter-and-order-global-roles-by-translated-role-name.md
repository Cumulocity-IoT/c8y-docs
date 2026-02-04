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
When managing users in the system, you previously had to work with global roles being filtered and sorted by their internal label rather than their displayed name, which made it difficult to find and organize roles as they appeared in the user interface. Now, global roles in the user list are filtered and sorted by their translated name—the same name that is visible to you in the interface. This change makes it more intuitive to search for and organize users by their assigned global roles, as the sorting and filtering behavior now matches what you see on the screen.