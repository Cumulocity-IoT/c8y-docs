---
date: 2023-12-06
title: Addressed the redirection issues for support user
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
ticket: MTM-54617
version: 10.18.497.8
---
On logging into the platform as a support user, the redirection to the {{< management-tenant >}} has been removed. The platform, despite authentication in the context of the {{< management-tenant >}}, sets a cookie for the domain of the logged-in tenant.
