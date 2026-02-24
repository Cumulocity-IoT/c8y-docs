---
date: 2026-03-31
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
ticket: MTM-62399
version: 2025.116.0
---
A new security feature has been introduced to restrict the decryption of encrypted [tenant options](https://cumulocity.com/api/core/#tag/Options) with the `credentials.` prefix. These options can now only be decrypted by system users (such as bootstrap or microservice users) if they own the options.

Ownership is determined based on the category of the tenant option, in the following priority:

1. The `settingsCategory` defined in the microservice manifest.
2. The microservice’s context path.
3. The microservice name.

This change is currently disabled by default and can be enabled via a feature toggle `secure-tenant-options` through the [API](https://cumulocity.com/api/core/#operation/setCurrentTenantFeatureToggleValue).

{{< c8y-admon-important >}}
In Q4 2025 for the SaaS instances and in 2026 for the yearly releases, this restriction will become **mandatory**. We strongly recommend reviewing your microservices now to ensure compatibility with the upcoming enforcement. This gives microservice developers time to adapt, especially if their services depend on reading `credentials.*` options in categories **not owned** by the microservice.
{{< /c8y-admon-important >}}
