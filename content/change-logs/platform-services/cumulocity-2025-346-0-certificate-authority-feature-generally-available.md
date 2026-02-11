---
date: '2025-10-16'
title: Enhanced certificate management with ability to sign and issue certificates
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
ticket: MTM-64106
version: 2025.348.0
---
The certificate authority feature is now Generally Available (GA).

The feature can be accessed in the Device Management application under Management → Trusted certificates, where the **Add CA Certificate** option is now available by default.

{{< product-c8y-iot >}} has been enhanced to function as a Certificate Authority (CA), providing the following capabilities:
- Manage signing certificates
- Accept Certificate Signing Requests (CSR)
- Perform legitimacy checks, as defined by each tenant
- Issue signed X.509 certificates trusted by the device tenant

For more details about this feature refer to [Certificate Authority (CA)](/device-certificate-authentication/certificate-authority).