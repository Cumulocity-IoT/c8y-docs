---
date: '2025-09-18'
title: Added identity provider hint parameter support to OAuth2 login flow
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
ticket: MTM-64132
version: 1022.26.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
To streamline the single sign-on experience, the OAuth2 login flow now supports an identity provider hint parameter. When users access the login page with this parameter, they are automatically redirected to their designated authentication provider based on the hint. This eliminates the need for manual identity provider selection during login, simplifying the authentication process for users. Existing user logins are unaffected, and the identity provider selection page remains available when no hint is provided.
