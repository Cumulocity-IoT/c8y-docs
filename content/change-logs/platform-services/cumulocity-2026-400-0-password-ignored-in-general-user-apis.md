---
date:
title: Password field is now ignored in general user APIs
product_area: Platform services
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-66897
version: 2026.400.0
---

As announced earlier in [Deprecation of password updates via general user APIs](/change-logs/#cumulocity-2026-168-0-deprecation-of-password-updates-via-general-user-apis), the `password` field is now ignored in the following endpoints:

- **PUT /user/currentUser** - https://cumulocity.com/api/core/#operation/putCurrentUserResource
- **PUT /user/{tenantId}/users/{userId}** - https://cumulocity.com/api/core/#operation/putUserResource

Requests that contain the `password` field are still accepted, but the password is not changed.

To change the password of the current user, use the dedicated endpoint, which verifies the current password provided in the `currentUserPassword` field:

- **PUT /user/currentUser/password** - https://cumulocity.com/api/core/#operation/putCurrentUserPasswordResource
