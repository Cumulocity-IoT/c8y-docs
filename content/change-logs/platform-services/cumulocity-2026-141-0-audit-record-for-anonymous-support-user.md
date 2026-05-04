---
date: ''
title: Enhanced traceability for support user logins in audit logs
product_area: Platform services
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-65573
version: 2026.141.0
---
The audit logging logic for **User login** actions has been improved to ensure full visibility during subtenant access.

When a support user logs into a sub-tenant, the audit log entry now consistently records the specific target user being accessed. Previously, if the system used only the `<managementTenantUserId>$` identifier, the audit log would omit the impersonated user's identity.

This has been corrected to ensure that even when the primary administrator account (anonymous user) is utilized, the audit trail explicitly captures and displays the identity of the chosen target user within the sub-tenant.