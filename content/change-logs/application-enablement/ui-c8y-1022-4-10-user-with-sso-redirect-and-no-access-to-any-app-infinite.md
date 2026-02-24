---
date: '2026-03-31'
title: >-
  Users with SSO redirect and without application access no longer run into an
  infinite loop
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
ticket: MTM-63961
version: 1022.4.10
---
Previously, if users had SSO and SSO redirect enabled but did not have permission to access any application, they ran into an infinite loop after trying to log in. This issue has been fixed. If users have no application access, they are now redirected to the login page, and an error is shown.
