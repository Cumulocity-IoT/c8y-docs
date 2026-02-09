---
date: '2025-06-19'
title: Fixed SSO login issues after upgrade
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
ticket: MTM-63747
version: 1021.76.6
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
For tenants using single sign-on as a default login method, after an upgrade from the y2024 release (or earlier) user logins might fail.
The reason is that older versions used authorization tokens for subdomains (for example, *.test.eu-latest.cumulocity.com*) while newer versions use domain-specific tokens (*test.eu-latest.cumulocity.com*, without dot at the beginning). Having both in place was causing a conflict. Now, if an old cookie is detected, cookies are cleared with logout and users can log in again without issues.
