---
date: ''
title: Automated audit logging for device re-enrollment
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-66619
version: 2026.131.0
---
The platform now automatically generates audit logs for device certificate renewals and replacements. When a device uses the [Re-enroll API](/device-certificate-authentication/device-enroll-and-re-enroll/#re-issue-device-certificate) to refresh or replace its certificate via existing credentials, a dedicated entry is now recorded in the system logs.

**Log Specifications:**
- **Activity:** `Tenant certificate authority(CA) re-signed certificate for device: %s.`
- **Audit Text:** `Certificate serial number hex: '%s'`
- **Event Type:** `TenantCertificateAuthority`