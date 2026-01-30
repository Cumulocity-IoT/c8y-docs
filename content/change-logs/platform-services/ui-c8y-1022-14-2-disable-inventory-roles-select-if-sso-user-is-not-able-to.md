---
date: '2025-08-21'
title: Inventory roles selection disabled if roles cannot be changed by SSO user
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
ticket: MTM-63881
version: 1022.14.2
---
In the user details, if for the SSO access mapping the option "Roles selected in the rules below will be reassigned to a user on each login and other ones will be cleared" was selected, the inventory roles mapping for an external user could be changed in the dropdown list, but could not be saved, which was misleading. Now, if a user is not able to change the inventory roles mapping, the dropdown is disabled.
