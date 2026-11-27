---
date: '2026-11-19'
title: Inherit DTM settings from Management tenant to subtenants
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-3287
version: 1025.17.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-19'
  - label: apj.cumulocity.com
    date: '2026-11-20'
  - label: jp.cumulocity.com
    date: '2026-11-20'
  - label: us.cumulocity.com
    date: '2026-11-23'
  - label: cumulocity.com
    date: '2026-11-23'
---
Previously, subtenants required a Digital Twin Manager (DTM) setting to be configured in the tenant itself or in the parent {{< enterprise-tenant >}}, which caused unnecessary duplication and made it difficult to apply consistent settings across the tenant hierarchy in your {{< product-c8y-iot >}} instance. Now, subtenants inherit DTM settings from the {{< management-tenant >}} when the settings are not configured in the subtenant itself or in the {{< enterprise-tenant >}}.

This simplifies tenant configuration by allowing you to set default DTM settings at the management level and override them only when needed for specific {{< enterprise-tenant >}} or subtenants. Subtenants can still maintain their own custom settings to override inherited values. To define a DTM setting, set the appropriate tenant option in the `DTM` category.

From a subtenant, the DTM settings are searched in the following order: subtenant -> {{< enterprise-tenant >}} -> {{< management-tenant >}} -> built-in defaults. From an {{< enterprise-tenant >}}, the DTM settings are searched in the following order: {{< enterprise-tenant >}} -> {{< management-tenant >}} -> built-in defaults.

In the response, the field `source` indicates where the DTM setting is defined: `TENANT_OPTION`, `ENTERPRISE_TENANT_OPTION`, `MANAGEMENT_TENANT_OPTION`.

This change improves configuration management across your tenant structure, reducing setup time and ensuring consistent behavior across subtenants unless explicitly customized.
