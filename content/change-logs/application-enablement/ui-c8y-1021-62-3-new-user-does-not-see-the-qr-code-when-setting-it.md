---
date: ""
title: TOTP 2FA QR code not displayed for new users during setup
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
ticket: MTM-63297
version: 1021.62.3
---
New user (or user with TOTP secret revoked with user settings) was not able to set up TOTP because of lack of QR code. Issue was fixed, QR code is again visible and user can set up TOTP.