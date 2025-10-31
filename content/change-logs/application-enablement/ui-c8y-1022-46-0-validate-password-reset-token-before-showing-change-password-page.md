---
date: ""
title: Validate password reset token for more suitable redirection
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
Previously, if user used password reset link with invalid token, he was redirected to reset password view and got error message on submit. To enhance user experience, the Login app now validates password reset links before allowing users to change their passwords. When a user clicks on a password reset link, the app checks with the backend to ensure the link is valid and has not expired. If the link is valid, the user is redirected to a page where they can set a new password. However, if the link is invalid or has expired, the user is redirected to different view and instructed to request a new password reset link.