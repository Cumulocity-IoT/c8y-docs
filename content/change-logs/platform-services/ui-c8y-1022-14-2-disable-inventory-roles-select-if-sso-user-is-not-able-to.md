---
date: ""
title: Disable inventory roles select if SSO user is not able to change them.
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
In the SSO access mapping configuration, if the option "Roles selected in the rules below will be reassigned to a user on each login and other ones will be cleared" was selected, the inventory roles mapping for an external user could be changed in the dropdown list, but could not be saved, which was misleading. Now, if the user does not have the permission to change the inventory roles mapping, the dropdown is disabled.