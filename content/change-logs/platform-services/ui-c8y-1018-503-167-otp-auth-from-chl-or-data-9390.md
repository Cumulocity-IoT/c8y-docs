---
date: ""
title: QR code for two-factor authentication provided during TOTP setup now shows up correctly
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
ticket: MTM-63933
version: 1018.503.167
---
The QR code for the two-factor authentication provided during the TOTP setup was not displayed correctly. This issue has been fixed. The QR code is now properly visible and users can scan it with their authentication application.