---
date: 2023-12-06
title: Password reset on OAI-Secure login
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-55200
version: 10.18.376.0
---
When a user logs in using OAI-Secure and a password change is required, a <code>PasswordResetToken</code> is returned in the response header, enabling the password reset.
