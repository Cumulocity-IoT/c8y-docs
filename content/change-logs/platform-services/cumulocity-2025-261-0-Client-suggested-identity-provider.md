---
date: '2026-03-31'
title: Client-suggested identity provider for SSO login
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
To improve the single sign-on (SSO) login with multiple identity providers, a new `idp_hint` parameter has been added. 
Client applications can now suggest a preferred IdP (for example, idp_hint=google), allowing users to be redirected directly to that provider without manual selection.
