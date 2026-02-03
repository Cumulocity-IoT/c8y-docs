---
date: 2024-04-25
title: List group dropdown accessibility has been improved
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
ticket: MTM-57667
version: 1019.20.5
---
The list group actions dropdown was missing proper focus handling, which could cause accessibility and usability issues for keyboard and screen reader users. With this change, a traped-focus is now applied to the dropdown, ensuring that the focus is properly trapped within the dropdown while it is open. This improves the user experience for keyboard and screen reader users by making it easier to navigate and interact with the dropdown without accidentally leaving it.
