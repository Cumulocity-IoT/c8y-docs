---
date: ""
title: Validate password reset token before showing change password page
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
There is new backend feature that allows Login app to check if reset password link is valid. If it is, user is redirected to view where he's able to change password. If it is invalid (does not exist or expired), user is instructed to request reset password link again.