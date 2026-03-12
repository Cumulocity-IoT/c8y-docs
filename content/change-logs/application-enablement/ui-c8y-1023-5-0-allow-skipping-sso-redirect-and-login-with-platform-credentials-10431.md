---
date: '2025-12-02'
title: New option for skipping SSO redirect and showing standard platform login
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
To support a broader range of authentication workflows, the Web SDK now introduces the `skipSSORedirect` query parameter. When enabled, this option skips the default single sign-on (SSO) redirect and displays the standard platform login interface instead. This enhancement provides greater control over authentication behavior, making it easier to support environments where direct platform login is preferred or where SSO is unnecessary.
