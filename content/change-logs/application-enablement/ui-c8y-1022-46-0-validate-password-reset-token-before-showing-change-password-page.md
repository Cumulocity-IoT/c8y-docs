---
date: '2025-11-06'
title: Password reset links now validated for a more suitable redirection
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63950
version: 1022.46.0
---
Previously, if users used a password reset link with an invalid token, they were redirected to the reset password view and got an error message on submit. To enhance the user experience, the login app now validates password reset links before allowing users to change their passwords. If the link token is valid and has not expired, the user is redirected to the reset password view to set a new password. If the link token is invalid or has expired, the user is instructed to request a new password reset link.
