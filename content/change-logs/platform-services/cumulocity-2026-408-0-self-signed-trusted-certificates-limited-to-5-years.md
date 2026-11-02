---
date:
title: Self-signed trusted certificates valid for more than 5 years are rejected
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
ticket: MTM-68518
version: 2026.408.0
---

Cumulocity now rejects a self-signed trusted certificate that is valid for more than 5 years. This change follows recommended security practice for trusted certificates. The validity period is the time between the `notBefore` and `notAfter` dates of the certificate.

The following endpoints return the status code 422 for such a certificate:

- **POST /tenant/tenants/{tenantId}/trusted-certificates** - https://cumulocity.com/api/core/#operation/postTrustedCertificateCollectionResource
- **POST /tenant/tenants/{tenantId}/trusted-certificates/bulk** - https://cumulocity.com/api/core/#operation/postTrustedCertificateCollectionResourceBulk

Trusted certificates that you uploaded before this change keep working. The rule does not apply to certificates signed by another certificate authority (CA), such as intermediate certificates.
