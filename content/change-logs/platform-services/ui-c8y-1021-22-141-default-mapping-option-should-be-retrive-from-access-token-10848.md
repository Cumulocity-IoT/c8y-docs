---
date: 2026-02-04
title: Default access mapping retrieves user information from access token
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62110
version: 1021.22.141
---
The single sign-on (SSO) configuration has been updated with the default access mapping set to retrieve user information from the access token. This update is required as {{< product-c8y-iot >}} recently enabled user information to be taken from either the access token or the identity token. This change improves backward compatibility.