---
date: 2024-07-12
title: Remove the ability to explicitly set a password for a device user
product_area: Platform services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-57937
version: 10.20.438.0
---
To improve security, user administrators can no longer explicitly set passwords for device users. This change prevents an attacker from having access to all device users, in case the administrator account is compromised. In case of losing the device password, the device must be registered again.
