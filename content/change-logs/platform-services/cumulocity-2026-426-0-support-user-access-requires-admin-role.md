---
date:
title: Enabling and disabling support user access requires an admin role
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-67983
version:
---

Only users with the `ROLE_TENANT_ADMIN` or `ROLE_TENANT_MANAGEMENT_ADMIN` role can enable or disable support user access for their tenant. The following endpoints reject requests from other users with HTTP status 403:

- **PUT /tenant/support-user/enable**
- **PUT /tenant/support-user/disable**
