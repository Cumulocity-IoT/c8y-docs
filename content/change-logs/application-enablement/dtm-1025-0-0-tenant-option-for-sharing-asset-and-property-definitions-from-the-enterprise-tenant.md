---
date: ""
title: "Tenant option for sharing asset and property definitions from the enterprise tenant"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2703"
version: "1025.0.0"
---
Managing asset definitions across multiple subtenants previously
required each tenant to maintain its own independent set of definitions.
The new tenant option definitions.multitenant.sharing.mode lets you
configure where asset definitions and MEA definitions are stored and
retrieved from across your enterprise tenant hierarchy.

The option supports two modes: disabled (default) and enabled. When set
to disabled, definitions are stored directly on each tenant
independently. When set to enabled on both the enterprise tenant and a
subtenant, definitions are stored on the enterprise tenant and made
available to all subtenants where the option is enabled. Read requests
from a subtenant are transparently forwarded to the enterprise tenant.
Create, update, and delete requests are only permitted on the enterprise
tenant and are rejected on the subtenant. If a tenant does not belong to
an enterprise tenant, definitions are stored on the tenant itself and
the sharing rules do not apply.

After updating this tenant option, allow up to 10 minutes for the change
to take effect. Setting enabled on a subtenant while the enterprise
tenant is set to disabled is an invalid configuration and results in an
error when requesting definitions from the subtenant.