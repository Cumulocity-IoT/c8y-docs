---
date:
title: Improved Java SDK support for external IAM tokens without tenant or username claims
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: QWPx3rFfn
    label: Java SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-64869
version: 2025.78.0
---

If using [external IAM JWT tokens](/authentication/sso/#configuring-access-tokens), the authentication failed to correctly identify the tenant and user when the token did not include a tenant ID or username in its claims. 
With this fix, the SDK now properly retrieves the tenantId and username from the CumulocityCredentials context, ensuring correct identification and smoother integration with external identity providers.


