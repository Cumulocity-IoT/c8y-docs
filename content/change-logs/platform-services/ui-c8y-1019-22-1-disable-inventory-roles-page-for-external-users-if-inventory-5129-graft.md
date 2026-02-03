---
date: 2024-05-13
title: Restriction on role changes for users managed by SSO server
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
ticket: MTM-57096
version: 1019.22.1
---
Administrators can no longer change the global roles and inventory roles of users managed by the single sign-on (SSO) server if they are updated during login.
The option "Roles selected in the rules below will be reassigned to a user on each log in and other ones will be cleared" can be set in the access mapping of the SSO configuration.
