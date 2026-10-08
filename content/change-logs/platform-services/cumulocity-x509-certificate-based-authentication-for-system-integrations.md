---
date:
title: X.509 certificate-based authentication for system-to-system integrations
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Platform services
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-65875
version: 2026.334.0
---

{{< product-c8y-iot >}} now supports X.509 certificate-based authentication for system-to-system integrations. This enables secure, passwordless authentication using enterprise Public Key Infrastructure (PKI), replacing static credentials and legacy password grant flows.

- **New endpoint**: A dedicated endpoint (`POST /tenant/oauth/certificate`) allows external applications to exchange valid X.509 client certificate chains for standard {{< product-c8y-iot >}} platform JWT access tokens.
- **User-controlled opt-in**: Users can enforce certificate authentication on their own accounts by setting the `requiredAuthType` property to `CERTIFICATES`. See [Certificate authentication opt-in](/authentication/oai-secure/#certificate-authentication-opt-in) for details. For security, this is a strict self-service feature: accounts cannot be opted in by third parties or tenant administrators.
- **Audit logging**: Every certificate token request and validation outcome is recorded in the platform audit log for complete security compliance and tracking.
- **Documentation**: See the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#operation/postCertificateAccessToken) for implementation details.
