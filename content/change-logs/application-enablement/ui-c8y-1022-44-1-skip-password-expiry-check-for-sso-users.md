---
date: '2026-03-31'
title: Skip password expiry check for users with SSO enabled
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
ticket: MTM-64783
version: 1022.44.1
---
In the past, the password expiry date was checked for all users, regardless of their authentication method. With this change, the password expiry check is now skipped for users that have single sign-on (SSO) enabled for authentication. As a result, these users will no longer see a warning about their password expiring. This change improves the user experience for SSO users by removing an unnecessary warning message, while the behavior for non-SSO users remains unchanged.
