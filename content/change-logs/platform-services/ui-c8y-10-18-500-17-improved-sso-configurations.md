---
date: 2023-12-06
title: Improved SSO configurations
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-56347
version: 10.18.500.17
---
The SSO configuration page has been updated to support additional signature verification methods for the Azure AD integration template. Users can now optionally specify a public key discovery URL within the signature verification settings when setting up connectivity to Azure Active Directory for single sign-on.
