---
date:
title: Tenant creation with tenant policy overriding the default tenant option works properly
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: Rest API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62312
version: 2025.72.0
---
Previously, when an {{< enterprise-tenant >}} created a subtenant with a tenant policy that tried to override the default tenant option the tenant creation failed. This issue has been fixed an creating a subtenant with a tenant policy overriding the default tenant option now works properly.
work as before. 
