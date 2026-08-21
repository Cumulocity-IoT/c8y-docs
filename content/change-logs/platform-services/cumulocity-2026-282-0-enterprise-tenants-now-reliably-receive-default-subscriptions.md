---
date:
title: Enterprise tenants now reliably receive their default application and microservice subscriptions
product_area: Platform services
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-67360
version: 2026.282.0
---
Previously, an {{< enterprise-tenant >}} that had customized its default or on-update application and microservice subscription options could be skipped when {{< company-c8y >}} rolled out new default subscriptions, since that option was also consulted for the tenant itself rather than only for its subtenants.

These subscription options are now always resolved from the parent tenant, up to the {{< management-tenant >}}, and are no longer looked up on the tenant itself. As a result, an {{< enterprise-tenant >}} always receives the same default and on-update subscriptions as any other tenant directly under the {{< management-tenant >}}, regardless of its own configuration. That configuration continues to work exactly as before in determining what gets subscribed to by its subtenants.

This also means that a plain (non-enterprise) tenant can no longer use its own default or on-update subscription options to override which applications and microservices it receives. This is now solely controlled by its parent {{< enterprise-tenant >}}, or by the {{< management-tenant >}} for tenants directly below it, for example, via the **Default subscriptions** page in the Administration application. For details, see [Default subscriptions](/enterprise-tenant/managing-tenants/#default-subscriptions).
