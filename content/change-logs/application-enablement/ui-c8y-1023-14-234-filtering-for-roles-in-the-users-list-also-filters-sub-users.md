---
date: ""
title: Filtering for roles in the user list now also filters sub-users correctly
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
ticket: MTM-68272
version: 1023.14.234
---
In the Administration application, filtering the accounts list by global role now returns only users who have the selected role. Previously, when a top-level user matched the filter, the list also showed all of that user’s subordinate users, including subordinates who did not have the selected role.