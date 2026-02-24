---
date: '2026-03-31'
title: TOTP QR code is properly displayed during setup
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
New users (or users with the TOTP secret revoked in the user settings) were not able to set up TOTP because the QR code was missing. This issue has been fixed, and the QR code is again visible so that users can set up TOTP.
