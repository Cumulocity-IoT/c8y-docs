---
date: ""
title: Skip password expiry check for SSO users
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
ticket: MTM-64783
version: 1022.44.1
---
Previously, password expiry date was checked for all users, regardless of authentication method. After fix, this check for users that are using SSO for authentication is skipped and no warning is shown.