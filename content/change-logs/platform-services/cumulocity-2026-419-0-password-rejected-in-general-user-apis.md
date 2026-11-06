---
date:
title: Password field is now rejected in general user APIs
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
ticket: MTM-68673
version: 2026.419.0
---

Previously, the `password` field was silently ignored in general user APIs, as described in [Password field is now ignored in general user APIs](/change-logs/#cumulocity-2026-400-0-password-ignored-in-general-user-apis). Requests to the following endpoints that contain the `password` field are now rejected with HTTP status 422 instead:

- **PUT /user/currentUser** - https://cumulocity.com/api/core/#operation/putCurrentUserResource
- **PUT /user/{tenantId}/users/{userId}** - https://cumulocity.com/api/core/#operation/putUserResource

To change the password of the current user, use the dedicated endpoint, which verifies the current password provided in the `currentUserPassword` field:

- **PUT /user/currentUser/password** - https://cumulocity.com/api/core/#operation/putCurrentUserPasswordResource
