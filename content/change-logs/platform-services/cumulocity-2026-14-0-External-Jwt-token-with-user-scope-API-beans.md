---
date: ''
title: Improved Java SDK support for external IAM tokens with user scope API beans 
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
ticket: MTM-66206
version: 2026.14.0

---
Previously, when users authenticated in the Java SDK using [external IAM JWT tokens](/authentication/sso/#configuring-access-tokens) together with [API service beans](/microservice-sdk/java/#api-service-beans) configured with the Qualifier for user scope, the authentication process could fail to correctly identify the tenant and user.
With this improvement, service beans using the Qualifier for user scope can now authenticate correctly when external IAM JWT tokens are used. Their behavior is now consistent with other supported authentication methods.

