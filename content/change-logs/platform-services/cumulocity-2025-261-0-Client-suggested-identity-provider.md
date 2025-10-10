---
date: '2025-10-10'
title: Client-Suggested Identity Provider for SSO Login
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Platform services
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63337
version: 2025.261.0
---
Added support for the idp_hint parameter to improve SSO login with multiple identity providers.
Client applications can now suggest a preferred IdP (for example, idp_hint=google), allowing users to be redirected directly to that provider without manual selection.