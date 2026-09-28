---
date: '2026-01-26'
title: skipSSORedirect now works correctly when basic authentication is forbidden
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
ticket: MTM-65858
version: 1023.22.5
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
When basic authentication was disabled in the system, the `skipSSORedirect` parameter was not functioning as expected, forcing users to go through SSO authentication even when they explicitly requested to skip it. This issue has been fixed. The `skipSSORedirect` parameter now works correctly regardless of whether basic authentication is enabled or disabled in your environment. This allows users to bypass SSO authentication as intended when they provide the `skipSSORedirect` parameter, improving flexibility for integrations and automated processes that need to authenticate without going through the SSO flow.
