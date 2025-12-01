---
date: ""
title: Allow skipping SSO redirect and login with platform credentials
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
ticket: MTM-65303
version: 1023.5.0
---
In some scenarios, users may prefer to log in directly with their platform credentials instead of being redirected to Single Sign-On (SSO).
To address this need, a new feature has been implemented that allows users to skip the automatic SSO redirect and log in using their platform credentials instead.

A new `skipSSORedirect` query parameter has been introduced for this usecase.