---
date: ""
title: Enhanced display of error messages for external authentication and platform permissions
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
ticket: MTM-60547
version: 1021.4.3
---
Previously, errors from external authentication servers were not always displayed to the user, causing confusion when authentication failed without any visible indication. With this update, all errors originating from external authentication servers are now consistently shown in a dedicated error dialog. Additionally, errors resulting from insufficient permissions within the platform are now presented clearly and in a user-friendly manner on the login page.