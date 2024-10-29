---
date:
title: Subtenant creation request requires domain being a subdomain of the parent tenant
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-59299
version: 10.20.568.0
---
The domain of a tenant, created under either the {{< management-tenant >}} or {{< enterprise-tenant >}}, is now required to be a subdomain of the parent tenant.
Previously, the domain of a tenant created under the {{< management-tenant >}} could have a custom domain not related to the parent tenant.