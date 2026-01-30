---
date: '2025-11-20'
title: Enhanced security for encrypted tenant options
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
ticket: MTM-63640
version: 2025.376.0
---
With this change, the `secure-tenant-options` feature is enabled by default.

As previously [announced](/change-logs/?change-type=.change-type-api-change&component=.component-rest-api#cumulocity-2025-116-0-enhanced-security-for-encrypted-tenant-options), this security feature restricts the decryption of encrypted [tenant options](https://cumulocity.com/api/core/#tag/Options) with the `credentials.` prefix. These options can only be decrypted by system users (such as bootstrap or microservice users) **if they own the options**.

Ownership is determined based on the category of the tenant option, in the following priority:

1. The `settingsCategory` defined in the microservice manifest.
2. The microservice’s context path.
3. The microservice name.

{{< c8y-admon-important >}}
This change enforces the security model announced earlier in 2025. Microservices attempting to decrypt `credentials.*` options in categories **not owned** by them will receive static `<<Encrypted>>` values.

We recommend verifying microservices to ensure they are correctly aligned with their owned option categories and do not rely on accessing external credentials.
{{< /c8y-admon-important >}}
