---
date: '2025-04-10'
title: Changed session_state property to be optional in the SSO login flow
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62824
version: 1021.56.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when the option **Redirect to the user interface application** was enabled in the single sign-on login configuration, the UI application required the `session_state` and `code` properties in the response to the authorization request from the OAuth server. In certain cases the `session_state` property is not returned by the OAuth server which caused a login failure. Now the `session_state` property is optional and the login no longer fails due to this property missing.
