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
When for SSO access mapping configuration option "Roles selected in the rules below will be reassigned to a user on each log in and other ones will be cleared" is selected, any inventory roles mapping change for external user could be change in dropdown list, but could not be saved, which might be misleading. Now, if user is not able to change inventory roles mapping, dropdown is disabled.