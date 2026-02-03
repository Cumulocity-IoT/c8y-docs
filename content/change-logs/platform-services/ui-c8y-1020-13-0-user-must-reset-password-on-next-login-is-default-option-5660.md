---
date: '2024-08-01'
title: >-
  Reset password on next login option is now the default if Password reset link
  as email is deselected
product_area: Platform services
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-58077
version: 1020.13.0
---
Previously, a new user received an email with a link to set their password. Now when the checkbox **Send password reset link as email** is cleared, the **User must reset password on next login** option is selected by default. This means the new user must change their password during their first login.
