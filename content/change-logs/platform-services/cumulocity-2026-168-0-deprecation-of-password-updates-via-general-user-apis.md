---
date: '2026-06-18'
title: Deprecation of password updates via general user APIs
product_area: Platform services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-66931
version: 2026.168.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-06-18'
  - label: apj.cumulocity.com
    date: '2026-06-10'
  - label: jp.cumulocity.com
    date: '2026-06-10'
  - label: us.cumulocity.com
    date: '2026-06-15'
  - label: cumulocity.com
    date: '2026-06-16'
---

To improve platform security, the ability to update passwords through general user endpoints is being deprecated. Password changes will soon require verification of the current password to prevent unauthorized account takeovers.

**Affected endpoints**

The `password` field is deprecated in the following endpoints:

- **PUT /user/currentUser** - https://cumulocity.com/api/core/#operation/putCurrentUserResource
- **PUT /tenant/users/{userId}** - https://cumulocity.com/api/core/#operation/putUserResource

**New requirement**

All password updates must use the dedicated endpoint for updating the current user's password:

- **PUT /user/currentUser/password** - https://cumulocity.com/api/core/#operation/putCurrentUserPasswordResource

This endpoint requires the `currentPassword` field for validation.

**Timeline**

Starting in Q4 2026 for the SaaS instances and in 2027 for the yearly releases, the `password` field in general user endpoints will be ignored.

{{< c8y-admon-important >}}
Update all client applications and scripts to use the dedicated password endpoint. This transition is mandatory to ensure enhanced security and prevent unauthorized password modifications.
{{< /c8y-admon-important >}}



