---
date: ""
title: User with SSO redirect and no access to any app infinite loop fix. [GRAFT][release/cd] (#9494)
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
ticket: MTM-63961
version: 1022.4.10
---
If user had SSO and SSO redirect enabled but had no permission to access any app, after login try he was falling into redirecting loop. Right now it is fixed and if user has no app to access, he is redirected to login view and error is shown.