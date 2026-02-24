---
date: '2026-03-31'
title: One-time password in device registration form now hidden
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
ticket: MTM-65224
version: 1023.2.2
---
In the device registration form, the one-time password was previously shown in clear text which posed a security risk. The form has been updated to use a password input field instead, so that the one-time password is hidden while typing. This change improves the security of the device registration process for all users.
