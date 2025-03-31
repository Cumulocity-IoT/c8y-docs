---
date: ""
title: Make session_state optional in SSO login flow
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
ticket: MTM-62824
version: 1021.22.59
---
When 'Redirect to the user interface application' is enabled, the UI application was requiring 'session_state' and 'code' properties in response to authorization request from the OAuth server. There are cases where 'session_state' is not returned by oauth server but 'code' only and login was failing. Session state is optional now.